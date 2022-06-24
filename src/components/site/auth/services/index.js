
const boom = require('@hapi/boom')
const bcryptjs = require('bcryptjs')

const User = require('../../../../models/User')
const { DEFAULT_ROLES } = require('../../../../config')
const getSession = require('../../../../utils/getSession')
const { verifyToken, setToken } = require('../../../../utils/token')

const auth = async ({ email, password }) => {
  const user = await User.findOne({
    email,
    status: true,
    role: DEFAULT_ROLES.CLIENT
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

const social = async ({ name, lastName = '', provider, password = '@', email, image }) => {
  let user = null

  user = await User.findOne({ email })

  if (user && user?.provider !== provider) {
    throw boom.unauthorized('Parece que tenemos problemas, por favor intente con otro metodo de autenticación')
  }

  if (user && (user?.role !== DEFAULT_ROLES.CLIENT || !user?.status)) {
    throw boom.unauthorized(`No pudimos acceder con su cuenta de ${provider}.Si necesitas que te rescatemos, escribemos a support@mediax.com`)
  }

  if (!user) {
    user = await User.create({ name, lastName, provider, password, email, image, role: DEFAULT_ROLES.CLIENT, emailVerified: true })
  }

  return getSession(user)
}

const signup = async ({ name, lastName, password, email }) => {
  let user = null

  user = await User.findOne({ email })

  if (user) {
    throw boom.badRequest('Algo salio mal, por favor verifique su informacion o intente con otros datos.')
  }

  const hashPassword = await bcryptjs.hash(password, 10)

  user = await User.create({ name, lastName, password: hashPassword, email, emailVerified: false, role: DEFAULT_ROLES.CLIENT })

  const token = setToken({ _id: user?._id, email: user?.email }, process.env.VERIFY_ACCOUNT)

  try {
    // aqui se debe enviar un correo
    return token
  } catch (e) {
    throw boom.badRequest('Algo salio mal, por favor intenta nuevamente.')
  }
}

const verifyAccount = async ({ token }) => {
  try {
    const { _id } = verifyToken(token, process.env.VERIFY_ACCOUNT)
    const user = await User.findById(_id)
    return getSession(user)
  } catch {
    throw boom.unauthorized('Token no valido')
  }
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
    role: DEFAULT_ROLES.CLIENT
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
    role: DEFAULT_ROLES.CLIENT
  }).lean().exec()

  if (user) {
    const data = { id: user?._id, email: user?.email }

    // aqui se le debe enviar un email al usuario con el token
    const token = setToken(data, `${process.env.ACCESS_TOKEN}${user.password}`, { expiresIn: '15m' })

    return `${token}@u@${user?._id}`
  }

  throw boom.badRequest('Usuiario no registrado')
}

const validateToken = async ({ token }) => {
  const [_token, _id] = token.split('@u@')

  const user = await User.findById(_id).lean().exec()

  if (!user) throw boom.badRequest('Token no valido')

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
    user.password = await bcryptjs.hash(password, 10)
    await user.save()
    return true
  } catch {
    throw boom.unauthorized('Token no valido')
  }
}

module.exports = { auth, refreshToken, forgotPassword, validateToken, changePassword, social, signup, verifyAccount }
