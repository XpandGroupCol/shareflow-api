const { Schema, model } = require('mongoose')
const { SEX } = require('../config')

const PublisherSchema = new Schema({
  image: {
    type: String,
    required: false
  },
  publisher: {
    type: String,
    required: true,
    unique: true
  },
  miniBudget: {
    type: String,
    default: 0
  },
  locations: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Location'
    }],
    required: true,
    default: []
  },
  sex: {
    type: Object,
    required: true,
    default: SEX[0]
  },
  ageRange: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Age'
    }],
    required: true,
    default: []
  },
  kpi: {
    type: String,
    required: true,
    default: '?'
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  formats: {
    type: [{
      format: {
        type: Schema.Types.ObjectId,
        ref: 'Format'
      },
      target: {
        type: Schema.Types.ObjectId,
        ref: 'Target'
      },
      biddingModel: {
        type: Object
      },
      device: {
        type: Object
      },
      pricePerUnit: ''
    }],
    default: []
  }
}, { timestamps: true })

PublisherSchema.set('toJSON', {
  transform: (_, publisher) => {
    publisher.id = publisher._id
    delete publisher.createdAt
    delete publisher.updatedAt
    delete publisher._id
    delete publisher.__v
  }
})

const Publisher = model('Publisher', PublisherSchema)

module.exports = Publisher
