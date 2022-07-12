const services = require('../services')

const createInvitation = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.createInvitation(request.body)
  })
}

module.exports = { createInvitation }
