const formatsRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const controller = require('./controller')
const asyncHandler = require('../../../middleware/asynHandler')

formatsRouter.get('/',
  loggedIn,
  asyncHandler(controller.getFormats))

formatsRouter.post('/',
  loggedIn,
  asyncHandler(controller.createFormat))

formatsRouter.delete('/:id',
  loggedIn,
  asyncHandler(controller.deleteFormat))

formatsRouter.put('/:id',
  loggedIn,
  asyncHandler(controller.updateFormat))

module.exports = formatsRouter
