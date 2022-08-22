const errorGetDimensionsResponse = {
  message: 'Dimensions can not be obtained'
}

const errorInvalidDimensionsResponse = {
  message: 'The dimensions sent are not allowed'
}

const errorGetImageMetadataResponse = {
  message: 'Metadata can not be obtained'
}

const errorCreatingRecord = {
  message: 'The record can not be created'
}

module.exports = {
  errorCreatingRecord,
  errorGetDimensionsResponse,
  errorGetImageMetadataResponse,
  errorInvalidDimensionsResponse
}
