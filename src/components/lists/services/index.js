const Age = require('../../../models/Age')
const Format = require('../../../models/Format')
const Sector = require('../../../models/Sector')
const Target = require('../../../models/Target')
const Location = require('../../../models/Location')
const { rgx } = require('../../../utils')

const limit = 20

const clearList = ({ name, _id }) => ({ label: name, value: _id })

const getTargets = async () => {
  const data = await Target.find({ status: true }).lean().exec()
  return data.map(clearList)
}

const getAges = async () => {
  const data = await Age.find({ status: true }).lean().exec()
  return data.map(clearList)
}

const getFormats = async ({ search = '' }) => {
  let query = { status: true }
  if (search) {
    query = {
      ...query,
      name: { $regex: rgx(search), $options: 'i' }
    }
  }

  const data = await Format.find(query)
    .limit(limit).lean().exec()

  return data.map(clearList)
}

const getSectors = async () => {
  const data = await Sector.find({ status: true }).lean().exec()
  return data.map(clearList)
}

const getLocations = async ({ search = '' }) => {
  let query = { status: true }
  if (search) {
    query = {
      ...query,
      $or: [
        { city: { $regex: rgx(search), $options: 'i' } },
        { department: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  const data = await Location.find(query)
    .limit(limit).lean().exec()

  return data.map(({ city, _id, department }) => ({ label: `${city}, ${department}`, value: _id }))
}

module.exports = {
  getFormats,
  getTargets,
  getAges,
  getSectors,
  getLocations
}
