const services = require('../services')

const getCampaigns = async (request, response) => {
  const data = await services.getCampaigns(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

module.exports = { getCampaigns }
