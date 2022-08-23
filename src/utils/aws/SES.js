const AWS = require('aws-sdk')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const { readFile } = require('fs')
const util = require('util')
const boom = require('@hapi/boom')

AWS.config.update({
  accessKeyId: process.env.AWS_SES_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET,
  region: process.env.AWS_SES_REGION
})
const ses = new AWS.SES()

const asyncReadFile = util.promisify(readFile)

/**
 * Allows send an email, also allow in this process send that email as an email template and attach files
 * @param sendEmailPayload Object with the next options
 * - @param {string} originVerifiedAWSEmail: (Required) String with the verified origin email (sender)
 * - @param {Array}destinationEmails: (Required) Array<strings> List of emails that will receive this email
 * - @param {string}templateFilePath: (Optional) String with the path to the email template. Can be an html file or hbs file
 * - @param {Object} templateRenderData: (Optional) Object with the info that need to be rendered in the email template
 * - @param {Array} attachedFiles: (Optional) Array<objects> List of files that need to be attached to the email
 * - @param {string} emailSubject: (Optional) String with a specific email subject
 */
const sendEmail = async (sendEmailPayload) => {
  try {
    const payload = {
      // from: sendEmailPayload.originVerifiedAWSEmail || 'notifications@shareflow.me',
      from: sendEmailPayload.originVerifiedAWSEmail || 'diegocontreras1219@gmail.com',
      to: sendEmailPayload.destinationEmails,
      subject: sendEmailPayload.emailSubject || 'New Email'
    }

    const transporter = nodemailer.createTransport({
      SES: ses
    })

    if (sendEmailPayload.templateFilePath) {
      const templateCompile = handlebars.compile(
        (await asyncReadFile(sendEmailPayload.templateFilePath)).toString()
      )
      payload.html = templateCompile(sendEmailPayload.templateRenderData || {})
    }

    if (
      sendEmailPayload.attachedFiles &&
      sendEmailPayload.attachedFiles.length
    ) {
      payload.attachments = sendEmailPayload.attachedFiles
    }

    if (sendEmailPayload.text && !sendEmailPayload.templateFilePath) {
      payload.text = sendEmailPayload.text
    }

    if (sendEmailPayload.htmlMessage) payload.html = sendEmailPayload.htmlMessage

    const sendResult = await transporter.sendMail(payload)
    if (!sendResult) return false
    return true
  } catch (error) {
    // throw boom.internal('Error sending email: ', error.message || null)
    // We need to use a logger here
    return Promise.reject(error)
  }
}

/**
 * Allows you to send an email using a template already created.
 * @param {ISESSendEmail} sendEmailPayload
 */
const sendEmailTemplate = async (sendEmailPayload, payloadRenderData) => {
  try {
    const params = {
      Source: sendEmailPayload.originVerifiedAWSEmail,
      Destination: {
        ToAddresses: sendEmailPayload.destinationEmails
      },
      Template: sendEmailPayload.templateName,
      TemplateData: JSON.stringify(payloadRenderData)
    }

    const sendEmail = await ses.sendTemplatedEmail(params).promise()
    if (!sendEmail) return false
    return true
  } catch (error) {
    throw boom.internal(
      'Error sending email template: ',
      error.message || null
    )
  }
}

/**
 * Allows to adds an email address to the list of identities for your Amazon SES account in the current
 * AWS region and attempts to verify it. As a result of executing this operation, a verification email
 * is sent to the specified address.
 * You can execute this operation no more than once per second.
 * @param {string} emailToVerify
 */
const verifyEmailAddress = async (emailToVerify) => {
  try {
    const params = {
      EmailAddress: emailToVerify
    }

    const verificationEmail = await ses.verifyEmailIdentity(params).promise()
    if (!verificationEmail) return false
    return true
  } catch (error) {
    throw boom.internal(
      'Error verification email process: ',
      error.message || null
    )
  }
}

/**
 * Allows the creation of a new email template
 * @param emailTemplatePayload
 */
const createNewEmailTemplateSES = async (emailTemplatePayload) => {
  try {
    const params = {
      Template: {
        TemplateName: emailTemplatePayload.templateName,
        HtmlPart: (
          await asyncReadFile(emailTemplatePayload.templateHtmlPath)
        ).toString(),
        SubjectPart: emailTemplatePayload.templateSubjectEmail,
        TextPart: emailTemplatePayload.templateTextEmail
      }
    }

    const createdTemplate = await ses.createTemplate(params).promise()
    if (!createdTemplate) return false
    return true
  } catch (error) {
    throw boom.internal('Error template creation: ', error.message || null)
  }
}

/**
 * Allows update a specific email template
 * @param emailTemplatePayload
 */
const updateEmailTemplateSES = async (emailTemplatePayload) => {
  try {
    const params = {
      Template: {
        TemplateName: emailTemplatePayload.templateName,
        HtmlPart: (
          await asyncReadFile(emailTemplatePayload.templateHtmlPath)
        ).toString(),
        SubjectPart: emailTemplatePayload.templateSubjectEmail,
        TextPart: emailTemplatePayload.templateTextEmail
      }
    }
    const updatedTemplate = await ses.updateTemplate(params).promise()
    if (!updatedTemplate) return false
    return true
  } catch (error) {
    throw boom.internal('Error template creation: ', error.message || null)
  }
}

/**
 * Allows a list of the templates created
 * @param itemsQty
 */
const listeTemplates = async (itemsQty) => {
  try {
    const params = {
      MaxItems: itemsQty
    }

    const listTemplates = await ses.listTemplates(params).promise()
    if (!listTemplates) return null
    return listTemplates
  } catch (error) {
    throw boom.internal(
      'Error returning template list: ',
      error.message || null
    )
  }
}

const sendEmailNewShipmentBook = async (
  sesServicesPayload,
  payloadNewShipmentBookRenderData
) => {
  if (
    await sendEmailTemplate(
      sesServicesPayload,
      payloadNewShipmentBookRenderData
    )
  ) { return true }
  throw boom.badRequest('Error sending email confirmation')
}

module.exports = {
  sendEmail,
  sendEmailTemplate,
  createNewEmailTemplateSES,
  updateEmailTemplateSES,
  sendEmailNewShipmentBook,
  verifyEmailAddress,
  listeTemplates
}
