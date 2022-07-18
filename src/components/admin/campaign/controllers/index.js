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

const getCampaignById = async (request, response) => {
  const { id } = request.params
  const data = await services.getCampaignById(id)
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const download = async (request, response) => {
  const data = await services.getCampaigns(request.query)
  return downloadResource(response, 'campaings.csv', fields, data?.data || [])
}

const getPublishersByTargetId = async (request, response) => {
  const { query } = request

  const data = await services.getPublishersByTargetId({ ...query, user: request.userId })
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const updateCampaign = async (request, response) => {
  const { id } = request.params
  const { body } = request
  const data = await services.updateCampaign({ id, body })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const uploadfile = async (request, response) => {
  const { file, isDelete } = request
  response.status(200).json({
    statusCode: 200,
    data: await services.uploadfile({ file, isDelete })
  })
}

module.exports = { getCampaigns, download, getCampaignById, getPublishersByTargetId, updateCampaign, uploadfile }
