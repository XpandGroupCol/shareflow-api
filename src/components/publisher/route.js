const asyncHandler = require('../../middleware/asynHandler')
const { receiveSingleFile } = require('../../middleware/fileManager')
const loggedIn = require('../../middleware/isAuth')
const { validateRequestSchema } = require('../../middleware/requestSchemaHandler')
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

publisherRouter.get('/publishers/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  asyncHandler(controllers.getPublisherById))

publisherRouter.put('/publishers/upload-logo/:id',
  receiveSingleFile,
  loggedIn,
  asyncHandler(controllers.uploadfile))

publisherRouter.put('/publishers/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  asyncHandler(controllers.updatePublisher))

publisherRouter.post('/publishers',
  loggedIn,
  receiveSingleFile,
  // validateRequestSchema(schemas.getSchema, 'query'),
  asyncHandler(controllers.createPublisher))

publisherRouter.delete('/publishers/:id',
  loggedIn,
  validateRequestSchema(schemas.idSchema, 'params'),
  validateRequestSchema(schemas.deleteSchema),
  asyncHandler(controllers.deletePublisher))

module.exports = publisherRouter
