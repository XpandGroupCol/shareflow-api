const { getListData } = require('../../../utils')
const Age = require('../../../models/Age')

const getAges = async (request, response) => {
  const data = await getListData(Age, request.query)
  return response.status(200).json({ statusCode: 200, ...data })
}

const createAge = async (request, response) => {
  const data = await Age.create(request.body)
  response.status(200).json({ statusCode: 200, data })
}

const deleteAge = async (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const data = await Age.findByIdAndUpdate(id, { status }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateAge = async (request, response) => {
  const { id } = request.params
  const { name } = request.body
  const location = await Age.findByIdAndUpdate(id, { name }, { new: true })
  response.status(200).json({ statusCode: 200, location })
}

module.exports = {
  getAges,
  createAge,
  deleteAge,
  updateAge
}
