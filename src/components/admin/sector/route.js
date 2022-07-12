const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const sectorRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

sectorRouter.get('/sectors',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getSectors))

sectorRouter.get('/sectors/download',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.download))

sectorRouter.post('/sectors',
  loggedIn,
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.createSector))

sectorRouter.put('/sectors/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.updateSector))

sectorRouter.delete('/sectors/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.deleteSchema),
  asyncHandler(controllers.deleteSector))

module.exports = sectorRouter
