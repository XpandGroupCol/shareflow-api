
const regex = (pattern) => new RegExp(`.*${pattern}.*`)

const leanById = ({ ages, sex, sector, target, __v, _id, ...restOfCampaign }) => ({
  _id: _id,
  ages: ages.map(({ _id, name }) => ({ value: _id, label: name })),
  sector: { value: sector?._id, label: sector?.name },
  target: { value: target?._id, label: target?.name },
  sex,
  ...restOfCampaign
})

module.exports = {
  regex,
  leanById
}
