const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const { createPdf } = require('../../../utils/pdf')
const { leanById } = require('../../../utils/transformData')

const getPDF = async (id) => {
  if (!id) throw boom.notFound()

  const campaing = await Campaign.findById(id).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')
    .lean().exec()

  const binaryResult = await createPdf(leanById(campaing))
  return binaryResult
}

module.exports = getPDF
