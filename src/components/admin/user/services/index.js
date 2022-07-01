const { PER_PAGE } = require('../../../../config')
const User = require('../../../../models/User')
const { rgx } = require('../../../../utils')
const bcryptjs = require('bcryptjs')

const getUsers = async ({ search, page = 1, role, status }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = {}

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

const deleteUser = async ({ id, status }) => {
  const data = await User.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

const getProfile = async (id) => {
  const data = await User.findById(id)
  console.log(data, id)
  return data
}

const updateProfile = async ({ id, body }) => {
  const data = await User.findByIdAndUpdate(id, { ...body }, { new: true }).lean().exec()
  return data
}

const changePassword = async ({ id, password }) => {
  const newPassword = await bcryptjs.hash(password, 10)
  const data = await User.findByIdAndUpdate(id, { password: newPassword }, { new: true }).lean().exec()
  return data
}

const changeAvatar = async ({ id, avatar }) => {
  const data = await User.findByIdAndUpdate(id, { avatar }, { new: true }).lean().exec()
  return data
}

module.exports = {
  getUsers,
  deleteUser,
  getProfile,
  updateProfile,
  changeAvatar,
  changePassword
}
