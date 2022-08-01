const boom = require('@hapi/boom')
// const Campaign = require('../../../models/Campaign')

const vfsFonts = require('pdfmake/build/vfs_fonts')
const PdfPrinter = require('pdfmake')

const Roboto = {
  normal: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
  bold: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
  italics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
  bolditalics: Buffer.from(
    vfsFonts.pdfMake.vfs['Roboto-MediumItalic.ttf'],
    'base64'
  )
}

const docDefinition = {
  content: [
    { text: 'Test 222', style: 'header' },
    {
      style: 'tableExample',
      table: {
        body: [
          ['1. Hola ', '3. De cómo generar'],
          ['2. Este es un ejemplo', '4. PDFs']
        ]
      }
    },
    {
      text: 'La librería se llama pdfmake',
      style: 'subheader'
    },
    {
      text: 'Es la librería más popular para esta cuestión con JavaScript!'
    }
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10]
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    tableExample: {
      margin: [0, 5, 0, 15]
    }
  }
}

const createPdf = async () => {
  const printer = new PdfPrinter({ Roboto })
  const pdfDoc = printer.createPdfKitDocument(docDefinition)

  return new Promise((resolve, reject) => {
    try {
      const chunks = []
      pdfDoc.on('data', (chunk) => chunks.push(chunk))
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
      pdfDoc.end()
    } catch (err) {
      reject(err)
    }
  })
}

const getPDF = async (id) => {
  if (!id) throw boom.notFound()

  const binaryResult = await createPdf()
  return binaryResult
}

module.exports = getPDF
