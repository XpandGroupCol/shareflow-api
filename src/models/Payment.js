const { Schema, model } = require('mongoose')

const PaymentSchema = new Schema({
  amount: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign'
  }
}, {
  timestamps: true
})

const Payment = model('Payment', PaymentSchema)

module.exports = Payment
