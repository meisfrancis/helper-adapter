"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agentMng = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _apiCode = require("../api-code");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var endpoint = 'https://icc-api.stringee.com/v1/agent/';
/**
 * @namespace agentMng
 */

var agentMng =
/*#__PURE__*/
function () {
  function agentMng() {
    _classCallCheck(this, agentMng);
  }

  _createClass(agentMng, null, [{
    key: "listAgents",

    /**
     * @param {string}apiToken
     * @param {object}[query]
     * @param {number}[query.page]
     * @param {string}[query.id]
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf agentMng
     */
    value: function listAgents(apiToken, query) {
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
            rows = _response$data.agents;
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
     * @param {string} data.agent_name
     * @param {string} data.stringee_id
     * @returns {Promise<{status_code: number, description: string, data: {agentID: string}}>}
     * @memberOf agentMng
     */

  }, {
    key: "createAgent",
    value: function createAgent(apiToken, data) {
      return (0, _axios.default)({
        url: endpoint,
        method: 'post',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: {
          "name": data.agent_name,
          "stringee_user_id": data.stringee_id,
          "manual_status": "AVAILABLE",
          "routing_type": 1
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
     * @param {string} agentId
     * @param {object} updateData
     * @param {string} updateData.agent_name
     * @param {string} updateData.stringee_id
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf agentMng
     */

  }, {
    key: "updateAgent",
    value: function updateAgent(apiToken, agentId, updateData) {
      var data = {};
      if (updateData.agent_name !== undefined) data.name = updateData.agent_name;
      if (updateData.stringee_id !== undefined) data.stringee_user_id = updateData.stringee_id;
      return (0, _axios.default)({
        url: endpoint + agentId,
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
     * @param {string}agentId
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf agentMng
     */

  }, {
    key: "deleteAgent",
    value: function deleteAgent(apiToken, agentId) {
      return (0, _axios.default)({
        url: endpoint + agentId,
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

  return agentMng;
}();

exports.agentMng = agentMng;