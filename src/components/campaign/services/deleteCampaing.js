const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')

const deleteCampaing = async (id) => {
  const data = await Campaign.findByIdAndUpdate(id, { isDelete: true }, { new: true })

  try {
    await Activity.create({
      data: { isDelete: true },
      createBy: data?._user?._id,
      updateBy: data?._user?._id,
      campaignId: data?._id,
      type: 'delete'
    })
  } catch (e) {
    console.log(e)
  }

  return data
}

module.exports = deleteCampaing
