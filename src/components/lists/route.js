const asyncHandler = require('../../middleware/asynHandler')
const loggedIn = require('../../middleware/isAuth')
const listRouter = require('express').Router()

const controllers = require('./controllers')

listRouter.get('/lists/targets',
  loggedIn,
  asyncHandler(controllers.targets))

listRouter.get('/lists/formats',
  loggedIn,
  asyncHandler(controllers.formats))

listRouter.get('/lists/ages',
  loggedIn,
  asyncHandler(controllers.ages))

listRouter.get('/lists/sectors',
  loggedIn,
  asyncHandler(controllers.sectors))

module.exports = listRouter
