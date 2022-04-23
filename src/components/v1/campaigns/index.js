const campaignRouter = require('express').Router()
const Campaign = require('../../../models/Campaign')
const { rgx, perPage, defaultResponse } = require('../../../utils')

campaignRouter.get('/', async (request, response) => {
  try {
    const { page = 1, search = null, objective = null, sector = null } = request.query
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

    if (objective) {
      query = { ...query, objective }
    }

    if (sector) {
      query = { ...query, sector }
    }

    const data = await Campaign.find(query)
      .populate('user')
      .populate('sector')
      .populate('objective')
      .limit(perPage)
      .skip(perPage * currentPage)

    const total = await Campaign.countDocuments(query)

    response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

campaignRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    if (!id) response.status(400).json(defaultResponse)
    const data = await Campaign.findById(id)
      .populate('user')
      .populate('sector')
      .populate('objective')
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = campaignRouter
