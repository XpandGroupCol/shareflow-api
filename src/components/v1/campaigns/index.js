const controller = require('./controller')
const campaignRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const asyncHandler = require('../../../middleware/asynHandler')
const { receiveMultipleFiles } = require('../../../middleware/fileManager')
const { createCampaingSchema, validateFormatFileSchema } = require('./schemas')
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
  validateRequestSchema(createCampaingSchema),
  asyncHandler(controller.createCampaing))

campaignRouter.put('/payment/:id',
  loggedIn,
  asyncHandler(controller.addPayment))

campaignRouter.post('/validateFiles',
  loggedIn,
  receiveMultipleFiles,
  validateRequestSchema(validateFormatFileSchema),
  asyncHandler(controller.validateFormatFile)
)

campaignRouter.post('/wompi/event',
  asyncHandler(controller.wompiEvent))

campaignRouter.put('/status/:id',
  loggedIn,
  asyncHandler(controller.updateStatus))

module.exports = campaignRouter
