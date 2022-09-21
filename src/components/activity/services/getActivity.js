const { PER_PAGE } = require('../../../config')
const Activity = require('../../../models/Activity')

const clearActivity = (campaigns) => campaigns.map(({ campaignId, createBy, updateBy, ...restOfdata }) => ({
  campaign: `${campaignId?.name} - ${campaignId?.brand}`,
  createBy: `${createBy?.name} ${createBy?.lastName}`,
  updateBy: `${updateBy?.name} ${updateBy?.lastName}`,
  ...restOfdata
}))

const getActivity = async ({ page, createBy }) => {
  const currentPage = page < 1 ? 0 : page - 1

  const data = await Activity.find({ createBy })
    .sort([['createdAt', -1]])
    .populate('campaignId')
    .populate('createBy')
    .populate('updateBy')
    .populate('sector')
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Activity.countDocuments({ createBy })

  return {
    data: clearActivity(data),
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

module.exports = getActivity
