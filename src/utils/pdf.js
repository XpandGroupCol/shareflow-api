const vfsFonts = require('pdfmake/build/vfs_fonts')
const PdfPrinter = require('pdfmake')
const { NEW_CAMPAIGN_STATUS } = require('../config')
const { format } = require('date-fns')

const Roboto = {
  normal: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
  bold: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
  italics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
  bolditalics: Buffer.from(
    vfsFonts.pdfMake.vfs['Roboto-MediumItalic.ttf'],
    'base64'
  )
}

const getFormatedNumber = (number) => number ? number?.toLocaleString() : ''

const parseDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy') : ''

const createTable = (publishers, target) => {
  return publishers.map(({ label, objectiveGoal, biddingModel, pricePerUnit, share, publisher, value }) => [
    { text: `${publisher} ${label}`, margin: [0, 8, 0, 8], fontSize: 10 },
    { text: `${target?.name || ''} ${share || 0}%`, margin: [0, 8, 0, 8], fontSize: 10 },
    { text: `${share}%`, margin: [0, 8, 0, 8], alignment: 'center', fontSize: 10 },
    { text: `$${getFormatedNumber(pricePerUnit)}, (${biddingModel})`, margin: [0, 8, 0, 8], alignment: 'center', fontSize: 10 },
    { text: `${getFormatedNumber(objectiveGoal)}`, margin: [0, 8, 0, 8], alignment: 'right', fontSize: 10 },
    { text: `$${getFormatedNumber(value)}`, margin: [0, 8, 0, 8], alignment: 'right', fontSize: 10 }
  ])
}

const image = 'data:image/jpeg;base64,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'

const getDocDefinition = ({ brand, name, orderNumber, startDate, endDate, status, summary, publishers, target, user, amount }) => ({
  content: [{
    margin: [0, 0, 0, 30],
    columns: [
      {
        image,
        width: 150
      },
      {
        alignment: 'right',
        fontSize: 10,
        text: [
          'Número de orden: ', {
            bold: true,
            text: `${orderNumber} \n`
          }, {
            fontSize: 9,
            text: `Fecha: ${parseDate(Date.now())}`
          }]
      }
    ]
  },
  {
    columns: [
      {
        fontSize: 10,
        text: [
          {
            text: [{
              bold: true,
              text: 'Campaña: '
            }, {
              text: `${name} \n`
            }
            ]
          },
          {
            text: [{
              bold: true,
              text: 'Marca: '
            }, {
              text: `${brand}\n`
            }
            ]
          },
          {
            text: [{
              bold: true,
              text: 'Periodo: '
            }, {
              text: `${parseDate(startDate)} - ${parseDate(endDate)}\n`
            }
            ]
          },
          {
            text: [
              {
                bold: true,
                text: 'Estado: '
              }, {
                text: `${NEW_CAMPAIGN_STATUS[status] || ''}\n`
              }
            ]
          }
        ]
      },
      {
        fontSize: 10,
        text: [
          {
            text: [{
              bold: true,
              text: 'Impresiones: '
            }, {
              text: `${getFormatedNumber(summary?.prints || 0)} \n`
            }]
          },
          {
            text: [{
              bold: true,
              text: 'Reproducciones: '
            }, {
              text: `${getFormatedNumber(summary?.reproductions || 0)} \n`
            }]
          },
          {
            text: [{
              bold: true,
              text: 'Clicks: '
            }, {
              text: `${getFormatedNumber(summary?.clicks || 0)} \n`
            }]
          }
        ]
      }
    ]
  },
  {
    margin: [0, 15, 0, 40],
    columns: [
      {

        text: [
          { text: 'Cliente: \n\n', bold: true, margin: [0, 0, 0, 10] },
          { text: `${user?.name} ${user?.lastName}\n`, fontSize: 10, bold: true, margin: [0, 0, 0, 10] },
          { text: `${user?.company}\n`, fontSize: 10, bold: true, margin: [0, 0, 0, 10] },
          { text: `Nit. ${user?.nit}\n`, fontSize: 10, bold: true, margin: [0, 0, 0, 10] },
          { text: `cel. ${user?.phone}\n`, fontSize: 10, bold: true, margin: [0, 0, 0, 10] }
        ]
      }
    ]
  },

  {
    bold: true,
    margin: [0, 0, 0, 15],
    text: 'Segmentación de la campaña'
  },

  {
    style: 'tableExample',
    table: {
      headerRows: 1,
      widths: ['25%', '25%', '12%', '12%', '12%', '13%'],
      body: [
        [
          { text: 'Medio', bold: true, margin: [0, 0, 0, 10] },
          { text: 'Objetivo publicitario', bold: true, margin: [0, 0, 0, 10] },
          { text: 'Share', bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
          { text: 'C/U', bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
          { text: 'KPI', bold: true, alignment: 'right', margin: [0, 0, 0, 10] },
          { text: 'Total', bold: true, alignment: 'right', margin: [0, 0, 0, 10] }
        ],
        ...createTable(publishers, target),
        ['', '', '', '', { text: 'Valor bruto a invertir:', bold: true, alignment: 'right', fontSize: 10 }, { text: `$${getFormatedNumber(summary?.grossValue)}`, alignment: 'right', fontSize: 10 }],
        ['', '', '', '', { text: 'Tarifa de servicio:', bold: true, alignment: 'right', fontSize: 10 }, { text: `$${getFormatedNumber(summary?.serviceFee)}`, alignment: 'right', fontSize: 10 }],
        ['', '', '', '', { text: 'Total:', bold: true, alignment: 'right', fontSize: 10 }, { text: `$${getFormatedNumber(amount)}`, alignment: 'right', fontSize: 10 }]
      ]
    },
    layout: 'lightHorizontalLines'
  },
  {
    fontSize: 8,
    color: 'gray',
    margin: [0, 30, 0, 0],
    alignment: 'center',
    text: 'Shareflow / Medellín - Colombia. Esta Orden no tiene válidez legal.'
  }

  ]
})

const createPdf = async (campaing) => {
  const printer = new PdfPrinter({ Roboto })
  const docDefinition = getDocDefinition(campaing)
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

module.exports = { createPdf }
