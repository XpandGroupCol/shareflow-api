const services = require('../services')

const getAuditInformation = async (request, response) => {
  const { module, ...query } = request.query
  const { userId } = request

  const data = await services.getAuditInformation({ module, userId, query })
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

module.exports = {
  getAuditInformation
}
