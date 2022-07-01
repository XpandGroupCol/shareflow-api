const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const campaignRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

campaignRouter.get('/campaigns',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getCampaigns))

module.exports = campaignRouter
