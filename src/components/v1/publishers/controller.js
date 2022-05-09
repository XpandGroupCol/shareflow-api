const boom = require('@hapi/boom')
const Publisher = require('../../../models/Publisher')
const { rgx, perPage } = require('../../../utils')
const { uploadFile } = require('../../../utils/aws-upload')

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
    query = { ...query, target }
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

const createPublisher = async (request, response) => {
  let { file, body } = request

  body = JSON.parse(body?.publisher)

  if (file) {
    body.image = await uploadFile({
      fileName: `${Date.now()}-avater`,
      mimetype: file.mimetype,
      body: file.buffer
    })
  }

  const data = await Publisher.create(body)
  response.status(200).json({ statusCode: 200, data })
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
  const data = await Publisher.findById(id)
    .populate('locations')
    .populate('ageRange')
    .populate('formats.format')
    .populate('formats.target')
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
  createPublisher,
  updatePublisher,
  getPublisherById,
  deletePublisher
}
