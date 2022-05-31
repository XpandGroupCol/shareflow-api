const boom = require('@hapi/boom')
const { rgx, perPage } = require('../../../utils')
const Publisher = require('../../../models/Publisher')
const { uploadFile } = require('../../../utils/aws-upload')
const { SEX, BIDDING_MODEL, DEVICE, PUBLISHER_CATEGORY } = require('../../../config')

const getPublishers = async (request, response) => {
  const { page = 1, search = null, target = null, location = null } = request.query
  const currentPage = page < 1 ? 0 : page - 1

  let query = {}

  if (search) {
    query = {
      ...query,
      publisher: { $regex: rgx(search), $options: 'i' }
    }
  }

  if (target) {
    query = query = { ...query, target }
  }

  if (location) {
    query = { ...query, location }
  }

  const data = await Publisher.find(query)
    .populate('locations')
    .populate('ageRange')
    .populate('formats.format')
    .populate('formats.target')
    .limit(perPage)
    .skip(perPage * currentPage)

  const total = await Publisher.countDocuments(query)

  response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
}

const getPublishersByTargetId = async (request, response) => {
  const { page = 1, search = null, target = null, miniBudget = null } = request.query
  const currentPage = page < 1 ? 0 : page - 1
  const conditions = []
  const data = []
  let query = {}

  if (search) {
    conditions.push({
      ...query,
      publisher: { $regex: rgx(search), $options: 'i' }
    })
  }

  if (target) {
    conditions.push({
      ...query,
      'formats.target':
      { $in: target.split(',') }
    })
  }

  if (miniBudget) {
    conditions.push({
      ...query,
      miniBudget:
        { $lte: parseInt(miniBudget) }
    })
  }

  query = {
    $and: conditions
  }

  const publishers = await Publisher.find(query)
    .populate('formats.format')
    .populate('formats.target')
    .limit(perPage)
    .skip(perPage * currentPage)
    .lean()
    .exec()

  if (publishers.length) {
    publishers.map(publisher => {
      if (publisher.formats.length) {
        publisher.formats.map(format => {
          return data.push({
            id: `${publisher._id}-${format._id}`,
            publisherId: publisher._id,
            formatId: format._id,
            logo: publisher.logo || '',
            label: format.format.name || '',
            width: format.format.width,
            height: format.format.height,
            type: format.format.type || '',
            publisherCategory: publisher.category || '',
            biddingModel: format.biddingModel || '',
            device: format.device || '',
            pricePerUnit: format.pricePerUnit,
            targetCategories: format.target.category,
            groupBy: publisher.publisher || ''
          })
        })
      }
      return data
    })
  }

  const total = await Publisher.countDocuments(query)
  response.status(200).json({ statusCode: 200, data, totalRecords: data.length, totalPublishers: total, page: currentPage, pages: Math.ceil(total / perPage) })
}

const createPublisher = async (request, response) => {
  const { file, body } = request

  if (file) {
    body.logo = await uploadFile({
      fileName: `${Date.now()}-logo`,
      mimetype: file.mimetype,
      body: file.buffer
    })
  }

  return await Publisher.create(body)
}

const updatePublisher = async (request, response) => {
  const { id } = request.params
  const { body } = request
  const data = await Publisher.findByIdAndUpdate(id, body, { new: true })
    .populate('locations')
    .populate('ageRange')
    .populate('formats.format')
    .populate('formats.target')

  response.status(200).json({ statusCode: 200, data })
}

const getPublisherById = async (request, response) => {
  const { id } = request.params
  if (!id) throw boom.notFound()
  const { _id, publisher, miniBudget, locations, sex, ageRange, category, formats, logo } = await Publisher.findById(id)
    .populate('locations')
    .populate('ageRange')
    .populate('formats.format')
    .populate('formats.target')

  const data = {
    id: _id,
    publisher,
    logo,
    miniBudget,
    locations,
    sex: SEX.find(({ id }) => id === sex),
    ageRange,
    category: PUBLISHER_CATEGORY.find(({ id }) => id === category),
    formats: formats.map(({ biddingModel, device, format, target, pricePerUnit }) => ({
      format,
      target,
      pricePerUnit,
      biddingModel: BIDDING_MODEL.find(({ id }) => id === biddingModel),
      device: DEVICE.find(({ id }) => id === device)
    }))
  }

  response.status(200).json({ statusCode: 200, data })
}

const deletePublisher = async (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const data = await Publisher.findByIdAndUpdate(id, { status }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

module.exports = {
  getPublishers,
  deletePublisher,
  createPublisher,
  updatePublisher,
  getPublisherById,
  getPublishersByTargetId
}
