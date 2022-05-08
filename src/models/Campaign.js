const { Schema, model } = require('mongoose')
const { CAMPAING_STATUS, SEX } = require('../config')

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
  target: {
    type: Schema.Types.ObjectId,
    ref: 'Target',
    required: true
  },
  sector: {
    type: Schema.Types.ObjectId,
    ref: 'Sector',
    required: true
  },
  locations: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Location'
    }],
    required: true,
    default: []
  },
  ages: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Age'
    }],
    required: true,
    default: []
  },
  url: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
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
  },
  sex: {
    type: String,
    required: true,
    default: SEX[0]?.id
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
