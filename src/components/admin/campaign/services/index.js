const boom = require('@hapi/boom')
const { PER_PAGE } = require('../../../../config')
const Campaign = require('../../../../models/Campaign')
const Publisher = require('../../../../models/Publisher')
const User = require('../../../../models/User')
const { rgx } = require('../../../../utils')
const { uploadS3File } = require('../../../../utils/aws-upload')

const leanById = ({ ages, sex, sector, target, __v, _id, ...restOfCampaign }) => ({
  _id: _id,
  ages: ages.map(({ _id, name }) => ({ value: _id, label: name })),
  sector: { value: sector?._id, label: sector?.name },
  target: { value: target?._id, label: target?.name },
  sex,
  ...restOfCampaign
})

const getCampaigns = async ({ search, page = 1, target, sector, status }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = { isDelete: false }

  if (search) {
    query = {
      ...query,
      $or: [
        { brand: { $regex: rgx(search), $options: 'i' } },
        { name: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  if (target) {
    query = { ...query, target }
  }

  if (sector) {
    query = { ...query, sector }
  }

  if (status) {
    query = { ...query, status }
  }

  const data = await Campaign.find(query)
    .populate('user')
    .populate('sector')
    .populate('target')
    .populate('ages')
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Campaign.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

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

const getPublishersByTargetId = async ({ target = null, miniBudget = null, user: userId }) => {
  const conditions = []
  const data = []
  let query = {}

  if (target) {
    conditions.push({
      ...query,
      'formats.target':
      { $in: target.split(',') }
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
      if (publisher.formats.length) {
        publisher.formats.filter(({ target: t }) =>
          t._id.toString() === target
        ).map(format => {
          return data.push({
            id: `${publisher._id}-${format._id}`,
            publisherId: publisher._id,
            formatId: format._id,
            logo: publisher.logo || '',
            label: format.format.name || '',
            width: format.format.width,
            height: format.format.height,
            mimetype: format.format.type || '',
            publisherCategory: publisher.category || '',
            biddingModel: format.biddingModel || '',
            device: format.device || '',
            pricePerUnit: format.pricePerUnit,
            targetCategories: format.target.category,
            groupBy: publisher.publisher || ''
          })
        })
      }
      return data
    })
  }

  return { data, user }
}

const updateCampaign = async ({ id, body }) => {
  if (!id) throw boom.notFound()

  const campaign = await Campaign.findByIdAndUpdate(id, { ...body }, { new: true })

  return campaign
}

const uploadfile = async ({ file, isDelete }) => {
  if (isDelete) {
    // se debe eliminar
  }

  if (file) {
    const avatar = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })

    return avatar
  }
  return null
}

module.exports = { getCampaigns, getCampaignById, getPublishersByTargetId, updateCampaign, uploadfile }
