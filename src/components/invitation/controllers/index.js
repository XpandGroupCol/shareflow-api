const services = require('../services')
const { fields } = require('./constants')
const { downloadResource } = require('../../../libraries/downloadCSV')

const getAllInvitations = async (request, response) => {
  const data = await services.getAllInvitations(request.query)
  response.status(200).json({
    statusCode: 200,
    ...data
  })
}

const download = async (request, response) => {
  const data = await services.getAllInvitations(request.query)

  return downloadResource(response, 'invitation.csv', fields, data?.data || [])
}

const sendInvitationEmail = async (request, response) => {
  const { id } = request.body
  response.status(200).json({
    statusCode: 200,
    data: await services.sendInvitationEmail(id)
  })
}

const createInvitation = async (request, response) => {
  response.status(200).json({
    statusCode: 200,
    data: await services.createInvitation(request.body)
  })
}

module.exports = {
  getAllInvitations,
  download,
  sendInvitationEmail,
  createInvitation
}
