"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailer = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var aws = _interopRequireWildcard(require("aws-sdk/index"));

var _utilities = require("omoeo-helper/utilities");

var _apiAdapter = require("./apiAdapter");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name Mailer
 * @namespace mailer
 */
var mailer =
/*#__PURE__*/
function () {
  function mailer() {
    _classCallCheck(this, mailer);
  }

  _createClass(mailer, null, [{
    key: "sendMail",

    /**
     * Call service to send mail
     * @private
     * @param {Object} config
     * @param {String} service
     * @returns {Promise<{status_code: number, description}>}
     * @memberOf mailer
     */

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
    value: function sendMail(config) {
      var _this = this;

      var service = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aws';
      // Return if missing 'service'
      if (!service) return Promise.resolve(_utilities.apiCode.getMessage({
        status_code: 300,
        fields: ['service']
      }));

      if (config.tpl_name) {
        if (config.tpl_name === 'none') return Promise.resolve(_utilities.apiCode.getMessage({
          status_code: 201
        }));
        return this.buildTpl(config).then(function (result) {
          return _this.use3rdParty(result, service);
        });
      }

      return this.use3rdParty(config, service);
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

  }, {
    key: "buildTpl",
    value: function buildTpl(config) {
      return (0, _apiAdapter.apiAdapter)('option').get('/view/' + config.tpl_name).then(function (_ref) {
        var mailTplInfo = _ref.data;
        if (mailTplInfo.status_code !== 200) return _utilities.apiCode.getMessage({
          status_code: 510,
          at: 'common/mailer'
        });
        var userSubjectTpl = config.subject;

        var _ref2 = config.replacer || {},
            userSubjectFormat = _ref2.subject,
            bodyFormat = _ref2.body;

        var _ref3 = mailTplInfo.data.meta_value || {},
            mailTpl = _ref3.content,
            defaultSubjectTpl = _ref3.subject;

        var exposedTpl = _utilities.utils.format(mailTpl, bodyFormat);

        var exposedSubject = _utilities.utils.format(userSubjectTpl || defaultSubjectTpl || '[No Reply]', userSubjectFormat);

        return {
          to: config.to,
          html: exposedTpl,
          subject: exposedSubject
        };
      });
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

  }, {
    key: "useNodeMailer",
    value: function useNodeMailer(config) {
      return new Promise(function (resolve) {
        var smtpConfig = {
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
        };

        var transporter = _nodemailer.default.createTransport(smtpConfig);

        transporter.sendMail(config, function (error, info) {
          if (error) {
            process.exit(1);
            resolve(_utilities.apiCode.getMessage({
              status_code: 510,
              at: 'common/mailer',
              custom: {
                error_message: error
              }
            }));
          } else resolve(_utilities.apiCode.getMessage({
            status_code: 200,
            data: {
              messageId: info.messageId
            }
          })); // Close


          transporter.close();
        });
      });
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

  }, {
    key: "useAws",
    value: function useAws(config) {
      return new Promise(function (resolve) {
        // Set region
        // Reference: https://docs.aws.amazon.com/general/latest/gr/rande.html
        aws.config.update({
          region: 'us-west-2'
        });
        var cc = config.cc,
            bcc = config.bcc,
            to = config.to,
            html = config.html,
            text = config.text,
            subject = config.subject,
            _config$from = config.from,
            from = _config$from === void 0 ? 'GAMALI <admin@gamali.edu.vn>' : _config$from,
            _config$replyTo = config.replyTo,
            replyTo = _config$replyTo === void 0 ? 'Hello Gamali <hello@gamali.edu.vn>' : _config$replyTo; // Set Destination

        var destination = {};
        if (_utilities.utils.isAllEmpty(to, bcc, cc)) throw _utilities.apiCode.getMessage({
          status_code: 300,
          fields: ['Mail Destination']
        });
        if (cc) destination.CcAddresses = _utilities.utils._toArray(cc);
        if (bcc) destination.BccAddresses = _utilities.utils._toArray(bcc);
        if (to) destination.ToAddresses = _utilities.utils._toArray(to); // Set mail body

        var body = {};
        if (_utilities.utils.isAllEmpty(text, html)) throw _utilities.apiCode.getMessage({
          status_code: 300,
          fields: ['Mail Body']
        });
        if (html) body.Html = {
          Charset: 'UTF-8',
          Data: html
        };
        if (text) body.Text = {
          Charset: 'UTF-8',
          Data: text
        }; // Set mail subject

        if (_utilities.utils.isEmpty(subject)) throw _utilities.apiCode.getMessage({
          status_code: 300,
          fields: ['Subject']
        });
        var _subject = {
          Charset: 'UTF-8',
          Data: subject
        }; // Assign param

        var param = {
          Destination: destination,
          Message: {
            Body: body,
            Subject: _subject
          },
          Source: from,
          ReplyToAddresses: _utilities.utils._toArray(replyTo)
        };
        var sendPromise = new aws.SES({
          apiVersion: '2010-12-01'
        }).sendEmail(param).promise();
        sendPromise.then(function (data) {
          return resolve(_utilities.apiCode.getMessage({
            status_code: 200,
            data: {
              messageId: data.MessageId
            }
          }));
        }).catch(function (err) {
          return resolve(_utilities.apiCode.getMessage({
            status_code: 510,
            at: 'common/mailer',
            custom: {
              error_message: err.message
            }
          }));
        });
      }).catch(function (err) {
        return err;
      });
    }
  }]);

  return mailer;
}();

exports.mailer = mailer;

_defineProperty(mailer, "use3rdParty", function (config, service) {
  var companion;
  var promiseJob;
  service = service.trim();

  switch (service) {
    case 'node':
      companion = 'useNodeMailer';
      break;

    case 'aws':
      companion = 'useAws';
      break;

    default:
      companion = function companion() {
        return Promise.resolve(_utilities.apiCode.getMessage({
          status_code: 509,
          name: service
        }));
      };

  }

  promiseJob = mailer[companion](config);
  return promiseJob;
});