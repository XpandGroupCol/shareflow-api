
const userRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const { receiveFile } = require('../../../utils/aws-upload')
const asyncHandler = require('../../../middleware/asynHandler')
const controller = require('./controller')

userRouter.get('/',
  loggedIn,
  asyncHandler(controller.getUsers))

userRouter.get('/profile',
  loggedIn,
  asyncHandler(controller.getProfile))

userRouter.post('/',
  loggedIn,
  receiveFile,
  asyncHandler(controller.createUser))

userRouter.put('/company-profile',
  loggedIn,
  asyncHandler(controller.updateProfileCompany))

userRouter.put('/change-password',
  loggedIn,
  asyncHandler(controller.changePassword))

userRouter.put('/:id',
  loggedIn,
  asyncHandler(controller.updateUser))

userRouter.delete('/:id',
  loggedIn,
  asyncHandler(controller.deleteUser))

module.exports = userRouter
