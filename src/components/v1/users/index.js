const userRouter = require('express').Router()
const User = require('../../../models/User')
const { rgx, perPage } = require('../../../utils')

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
      .skip(perPage * currentPage).lean()

    const total = await User.countDocuments(query)

    response.status(200).json({ statusCode: 200, data, total, page: currentPage, pages: Math.ceil(total / perPage) })
  } catch (error) {
    console.log({ error })
    response.status(400).json({
      statusCode: 400,
      error: 'bad request',
      message: 'bad request'
    })
  }
})

module.exports = userRouter
