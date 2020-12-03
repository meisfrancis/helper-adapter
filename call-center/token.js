"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenMng = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tokenMng =
/*#__PURE__*/
function () {
  function tokenMng() {
    _classCallCheck(this, tokenMng);
  }

  _createClass(tokenMng, null, [{
    key: "getApiToken",

    /**
     * Return token for server API
     * @param {string} stringee_sid
     * @param {string} secret_key
     * @returns {string}
     * @memberOf tokenMng
     */
    value: function getApiToken(stringee_sid, secret_key) {
      var payload = {
        'jti': stringee_sid + '-' + Date.now(),
        'iss': stringee_sid,
        'rest_api': true
      };
      return _jsonwebtoken.default.sign(payload, secret_key, {
        expiresIn: '30d',
        header: {
          'cty': 'call-center-api;v=1',
          'typ': 'JWT',
          'alg': 'HS256'
        }
      });
    }
    /**
     * @param {string} agentId
     * @param {string} stringee_sid
     * @param {string} secret_key
     * @returns {string}
     * @memberOf tokenMng
     */

  }, {
    key: "getWebPhoneToken",
    value: function getWebPhoneToken(agentId, stringee_sid, secret_key) {
      var payload = {
        'jti': stringee_sid + '-' + Date.now(),
        'iss': stringee_sid,
        'userId': agentId,
        'icc_api': true
      };
      return _jsonwebtoken.default.sign(payload, secret_key, {
        expiresIn: '30d',
        header: {
          'cty': 'call-center-api;v=1',
          'typ': 'JWT',
          'alg': 'HS256'
        }
      });
    }
  }]);

  return tokenMng;
}();

exports.tokenMng = tokenMng;