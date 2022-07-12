const services = require('../services')

const locations = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getLocations(request.body)
  })
}
const targets = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getTargets(request.body)
  })
}
const sectors = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getSectors(request.body)
  })
}
const ages = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getAges(request.body)
  })
}

module.exports = { locations, targets, sectors, ages }
