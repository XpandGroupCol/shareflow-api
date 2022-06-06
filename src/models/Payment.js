const { Schema, model } = require('mongoose')

const PaymentSchema = new Schema({
  reference: {
    type: String,
    required: true,
    unique: true
  },
  transactionId: {
    type: String
  },
  amount: {
    type: Number
  },
  paymentMethod: {
    type: String
  },
  status: {
    type: String,
    enum: ['APPROVED', 'VOIDED', 'DECLINED', 'ERROR']
  }
}, {
  timestamps: true
})

const Payment = model('Payment', PaymentSchema)

module.exports = Payment
