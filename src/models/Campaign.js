const { Schema, model } = require('mongoose')
const { CAMPAING_STATUS_LIST } = require('../config')

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
    enum: CAMPAING_STATUS_LIST,
    default: 'draft'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishers: {
    type: Array,
    default: [{
      formatId: { type: Schema.Types.ObjectId, ref: 'Format' },
      publisherId: { type: Schema.Types.ObjectId, ref: 'Publisher' },
      objectiveGoal: { type: Number, default: 0 },
      pricePerUnit: { type: Number, default: 0 },
      biddingModel: { Type: String, enum: ['CPM', 'CPC', 'CPV', 'CPA'] },
      device: { Type: String, enum: ['all', 'male', 'women'] },
      label: { Type: String },
      publisherCategory: { Type: String, enum: ['platform', 'medium'] },
      share: { type: String },
      media: {
        url: String,
        width: Number,
        height: Number,
        type: String
      }
    }]
  },
  sex: {
    type: String,
    required: true,
    enum: ['all', 'male', 'women'],
    default: 'all'
  },
  payments: {
    type: [Schema.Types.ObjectId],
    ref: 'Payment'
  },
  summary: {
    clicks: { Type: Number, default: 0 },
    prints: { Type: Number, default: 0 },
    reproductions: { Type: Number, default: 0 },
    userPercentage: { Type: Number },
    platform: { Type: Number, default: 0 },
    medium: { Type: Number, default: 0 },
    currency: { Type: String },
    discount: { Type: Number, default: 0 },
    grossValue: { Type: Number, default: 0 },
    serviceFee: { Type: Number, default: 0 }
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
