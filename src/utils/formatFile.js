const fs = require('fs')
const sharp = require('sharp')
const boom = require('@hapi/boom')
const ffmpeg = require('fluent-ffmpeg')
const ffprobe = require('ffprobe-static')
const { mimeTypesVideo } = require('../libraries/constants/fileTypes.constants')
const {
  errorGetDimensionsResponse,
  errorInvalidDimensionsResponse,
  errorGetImageMetadataResponse
} = require('../libraries/constants/errorMessages.constants')
ffmpeg.setFfprobePath(ffprobe.path)

const checkFormatFile = async (buffer, type, conditions) => {
  if (Object.values(mimeTypesVideo).includes(type)) {
    await validateVideo(buffer, conditions)
  } else {
    await validateImage(buffer, conditions)
  }

  return true
}

const validateImage = async (buffer, conditions) => {
  const image = await sharp(buffer)
  const metadata = await image.metadata()
  if (!metadata) throw boom.badRequest(errorGetImageMetadataResponse)

  if (metadata.height !== parseInt(conditions.height, 10) ||
      metadata.width !== parseInt(conditions.width, 10)) {
    throw boom.badRequest(errorInvalidDimensionsResponse.message)
  }

  return true
}

const validateVideo = async (buffer, conditions) => {
  await saveFile(buffer)
  const dataVideo = await getVideoDimensions()
  await deleteFile()
  if (!dataVideo) throw boom.badRequest(errorGetDimensionsResponse.message)

  if (dataVideo.streams[0].coded_height !== parseInt(conditions.height, 10) ||
      dataVideo.streams[0].coded_width !== parseInt(conditions.width, 10)) {
    throw boom.badRequest(errorInvalidDimensionsResponse.message)
  }

  return true
}

const getVideoDimensions = () => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe('video.mp4', function (err, metadata) {
      if (err) {
        reject(console.log(err))
      } else {
        resolve(metadata)
      }
    })
  })
}

const saveFile = async (buffer) => {
  fs.writeFile('./video.mp4', buffer, (error) => {
    if (error) {
      console.log(error)
    }
  })
}

const deleteFile = async () => {
  fs.unlink('./video.mp4', (error) => console.log(error))
}

module.exports = {
  checkFormatFile
}
