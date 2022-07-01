const services = require('../services')

const getTargets = async (request, response) => {
  const data = await services.getTartes(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const createTarget = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.createTarget(request.body)
  })
}

const deleteTarget = async (request, response) => {
  const { status } = request.body
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.deleteTarget({ status, id })
  })
}

const updateTarget = async (request, response) => {
  const { id } = request.params
  response.status(200).json({
    statusCode: 200,
    data: await services.updateTarget({ ...request.body, id })
  })
}

module.exports = { getTargets, createTarget, deleteTarget, updateTarget }
