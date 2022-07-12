const services = require('../services')

const getCampaigns = async (request, response) => {
  const { query } = request
  const data = await services.getCampaigns({ user: request.userId, ...query })
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

module.exports = { getCampaigns }
