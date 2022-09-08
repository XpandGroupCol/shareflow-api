const dayjs = require('dayjs')
const regex = (pattern) => new RegExp(`.*${pattern}.*`)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const leanById = ({ ages, sex, sector, target, __v, _id, locations, ...restOfCampaign }) => ({
  _id: _id,
  ages: ages.map(({ _id, name }) => ({ value: _id, label: name })),
  sector: { value: sector?._id, label: sector?.name },
  target: { value: target?._id, label: target?.name },
  locations: locations.map(({ city, _id, department }) => ({ label: `${city}, ${department}`, value: _id })),
  sex,
  ...restOfCampaign
})

const getKPI = (data = []) => data.reduce((acc, { objectiveGoal = 0 }) => acc + objectiveGoal, 0)

const getFormatedNumber = (number) => number ? number?.toLocaleString() : number

const parseDate = (date, dateFormat = 'DD/MM/YYYY') => date ? dayjs(new Date(date)).format(dateFormat) : ''

const parseUTCDate = (date, dateFormat = 'DD/MM/YYYY') => date ? dayjs(new Date(date)).utc().format(dateFormat) : ''

const clearPhone = (phone) => phone.replace('+', '')

module.exports = {
  regex,
  leanById,
  getFormatedNumber,
  parseDate,
  parseUTCDate,
  getKPI,
  clearPhone
}
