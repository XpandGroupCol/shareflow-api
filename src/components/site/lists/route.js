const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const listRouter = require('express').Router()

const controllers = require('./controllers')

listRouter.get('/lists/locations',
  loggedIn,
  asyncHandler(controllers.locations))

listRouter.get('/lists/targets',
  loggedIn,
  asyncHandler(controllers.targets))

listRouter.get('/lists/sectors',
  loggedIn,
  asyncHandler(controllers.sectors))

listRouter.get('/lists/ages',
  loggedIn,
  asyncHandler(controllers.ages))

module.exports = listRouter
