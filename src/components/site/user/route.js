const asyncHandler = require('../../../middleware/asynHandler')
const { receiveSingleFile } = require('../../../middleware/fileManager')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const userRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

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

userRouter.put('/users/upload-file',
  receiveSingleFile,
  loggedIn,
  asyncHandler(controllers.uploadfile))

userRouter.put('/users/:id',
  loggedIn,
  asyncHandler(controllers.updateUser))

module.exports = userRouter
