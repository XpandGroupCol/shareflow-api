const services = require('../services')

const getCampaigns = async (request, response) => {
  const { query } = request

  const data = await services.getCampaigns({ ...query, user: request.userId })
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const getPublishersByTargetId = async (request, response) => {
  const { query } = request

  const data = await services.getPublishersByTargetId({ ...query, user: request.userId })
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const createCampaing = async (request, response) => {
  const { body, userId: user, file } = request

  const data = await services.createCampaing({ body, user, file })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const deleteCampaing = async (request, response) => {
  const { id } = request.params

  const data = await services.deleteCampaing(id)
  response.status(200).json({
    statusCode: 200,
    data
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

const validateFormatFile = async (request, response) => {
  const { files } = request
  const conditions = request.body

  const data = await services.validateFormatFile({ files, conditions })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const updateCampaign = async (request, response) => {
  const { id } = request.params
  const { body } = request

  const data = await services.updateCampaign({ body, id })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

module.exports = {
  getCampaigns,
  getPublishersByTargetId,
  createCampaing,
  deleteCampaing,
  getCampaignById,
  validateFormatFile,
  updateCampaign
}
