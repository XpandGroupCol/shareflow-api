const TargetRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const asyncHandler = require('../../../middleware/asynHandler')
const controller = require('./controller')

TargetRouter.get('/',
  loggedIn,
  asyncHandler(controller.getTargets))

TargetRouter.post('/',
  loggedIn,
  asyncHandler(controller.createTarget))

TargetRouter.delete('/:id',
  loggedIn,
  asyncHandler(controller.deleteTarget))

TargetRouter.put('/:id',
  loggedIn,
  asyncHandler(controller.updateTarget))

module.exports = TargetRouter
