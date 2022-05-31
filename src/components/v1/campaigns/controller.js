const boom = require('@hapi/boom')
const { rgx, perPage } = require('../../../utils')
const Campaign = require('../../../models/Campaign')
const { CAMPAING_STATUS } = require('../../../config')
const { uploadFile } = require('../../../utils/aws-upload')
const { createPublisher } = require('../publishers/controller')
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
  const { campaign, files, publisher } = body

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

  const dataPublisher = {
    body: publisher
  }
  const newCampaign = await Campaign.create({ ...campaign, user: userId })
  const newPublisher = await createPublisher(dataPublisher)
  response.status(200).json({
    statusCode: 200,
    data: {
      campaign: newCampaign?._id,
      publisher: newPublisher?._id
    }
  })
}

const addPublishers = async (request, response) => {
  const { publishers } = request.body
  const { id } = request.params
  const campaign = await Campaign.findByIdAndUpdate(id, { publishers, status: CAMPAING_STATUS[1]?.id }, { new: true })
  response.status(200).json({ statusCode: 200, data: campaign })
}

const addPayment = async (request, response) => {
  const { payment } = request.body
  console.log({ payment }, request.body)
  const { id } = request.params
  const campaign = await Campaign.findByIdAndUpdate(id, { payment, status: CAMPAING_STATUS[2]?.id }, { new: true })
  response.status(200).json({ statusCode: 200, data: campaign })
}

const validateFormatFile = async (request, response) => {
  const { files } = request.body
  if (files.length) {
    await Promise.all(
      files.map(async file => {
        const formatValidation = await checkFormatFile(file.buffer, file.type)
        if (formatValidation < 1) throw boom.badRequest('Invalid Format')
        else response.status(200).json({ statusCode: 200, data: 'Files validated' })
      })
    )
  }
}

module.exports = {
  getCampaigns,
  getCampaignByUser,
  getCampaignById,
  createCampaing,
  addPublishers,
  addPayment,
  validateFormatFile
}
