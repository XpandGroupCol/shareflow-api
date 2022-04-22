const { Schema, model } = require('mongoose')

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
  draft: {
    type: Boolean,
    required: false,
    default: false
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

const Campaign = model('Campaign', CampaignSchema)

module.exports = Campaign
