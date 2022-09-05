const { format } = require('date-fns')

const regex = (pattern) => new RegExp(`.*${pattern}.*`)

const leanById = ({ ages, sex, sector, target, __v, _id, locations, ...restOfCampaign }) => ({
  _id: _id,
  ages: ages.map(({ _id, name }) => ({ value: _id, label: name })),
  sector: { value: sector?._id, label: sector?.name },
  target: { value: target?._id, label: target?.name },
  locations: locations.map(({ city, _id, department }) => ({ label: `${city}, ${department}`, value: _id })),
  sex,
  ...restOfCampaign
})

const getFormatedNumber = (number) => number ? number?.toLocaleString() : number

const parseDate = (date, dateFormat = 'dd/MM/yyyy') => date ? format(new Date(date), dateFormat) : ''

module.exports = {
  regex,
  leanById,
  getFormatedNumber,
  parseDate
}
