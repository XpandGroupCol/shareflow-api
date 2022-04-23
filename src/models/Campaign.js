const { Schema, model } = require('mongoose')
const { CAMPAING_STATUS } = require('../config')

const CampaignSchema = new Schema({
  logo: {
    type: String,
    required: false
  },
  brand: {
    type: String,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  objective: {
    type: Schema.Types.ObjectId,
    ref: 'Objetive',
    required: true
  },
  sector: {
    type: Schema.Types.ObjectId,
    ref: 'Sector',
    required: true
  },
  url: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: CAMPAING_STATUS[0]?.id
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishers: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
})

CampaignSchema.set('toJSON', {
  transform: (_, campaign) => {
    campaign.id = campaign._id
    delete campaign.createdAt
    delete campaign.updatedAt
    delete campaign._id
    delete campaign.__v
  }
})

const Campaign = model('Campaign', CampaignSchema)

module.exports = Campaign
