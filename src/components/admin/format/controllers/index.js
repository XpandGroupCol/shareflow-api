const services = require('../services')

const getFormats = async (request, response) => {
  const data = await services.getFormats(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const createFormat = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.createFormat(request.body)
  })
}

const deleteFormat = async (request, response) => {
  const { status } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.deleteFormat({ status, id })
  })
}

const updateFormat = async (request, response) => {
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.updateFormat({ ...request.body, id })
  })
}

module.exports = { getFormats, createFormat, deleteFormat, updateFormat }
