const { Schema, model } = require('mongoose')

const ActivitySchema = new Schema({
  createBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updateBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  data: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
})

ActivitySchema.virtual('sector', {
  ref: 'Sector',
  localField: 'data.sector',
  foreignField: '_id',
  justOne: true
})

ActivitySchema.virtual('ages', {
  ref: 'User',
  localField: 'data.ages',
  foreignField: '_id',
  justOne: false
})

const Activity = model('Activity', ActivitySchema)

module.exports = Activity
