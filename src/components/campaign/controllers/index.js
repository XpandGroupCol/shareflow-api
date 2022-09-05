const services = require('../services')
const { downloadResource } = require('../../../libraries/downloadCSV')
const { fields } = require('./constants')
const { implementacion } = require('../../../templates/implementation')
const { campaignClosing } = require('../../../templates/campaignClosing')

const getCampaigns = async (request, response) => {
  const data = await services.getAllCampaigns(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const getAllSiteCampaigns = async (request, response) => {
  const data = await services.getAllCampaigns({ ...request.query, perPage: 9, user: request.userId })
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

const getCampaignById = async (request, response) => {
  const { id } = request.params
  const data = await services.getCampaignById(id)
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const createCampaing = async (request, response) => {
  const { body, userId: user, file, userName } = request
  const data = await services.createCampaing({ body, user, file, userName })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const download = async (request, response) => {
  const data = await services.getAllCampaigns(request.query)
  return downloadResource(response, 'campaings.csv', fields, data?.data || [])
}

const updateCampaign = async (request, response) => {
  const { id } = request.params
  const { body, userId } = request
  const data = await services.updateCampaign({ body, id, userId })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const uploadfile = async (request, response) => {
  const { file } = request
  const { name } = request.body
  const { id } = request.params

  response.status(200).json({
    statusCode: 200,
    data: await services.uploadfile({ file, name, id })
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

const deleteCampaing = async (request, response) => {
  const { id } = request.params

  const data = await services.deleteCampaing(id)
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const wompiEvent = async (request, response) => {
  const { body } = request
  const { reference, amount_in_cents: amount, id: transactionId, status, payment_method_type: paymentMethod } = body?.data?.transaction || {}

  const data = await services.wompiEvent({ reference, amount, transactionId, status, paymentMethod })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const getPDF = async (request, response) => {
  const { id } = request.params
  const data = await services.getPDF(id)
  response.setHeader('Content-disposition', 'attachment; filename=report.pdf')
  return response.type('pdf').send(data)
}

const startCampaign = async (request, response) => {
  const { id } = request.params

  const data = await services.campaignFlow({
    id,
    status: 'inProgress',
    emailSubject: 'Shareflow - Implementación de la campaña',
    text: 'Shareflow - Implementación de la campaña',
    template: implementacion
  })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const endCampaign = async (request, response) => {
  const { id } = request.params
  const data = await services.campaignFlow({
    id,
    status: 'completed',
    emailSubject: 'Shareflow - Cierre de la campaña',
    text: 'Shareflow - Cierre de la campaña',
    template: campaignClosing
  })
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const rememberEmail = async (request, response) => {
  const { id } = request.body
  const data = await services.rememberEmail(id)
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const requestImplementation = async (request, response) => {
  const { id } = request.body
  const data = await services.requestImplementation(id)
  response.status(200).json({
    statusCode: 200,
    data
  })
}

const testEmail = async (_, response) => {
  const data = await services.testEmails()
  response.status(200).json({
    statusCode: 200,
    data
  })
}

module.exports = {
  getCampaigns,
  createCampaing,
  deleteCampaing,
  download,
  getCampaignById,
  getPublishersByTargetId,
  updateCampaign,
  validateFormatFile,
  uploadfile,
  getAllSiteCampaigns,
  wompiEvent,
  getPDF,
  startCampaign,
  endCampaign,
  rememberEmail,
  requestImplementation,
  testEmail
}
