const locationsRouter = require('express').Router()
const { getListData } = require('../../../utils')
const Location = require('../../../models/Location')

locationsRouter.get('/', async (request, response) => {
  try {
    const data = await getListData(Location, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

locationsRouter.post('/', async (request, response) => {
  try {
    const data = await Location.create(request.body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

locationsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.query
    const { status } = request.body
    const data = await Location.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

locationsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.query
    const { ...updateData } = request.body
    const location = await Location.findByIdAndUpdate(id, updateData, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

module.exports = locationsRouter
