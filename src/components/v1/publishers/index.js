const publisherRouter = require('express').Router()
const Publisher = require('../../../models/Publisher')
const { rgx, perPage, defaultResponse } = require('../../../utils')

const extractToBody = ({
  ageRange,
  device,
  formats,
  locations,
  miniBudget,
  objective,
  pricePerUnit,
  publisher,
  sex
}) => ({
  ageRange,
  device,
  formats,
  locations,
  miniBudget,
  objective,
  pricePerUnit,
  publisher,
  sex
})

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
      .populate('ageRange')
      .populate('formats')
      .populate('objective')
      .limit(perPage)
      .skip(perPage * currentPage)

    const total = await Publisher.countDocuments(query)

    response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

publisherRouter.post('/', async (request, response) => {
  try {
    const body = extractToBody(request.body)
    const data = await Publisher.create(body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

publisherRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const body = extractToBody(request.body)
    const data = await Publisher.findByIdAndUpdate(id, body, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

publisherRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    if (!id) response.status(400).json(defaultResponse)
    const data = await Publisher.findById(id)
      .populate('locations')
      .populate('ageRange')
      .populate('formats')
      .populate('objective')
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

publisherRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { status } = request.body
    const data = await Publisher.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = publisherRouter
