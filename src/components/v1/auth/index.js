
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../../../models/User')

loginRouter.post('/admin', async (request, response) => {
  try {
    const { email, password } = request.body
    const user = await User.findOne({ email })

    if (!user ||
            !bcrypt.compareSync(password, user.password)) {
      return response.status(400).json({
        code: 400,
        message: 'bad request'

      })
    }

    response.status(200).json({
      code: 200,
      data: {
        id: user?._id,
        name: `${user?.name} ${user?.lastName}`,
        image: user?.image,
        role: user?.role
      }
    })
  } catch (e) {
    response.status(400).json({
      code: 400,
      message: 'bad request'

    })
  }
})

module.exports = loginRouter
