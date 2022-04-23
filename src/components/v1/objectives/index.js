const objectivesRouter = require('express').Router()
const { getListData, defaultResponse } = require('../../../utils')
const Objetive = require('../../../models/Objetive')

objectivesRouter.get('/', async (request, response) => {
  try {
    const data = await getListData(Objetive, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json(defaultResponse)
  }
})

objectivesRouter.post('/', async (request, response) => {
  try {
    const data = await Objetive.create(request.body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

objectivesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { status } = request.body
    const data = await Objetive.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

objectivesRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { name } = request.body
    const location = await Objetive.findByIdAndUpdate(id, { name }, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = objectivesRouter
