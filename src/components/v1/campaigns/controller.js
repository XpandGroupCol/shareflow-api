const boom = require('@hapi/boom')
const { hookUploadFile } = require('./hooks')
const { rgx, perPage } = require('../../../utils')
const Campaign = require('../../../models/Campaign')
const { checkFormatFile } = require('../../../utils/formatFile')

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
  const { campaign } = body

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
  const { files } = request
  const conditions = request.body

  if (files.length) {
    for await (const file of files) {
      await checkFormatFile(file.buffer, file.mimetype, conditions)
    }
  }

  const filesUpload = []
  for await (const file of files) {
    const fileUpload = await hookUploadFile(file)
    filesUpload.push(fileUpload)
  }

  response.status(200).json({ statusCode: 200, data: filesUpload })
}

const wompiEvent = async (request, response) => {
  console.log({ request })
  response.status(200).json({ statusCode: 200, data: true })
}

module.exports = {
  getCampaigns,
  getCampaignByUser,
  getCampaignById,
  createCampaing,
  updateStatus,
  addPayment,
  validateFormatFile,
  wompiEvent
}
