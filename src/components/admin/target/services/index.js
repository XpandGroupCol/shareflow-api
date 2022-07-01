const Target = require('../../../../models/Target')
const { PER_PAGE } = require('../../../../config')
const { rgx } = require('../../../../utils')

const getTartes = async ({ page = 1, search = '', category = '', status = null }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = {}

  if (search) {
    query = {
      ...query,
      name: { $regex: rgx(search), $options: 'i' }
    }
  }

  if (category) {
    query = {
      ...query, category: category
    }
  }

  if (status) {
    query = {
      ...query, status: Boolean(parseInt(status))
    }
  }

  const data = await Target.find(query)
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Target.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

const createTarget = async ({ name, category }) => {
  const data = await Target.create({ name, category })
  return data
}

const updateTarget = async ({ id, ...rest }) => {
  const data = await Target.findByIdAndUpdate(id, { ...rest }, { new: true })
  return data
}

const deleteTarget = async ({ id, status }) => {
  const data = await Target.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = {
  getTartes,
  createTarget,
  updateTarget,
  deleteTarget
}
