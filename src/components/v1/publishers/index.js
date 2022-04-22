const publisherRouter = require('express').Router()
const Publisher = require('../../../models/Publisher')
const { rgx, perPage } = require('../../../utils')

publisherRouter.get('/', async (request, response) => {
  try {
    const { page = 1, search = null, objective = null, location = null } = request.query
    const currentPage = page < 1 ? 0 : page - 1

    let query = {}

    if (search) {
      query = {
        ...query,
        publisher: { $regex: rgx(search), $options: 'i' }
      }
    }

    if (objective) {
      query = { ...query, objective }
    }

    if (location) {
      query = { ...query, location }
    }

    const data = await Publisher.find(query)
      .populate('locations')
      .limit(perPage)
      .skip(perPage * currentPage).lean()

    const total = await Publisher.countDocuments(query)

    response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
  } catch (error) {
    console.log({ error })
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

module.exports = publisherRouter
