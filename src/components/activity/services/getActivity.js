const { PER_PAGE } = require('../../../config')
const Age = require('../../../models/Age')

const getActivity = async ({ page, createBy }) => {
  const currentPage = page < 1 ? 0 : page - 1
  const data = await Age.find({ createBy })
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).POPULlean().exec()

  return data
}

module.exports = getActivity
