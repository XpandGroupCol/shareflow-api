const { PER_PAGE } = require('../../../../config')
const Format = require('../../../../models/Format')
const { rgx } = require('../../../../utils')

const getFormats = async ({ search, page = 1, isVideo = null, status = null }) => {
  const currentPage = page < 1 ? 0 : page - 1
  let query = {}

  if (search) {
    query = {
      ...query,
      name: { $regex: rgx(search), $options: 'i' }
    }
  }

  if (isVideo) {
    query = { ...query, isVideo: Boolean(parseInt(isVideo)) }
  }

  if (status) {
    query = { ...query, status: Boolean(parseInt(status)) }
  }

  const data = await Format.find(query)
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Format.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

const createFormat = async (payload) => {
  const data = await Format.create({ ...payload })
  return data
}

const updateFormat = async ({ id, ...payload }) => {
  const data = await Format.findByIdAndUpdate(id, { ...payload }, { new: true })
  return data
}

const deleteFormat = async ({ id, status }) => {
  const data = await Format.findByIdAndUpdate(id, { status }, { new: true })
  return data
}

module.exports = { getFormats, createFormat, deleteFormat, updateFormat }
