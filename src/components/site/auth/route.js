const asyncHandler = require('../../../middleware/asynHandler')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const siteAuthRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

siteAuthRouter.post('/site/auth',
  validateRequestSchema(schemas.authSchema),
  asyncHandler(controllers.auth))

siteAuthRouter.post('/site/auth/social',
  validateRequestSchema(schemas.socialSchema),
  asyncHandler(controllers.auth))

siteAuthRouter.post('/site/auth/signup',
  validateRequestSchema(schemas.signupSchema),
  asyncHandler(controllers.signup))

siteAuthRouter.post('/site/auth/verify-account',
  validateRequestSchema(schemas.tokenSchema),
  asyncHandler(controllers.verifyAccount))

siteAuthRouter.post('/site/auth/refresh-token',
  validateRequestSchema(schemas.tokenSchema),
  asyncHandler(controllers.refreshToken))

siteAuthRouter.post('/site/auth/forgot-password',
  validateRequestSchema(schemas.forgotPasswordSchema),
  asyncHandler(controllers.forgotPassword))

siteAuthRouter.post('/site/auth/validate-token',
  validateRequestSchema(schemas.tokenSchema),
  asyncHandler(controllers.validateToken))

siteAuthRouter.post('/site/auth/change-password',
  validateRequestSchema(schemas.changePasswordSchema),
  asyncHandler(controllers.changePassword))

module.exports = siteAuthRouter
