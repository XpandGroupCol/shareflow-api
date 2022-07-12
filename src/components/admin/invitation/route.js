const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')
const invitationRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

invitationRouter.get('/invitation',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.getInvitations))

invitationRouter.get('/invitation/download',
  loggedIn,
  validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.download))

invitationRouter.post('/invitation',
  loggedIn,
  validateRequestSchema(schemas.createSchema),
  asyncHandler(controllers.createInvitation))

invitationRouter.post('/invitation/send-email',
  loggedIn,
  validateRequestSchema(schemas.sendEmailSchema),
  asyncHandler(controllers.sendEmail))

module.exports = invitationRouter
