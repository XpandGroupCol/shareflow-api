const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const sectorRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

sectorRouter.get('/ages',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getAges))

sectorRouter.post('/ages',
  loggedIn,
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.createAge))

sectorRouter.put('/ages/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.updateAge))

sectorRouter.delete('/ages/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.deleteSchema),
  asyncHandler(controllers.deleteAge))

module.exports = sectorRouter
