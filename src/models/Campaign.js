const { Schema, model } = require('mongoose')
const { NEW_CAMPAIGN_STATUS } = require('../config')

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
  userPercentage: { type: Number },
  status: {
    type: String,
    required: true,
    enum: Object.keys(NEW_CAMPAIGN_STATUS),
    default: 'draft'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishers: {
    type: [{
      formatId: { type: Schema.Types.ObjectId, ref: 'Format' },
      publisherId: { type: Schema.Types.ObjectId, ref: 'Publisher' },
      publisher: { type: String },
      objectiveGoal: { type: Number },
      pricePerUnit: { type: Number },
      biddingModel: { type: String, enum: ['CPM', 'CPC', 'CPV', 'CPA'] },
      device: { type: String, enum: ['all', 'mobile', 'desktop'] },
      label: { type: String },
      publisherCategory: { type: String, enum: ['platform', 'medium'] },
      share: { type: String },
      value: { type: Number },
      imageUrl: String,
      width: Number,
      height: Number,
      mimetype: String
    }],
    default: []
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
    clicks: { type: Number },
    prints: { type: Number },
    reproductions: { type: Number },
    platform: { type: Number },
    medium: { type: Number },
    currency: { type: String },
    discount: { type: Number },
    grossValue: { type: Number },
    serviceFee: { type: Number }
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Campaign = model('Campaign', CampaignSchema)

module.exports = Campaign
