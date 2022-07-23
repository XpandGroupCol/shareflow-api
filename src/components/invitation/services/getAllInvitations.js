const { PER_PAGE } = require('../../../config')
const Invitation = require('../../../models/Invitation')
const { rgx } = require('../../../utils')

const getAllInvitations = async ({ page = 1, search }) => {
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

module.exports = getAllInvitations
