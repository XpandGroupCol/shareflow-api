const { getListData } = require('../../../utils')
const Format = require('../../../models/Format')
const { MEDIA_FORMATS } = require('../../../config')

const getFormats = async (request, response) => {
  const { data: formats, ...restOfData } = await getListData(Format, request.query)
  const data = formats.map(({ type, ...values }) => ({ ...values, type: MEDIA_FORMATS.find(({ id }) => id === type) }))
  return response.status(200).json({ ...restOfData, statusCode: 200, data })
}

const createFormat = async (request, response) => {
  const data = await Format.create({ ...request.body })
  response.status(200).json({ statusCode: 200, data })
}

const deleteFormat = async (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const data = await Format.findByIdAndUpdate(id, { status }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateFormat = async (request, response) => {
  const { id } = request.params
  const { name, type, isVideo, status, width, height } = request.body
  const location = await Format.findByIdAndUpdate(id, { name, type, isVideo, status, width, height }, { new: true })
  response.status(200).json({ statusCode: 200, location })
}

module.exports = {
  getFormats,
  createFormat,
  deleteFormat,
  updateFormat
}
