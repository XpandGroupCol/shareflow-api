const boom = require('@hapi/boom')
const { getRandomName, getSignature } = require('../../../config/utils')
const Campaign = require('../../../models/Campaign')
const { hookUploadFile } = require('./hooks')
const { rgx, perPage } = require('../../../utils')
const { checkFormatFile } = require('../../../utils/formatFile')
const { uploadFile } = require('../../../utils/aws-upload')
const { SEX } = require('../../../config')
const Payment = require('../../../models/Payment')

const leanCampaigns = (data = []) => data.map(({ locations, ages, sex, sector, target, __v, _id, ...restOfCampaign }) => ({
  id: _id,
  locations: locations.map(({ _id, name }) => ({ id: _id, label: name })),
  ages: ages.map(({ _id, name }) => ({ id: _id, label: name })),
  sector: { id: sector?._id, label: sector?.name },
  target: { id: target?._id, label: target?.name },
  sex: SEX.find(({ id }) => id === sex) ?? null,
  ...restOfCampaign
}))

const leanById = ({ locations, ages, sex, sector, target, __v, _id, ...restOfCampaign }) => ({
  id: _id,
  locations: locations.map(({ _id, name }) => ({ id: _id, label: name })),
  ages: ages.map(({ _id, name }) => ({ id: _id, label: name })),
  sector: { id: sector?._id, label: sector?.name },
  target: { id: target?._id, label: target?.name },
  sex: SEX.find(({ id }) => id === sex) ?? null,
  ...restOfCampaign
})

const getCampaigns = async (request, response) => {
  const { page = 1, search = null, target = null, sector = null } = request.query
  const currentPage = page < 1 ? 0 : page - 1

  let query = { }

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
    .populate({
      path: 'payments',
      options: { sort: '-createdAt', limit: 1 }
    })
    .limit(perPage)
    .skip(perPage * currentPage)

  const total = await Campaign.countDocuments(query)

  response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
}

const getCampaignByUser = async (request, response) => {
  const { userId } = request

  const data = await Campaign.find({ user: userId, isDelete: false })
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')
    .populate('user')
    .populate({
      path: 'payments',
      options: { sort: '-createdAt', limit: 1 }
    }).lean().exec()

  response.status(200).json({ statusCode: 200, data: leanCampaigns(data) })
}
const getCampaignById = async (request, response) => {
  const { id } = request.params
  if (!id) throw boom.notFound()
  const data = await Campaign.findById(id)
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')
    .populate('user')
    .populate({
      path: 'payments',
      options: { sort: '-createdAt', limit: 1 }
    }).lean().exec()

  response.status(200).json({ statusCode: 200, data: leanById(data) })
}

const createCampaing = async (request, response) => {
  const { body, userId, file } = request

  if (file) {
    const logo = await uploadFile({
      fileName: getRandomName(file.fieldname),
      mimetype: file.mimetype,
      body: file.buffer
    })
    body.logo = logo
  }

  const campaign = await Campaign.create({ ...body, user: userId })

  response.status(200).json({ statusCode: 200, data: campaign })
}

const updateStatus = async (request, response) => {
  const { id } = request.params
  if (!id) throw boom.notFound()

  const { status } = request.body

  if (status === 'pending') {
    const campaign = await Campaign.findById(id).lean().exec()

    const { _id, amount, payments = [] } = campaign
    const reference = `${_id.toString().slice(0, 5)}-${Date.now().toString()}`
    const signature = await getSignature(reference, amount)
    const payment = await Payment.create({ reference, signature })
    payments.push(payment._id)
    const campaignPayment = await Campaign.findByIdAndUpdate(id, { status, payments }, { new: true })
    return response.status(200).json({
      statusCode: 200,
      data: {
        campaign: campaignPayment,
        payment: payment
      }
    })
  }

  const campaign = await Campaign.findByIdAndUpdate(id, { status }, { new: true })

  response.status(200).json({ statusCode: 200, data: campaign, payment: {} })
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
  const { body } = request
  console.log(body.data.transaction)
  console.log(body.timestamp)
  console.log(body)
  response.status(200).json({ statusCode: 200, data: true })
}

const updateCampaign = async (request, response) => {
  const { body } = request
  const { id } = request.params

  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { ...body, status: 'draft' }, { new: true })

  response.status(200).json({ statusCode: 200, data: campaign })
}

const removeCampaign = async (request, response) => {
  const { id } = request.params
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { isDelete: true }, { new: true })

  response.status(200).json({ statusCode: 200, data: campaign })
}

const downloadPDF = async (request, response) => {
  const { id } = request.params
  if (!id) throw boom.notFound()
}

module.exports = {
  getCampaigns,
  getCampaignByUser,
  getCampaignById,
  createCampaing,
  updateStatus,
  validateFormatFile,
  wompiEvent,
  updateCampaign,
  removeCampaign,
  downloadPDF
}
