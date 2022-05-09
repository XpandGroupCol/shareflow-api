const { getListData } = require('../../../utils')
const Location = require('../../../models/Location')

const getLocations = async (request, response) => {
  const data = await getListData(Location, request.query)
  return response.status(200).json({ statusCode: 200, ...data })
}

const createLocation = async (request, response) => {
  const data = await Location.create(request.body)
  response.status(200).json({ statusCode: 200, data })
}

const deleteLocation = async (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const data = await Location.findByIdAndUpdate(id, { status }, { new: true })
  response.status(200).json({ statusCode: 200, data })
}

const updateLocation = async (request, response) => {
  const { id } = request.params
  const { name } = request.body
  const location = await Location.findByIdAndUpdate(id, { name }, { new: true })
  response.status(200).json({ statusCode: 200, location })
}

module.exports = {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation
}
