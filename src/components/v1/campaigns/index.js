const controller = require('./controller')
const campaignRouter = require('express').Router()
const { createCampaingSchema } = require('./schemas')
const loggedIn = require('../../../middleware/isAuth')
const { receiveFile } = require('../../../utils/aws-upload')
const asyncHandler = require('../../../middleware/asynHandler')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')

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
  validateRequestSchema(createCampaingSchema),
  asyncHandler(controller.createCampaing))

campaignRouter.put('/payment/:id',
  loggedIn,
  asyncHandler(controller.addPayment))

campaignRouter.post('/validateFiles',
  loggedIn,
  // validateRequestSchema(createCampaingSchema),
  receiveFile,
  asyncHandler(controller.validateFormatFile)
)

campaignRouter.put('/status/:id',
  loggedIn,
  asyncHandler(controller.updateStatus))

module.exports = campaignRouter
