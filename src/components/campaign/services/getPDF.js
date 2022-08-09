const boom = require('@hapi/boom')
const Campaign = require('../../../models/Campaign')
const { createPdf } = require('../../../utils/pdf')

const getPDF = async (id) => {
  if (!id) throw boom.notFound()

  const campaing = await Campaign.findById(id).populate('user')
    .populate('sector')
    .populate('target')
    .populate('locations')
    .populate('ages')
    .lean().exec()

  const binaryResult = await createPdf(campaing)
  return binaryResult
}

module.exports = getPDF
