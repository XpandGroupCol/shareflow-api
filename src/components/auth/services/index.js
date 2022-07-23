const auth = require('./auth')
const changePassword = require('./changePassword')
const forgotPassword = require('./forgotPassword')
const refreshToken = require('./refreshToken')
const signup = require('./signup')
const validateToken = require('./validateToken')
const verifyInvitation = require('./verifyInvitation')

module.exports = {
  auth,
  changePassword,
  forgotPassword,
  refreshToken,
  signup,
  validateToken,
  verifyInvitation
}
