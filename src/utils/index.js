const rgx = (pattern) => new RegExp(`.*${pattern}.*`)

const PER_PAGE = 10
const getListData = async (model, { page = 1, search = null } = {}) => {
  const currentPage = page < 1 ? 0 : page - 1

  const query = search ? { name: { $regex: rgx(search), $options: 'i' } } : {}

  const data = await model.find(query).limit(PER_PAGE)
    .skip(PER_PAGE * currentPage).lean()

  const total = await model.countDocuments(query)

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    currentPage
  }
}

const defaultResponse = {
  statusCode: 400,
  error: 'bad request',
  message: 'bad request'
}

module.exports = {
  rgx,
  getListData,
  perPage: PER_PAGE,
  defaultResponse
}
