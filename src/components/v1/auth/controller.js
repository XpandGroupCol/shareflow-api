
const boom = require('@hapi/boom')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ROLES } = require('../../../config')
const User = require('../../../models/User')
const { sendMail, verifyEmal, forgotPassword } = require('../../../utils/sendMail')
const { getUserAuth } = require('../../../utils/transformData')

const adminLogin = async (request, response) => {
  const { email, password } = request.body
  const user = await User.findOne({
    email,
    status: true,
    role: { $ne: ROLES[2].id }
  })

  if (!user ||
      !bcryptjs.compareSync(password, user.password)) {
    throw boom.unauthorized('El correo electrónico o contraseña son incorrectos.')
  }

  if (user && !user?.emailVerified) {
    throw boom.unauthorized('Su cuenta no ha sido verificada.')
  }

  const data = getUserAuth(user)

  const token = jwt.sign(data, process.env.AUTH_SECRET)

  response.status(200).json({
    statusCode: 200,
    data: { ...data, token }

  })
}

const login = async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({
    email,
    statusCode: true,
    role: ROLES[2].id
  })

  if (!user ||
              !bcryptjs.compareSync(password, user.password)) {
    throw boom.unauthorized('El correo electrónico o contraseña son incorrectos.')
  }

  if (user && !user?.emailVerified) {
    throw boom.unauthorized('Su cuenta no ha sido verificada.')
  }

  const data = getUserAuth(user)

  const token = jwt.sign(data, process.env.AUTH_SECRET)

  response.status(200).json({
    statusCode: 200,
    data: { ...data, token }

  })
}

const socialAuth = async (request, response) => {
  let user = null
  const { name, lastName, provider, password = '@', email, image } = request.body

  user = await User.findOne({ email })

  if (user && user?.provider !== provider) {
    throw boom.unauthorized('Ya tiene un usuario con otro proveedor de autenticacion')
  }

  if (user && (user?.role !== ROLES[2].id || !user?.status)) {
    throw boom.unauthorized(`No pudimos acceder con su cuenta de ${provider}.Si necesitas que te rescatemos, escribemos a support@mediax.com`)
  }

  if (!user) {
    user = await User.create({ name, lastName, provider, password, email, image, role: ROLES[2]?.id, emailVerified: true })
  }

  const data = getUserAuth(user)
  const token = jwt.sign(data, process.env.AUTH_SECRET)

  response.status(200).json({
    statusCode: 200,
    data: { ...data, token }
  })
}

const verifyEmail = async (request, response) => {
  const { token } = request.body

  const { email } = jwt.verify(token, process.env.AUTH_SECRET)

  const user = await User.findOneAndUpdate({ email }, { emailVerified: true })

  if (!user || user.emailVerified) {
    throw boom.badRequest('El enlace de verificación no es valido.')
  }

  const data = getUserAuth(user)
  const _token = jwt.sign(data, process.env.AUTH_SECRET)

  response.status(200).json({
    statusCode: 200, data: { ...data, token: _token }
  })
}

const forgot = async (request, response) => {
  const { email } = request.body

  const user = await User.findOne({ email })

  if (user) {
    const data = { id: user?._id, email: user?.email }

    const token = jwt.sign(data, process.env.AUTH_SECRET)
    sendMail(forgotPassword(token), async (error) => {
      if (error) {
        throw boom.internal('Algo salio mal, por favor intenta nuevamente.')
      }
    })
  }

  response.status(200).json({ statusCode: 200, data: true })
}

const verifyPassword = async (request, response) => {
  const { token } = request.body

  const { email } = jwt.verify(token, process.env.AUTH_SECRET)

  const user = await User.findOne({ email })

  if (!user) {
    throw boom.badRequest('El enlace de verificación no es valido.')
  }

  response.status(200).json({ statusCode: 200, data: true })
}

const signup = async (request, response) => {
  let user = null
  const { name, lastName, provider, password = '@', email, image } = request.body

  user = await User.findOne({ email })

  if (user) {
    throw boom.badRequest('ya hay un usuario registrado con esos datos.')
  }

  const hashPassword = await bcryptjs.hash(password, 10)

  user = await User.create({ name, lastName, provider, password: hashPassword, email, image, emailVerified: false, role: ROLES[2].id })

  const data = {
    id: user?._id,
    email: user?.email
  }

  const token = jwt.sign(data, process.env.AUTH_SECRET)

  sendMail(verifyEmal(token), async (error) => {
    if (error) {
      await User.deleteOne({ email })
      throw boom.internal('Algo salio mal, por favor intenta nuevamente.')
    }
  })

  response.status(200).json({ statusCode: 200, data: true })
}

const changePassword = async (request, response) => {
  const { password, token } = request.body
  const { id } = jwt.verify(token, process.env.AUTH_SECRET)
  const newPassword = await bcryptjs.hash(password, 10)

  const data = await User.findByIdAndUpdate(id, { password: newPassword })
  response.status(200).json({ statusCode: 200, data })
}

module.exports = {
  adminLogin,
  login,
  socialAuth,
  verifyEmail,
  forgot,
  verifyPassword,
  signup,
  changePassword
}
