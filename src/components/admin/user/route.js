const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const userRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

userRouter.get('/users',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getUsers))

userRouter.get('/users/download',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.download))

userRouter.get('/users/me',
  loggedIn,
  asyncHandler(controllers.getProfile))

userRouter.put('/users/change-password',
  loggedIn,
  validateRequestSchema(schemas.changePasswordSchema),
  asyncHandler(controllers.changePassword))

userRouter.put('/users/me',
  loggedIn,
  validateRequestSchema(schemas.updateProfileSchema),
  asyncHandler(controllers.updateProfile))

userRouter.put('/users/avatar',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.download))

userRouter.delete('/users/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.deleteSchema),
  asyncHandler(controllers.deleteUser))

module.exports = userRouter
