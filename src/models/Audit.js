const { Schema, model } = require('mongoose')

const auditSchema = new Schema({
  newElementId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  modifiedBy: {
    type: String,
    required: true
  },
  modifiedAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  module: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  data: {
    required: false,
    type: Array
  }
},
{
  timestamps: true
})

const Audit = model('Audit', auditSchema)

module.exports = Audit
