const services = require('../services')

const auth = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.auth(request.body)
  })
}
const refreshToken = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.refreshToken(request.body)
  })
}

const forgotPassword = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.forgotPassword(request.body)
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

module.exports = { auth, refreshToken, forgotPassword, validateToken, changePassword }