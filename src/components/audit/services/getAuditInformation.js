const { PER_PAGE } = require('../../../config')
const Audit = require('../../../models/Audit')

const getAuditInformation = async ({ module, username, page = 1 }) => {
  const currentPage = page < 1 ? 0 : page - 1
  const data = await Audit.find({ module, username }).sort([['createdAt', -1]])
    .limit(PER_PAGE).skip(PER_PAGE * currentPage).lean().exec()

  const total = await Audit.countDocuments({ module, username })

  return {
    data,
    total,
    pages: Math.ceil(total / PER_PAGE),
    page: currentPage + 1
  }
}

module.exports = getAuditInformation
