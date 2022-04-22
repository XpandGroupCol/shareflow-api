const objectivesRouter = require('express').Router()
const { getListData } = require('../../../utils')
const Objetive = require('../../../models/Objetive')

objectivesRouter.get('/', async (request, response) => {
  try {
    const data = await getListData(Objetive, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

objectivesRouter.post('/', async (request, response) => {
  try {
    const data = await Objetive.create(request.body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

objectivesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.query
    const { status } = request.body
    const data = await Objetive.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

objectivesRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.query
    const { ...updateData } = request.body
    const location = await Objetive.findByIdAndUpdate(id, updateData, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

module.exports = objectivesRouter
