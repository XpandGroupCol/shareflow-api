const services = require('../services')

const searchPlace = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.search(request.query)
  })
}

module.exports = {
  searchPlace
}
