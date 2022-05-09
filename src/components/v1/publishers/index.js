const publisherRouter = require('express').Router()
const asyncHandler = require('../../../middleware/asynHandler')
const loggedIn = require('../../../middleware/isAuth')
const { receiveFile } = require('../../../utils/aws-upload')
const controller = require('./controller')

publisherRouter.get('/',
  loggedIn,
  asyncHandler(controller.getPublishers))

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
