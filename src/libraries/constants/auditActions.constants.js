const auditActions = {
  create: 'NEW RECORD',
  update: 'UPDATE RECORD',
  delete: 'DELETE RECORD'
}

const modules = {
  CAMPAIGN: 'CAMPAIGN'
}

const ignoreFields = {
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
  __v: '__v',
  _id: '_id',
  endDate: 'endDate',
  startDate: 'startDate'
}

const notApply = 'N/A'

module.exports = {
  ignoreFields,
  auditActions,
  notApply,
  modules
}
