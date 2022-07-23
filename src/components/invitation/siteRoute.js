const asyncHandler = require('../../middleware/asynHandler')
const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')

const invitationRouter = require('express').Router()
const controllers = require('./controllers')
const schemas = require('./schemas')

invitationRouter.post('/invitation',
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.createInvitation))

module.exports = invitationRouter
