const rgx = (pattern) => new RegExp(`.*${pattern}.*`)

const IVA = 19

const getTotal = (amount) => {
  if (typeof amount !== 'number') return 0
  const iva = (IVA * amount) / 100
  return {
    iva,
    total: iva + amount
  }
}

module.exports = {
  rgx,
  getTotal
}
