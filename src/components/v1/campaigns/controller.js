const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const { rgx, perPage } = require('../../../utils')

const { uploadFile } = require('../../../utils/aws-upload')
const { checkFormatFile } = require('../../../utils/formatFile')
const { fileTypes } = require('../../../libraries/constants/fileTypes')

const getCampaigns = async (request, response) => {
  const { page = 1, search = null, target = null, sector = null } = request.query
  const currentPage = page < 1 ? 0 : page - 1

  let query = {}

  if (search) {
    query = {
      ...query,
      $or: [
        { name: { $regex: rgx(search), $options: 'i' } },
        { brand: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  if (target) {
    query = { ...query, target }
  }

  if (sector) {
    query = { ...query, sector }
  }

  const data = await Campaign.find(query)
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')
    .limit(perPage)
    .skip(perPage * currentPage)

  const total = await Campaign.countDocuments(query)

  response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
}

const getCampaignByUser = async (request, response) => {
  const { userId } = request

  const data = await Campaign.find({ user: userId })
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')

  response.status(200).json({ statusCode: 200, data })
}
const getCampaignById = async (request, response) => {
  const { id } = request.params
  if (!id) throw boom.notFound()
  const data = await Campaign.findById(id)
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')

  response.status(200).json({ statusCode: 200, data })
}

const createCampaing = async (request, response) => {
  const { body, userId } = request
  const { campaign, files } = body

  await Promise.all(
    files.map(async file => {
      if (file.name === fileTypes.PHOTO) {
        campaign.logo = await uploadFile({
          fileName: `${Date.now()}-${file.name}`,
          mimetype: file.mimetype,
          campaign: file.buffer
        })
      }
    })
  )

  const newCampaign = await Campaign.create({ ...campaign, status: 'draft', user: userId })

  response.status(200).json({
    statusCode: 200,
    data: {
      campaign: newCampaign?._id
    }
  })
}

const addPayment = async (request, response) => {
  const { payment } = request.body
  const { id } = request.params
  const campaign = await Campaign.findByIdAndUpdate(id, { payment, status: 'paid' }, { new: true })
  response.status(200).json({ statusCode: 200, data: campaign })
}

const updateStatus = async (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const campaign = await Campaign.findByIdAndUpdate(id, { status }, { new: true })
  response.status(200).json({ statusCode: 200, data: campaign })
}

const validateFormatFile = async (request, response) => {
  const { file } = request
  if (file) {
    const formatValidation = await checkFormatFile(file.buffer, file.type)
    if (!formatValidation) throw boom.badRequest('Invalid Format')
    else response.status(200).json({ statusCode: 200, data: 'Files validated' })
  }
  throw boom.badRequest('El archivo es requerido')
}

module.exports = {
  getCampaigns,
  getCampaignByUser,
  getCampaignById,
  createCampaing,
  updateStatus,
  addPayment,
  validateFormatFile
}
