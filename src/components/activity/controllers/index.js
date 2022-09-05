const services = require('../services')

const getActivity = async (request, response) => {
  const data = await services.getActivity(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

module.exports = {
  getActivity
}
