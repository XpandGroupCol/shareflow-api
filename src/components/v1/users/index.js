
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

userRouter.delete('/:id',
  loggedIn,
  asyncHandler(controller.deleteUser))

userRouter.put('/:id',
  loggedIn,
  receiveFile,
  validateRequestSchema(schemas.editUserSchema),
  asyncHandler(controller.updateUser))

// rutas para la app

userRouter.put('/site/update-profile',
  loggedIn,
  receiveFile,
  asyncHandler(controller.siteUpdateProfile))

userRouter.put('/site/update-company',
  loggedIn,
  receiveFile,
  asyncHandler(controller.siteUpdateCompany))

userRouter.get('/site/me',
  loggedIn,
  asyncHandler(controller.siteMe))
userRouter.get('/site/session',
  loggedIn,
  asyncHandler(controller.siteUserSession))

userRouter.put('/site/update-avatar',
  loggedIn,
  asyncHandler(controller.siteUpdateAvatar))

userRouter.put('/site/update-password',
  loggedIn,
  asyncHandler(controller.siteUpdatePassword))

module.exports = userRouter
