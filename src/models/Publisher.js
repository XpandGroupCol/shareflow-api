const { Schema, model } = require('mongoose')

const PublisherSchema = new Schema({
  logo: {
    type: String,
    required: false
  },
  publisher: {
    type: String,
    required: true,
    unique: true
  },
  miniBudget: {
    type: Number,
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
    type: String,
    enum: ['all', 'male', 'women'],
    required: true
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
    required: false
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  category: {
    type: String,
    required: true,
    enum: ['platform', 'medium']
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
        type: String,
        enum: ['CPM', 'CPC', 'CPV', 'CPA']
      },
      device: {
        type: String,
        enum: ['all', 'mobile', 'desktop']
      },
      pricePerUnit: {
        type: Number,
        required: true
      }
    }],
    required: true,
    minlength: 1,
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
