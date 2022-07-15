const services = require('../services')

const targets = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getTargets(request.body)
  })
}
const formats = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getFormats(request.body)
  })
}
const ages = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.getAges(request.body)
  })
}

module.exports = { targets, formats, ages }
