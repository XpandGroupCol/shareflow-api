const { SEX } = require('../../../config')

const fields = [
  {
    label: 'Marca',
    value: 'brand'
  },
  {
    label: 'Campaña',
    value: 'name'
  },
  {
    label: 'Fecha inicio',
    value: 'startDate'
  },
  {
    label: 'Fecha fin',
    value: 'endDate'
  },
  {
    label: 'Objetivo',
    value: ({ target }) => target?.name || ''
  },
  {
    label: 'Sector',
    value: ({ sector }) => sector?.name || ''
  },
  {
    label: 'Ubicaciones',
    value: ({ locations }) => locations.map(({ city }) => city).join(',')
  },
  {
    label: 'Rangos de edad',
    value: ({ ages }) => ages.map(({ name }) => name).join(',')
  },
  {
    label: 'Url',
    value: 'url'
  },
  {
    label: 'Valor',
    value: 'amount'
  },
  {
    label: '% de usuario',
    value: 'userPercentage'
  },
  {
    label: 'Correo de usuario',
    value: ({ user }) => user?.email
  },
  {
    label: 'Nombre del usuario',
    value: ({ user }) => user?.name
  },
  {
    label: 'Sexo',
    value: ({ sex }) => SEX[sex] ?? ''
  }
]

module.exports = { fields }
