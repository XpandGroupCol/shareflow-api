const { PER_PAGE } = require('../../../config')
const Audit = require('../../../models/Audit')

const getAuditInformation = async ({ module, userId, page = 1 }) => {
  const currentPage = page < 1 ? 0 : page - 1
  const data = await Audit.find({ module, createdBy: userId }).sort([['createdAt', -1]])
    .populate({
      path: 'createdBy',
      select: 'name lastName email avatar'
    })
    .populate({
      path: 'updatedBy',
      select: 'name lastName email avatar'
    })
    .limit(PER_PAGE).skip(PER_PAGE * currentPage)
    .lean().exec()

  const total = await Audit.countDocuments({ module, createdBy: userId })

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

module.exports = getAuditInformation
