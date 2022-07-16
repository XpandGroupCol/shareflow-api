const { PER_PAGE } = require('../../../../config')
const Invitation = require('../../../../models/Invitation')
const { invitationTemplate } = require('../../../../templates/invitation')
const { rgx } = require('../../../../utils')
const { sendEmail } = require('../../../../utils/aws/SES')
const boom = require('@hapi/boom')
const { setToken } = require('../../../../utils/token')

const getInvitations = async ({ page = 1, search }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = {}

  if (search) {
    query = {
      ...query,
      $or: [
        { name: { $regex: rgx(search), $options: 'i' } },
        { phone: { $regex: rgx(search), $options: 'i' } },
        { email: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  const data = await Invitation.find(query)
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Invitation.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

const createInvitation = async ({ name, email, phone }) => {
  const user = await Invitation.findOne({ email }).lean().exec()
  if (user) return true
  const data = await Invitation.create({ name, email, phone })
  return data
}

const sendInvitation = async ({ id }) => {
  const user = await Invitation.findById(id).lean().exec()

  if (!user) throw boom.badRequest('Usuario no registrado en la base de datos')

  const { email, name } = user

  const token = setToken({ email }, process.env.ACCESS_TOKEN, { expiresIn: '48h' })

  const sendEmailPayload = {
    destinationEmails: ['diegocontreras1219@gmail.com'],
    emailSubject: 'Bienvenido a Shareflow',
    text: 'Bienvenido a Shareflow',
    htmlMessage: invitationTemplate({ name, url: `${process.env.CLIENT_URL}/auth/sign-up/${token}` })
  }
  try {
    const data = await sendEmail(sendEmailPayload)
    return data
  } catch (e) {
    return false
  }
  // TODO: Aqui se debe enviar un email
}

module.exports = {
  getInvitations,
  createInvitation,
  sendInvitation
}
