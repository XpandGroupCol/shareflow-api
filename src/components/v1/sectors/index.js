const sectorsRouter = require('express').Router()
const { getListData, defaultResponse } = require('../../../utils')
const Sector = require('../../../models/Sector')

sectorsRouter.get('/', async (request, response) => {
  try {
    const data = await getListData(Sector, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json(defaultResponse)
  }
})

sectorsRouter.post('/', async (request, response) => {
  try {
    const data = await Sector.create(request.body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

sectorsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { status } = request.body
    const data = await Sector.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

sectorsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { name } = request.body
    const location = await Sector.findByIdAndUpdate(id, { name }, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = sectorsRouter
