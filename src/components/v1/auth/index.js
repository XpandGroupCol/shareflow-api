
const asyncHandler = require('../../../middleware/asynHandler')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const loginRouter = require('express').Router()

const controller = require('./controller')
const schemas = require('./schemas')

loginRouter.post('/admin-login',
  validateRequestSchema(schemas.loginSchema),
  asyncHandler(controller.adminLogin))

loginRouter.post('/login',
  validateRequestSchema(schemas.loginSchema),
  asyncHandler(controller.login))

loginRouter.post('/social-login',
  validateRequestSchema(schemas.socialLoginSchema),
  asyncHandler(controller.socialAuth))

loginRouter.post('/verify-email',
  validateRequestSchema(schemas.verifyTokenSchema),
  asyncHandler(controller.verifyEmail))

loginRouter.post('/forgot-password',
  validateRequestSchema(schemas.forgotPasswordSchema),
  asyncHandler(controller.forgot))

loginRouter.post('/verify-forgot-password',
  validateRequestSchema(schemas.verifyTokenSchema),
  asyncHandler(controller.verifyPassword))

loginRouter.post('/signup',
  validateRequestSchema(schemas.signupSchema),
  asyncHandler(controller.signup))

loginRouter.post('/change-password',
  validateRequestSchema(schemas.changePasswordSchema),
  asyncHandler(controller.changePassword))

module.exports = loginRouter
