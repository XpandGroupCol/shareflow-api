const services = require('../services')

const targets = async (_, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getTargets()
  })
}
const formats = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getFormats(request.query)
  })
}
const ages = async (_, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getAges()
  })
}
const sectors = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getSectors(request.query)
  })
}

const locations = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getLocations(request.query)
  })
}

module.exports = { targets, formats, ages, sectors, locations }
