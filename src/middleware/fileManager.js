const multer = require('multer')
const boom = require('@hapi/boom')
const { mimeTypesVideo } = require('../libraries/constants/fileTypes.constants')

const availablesFileMimeTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf'
]

const availableFileMimeTypesAddToShipment = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'image/tiff',
  ...Object.values(mimeTypesVideo)
]

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter (req, file, next) {
    const isAvailable = availablesFileMimeTypes.includes(file.mimetype)

    if (!isAvailable) {
      next(boom.badRequest('The file type is not an available type'))
    } else {
      next(null, true)
    }
  }
}

const multerOptionsMultipleFiles = {
  storage: multer.memoryStorage(),
  fileFilter (req, file, next) {
    const isAvailable = availableFileMimeTypesAddToShipment.includes(
      file.mimetype
    )

    if (!isAvailable) {
      next(boom.badRequest('The file type is not an available type'))
    } else {
      next(null, true)
    }
  }
}

const receiveFile = multer(multerOptions).single('file')
const receiveMultipleFiles = multer(multerOptionsMultipleFiles).any()
module.exports = { receiveFile, receiveMultipleFiles }
