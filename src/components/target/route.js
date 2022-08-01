const asyncHandler = require('../../middleware/asynHandler')
const loggedIn = require('../../middleware/isAuth')
const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')
const sectorRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

sectorRouter.get('/targets',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getTargets))

sectorRouter.get('/targets/download',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.download))

sectorRouter.post('/targets',
  loggedIn,
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.createTarget))

sectorRouter.put('/targets/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.updateTarget))

sectorRouter.delete('/targets/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.deleteSchema),
  asyncHandler(controllers.deleteTarget))

module.exports = sectorRouter
