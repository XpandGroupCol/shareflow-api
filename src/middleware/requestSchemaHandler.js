
const boom = require('@hapi/boom')

const schemaValidator = (requestData, schema) => {
  const { error } = schema.validate(requestData)
  return error
}

const validateRequestSchema = (schema, requestProperty = 'body') =>
  function (req, res, next) {
    const error = schemaValidator(req[requestProperty], schema)
    if (error) {
      const { statusCode } = boom.badRequest().output
      const { message } = error
      res
        .status(statusCode)
        .json({ message, statusCode, error: message })
    } else {
      next()
    }
  }

const validateRequest = (schema, requestProperty = 'body') =>
  async function (req, res, next) {
    try {
      await schema.validate(req[requestProperty])
      next()
    } catch ({ message }) {
      const { statusCode } = boom.badRequest().output
      res.status(statusCode).json({ message, statusCode, error: message })
    }
  }

module.exports = {
  validateRequestSchema,
  validateRequest
}
