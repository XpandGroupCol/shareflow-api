const Age = require('../../../models/Age')

const createAge = async ({ name }) => {
  const data = await Age.create({ name })
  return data
}

module.exports = createAge
