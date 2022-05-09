const { getListData } = require('../../../utils')
const Sector = require('../../../models/Sector')

const getSectors = async (request, response) => {
  const data = await getListData(Sector, request.query)
  return response.status(200).json({ statusCode: 200, ...data })
}

const createSector = async (request, response) => {
  const data = await Sector.create(request.body)
  response.status(200).json({ statusCode: 200, data })
}

const deleteSector = async (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const data = await Sector.findByIdAndUpdate(id, { status }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateSector = async (request, response) => {
  const { id } = request.params
  const { name } = request.body
  const location = await Sector.findByIdAndUpdate(id, { name }, { new: true })
  response.status(200).json({ statusCode: 200, location })
}

module.exports = {
  getSectors,
  createSector,
  deleteSector,
  updateSector
}
