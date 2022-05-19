
const userRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const { receiveFile } = require('../../../utils/aws-upload')
const asyncHandler = require('../../../middleware/asynHandler')
const controller = require('./controller')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const schemas = require('./schemas')
const { receiveMultipleFiles } = require('../../../middleware/fileManager')

userRouter.get('/',
  loggedIn,
  asyncHandler(controller.getUsers))

userRouter.get('/profile',
  loggedIn,
  asyncHandler(controller.getProfile))

userRouter.get('/:id',
  loggedIn,
  asyncHandler(controller.getUserById))

userRouter.post('/',
  loggedIn,
  receiveMultipleFiles,
  validateRequestSchema(schemas.createUserSchema),
  asyncHandler(controller.createUser))

userRouter.put('/company-profile',
  loggedIn,
  receiveMultipleFiles,
  asyncHandler(controller.updateProfileCompany))

userRouter.put('/change-password',
  loggedIn,
  asyncHandler(controller.changePassword))

userRouter.put('/:id',
  loggedIn,
  receiveFile,
  validateRequestSchema(schemas.editUserSchema),
  asyncHandler(controller.updateUser))

userRouter.delete('/:id',
  loggedIn,
  asyncHandler(controller.deleteUser))

module.exports = userRouter
