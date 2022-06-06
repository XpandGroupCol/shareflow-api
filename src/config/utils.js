const { Crypto } = require('@peculiar/webcrypto')

const getRandomName = (name) => `${Date.now().toString()}-${name}}`

const getSignature = async (reference, amount, currency = 'COP') => {
  const cadenaConcatenada = `${reference}${amount}00${currency}${process.env.WOMPI_INTEGRITY}`
  // Ejemplo

  console.log(reference, amount, currency, process.env.WOMPI_INTEGRITY)

  const crypto = new Crypto()

  const encondedText = new TextEncoder().encode(cadenaConcatenada)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

module.exports = {
  getRandomName,
  getSignature
}
