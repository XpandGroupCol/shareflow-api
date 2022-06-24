const asyncHandler = require('../../../middleware/asynHandler')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const adminAuthRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

adminAuthRouter.post('/auth',
  validateRequestSchema(schemas.authSchema),
  asyncHandler(controllers.auth))

adminAuthRouter.post('/auth/refresh-token',
  validateRequestSchema(schemas.tokenSchema),
  asyncHandler(controllers.refreshToken))

adminAuthRouter.post('/auth/forgot-password',
  validateRequestSchema(schemas.forgotPasswordSchema),
  asyncHandler(controllers.forgotPassword))

adminAuthRouter.post('/auth/validate-token',
  validateRequestSchema(schemas.tokenSchema),
  asyncHandler(controllers.validateToken))

adminAuthRouter.post('/auth/change-password',
  validateRequestSchema(schemas.changePasswordSchema),
  asyncHandler(controllers.changePassword))

module.exports = adminAuthRouter
