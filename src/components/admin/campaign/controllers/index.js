const services = require('../services')
const { downloadResource } = require('../../../../libraries/downloadCSV')
const { fields } = require('./constants')

const getCampaigns = async (request, response) => {
  const data = await services.getCampaigns(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const download = async (request, response) => {
  const data = await services.getCampaigns(request.query)
  console.log(data.data)
  return downloadResource(response, 'campaings.csv', fields, data?.data || [])
}

module.exports = { getCampaigns, download }
