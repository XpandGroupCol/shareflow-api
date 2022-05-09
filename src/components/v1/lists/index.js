
const listRouter = require('express').Router()
const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const getLists = require('./controller')

listRouter.get('/',
  loggedIn,
  asyncHandler(getLists))

module.exports = listRouter
