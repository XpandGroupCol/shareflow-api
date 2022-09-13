const { PER_PAGE } = require('../../../config')
const Activity = require('../../../models/Activity')

const getActivity = async ({ page, createBy }) => {
  const currentPage = page < 1 ? 0 : page - 1

  const data = await Activity.find({ createBy })
    .populate('createBy')
    .populate('updateBy')
    .populate('sector')
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Activity.countDocuments({ createBy })

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

module.exports = getActivity
