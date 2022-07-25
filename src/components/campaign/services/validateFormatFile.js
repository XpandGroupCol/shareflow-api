const { checkFormatFile } = require('../../../utils/formatFile')
const { hookUploadFile } = require('../../v1/campaigns/hooks')

const validateFormatFile = async ({ files, conditions }) => {
  if (files.length) {
    for await (const file of files) {
      await checkFormatFile(file.buffer, file.mimetype, conditions)
    }
  }

  const filesUpload = []
  for await (const file of files) {
    const fileUpload = await hookUploadFile(file)
    filesUpload.push(fileUpload)
  }

  return filesUpload
}

module.exports = validateFormatFile
