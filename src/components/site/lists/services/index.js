const Age = require('../../../../models/Age')
const Format = require('../../../../models/Format')
const Location = require('../../../../models/Location')
const Sector = require('../../../../models/Sector')
const Target = require('../../../../models/Target')

const getLocations = async () => {
  const data = await Location.find({ status: true }).lean().exec()
  return data.map(({ city, _id }) => ({ label: city, value: _id }))
}

const getTargets = async () => {
  const data = await Target.find({ status: true }).lean().exec()
  return data.map(({ name, _id }) => ({ label: name, value: _id }))
}

const getAges = async () => {
  const data = await Age.find({ status: true }).lean().exec()
  return data.map(({ name, _id }) => ({ label: name, value: _id }))
}

const getSectors = async () => {
  const data = await Sector.find({ status: true }).lean().exec()
  return data.map(({ name, _id }) => ({ label: name, value: _id }))
}

const getFormats = async () => {
  const data = await Format.find({ status: true }).lean().exec()
  return data.map(({ name, _id }) => ({ label: name, value: _id }))
}
module.exports = {
  getLocations,
  getTargets,
  getAges,
  getSectors,
  getFormats
}
