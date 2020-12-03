"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotlineMng = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _apiCode = require("../api-code");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var endpoint = 'https://icc-api.stringee.com/v1/number/';
/**
 * @namespace hotlineMng
 */

var hotlineMng =
/*#__PURE__*/
function () {
  function hotlineMng() {
    _classCallCheck(this, hotlineMng);
  }

  _createClass(hotlineMng, null, [{
    key: "listHotlines",

    /**
     * @param {string}apiToken
     * @param {object}[query]
     * @param {number}[query.page]
     * @param {string}[query.id]
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf hotlineMng
     */
    value: function listHotlines(apiToken, query) {
      return (0, _axios.default)({
        url: endpoint,
        method: 'get',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        params: query
      }).then(function (_ref) {
        var response = _ref.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        var _response$data = response.data,
            totalCount = _response$data.totalCount,
            rows = _response$data.numbers;
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: {
            total: Number(totalCount),
            rows: rows
          }
        });
      }).catch(function (_ref2) {
        var error = _ref2.data;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: error
        });
      });
    }
    /**
     * @param {string}apiToken
     * @param {object} data
     * @param {string} data.stringee_number
     * @param {string} data.nickname
     * @returns {Promise<{status_code: number, description: string, data: {numberID: string}}>}
     * @memberOf hotlineMng
     */

  }, {
    key: "createHotline",
    value: function createHotline(apiToken, data) {
      return (0, _axios.default)({
        url: endpoint,
        method: 'post',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: {
          "number": data.stringee_number,
          "nickname": data.nickname,
          "allow_outbound_calls": true,
          "enable_ivr": false
        }
      }).then(function (_ref3) {
        var response = _ref3.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response
        });
      }).catch(function (_ref4) {
        var error = _ref4.data;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: error
        });
      });
    }
    /**
     * @param {string}apiToken
     * @param {string} hotlineId
     * @param {object} updateData
     * @param {string} updateData.stringee_number
     * @param {string} updateData.nickname
     * @param {string} updateData.organization_id
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf hotlineMng
     */

  }, {
    key: "updateHotline",
    value: function updateHotline(apiToken, hotlineId, updateData) {
      var data = {};
      if (updateData.stringee_number !== undefined) data.number = updateData.stringee_number;
      if (updateData.nickname !== undefined) data.nickname = updateData.nickname;
      if (updateData.organization_id !== undefined) data.queue_id = updateData.organization_id;
      return (0, _axios.default)({
        url: endpoint + hotlineId,
        method: 'put',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: data
      }).then(function (_ref5) {
        var response = _ref5.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response
        });
      }).catch(function (_ref6) {
        var error = _ref6.data;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: error
        });
      });
    }
    /**
     * @param {string}apiToken
     * @param {string}hotlineId
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf hotlineMng
     */

  }, {
    key: "deleteHotline",
    value: function deleteHotline(apiToken, hotlineId) {
      return (0, _axios.default)({
        url: endpoint + hotlineId,
        method: 'delete',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        }
      }).then(function (_ref7) {
        var response = _ref7.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response
        });
      }).catch(function (_ref8) {
        var error = _ref8.data;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: error
        });
      });
    }
  }]);

  return hotlineMng;
}();

exports.hotlineMng = hotlineMng;