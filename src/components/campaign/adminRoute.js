const asyncHandler = require('../../middleware/asynHandler')
const { receiveSingleFile, receiveMultipleFiles } = require('../../middleware/fileManager')
const loggedIn = require('../../middleware/isAuth')
const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')
const campaignRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

campaignRouter.get('/campaigns',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getCampaigns))

campaignRouter.get('/campaigns/publishers-by-target',
  loggedIn,
  validateRequestSchema(schemas.getPublishersByTargetIdSchema, 'query'),
  asyncHandler(controllers.getPublishersByTargetId))

campaignRouter.get('/campaigns/download',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.download))

campaignRouter.get('/campaigns/pdf/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  asyncHandler(controllers.getPDF))

campaignRouter.get('/campaigns/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  asyncHandler(controllers.getCampaignById))

campaignRouter.post('/campaigns/validateFiles',
  loggedIn,
  receiveMultipleFiles,
  validateRequestSchema(schemas.validateFormatFileSchema),
  asyncHandler(controllers.validateFormatFile))

campaignRouter.post('/campaigns/remember',
  loggedIn,
  asyncHandler(controllers.rememberEmail))

campaignRouter.put('/campaigns/upload-file',
  receiveSingleFile,
  loggedIn,
  asyncHandler(controllers.uploadfile))

campaignRouter.put('/campaigns/start/:id',
  loggedIn,
  asyncHandler(controllers.startCampaign))

campaignRouter.put('/campaigns/end/:id',
  loggedIn,
  asyncHandler(controllers.endCampaign))

campaignRouter.put('/campaigns/:id',
  loggedIn,
  // validateRequestSchema(schemas.idSchema, 'params'),
  asyncHandler(controllers.updateCampaign))

campaignRouter.delete('/campaigns/:id',
  loggedIn,
  // validateRequestSchema(schemas.createCampaingSchema),
  asyncHandler(controllers.deleteCampaing))

module.exports = campaignRouter
