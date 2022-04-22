const { Schema, model } = require('mongoose')

const PublisherSchema = new Schema({
  publisher: {
    type: String,
    required: true,
    unique: true
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
    default: {}
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
    default: {}
  }
})

const Publisher = model('Publisher', PublisherSchema)

module.exports = Publisher
