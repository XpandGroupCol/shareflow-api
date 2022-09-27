const Publisher = require('../../../models/Publisher')
const User = require('../../../models/User')

const getPublishersByTargetId = async ({ target = null, miniBudget = null, sex, ages, user: userId }) => {
  const conditions = []
  const data = []
  let query = {}

  if (target) {
    conditions.push({
      ...query,
      'formats.target': target
    })
  }

  if (sex) {
    conditions.push({
      ...query,
      sex
    })
  }

  if (ages) {
    conditions.push({
      ...query,
      ages: { $in: ages.split(',') }
    })
  }

  if (miniBudget) {
    conditions.push({
      ...query,
      miniBudget:
        { $lte: parseInt(miniBudget) }
    })
  }

  query = {
    $and: conditions
  }

  const publishers = await Publisher.find(query)
    .populate('formats.format')
    .populate('formats.target')
    .lean()
    .exec()

  const user = await User.findById(userId)

  if (publishers.length) {
    publishers.map(publisher => {
      if (publisher?.formats?.length) {
        publisher.formats.filter(({ target: t }) =>
          t._id.toString() === target
        ).map(format => {
          return data.push({
            id: `${publisher._id}-${format._id}`,
            publisherId: publisher?._id || '',
            miniBudget: publisher?.miniBudget || '',
            formatId: format?._id || '',
            logo: publisher?.logo || '',
            label: `${publisher.publisher || ''} - ${format?.format?.name || ''}`,
            width: format?.format?.width || '',
            height: format?.format?.height || '',
            mimetype: format?.format?.type || '',
            publisherCategory: publisher?.category || '',
            biddingModel: format?.biddingModel || '',
            device: format?.device || '',
            pricePerUnit: format?.pricePerUnit || '',
            targetCategories: format?.target?.category || '',
            groupBy: publisher?.publisher || '',
            isVideo: format?.isVideo || false
          })
        })
      }
      return data
    })
  }

  return { data, user }
}

module.exports = getPublishersByTargetId
