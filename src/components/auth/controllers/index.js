const { DEFAULT_ROLES } = require('../../../config')
const services = require('../services')

const authSite = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.auth({ ...request.body, role: DEFAULT_ROLES.CLIENT })
  })
}

const authAdmin = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.auth({ ...request.body, role: { $ne: DEFAULT_ROLES.CLIENT } })
  })
}

const signup = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.signup(request.body)
  })
}

const verifyInvitation = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.verifyInvitation(request.params)
  })
}

const refreshToken = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.refreshToken(request.body)
  })
}

const forgotPassword = async (request, response) => {
  const { email } = request.body
  const baseUrl = process.env.CLIENT_URL
  response.status(200).json({
    statusCode: 200,
    data: await services.forgotPassword({ email, baseUrl })
  })
}

const forgotPasswordAdmin = async (request, response) => {
  const { email } = request.body
  const baseUrl = process.env.ADMIN_URL
  response.status(200).json({
    statusCode: 200,
    data: await services.forgotPassword({ email, baseUrl })
  })
}
const validateToken = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.validateToken(request.body)
  })
}

const changePassword = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.changePassword(request.body)
  })
}

module.exports = {
  authSite,
  authAdmin,
  refreshToken,
  forgotPassword,
  validateToken,
  changePassword,
  signup,
  verifyInvitation,
  forgotPasswordAdmin
}
