const asyncHandler = require('../../middleware/asynHandler')
const { receiveSingleFile } = require('../../middleware/fileManager')
const loggedIn = require('../../middleware/isAuth')
const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')
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

userRouter.get('/users/:id',
  loggedIn,
  // validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getUserById))

userRouter.post('/users',
  receiveSingleFile,
  loggedIn,
  // validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.createUser))

userRouter.put('/users/change-password',
  loggedIn,
  validateRequestSchema(schemas.changePasswordSchema),
  asyncHandler(controllers.changePassword))

userRouter.put('/users/me',
  loggedIn,
  validateRequestSchema(schemas.updateProfileSchema),
  asyncHandler(controllers.updateProfile))

userRouter.put('/users/upload-avatar/:id',
  receiveSingleFile,
  loggedIn,
  asyncHandler(controllers.setAvatar))

userRouter.put('/users/upload-rut/:id',
  receiveSingleFile,
  loggedIn,
  asyncHandler(controllers.uploadRut))

userRouter.put('/users/validate-rut/:id',
  loggedIn,
  asyncHandler(controllers.validateRut))

userRouter.put('/users/:id',
  loggedIn,
  asyncHandler(controllers.updateUser))

userRouter.delete('/users/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.deleteSchema),
  asyncHandler(controllers.deleteUser))

module.exports = userRouter
