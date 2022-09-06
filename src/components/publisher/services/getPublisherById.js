const Publisher = require('../../../models/Publisher')
const boom = require('@hapi/boom')

const clearPublishers = ({ _id, sex, ageRange, category, publisher, formats, logo, miniBudget, locations }) => ({
  _id: _id,
  publisher,
  logo,
  miniBudget,
  sex,
  locations: locations.map(({ city, _id, department }) => ({ label: `${city}, ${department}`, value: _id })),
  ageRange: ageRange.map(({ _id, name }) => ({ value: _id, label: name })),
  category,
  formats: formats.map(({ format, target, pricePerUnit, biddingModel, device }) => ({
    biddingModel,
    device,
    format: { label: format?.name, value: format?._id },
    target: { label: target?.name, value: target?._id },
    pricePerUnit
  }))

})

const getPublisherById = async (id) => {
  const data = await Publisher.findById(id).populate('ageRange')
    .populate('formats.format')
    .populate('formats.target')
    .populate('locations')
    .lean().exec()
  if (!data) throw boom.badRequest('Usuario no encontrado')
  return clearPublishers(data)
}

module.exports = getPublisherById
