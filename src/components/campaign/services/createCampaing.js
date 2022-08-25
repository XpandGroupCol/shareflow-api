const { modules } = require('../../../libraries/constants/auditActions.constants')
const Campaign = require('../../../models/Campaign')
const { loggerCreateRecord } = require('../../../utils/audit')
const { uploadS3File } = require('../../../utils/aws/S3')

const createCampaing = async ({ body, file, user: userId, userName }) => {
  if (file) {
    const logo = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })
    body.logo = logo
  }

  const lastCampaign = await Campaign.findOne().sort([['createdAt', -1]]).limit(1)

  const number = lastCampaign?.orderNumber ?? 1
  const data = await Campaign.create({ ...body, userId, orderNumber: number + 1 })
  const dataInfo = await Campaign.findById(data._id).lean().exec()
  await loggerCreateRecord(dataInfo, userId, modules.CAMPAIGN)

  return data
}

module.exports = createCampaing
