const Campaign = require('../../../models/Campaign')
const { uploadS3File } = require('../../../utils/aws-upload')

const createCampaing = async ({ body, file, user }) => {
  if (file) {
    const logo = await uploadS3File({
      fileName: file.originalname,
      mimetype: file.mimetype,
      body: file.buffer
    })
    body.logo = logo
  }

  const lastCampaign = await Campaign.findOne().sort([['createdAt', -1]]).limit(1)

  const orderNumber = lastCampaign?.orderNumber ?? 1

  const data = await Campaign.create({ ...body, user, orderNumber })

  return data
}

module.exports = createCampaing
