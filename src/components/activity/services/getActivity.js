const { PER_PAGE } = require('../../../config')
const Activity = require('../../../models/Activity')

const transformPublishers = (publishers = []) => {
  return publishers.reduce((acc, current) => {
    const { label, logo, media, mimetype, formatId, publisherId, device, ...restOfData } = current

    if (label) {
      return {
        ...acc,
        [label]: { logo: logo?.name || undefined, media: media?.url || undefined, ...restOfData }
      }
    }

    return acc
  }, {})
}

const clearActivity = (campaigns) => campaigns.map(({ campaignId, createBy, updateBy, sector, ages = [], target, locations = [], type, _id, __v, createdAt, updatedAt, ...restOfData }) => ({
  campaign: `${campaignId?.name} - ${campaignId?.brand}`,
  createBy: `${createBy?.name} ${createBy?.lastName}`,
  createByAvatar: createBy?.avatar?.url,
  updateBy: `${updateBy?.name} ${updateBy?.lastName}`,
  updateByAvatar: updateBy?.avatar?.url,
  _id,
  type,
  updatedAt,
  data: {
    ...restOfData.data,
    sector: sector?.name,
    ages: ages?.length ? ages?.map(({ name }) => name).join(' - ') : undefined,
    locations: locations?.length ? locations?.map(({ city, department }) => `${city}, ${department}`).join(' - ') : undefined,
    target: target?.name,
    publishers: transformPublishers(restOfData.data?.publishers)
  }

}))

const getActivity = async ({ page, createBy }) => {
  const currentPage = page < 1 ? 0 : page - 1

  const data = await Activity.find({ createBy })
    .sort([['createdAt', -1]])
    .populate('campaignId')
    .populate('createBy')
    .populate('updateBy')
    .populate('sector')
    .populate('ages')
    .populate('target')
    .populate('locations')
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
