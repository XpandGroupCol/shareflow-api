
const TARGET_TYPE = {
  clicks: 'Click',
  reproductions: 'Reproducciones',
  prints: 'Impresiones'
}

const fields = [
  {
    label: 'Nombre',
    value: 'name'
  },
  {
    label: 'Categoria',
    value: ({ category }) => category.map((id) => TARGET_TYPE[id] || '').join(',')
  }

]

module.exports = { fields }
