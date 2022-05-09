const locationsRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const asyncHandler = require('../../../middleware/asynHandler')
const controller = require('./controller')

locationsRouter.get('/',
  loggedIn,
  asyncHandler(controller.getLocations))

locationsRouter.post('/',
  loggedIn,
  asyncHandler(controller.createLocation))

locationsRouter.delete('/:id',
  loggedIn,
  asyncHandler(controller.deleteLocation))

locationsRouter.put('/:id',
  loggedIn,
  asyncHandler(controller.updateLocation))

module.exports = locationsRouter
