const sectorsRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const asyncHandler = require('../../../middleware/asynHandler')
const controller = require('./controller')

sectorsRouter.get('/',
  loggedIn,
  asyncHandler(controller.getSectors))

sectorsRouter.post('/',
  loggedIn,
  asyncHandler(controller.createSector))

sectorsRouter.delete('/:id',
  loggedIn,
  asyncHandler(controller.deleteSector))

sectorsRouter.put('/:id',
  loggedIn,
  asyncHandler(controller.updateSector))

module.exports = sectorsRouter
