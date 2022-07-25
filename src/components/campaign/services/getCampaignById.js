const Campaign = require('../../../models/Campaign')

const leanById = ({ ages, sex, sector, target, __v, _id, ...restOfCampaign }) => ({
  _id: _id,
  ages: ages.map(({ _id, name }) => ({ value: _id, label: name })),
  sector: { value: sector?._id, label: sector?.name },
  target: { value: target?._id, label: target?.name },
  sex,
  ...restOfCampaign
})

const getCampaignById = async (id) => {
  const data = await Campaign.findById(id)
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')
    .lean().exec()

  return leanById(data)
}

module.exports = getCampaignById
