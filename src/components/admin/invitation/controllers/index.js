const { downloadResource } = require('../../../../libraries/downloadCSV')
const services = require('../services')
const { fields } = require('./constants')

const getInvitations = async (request, response) => {
  const data = await services.getInvitations(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const createInvitation = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.createInvitation(request.body)
  })
}

const sendEmail = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.sendInvitation(request.body)
  })
}

const download = async (request, response) => {
  const data = await services.getInvitations(request.query)

  return downloadResource(response, 'invitation.csv', fields, data?.data || [])
}

module.exports = { getInvitations, createInvitation, sendEmail, download }
