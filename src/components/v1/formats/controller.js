const { getListData } = require('../../../utils')
const Format = require('../../../models/Format')

const getFormats = async (request, response) => {
  const data = await getListData(Format, request.query)
  return response.status(200).json({ statusCode: 200, ...data })
}

const createFormat = async (request, response) => {
  const { name } = request.body
  const data = await Format.create({ name })
  response.status(200).json({ statusCode: 200, data })
}

const getFormatById = async (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const data = await Format.findByIdAndUpdate(id, { status }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateFormat = async (request, response) => {
  const { id } = request.params
  const { name } = request.body
  const location = await Format.findByIdAndUpdate(id, { name }, { new: true })
  response.status(200).json({ statusCode: 200, location })
}

module.exports = {
  getFormats,
  createFormat,
  getFormatById,
  updateFormat
}
