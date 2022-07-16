
const boom = require('@hapi/boom')
const bcryptjs = require('bcryptjs')

const User = require('../../../../models/User')
const { DEFAULT_ROLES } = require('../../../../config')
const getSession = require('../../../../utils/getSession')
const { verifyToken, setToken } = require('../../../../utils/token')
const { sendEmail } = require('../../../../utils/aws/SES')
const { recoveryPasswordTemplate } = require('../../../../templates/recoveryPassword')

const auth = async ({ email, password }) => {
  const user = await User.findOne({
    email,
    status: true,
    role: { $ne: DEFAULT_ROLES.CLIENT }
  }).lean().exec()

  if (!user ||
      !bcryptjs.compareSync(password, user.password)) {
    throw boom.unauthorized('El correo electrónico o contraseña son incorrectos.')
  }

  if (user && !user?.emailVerified) {
    throw boom.unauthorized('Su cuenta no ha sido verificada.')
  }

  return getSession(user)
}

const refreshToken = async ({ token }) => {
  let email = ''
  try {
    const user = verifyToken(token, process.env.REFRESH_TOKEN)
    email = user?.email
  } catch {
    throw boom.unauthorized('Su session ha expirado')
  }

  if (!email) throw boom.unauthorized('Su session ha expirado')

  const user = await User.findOne({
    email,
    status: true,
    role: { $ne: DEFAULT_ROLES.CLIENT }
  }).lean().exec()

  if (!user) {
    throw boom.unauthorized('Su session ha expirado')
  }

  return { ...getSession(user), refreshToken: token }
}
const forgotPassword = async ({ email }) => {
  const user = await User.findOne({
    email,
    status: true,
    role: { $ne: DEFAULT_ROLES.CLIENT }
  }).lean().exec()

  if (user) {
    const data = { id: user?._id, email: user?.email }

    const token = setToken(data, `${process.env.ACCESS_TOKEN}${user.password}`, { expiresIn: '15m' })
    const url = `${process.env.CLIENT_URL}/auth/recovery-password/${token}@u@${user?._id}`

    const sendEmailPayload = {
      destinationEmails: ['diegocontreras1219@gmail.com'],
      emailSubject: 'Recuperar contraseña',
      text: 'Recuperar contraseña',
      htmlMessage: recoveryPasswordTemplate({ url, name: user?.name })
    }
    const send = await sendEmail(sendEmailPayload)
    return send
  }

  return true
}

const validateToken = async ({ token }) => {
  const [_token, _id] = token.split('@u@')

  const user = await User.findById(_id).lean().exec()

  try {
    verifyToken(_token, `${process.env.ACCESS_TOKEN}${user.password}`)
    return true
  } catch {
    throw boom.unauthorized('Token no valido')
  }
}

const changePassword = async ({ password, token }) => {
  const [_token, _id] = token.split('@u@')

  const user = await User.findById(_id)

  if (!user) throw boom.badRequest('Token no valido')

  try {
    verifyToken(_token, `${process.env.ACCESS_TOKEN}${user.password}`)
    const newPassword = await bcryptjs.hash(password, 10)
    await User.findOneAndUpdate({ _id }, { password: newPassword })
    return true
  } catch (e) {
    console.log({ e })
    throw boom.unauthorized('Token no valido')
  }
}

module.exports = { auth, refreshToken, forgotPassword, validateToken, changePassword }
