"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smsCenter = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _utilities = require("omoeo-helper/utilities");

var _validation = require("omoeo-helper/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @namespace smsCenter
 */
var smsCenter =
/*#__PURE__*/
function () {
  function smsCenter() {
    _classCallCheck(this, smsCenter);
  }

  _createClass(smsCenter, null, [{
    key: "getAdsToken",

    /**
     * Return token to send Brandname SMS
     * @returns {Promise<{status_code: number, description: string, data: object, error_message: string}>}
     * @memberOf smsCenter
     */
    value: function getAdsToken() {
      var sessionId = _utilities._string.hashString(Date.now());

      return (0, _axios.default)({
        method: 'POST',
        url: this.endpoint + 'oauth2/token',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.secretKey,
          scope: 'send_brandname',
          session_id: sessionId
        }
      }).then(function (_ref) {
        var response = _ref.data;
        return _utilities.apiCode.getMessage({
          status_code: 200,
          data: _objectSpread({}, response, {
            session_id: sessionId
          })
        });
      }).catch(function (e) {
        return _utilities.apiCode.getMessage({
          status_code: 500,
          custom: e.response.data
        });
      });
    }
    /**
     * Create campaign to send message
     * @param {object}data
     * @returns {Promise<unknown>|Promise<{status_code: number, description: string, data: Object, error_message: string}>}
     * @memberOf smsCenter
     */

  }, {
    key: "createCampaign",
    value: function createCampaign(data) {
      var _this = this;

      var _validator$validateAd = _validation.validator.validateAdapter(data, function (joi) {
        return {
          campaign_name: joi.string().required(),
          brand_name: joi.string().required(),
          message: joi.string().required(),
          schedule_time: joi.string().required(),
          quota: joi.string().required()
        };
      }),
          error = _validator$validateAd.error,
          value = _validator$validateAd.value;

      if (error) return Promise.resolve(error);
      return this.getAdsToken().then(function (token) {
        if (token.status_code !== 200) return token;
        var _token$data = token.data,
            access_token = _token$data.access_token,
            session_id = _token$data.session_id;
        return (0, _axios.default)({
          url: _this.endpoint + 'api/create-campaign',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            CampaignName: value.campaign_name,
            BrandName: value.brand_name,
            Message: value.message,
            ScheduleTime: value.schedule_time,
            Quota: value.quota,
            access_token: access_token,
            session_id: session_id
          }
        }).then(function (_ref2) {
          var response = _ref2.data;
          return _utilities.apiCode.getMessage({
            status_code: 200,
            data: response
          });
        }).catch(function (e) {
          return _utilities.apiCode.getMessage({
            status_code: 500,
            custom: e.response.data
          });
        });
      });
    }
    /**
     * Send Brandname SMS
     * @param {object}data
     * @returns {Promise<unknown>|Promise<{status_code: number, description: string, data: Object, error_message: string}>}
     * @memberOf smsCenter
     */

  }, {
    key: "sendBrandNameSms",
    value: function sendBrandNameSms(data) {
      var _this2 = this;

      var _validator$validateAd2 = _validation.validator.validateAdapter(data, function (joi) {
        return {
          campaign_code: joi.string().required(),
          phone_list: joi.array().items(joi.string().required()).required()
        };
      }),
          error = _validator$validateAd2.error,
          value = _validator$validateAd2.value;

      if (error) return Promise.resolve(error);
      return this.getAdsToken().then(function (token) {
        if (token.status_code !== 200) return token;
        var _token$data2 = token.data,
            access_token = _token$data2.access_token,
            session_id = _token$data2.session_id;
        return (0, _axios.default)({
          url: _this2.endpoint + 'api/push-brandname-ads',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            CampaignCode: value.campaign_code,
            PhoneList: value.phone_list.join(','),
            access_token: access_token,
            session_id: session_id
          }
        }).then(function (_ref3) {
          var response = _ref3.data;
          return _utilities.apiCode.getMessage({
            status_code: 200,
            data: response
          });
        }).catch(function (e) {
          return _utilities.apiCode.getMessage({
            status_code: 500,
            custom: e.response.data
          });
        });
      });
    }
  }]);

  return smsCenter;
}();

exports.smsCenter = smsCenter;

_defineProperty(smsCenter, "endpoint", process.env.FPT_SMS_END_POINT);

_defineProperty(smsCenter, "clientId", process.env.FPT_SMS_CLIENT_ID);

_defineProperty(smsCenter, "secretKey", process.env.FPT_SMS_SECRET_KEY);