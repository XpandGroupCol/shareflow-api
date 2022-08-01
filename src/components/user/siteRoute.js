const asyncHandler = require('../../middleware/asynHandler')
const { receiveSingleFile } = require('../../middleware/fileManager')
const loggedIn = require('../../middleware/isAuth')
const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')
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

userRouter.put('/users/update-company/:id',
  loggedIn,
  validateRequestSchema(schemas.updateCompanySchema),
  asyncHandler(controllers.updateCompany))

userRouter.put('/users/upload-avatar/:id',
  receiveSingleFile,
  loggedIn,
  asyncHandler(controllers.setAvatar))

userRouter.put('/users/upload-rut/:id',
  receiveSingleFile,
  loggedIn,
  asyncHandler(controllers.uploadRut))

module.exports = userRouter
