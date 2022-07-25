const Campaign = require('../../../models/Campaign')

const deleteCampaing = async (id) => {
  const data = await Campaign.findByIdAndUpdate(id, { isDelete: true }, { new: true })

  return data
}

module.exports = deleteCampaing
