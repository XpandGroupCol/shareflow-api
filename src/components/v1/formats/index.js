const formatsRouter = require('express').Router()
const { getListData } = require('../../../utils')
const Format = require('../../../models/Format')

formatsRouter.get('/', async (request, response) => {
  try {
    const data = await getListData(Format, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

formatsRouter.post('/', async (request, response) => {
  try {
    const data = await Format.create(request.body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

formatsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.query
    const { status } = request.body
    const data = await Format.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

formatsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.query
    const { ...updateData } = request.body
    const location = await Format.findByIdAndUpdate(id, updateData, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

module.exports = formatsRouter
