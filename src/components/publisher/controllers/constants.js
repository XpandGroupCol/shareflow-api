const { SEX } = require('../../../config')

const fields = [
  {
    label: 'publisher',
    value: 'publisher'
  },
  {
    label: 'Categoria',
    value: 'category'
  },
  {
    label: 'Inversion minima',
    value: 'miniBudget'
  },
  {
    label: 'Rango de edades',
    value: ({ ageRange = [] } = {}) => ageRange.map(({ name }) => name).join(' / ')
  },
  {
    label: 'Sexo',
    value: ({ sex = '' } = {}) => SEX[sex] ?? ''
  }
]

module.exports = { fields }
