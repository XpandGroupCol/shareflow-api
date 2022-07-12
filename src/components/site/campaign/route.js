const asyncHandler = require('../../../middleware/asynHandler')
const { receiveSingleFile, receiveMultipleFiles } = require('../../../middleware/fileManager')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const campaignRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

campaignRouter.get('/campaigns',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getCampaigns))

campaignRouter.get('/campaigns/:id',
  loggedIn,
  // validateRequestSchema(schemas.getSchema, 'params'),
  asyncHandler(controllers.getCampaignById))

campaignRouter.get('/campaigns/publishers-by-target',
  loggedIn,
  validateRequestSchema(schemas.getPublishersByTargetIdSchema, 'query'),
  asyncHandler(controllers.getPublishersByTargetId))

campaignRouter.post('/campaigns',
  loggedIn,
  receiveSingleFile,
  validateRequestSchema(schemas.createCampaingSchema),
  asyncHandler(controllers.createCampaing))

campaignRouter.post('/campaigns/validateFiles',
  loggedIn,
  receiveMultipleFiles,
  validateRequestSchema(schemas.validateFormatFileSchema),
  asyncHandler(controllers.validateFormatFile))

campaignRouter.delete('/campaigns/:id',
  loggedIn,
  // validateRequestSchema(schemas.createCampaingSchema),
  asyncHandler(controllers.deleteCampaing))

campaignRouter.put('/campaigns/:id',
  loggedIn,
  // validateRequestSchema(schemas.createCampaingSchema),
  asyncHandler(controllers.updateCampaign))

module.exports = campaignRouter