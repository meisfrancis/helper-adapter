"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deptMng = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _apiCode = require("../api-code");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var deptEndpoint = 'https://icc-api.stringee.com/v1/group/';
var deptAgentEndpoint = 'https://icc-api.stringee.com/v1/manage-agents-in-group/';
/**
 * @namespace deptMng
 */

var deptMng =
/*#__PURE__*/
function () {
  function deptMng() {
    _classCallCheck(this, deptMng);
  }

  _createClass(deptMng, null, [{
    key: "listDepts",

    /**
     * @param {string}apiToken
     * @param {object}[query]
     * @param {number}[query.page]
     * @param {string}[query.id]
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf deptMng
     */
    value: function listDepts(apiToken, query) {
      return (0, _axios.default)({
        url: deptEndpoint,
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
            rows = _response$data.groups;
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
     * @param {string} deptName
     * @returns {Promise<{status_code: number, description: string, data: {groupID: string}}>}
     * @memberOf deptMng
     */

  }, {
    key: "createDept",
    value: function createDept(apiToken, deptName) {
      return (0, _axios.default)({
        url: deptEndpoint,
        method: 'post',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: {
          "name": deptName
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
     * @param {string}deptId
     * @param {string}deptName
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf deptMng
     */

  }, {
    key: "updateDept",
    value: function updateDept(apiToken, deptId, deptName) {
      return (0, _axios.default)({
        url: deptEndpoint + deptId,
        method: 'put',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: {
          name: deptName
        }
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
     * @param {string}deptId
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf deptMng
     */

  }, {
    key: "deleteDept",
    value: function deleteDept(apiToken, deptId) {
      return (0, _axios.default)({
        url: deptEndpoint + deptId,
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
    /**
     * List agent of a department
     * @param {string} apiToken
     * @param {string} deptId
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf deptMng
     */

  }, {
    key: "listAgents",
    value: function listAgents(apiToken, deptId) {
      return (0, _axios.default)({
        url: deptAgentEndpoint,
        method: 'get',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        params: {
          group: deptId
        }
      }).then(function (_ref9) {
        var response = _ref9.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        var _response$data2 = response.data,
            totalCount = _response$data2.totalCount,
            rows = _response$data2.groupAgents;
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: {
            total: Number(totalCount),
            rows: rows
          }
        });
      }).catch(function (_ref10) {
        var error = _ref10.data;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: error
        });
      });
    }
    /**
     * Add an agent to a department
     * @param {string}apiToken
     * @param {object}data
     * @param {string}data.agent_id
     * @param {string}data.dept_id
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf deptMng
     */

  }, {
    key: "addAgent",
    value: function addAgent(apiToken, data) {
      return (0, _axios.default)({
        url: deptAgentEndpoint,
        method: 'post',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: {
          agent_id: data.agent_id,
          group_id: data.dept_id
        }
      }).then(function (_ref11) {
        var response = _ref11.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response
        });
      }).catch(function (_ref12) {
        var error = _ref12.data;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: error
        });
      });
    }
    /**
     * Remove an agent from a department
     * @param {string}apiToken
     * @param {object}data
     * @param {string}data.agent_id
     * @param {string}data.dept_id
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf deptMng
     */

  }, {
    key: "removeAgent",
    value: function removeAgent(apiToken, data) {
      return (0, _axios.default)({
        url: deptAgentEndpoint,
        method: 'delete',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: data
      }).then(function (_ref13) {
        var response = _ref13.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response
        });
      }).catch(function (_ref14) {
        var error = _ref14.data;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: error
        });
      });
    }
  }]);

  return deptMng;
}();

exports.deptMng = deptMng;