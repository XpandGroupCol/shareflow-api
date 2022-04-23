const formatsRouter = require('express').Router()
const { getListData, defaultResponse } = require('../../../utils')
const Format = require('../../../models/Format')

formatsRouter.get('/', async (request, response) => {
  try {
    const data = await getListData(Format, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json(defaultResponse)
  }
})

formatsRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body
    const data = await Format.create({ name })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

formatsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { status } = request.body
    const data = await Format.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

formatsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { name } = request.body
    const location = await Format.findByIdAndUpdate(id, { name }, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = formatsRouter
