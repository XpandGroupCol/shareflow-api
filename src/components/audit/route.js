const asyncHandler = require('../../middleware/asynHandler')
const loggedIn = require('../../middleware/isAuth')
const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')
const auditRouter = require('express').Router()

const controllers = require('./controllers')
const schemas = require('./schemas')

auditRouter.get('/audit',
  loggedIn,
  validateRequestSchema(schemas.getAuditInformation, 'query'),
  asyncHandler(controllers.getAuditInformation))

module.exports = auditRouter
