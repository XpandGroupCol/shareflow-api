const controller = require('./controller')
const publisherRouter = require('express').Router()
const { getPublishersByTargetIdSchema } = require('./schemas')
const loggedIn = require('../../../middleware/isAuth')
const { receiveFile } = require('../../../utils/aws-upload')
const asyncHandler = require('../../../middleware/asynHandler')
const { validateRequestSchema } = require('../../../middleware/requestSchemaHandler')

publisherRouter.get('/',
  loggedIn,
  asyncHandler(controller.getPublishers))

publisherRouter.get('/target',
  loggedIn,
  validateRequestSchema(getPublishersByTargetIdSchema, 'query'),
  asyncHandler(controller.getPublishersByTargetId)
)

publisherRouter.post('/',
  loggedIn,
  receiveFile,
  asyncHandler(controller.createPublisher))

publisherRouter.put('/:id',
  loggedIn,
  controller.updatePublisher)

publisherRouter.get('/:id',
  loggedIn,
  controller.getPublisherById)

publisherRouter.delete('/:id',
  loggedIn,
  controller.deletePublisher)

module.exports = publisherRouter
