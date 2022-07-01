const { SEX } = require('../../../../config')

const getSex = (sex) => {
  return SEX.find(({ id }) => id === sex)?.label ?? ''
}

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
    value: ({ sex = '' } = {}) => getSex(sex)
  }
]

module.exports = { fields }
