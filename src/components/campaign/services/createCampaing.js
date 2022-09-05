const Activity = require('../../../models/Activity')
const Campaign = require('../../../models/Campaign')
const { uploadS3File } = require('../../../utils/aws/S3')

const createCampaing = async ({ body, file, user, userName }) => {
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
  const data = await Campaign.create({ ...body, user, orderNumber: number + 1 })

  try {
    await Activity.create({ data: body, createBy: user, updateBy: user, campaignId: data?._id })
  } catch (e) {
    console.log(e)
  }

  return data
}

module.exports = createCampaing
