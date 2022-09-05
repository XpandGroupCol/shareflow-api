const createCampaing = require('./createCampaing')
const deleteCampaing = require('./deleteCampaing')
const getAllCampaigns = require('./getAllCampaigns')
const getCampaignById = require('./getCampaignById')
const getPublishersByTargetId = require('./getPublishersByTargetId')
const updateCampaign = require('./updateCampaign')
const uploadfile = require('./uploadfile')
const validateFormatFile = require('./validateFormatFile')
const wompiEvent = require('./wompiEvent')
const getPDF = require('./getPDF')
const campaignFlow = require('./campaignFlow')
const rememberEmail = require('./rememberEmail')
const requestImplementation = require('./requestImplementation')
const testEmails = require('./testEmails')

module.exports = {
  createCampaing,
  deleteCampaing,
  getAllCampaigns,
  getCampaignById,
  getPublishersByTargetId,
  updateCampaign,
  uploadfile,
  validateFormatFile,
  wompiEvent,
  getPDF,
  campaignFlow,
  rememberEmail,
  requestImplementation,
  testEmails
}
