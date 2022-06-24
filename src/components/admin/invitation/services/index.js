const { PER_PAGE } = require('../../../../config')
const Invitation = require('../../../../models/Invitation')
const { rgx } = require('../../../../utils')

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

const sendEmail = async ({ email }) => {
  // TODO: Aqui se debe enviar un email
  return true
}

module.exports = {
  getInvitations,
  createInvitation,
  sendEmail
}
