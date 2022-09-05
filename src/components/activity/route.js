const asyncHandler = require('../../middleware/asynHandler')
const loggedIn = require('../../middleware/isAuth')
// const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')
const sectorRouter = require('express').Router()

const controllers = require('./controllers')
// const schemas = require('./schemas')

sectorRouter.get('/activity',
  loggedIn,
  // validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getActivity))

module.exports = sectorRouter
