const { PER_PAGE } = require('../../../config')
const User = require('../../../models/User')
const { rgx } = require('../../../utils')

const getUsers = async ({ search, page = 1, role, status, userId }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = { _id: { $ne: userId } }

  if (search) {
    query = {
      ...query,
      $or: [
        { email: { $regex: rgx(search), $options: 'i' } },
        { name: { $regex: rgx(search), $options: 'i' } },
        { lastName: { $regex: rgx(search), $options: 'i' } }
      ]
    }
  }

  if (status) {
    query = {
      ...query,
      status: Boolean(parseInt(status))
    }
  }

  if (role) {
    query = { ...query, role }
  }

  const data = await User.find(query)
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await User.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

module.exports = getUsers
