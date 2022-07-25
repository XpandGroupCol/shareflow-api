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
  asyncHandler(controllers.getAllSiteCampaigns))

campaignRouter.get('/campaigns/publishers-by-target',
  loggedIn,
  validateRequestSchema(schemas.getPublishersByTargetIdSchema, 'query'),
  asyncHandler(controllers.getPublishersByTargetId))

campaignRouter.get('/campaigns/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  asyncHandler(controllers.getCampaignById))

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

campaignRouter.put('/campaigns/upload-file/:id',
  receiveSingleFile,
  loggedIn,
  asyncHandler(controllers.uploadfile))

campaignRouter.put('/campaigns/:id',
  loggedIn,
  // validateRequestSchema(schemas.idSchema, 'params'),
  asyncHandler(controllers.updateCampaign))

campaignRouter.delete('/campaigns/:id',
  loggedIn,
  // validateRequestSchema(schemas.createCampaingSchema),
  asyncHandler(controllers.deleteCampaing))

module.exports = campaignRouter
