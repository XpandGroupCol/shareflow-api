const locationsRouter = require('express').Router()
const { getListData, defaultResponse } = require('../../../utils')
const Location = require('../../../models/Location')
const loggedIn = require('../../../middleware/isAuth')

locationsRouter.get('/', loggedIn, async (request, response) => {
  try {
    const data = await getListData(Location, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json(defaultResponse)
  }
})

locationsRouter.post('/', loggedIn, async (request, response) => {
  try {
    const data = await Location.create(request.body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

locationsRouter.delete('/:id', loggedIn, async (request, response) => {
  try {
    const { id } = request.params
    const { status } = request.body
    const data = await Location.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

locationsRouter.put('/:id', loggedIn, async (request, response) => {
  try {
    const { id } = request.params
    const { name } = request.body
    const location = await Location.findByIdAndUpdate(id, { name }, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = locationsRouter
