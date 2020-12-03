import nodemailer from 'nodemailer'
import * as aws from 'aws-sdk/index'
import {utils, apiCode} from 'omoeo-helper/utilities'
import {apiAdapter} from './apiAdapter'

/**
 * @name Mailer
 * @namespace mailer
 */
export class mailer {
  /**
   * Call service to send mail
   * @private
   * @param {Object} config
   * @param {String} service
   * @returns {Promise<{status_code: number, description}>}
   * @memberOf mailer
   */
  static use3rdParty = (config, service) => {
    let companion
    let promiseJob

    service = service.trim()

    switch (service) {
      case 'node':
        companion = 'useNodeMailer'
        break
      case 'aws':
        companion = 'useAws'
        break
      default:
        companion = () => Promise.resolve(apiCode.getMessage({status_code: 509, name: service}))
    }

    promiseJob = this[companion](config)

    return promiseJob
  }

  /**
   * @param {object} config
   * @param {string} config.subject subject
   * @param {string} config.to email
   * @param {string} [config.html] email content required if not using template
   * @param {string} [config.tpl_name] name of mail template required if using template
   * @param {object} [config.replacer] object mapping value and anchor in template. Required if using template
   * @param {String} [service=aws]
   * @return {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf mailer
   */
  static sendMail(config, service = 'aws') {
    // Return if missing 'service'
    if (!service) return Promise.resolve(apiCode.getMessage({status_code: 300, fields: ['service']}))
    if (config.tpl_name) {
      if (config.tpl_name === 'none') return Promise.resolve(apiCode.getMessage({status_code: 201}))

      return this.buildTpl(config)
        .then(result => this.use3rdParty(result, service))
    }

    return this.use3rdParty(config, service)
  }

  /**
   * Read template for html mail
   * @param {object} config
   * @param {string} config.to Destination of mail
   * @param {string} config.tpl_name Name of template
   * @param {object|string[]} config.replacer Mapping value and anchor in template
   * @param {string} [config.subject] Mail subject
   * @return {Promise<{status_code: number, description: string, to: string, html: string, subject: string}>}
   * @memberOf mailer
   */
  static buildTpl(config) {
    return apiAdapter('option').get('/view/' + config.tpl_name)
      .then(({data: mailTplInfo}) => {
        if (mailTplInfo.status_code !== 200) return apiCode.getMessage({status_code: 510, at: 'common/mailer'})

        const {subject: userSubjectTpl} = config
        const {subject: userSubjectFormat, body: bodyFormat} = config.replacer || {}
        const {content: mailTpl, subject: defaultSubjectTpl} = (mailTplInfo.data.meta_value || {})
        const exposedTpl = utils.format(mailTpl, bodyFormat)
        const exposedSubject = utils.format(userSubjectTpl || defaultSubjectTpl || '[No Reply]', userSubjectFormat)

        return {
          to: config.to,
          html: exposedTpl,
          subject: exposedSubject
        }
      })
  }

  /**
   * Send mail using nodemailer
   * See more advanced config at https://nodemailer.com/message/
   *
   * @example {
   *   to: DHN Port <dhnport@gmail.com> // Comma separated list of recipients
   *   subject: "Subject of the message"
   *   text: 'Hello to myself!', // plaintext body
   *   html: "HTML body"
   * }
   *
   * @param {Object} config
   * @param {String} config.from - The email address of sender. 2 formats to use [email@service.com] or [Name <email@service.com>]
   * @param {String|String[]} config.to - String or an array of recipients email addresses that will appear on To field
   * @param {String|String[]} [config.cc] - String or an array of recipients email addresses that will appear on Cc field
   * @param {String|String[]} [config.bcc] - String or an array of recipients email addresses that will appear on Bcc field
   * @param {String} config.subject - The subject of the email
   * @param {String} [config.text] - The plaintext version of message
   * @param {String} config.html - The HTML version of message
   * @param {String} [config.replyTo] - String or an array of recipients email addresses that will appear on Reply To field
   * @param {Object[]} [config.attachments] - An array of attachment object
   * @param {String} config.attachments.filename - Name of attached file
   * @param {Object|String|Stream} config.attachments.content - String, Buffer, Stream contents for attachment
   * @param {String} config.attachments.path - Path to file (better for larger attachments)
   * @param {String} config.attachments.href - URL to file
   * @return {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf mailer
   */
  static useNodeMailer(config) {
    return new Promise(resolve => {
      let smtpConfig = {
        // host: 'smtp.gmail.com',
        // port: 587,
        // secure: false, // upgrade later with STARTTLS
        service: 'gmail',
        auth: {
          // TODO waiting for Amazon email
          // user: "admin@dhnport.com",
          // pass: "{-7{tUwd[Yw,%w_|*\\fG"
          user: 'traibuoimauxanh@gmail.com',
          pass: '1234%^&*'
        }
      }

      let transporter = nodemailer.createTransport(smtpConfig)
      transporter.sendMail(config, (error, info) => {
        if (error) {
          process.exit(1)
          resolve(apiCode.getMessage({status_code: 510, at: 'common/mailer', custom: {error_message: error}}))
        } else
          resolve(apiCode.getMessage({status_code: 200, data: {messageId: info.messageId}}))

        // Close
        transporter.close()
      })
    })
  }

  /**
   * Send mail using AWS
   * @param {Object} config
   * @param {String} config.from - The email address of sender. 2 formats to use [email@service.com] or [Name <email@service.com>]
   * @param {String|String[]} config.to - String or an array of recipients email addresses that will appear on To field
   * @param {String|String[]} [config.cc] - String or an array of recipients email addresses that will appear on Cc field
   * @param {String|String[]} [config.bcc] - String or an array of recipients email addresses that will appear on Bcc field
   * @param {String|String[]} [config.replyTo] - String or an array of recipients email addresses that will appear on Reply To field
   * @param {String} config.subject - The subject of the email
   * @param {String} [config.text] - The plaintext version of message
   * @param {String} config.html - The HTML version of message
   * @return {Promise<{status_code: number, description: string, data: object}>}
   * @memberOf mailer
   */
  static useAws(config) {
    return new Promise(resolve => {
      // Set region
      // Reference: https://docs.aws.amazon.com/general/latest/gr/rande.html
      aws.config.update({region: 'us-west-2'})
      const {cc, bcc, to, html, text, subject, from = 'GAMALI <admin@gamali.edu.vn>', replyTo = 'Hello Gamali <hello@gamali.edu.vn>'} = config

      // Set Destination
      let destination = {}
      if (utils.isAllEmpty(to, bcc, cc)) throw apiCode.getMessage({status_code: 300, fields: ['Mail Destination']})
      if (cc) destination.CcAddresses = utils._toArray(cc)
      if (bcc) destination.BccAddresses = utils._toArray(bcc)
      if (to) destination.ToAddresses = utils._toArray(to)

      // Set mail body
      let body = {}
      if (utils.isAllEmpty(text, html)) throw apiCode.getMessage({status_code: 300, fields: ['Mail Body']})
      if (html) body.Html = {Charset: 'UTF-8', Data: html}
      if (text) body.Text = {Charset: 'UTF-8', Data: text}

      // Set mail subject
      if (utils.isEmpty(subject)) throw apiCode.getMessage({status_code: 300, fields: ['Subject']})
      const _subject = {Charset: 'UTF-8', Data: subject}

      // Assign param
      const param = {
        Destination: destination,
        Message: {
          Body: body,
          Subject: _subject
        },
        Source: from,
        ReplyToAddresses: utils._toArray(replyTo)
      }

      const sendPromise = new aws.SES({apiVersion: '2010-12-01'}).sendEmail(param).promise()

      sendPromise.then(data => resolve(apiCode.getMessage({status_code: 200, data: {messageId: data.MessageId}})))
        .catch(err => resolve(apiCode.getMessage({status_code: 510, at: 'common/mailer', custom: {error_message: err.message}})))
    })
      .catch(err => err)
  }
}