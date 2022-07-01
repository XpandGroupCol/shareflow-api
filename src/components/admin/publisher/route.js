const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const publisherRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

publisherRouter.get('/publishers',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getPublishers))

publisherRouter.get('/publishers/download',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.download))

module.exports = publisherRouter
