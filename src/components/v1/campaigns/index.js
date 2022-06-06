const controller = require('./controller')
const campaignRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const asyncHandler = require('../../../middleware/asynHandler')
const { receiveMultipleFiles } = require('../../../middleware/fileManager')
const { createCampaingSchema, validateFormatFileSchema } = require('./schemas')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const { receiveFile } = require('../../../utils/aws-upload')

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

campaignRouter.post('/validateFiles',
  loggedIn,
  receiveMultipleFiles,
  validateRequestSchema(validateFormatFileSchema),
  asyncHandler(controller.validateFormatFile)
)

campaignRouter.put('/payment/:id',
  loggedIn,
  asyncHandler(controller.addPayment))

campaignRouter.put('/status/:id',
  loggedIn,
  asyncHandler(controller.updateStatus))

campaignRouter.put('/:id',
  loggedIn,
  asyncHandler(controller.updateCampaign))

campaignRouter.delete('/:id',
  loggedIn,
  asyncHandler(controller.removeCampaign))

campaignRouter.post('/wompi/event',
  asyncHandler(controller.wompiEvent))

module.exports = campaignRouter
