const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const formatRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

formatRouter.get('/formats',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getFormats))

formatRouter.post('/formats',
  loggedIn,
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.createFormat))

formatRouter.put('/formats/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.updateFormat))

formatRouter.delete('/formats/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.deleteSchema),
  asyncHandler(controllers.deleteFormat))

module.exports = formatRouter
