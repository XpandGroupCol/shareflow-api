const services = require('../services')

const getUsers = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getUsers(request.query)
  })
}

module.exports = { getUsers }
