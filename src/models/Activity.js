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
  type: {
    type: String,
    enum: ['create', 'update', 'delete']
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

ActivitySchema.virtual('target', {
  ref: 'Target',
  localField: 'data.target',
  foreignField: '_id',
  justOne: false
})

ActivitySchema.virtual('locations', {
  ref: 'Location',
  localField: 'data.locations',
  foreignField: '_id',
  justOne: false
})

const Activity = model('Activity', ActivitySchema)

module.exports = Activity
