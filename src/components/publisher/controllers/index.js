const { downloadResource } = require('../../../libraries/downloadCSV')
const services = require('../services')
const { fields } = require('./constants')

const getPublishers = async (request, response) => {
  const data = await services.getPublishers(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const download = async (request, response) => {
  const data = await services.getPublishers(request.query)

  return downloadResource(response, 'publishers.csv', fields, data?.data || [])
}

const createPublisher = async (request, response) => {
  const { body, file } = request
  const data = await services.createPublisher({ body, file })
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const getPublisherById = async (request, response) => {
  const { id } = request.params
  const data = await services.getPublisherById(id)
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const updatePublisher = async (request, response) => {
  const { body } = request
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.updatePublisher({ id, body })
  })
}

const uploadfile = async (request, response) => {
  const { file } = request
  const { name } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.uploadfile({ file, id, name })
  })
}

const deletePublisher = async (request, response) => {
  const { status } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.deletePublisher({ status, id })
  })
}

module.exports = {
  getPublishers,
  download,
  createPublisher,
  getPublisherById,
  updatePublisher,
  uploadfile,
  deletePublisher
}
