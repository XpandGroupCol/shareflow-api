const userRouter = require('express').Router()
const { STATUS } = require('../../../config')
const User = require('../../../models/User')
const { rgx, perPage, defaultResponse } = require('../../../utils')

const extractToBody = ({
  company,
  email,
  lastName,
  name,
  nit,
  phone,
  role

}) => ({
  company,
  email,
  lastName,
  name,
  nit,
  phone,
  role
})

userRouter.get('/', async (request, response) => {
  try {
    const { page = 1, search = null, role = null, status = null } = request.query
    const currentPage = page < 1 ? 0 : page - 1

    let query = {}

    if (search) {
      query = {
        ...query,
        $or: [
          { name: { $regex: rgx(search), $options: 'i' } },
          { email: { $regex: rgx(search), $options: 'i' } }
        ]
      }
    }

    if (role) {
      query = { ...query, role }
    }

    if (status) {
      query = { ...query, status }
    }

    const data = await User.find(query)
      .limit(perPage)
      .skip(perPage * currentPage)

    const total = await User.countDocuments(query)

    response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

userRouter.post('/', async (request, response) => {
  try {
    const body = extractToBody(request.body)
    const data = await User.create(body)
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

userRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { role, status } = request.body

    console.log({ id, role, status })

    const data = await User.findByIdAndUpdate(id, { role, status }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

userRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const data = await User.findByIdAndUpdate(id, { status: STATUS[1].id }, { new: true })
    response.status(200).json({ statusCode: 200, data })
  } catch (error) {
    response.status(400).json(defaultResponse)
  }
})

module.exports = userRouter
