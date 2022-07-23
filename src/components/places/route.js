const asyncHandler = require('../../middleware/asynHandler')
const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')
const placesRoute = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

placesRoute.post('/places',
  validateRequestSchema(schemas.searchSchema),
  asyncHandler(controllers.searchPlace))

module.exports = placesRoute
