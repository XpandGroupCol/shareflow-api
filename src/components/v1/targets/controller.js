
const { getListData } = require('../../../utils')
const Target = require('../../../models/Target')
const { TARGET_TYPE } = require('../../../config/index')

const getTargets = async (request, response) => {
  const { data: targets, ...restOfTargtes } = await getListData(Target, request.query)

  const data = targets.map(({ category = [], ...values }) => ({
    ...values,
    category: category.map(t => TARGET_TYPE.find(({ id }) => id === t))
  }))

  return response.status(200).json({ statusCode: 200, data, ...restOfTargtes })
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
  const { name, category } = request.body
  const location = await Target.findByIdAndUpdate(id, { name, category }, { new: true })
  response.status(200).json({ statusCode: 200, location })
}

module.exports = {
  getTargets,
  createTarget,
  deleteTarget,
  updateTarget
}
