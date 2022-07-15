const Age = require('../../../../models/Age')
const Format = require('../../../../models/Format')
const Target = require('../../../../models/Target')

const getTargets = async () => {
  const data = await Target.find({ status: true }).lean().exec()
  return data.map(({ name, _id }) => ({ label: name, value: _id }))
}

const getAges = async () => {
  const data = await Age.find({ status: true }).lean().exec()
  return data.map(({ name, _id }) => ({ label: name, value: _id }))
}

const getFormats = async () => {
  const data = await Format.find({ status: true }).lean().exec()
  return data.map(({ name, _id }) => ({ label: name, value: _id }))
}

module.exports = {
  getFormats,
  getTargets,
  getAges
}
