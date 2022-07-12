const services = require('../services')
const { downloadResource } = require('../../../../libraries/downloadCSV')
const { fields } = require('./constants')

const getAges = async (request, response) => {
  const data = await services.getAges(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const createAge = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.createAge(request.body)
  })
}

const deleteAge = async (request, response) => {
  const { status } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.deleteAge({ status, id })
  })
}

const updateAge = async (request, response) => {
  const { name } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.updateAge({ name, id })
  })
}

const download = async (request, response) => {
  const data = await services.getAges(request.query)

  return downloadResource(response, 'ages.csv', fields, data?.data || [])
}

module.exports = { getAges, createAge, deleteAge, updateAge, download }
