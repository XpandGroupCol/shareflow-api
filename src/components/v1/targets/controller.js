
const { getListData } = require('../../../utils')
const Target = require('../../../models/Target')

const getTargets = async (request, response) => {
  const data = await getListData(Target, request.query)
  return response.status(200).json({ statusCode: 200, ...data })
}

const createTarget = async (request, response) => {
  const data = await Target.create(request.body)
  response.status(200).json({ statusCode: 200, data })
}

const deleteTarget = async (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const data = await Target.findByIdAndUpdate(id, { status }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateTarget = async (request, response) => {
  const { id } = request.params
  const { name } = request.body
  const location = await Target.findByIdAndUpdate(id, { name }, { new: true })
  response.status(200).json({ statusCode: 200, location })
}

module.exports = {
  getTargets,
  createTarget,
  deleteTarget,
  updateTarget
}
