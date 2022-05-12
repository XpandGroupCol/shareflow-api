const campaignRouter = require('express').Router()
const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')

const { receiveFile } = require('../../../utils/aws-upload')
const controller = require('./controller')

campaignRouter.get('/',
  loggedIn,
  asyncHandler(controller.getCampaigns))

campaignRouter.get('/byUser',
  loggedIn,
  asyncHandler(controller.getCampaignByUser))

campaignRouter.get('/:id',
  loggedIn,
  asyncHandler(controller.getCampaignById))

campaignRouter.post('/',
  loggedIn,
  receiveFile,
  asyncHandler(controller.createCampaing))

campaignRouter.put('/payment/:id',
  loggedIn,
  asyncHandler(controller.addPayment))

campaignRouter.put('/:id',
  loggedIn,
  asyncHandler(controller.addPublishers))

module.exports = campaignRouter
