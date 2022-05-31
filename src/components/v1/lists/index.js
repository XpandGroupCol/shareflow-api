
const listRouter = require('express').Router()
const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { getLists, getCampaignList } = require('./controller')

listRouter.get('/',
  loggedIn,
  asyncHandler(getLists))

listRouter.get('/campaigns',
  loggedIn,
  asyncHandler(getCampaignList))

module.exports = listRouter
