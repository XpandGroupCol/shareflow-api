const { PER_PAGE } = require('../../../../config')
const Publisher = require('../../../../models/Publisher')
const { rgx } = require('../../../../utils')
const { uploadS3File } = require('../../../../utils/aws-upload')
const boom = require('@hapi/boom')

const clearPublishers = ({ _id, sex, ageRange, category, publisher, formats, logo, miniBudget }) => ({
  _id: _id,
  publisher,
  logo,
  miniBudget,
  sex,
  ageRange: ageRange.map(({ _id, name }) => ({ value: _id, label: name })),
  category,
  formats: formats.map(({ format, target, pricePerUnit, biddingModel, device }) => ({
    biddingModel,
    device,
    format: { label: format?.name, value: format?._id },
    target: { label: target?.name, value: target?._id },
    pricePerUnit
  }))

})
const getPublishers = async ({ search, page = 1, target, status, category }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = {}

  if (search) {
    query = {
      ...query,
      publisher: { $regex: rgx(search), $options: 'i' }
    }
  }

  if (target) {
    query = { ...query, formats: { $elemMatch: { target: target } } }
  }

  if (category) {
    query = { ...query, category }
  }

  if (status) {
    query = { ...query, status }
  }

  const data = await Publisher.find(query)
    .populate('ageRange')
    .populate('formats.format')
    .populate('formats.target')
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Publisher.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

const createPublisher = async ({ file, body }) => {
  if (file) {
    const logo = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })
    body.logo = logo
  }

  const data = await Publisher.create({ ...body })
  return data
}

const updatePublisher = async ({ id, body }) => {
  const data = await Publisher.findByIdAndUpdate(id, { ...body }, { new: true }).lean().exec()
  return data
}

const getPublisherById = async (id) => {
  const data = await Publisher.findById(id).populate('ageRange')
    .populate('formats.format')
    .populate('formats.target')
    .lean().exec()
  if (!data) throw boom.badRequest('Usuario no encontrado')
  return clearPublishers(data)
}

const uploadfile = async ({ file, isDelete }) => {
  if (isDelete) {
    // se debe eliminar
  }

  if (file) {
    const avatar = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })

    return avatar
  }
  return null
}

const deletePublisher = async ({ id, status }) => {
  const data = await Publisher.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = {
  getPublishers,
  createPublisher,
  updatePublisher,
  getPublisherById,
  uploadfile,
  deletePublisher
}
