const TargetRouter = require('express').Router()
const { getListData, defaultResponse } = require('../../../utils')
const Target = require('../../../models/Target')
const loggedIn = require('../../../middleware/isAuth')

TargetRouter.get('/', loggedIn, async (request, response) => {
  try {
    const data = await getListData(Target, request.query)
    return response.status(200).json({ statusCode: 200, ...data })
  } catch (error) {
    return response.status(400).json(defaultResponse)
  }
})

TargetRouter.post('/', loggedIn, async (request, response) => {
  try {
    const data = await Target.create(request.body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

TargetRouter.delete('/:id', loggedIn, async (request, response) => {
  try {
    const { id } = request.params
    const { status } = request.body
    const data = await Target.findByIdAndUpdate(id, { status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

TargetRouter.put('/:id', loggedIn, async (request, response) => {
  try {
    const { id } = request.params
    const { name } = request.body
    const location = await Target.findByIdAndUpdate(id, { name }, { new: true })
    response.status(200).json({ statusCode: 200, location })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = TargetRouter
