const { Schema, model } = require('mongoose')
const { SEX, DEVICE } = require('../config')

const PublisherSchema = new Schema({
  publisher: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false
  },
  locations: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Location'
    }],
    required: true,
    default: []
  },
  formats: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Format'
    }],
    required: true
  },
  share: String,
  ageRange: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Age'
    }],
    required: true,
    default: []
  },
  sex: {
    type: Object,
    required: true,
    default: SEX[0]
  },
  pricePerUnit: {
    type: String,
    required: true
  },
  biddingModel: { // este tambien sirve para calcular
    type: String,
    required: true,
    default: '??'
  },
  miniBudget: {
    type: String,
    default: 0
  },
  kpi: {
    type: String,
    required: true,
    default: '??'
  },
  objective: {
    type: Schema.Types.ObjectId,
    ref: 'Objetive',
    required: true
  },
  device: {
    type: Object,
    required: true,
    default: DEVICE[0]
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  }
})

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
