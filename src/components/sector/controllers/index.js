const { downloadResource } = require('../../../libraries/downloadCSV')
const services = require('../services')
const { fields } = require('./constants')

const getSectors = async (request, response) => {
  const data = await services.getSectors(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const createSector = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.createSector(request.body)
  })
}

const deleteSector = async (request, response) => {
  const { status } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.deleteSector({ status, id })
  })
}

const updateSector = async (request, response) => {
  const { name } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.updateSector({ name, id })
  })
}

const download = async (request, response) => {
  const data = await services.getSectors(request.query)

  return downloadResource(response, 'sectors.csv', fields, data?.data || [])
}

module.exports = { getSectors, createSector, deleteSector, updateSector, download }
