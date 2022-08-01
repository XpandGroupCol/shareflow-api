
const createPublisher = require('./createPublisher')
const deletePublisher = require('./deletePublisher')
const getPublisherById = require('./getPublisherById')
const updatePublisher = require('./updatePublisher')
const uploadfile = require('./uploadfile')
const getPublishers = require('./getPublishers')

module.exports = {
  getPublishers,
  createPublisher,
  updatePublisher,
  getPublisherById,
  uploadfile,
  deletePublisher
}
