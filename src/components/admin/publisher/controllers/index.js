const { downloadResource } = require('../../../../libraries/downloadCSV')
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

  return downloadResource(response, 'users.csv', fields, data?.data || [])
}

module.exports = { getPublishers, download }
