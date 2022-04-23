const agesRouter = require('express').Router()
const { getListData, defaultResponse } = require('../../../utils')
const Age = require('../../../models/Age')

agesRouter.get('/', async (request, response) => {
  try {
    const data = await getListData(Age, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json(defaultResponse)
  }
})

agesRouter.post('/', async (request, response) => {
  try {
    const data = await Age.create(request.body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

agesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { status } = request.body
    const data = await Age.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

agesRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { name } = request.body
    const location = await Age.findByIdAndUpdate(id, { name }, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = agesRouter
