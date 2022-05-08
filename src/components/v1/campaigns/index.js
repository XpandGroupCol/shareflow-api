const campaignRouter = require('express').Router()
const loggedIn = require('../../../middleware/isAuth')
const Campaign = require('../../../models/Campaign')
const { rgx, perPage, defaultResponse } = require('../../../utils')
const { receiveFile, uploadFile } = require('../../../utils/aws-upload')

campaignRouter.get('/', loggedIn, async (request, response) => {
  try {
    const { page = 1, search = null, target = null, sector = null } = request.query
    const currentPage = page < 1 ? 0 : page - 1

    let query = {}

    if (search) {
      query = {
        ...query,
        $or: [
          { name: { $regex: rgx(search), $options: 'i' } },
          { brand: { $regex: rgx(search), $options: 'i' } }
        ]
      }
    }

    if (target) {
      query = { ...query, target }
    }

    if (sector) {
      query = { ...query, sector }
    }

    const data = await Campaign.find(query)
      .populate('user')
      .populate('sector')
      .populate('target')
      .populate('locations')
      .populate('ages')
      .limit(perPage)
      .skip(perPage * currentPage)

    const total = await Campaign.countDocuments(query)

    response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

campaignRouter.get('/byUser', loggedIn, async (request, response) => {
  try {
    const { userId } = request

    const data = await Campaign.find({ user: userId })
      .populate('user')
      .populate('sector')
      .populate('target')
      .populate('locations')
      .populate('ages')

    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

campaignRouter.get('/:id', loggedIn, async (request, response) => {
  try {
    const { id } = request.params
    if (!id) response.status(400).json(defaultResponse)
    const data = await Campaign.findById(id)
      .populate('user')
      .populate('sector')
      .populate('target')
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

campaignRouter.post('/', loggedIn, receiveFile, async (request, response) => {
  try {
    let { file, body, userId } = request

    body = JSON.parse(body?.campaign)

    if (file) {
      body.logo = await uploadFile({
        fileName: `${Date.now()}-logo`,
        mimetype: file.mimetype,
        body: file.buffer
      })
    }
    const campaign = await Campaign.create({ ...body, user: userId })
    response.status(200).json({ statusCode: 200, data: campaign?._id })
  } catch (error) {
    console.log({ error })
    response.status(400).json(defaultResponse)
  }
})

module.exports = campaignRouter
