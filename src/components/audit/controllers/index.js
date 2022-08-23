const services = require('../services')

const getAuditInformation = async (request, response) => {
  const { module, ...query } = request.query
  const { userName } = request

  const data = await services.getAuditInformation({ module, userName, query })
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

module.exports = {
  getAuditInformation
}
