"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.organizationMng = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _apiCode = require("../api-code");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var orgEndpoint = 'https://icc-api.stringee.com/v1/queue/';
var orgDeptEndpoint = 'https://icc-api.stringee.com/v1/routing-call-to-groups/';
/**
 * @namespace organizationMng
 */

var organizationMng =
/*#__PURE__*/
function () {
  function organizationMng() {
    _classCallCheck(this, organizationMng);
  }

  _createClass(organizationMng, null, [{
    key: "listOrganizations",

    /**
     * @param {string}apiToken
     * @param {object}[query]
     * @param {number}[query.page]
     * @param {string}[query.id]
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf organizationMng
     */
    value: function listOrganizations(apiToken, query) {
      return (0, _axios.default)({
        url: orgEndpoint,
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
            rows = _response$data.queues;
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
     * @param {string} orgName
     * @returns {Promise<{status_code: number, description: string, data: {queueID: string}}>}
     * @memberOf organizationMng
     */

  }, {
    key: "createOrganization",
    value: function createOrganization(apiToken, orgName) {
      return (0, _axios.default)({
        url: orgEndpoint,
        method: 'post',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: {
          "name": orgName,
          "agent_wrap_up_after_calls": false,
          "wait_agent_answer_timeout": 10
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
     * @param {string}orgId
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf organizationMng
     */

  }, {
    key: "deleteOrganization",
    value: function deleteOrganization(apiToken, orgId) {
      return (0, _axios.default)({
        url: orgEndpoint + orgId,
        method: 'delete',
        headers: {
          'X-STRINGEE-AUTH': apiToken
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
     * List detps of Organization
     * @param {string}apiToken
     * @param {string}orgId
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf organizationMng
     */

  }, {
    key: "listDepts",
    value: function listDepts(apiToken, orgId) {
      return (0, _axios.default)({
        url: orgDeptEndpoint,
        method: 'get',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        params: {
          queue: orgId
        }
      }).then(function (_ref7) {
        var response = _ref7.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        var _response$data2 = response.data,
            totalCount = _response$data2.totalCount,
            rows = _response$data2.groupRoutings;
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: {
            total: Number(totalCount),
            rows: rows
          }
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
     * Add a Dept to an Organization
     * @param {string}apiToken
     * @param {object} data
     * @param {string} data.organization_id
     * @param {string} data.dept_id
     * @param {number} [data.isPrime=0]
     * @returns {Promise<{status_code: number, description: string, data: {queueID: string}}>}
     * @memberOf organizationMng
     */

  }, {
    key: "addDept",
    value: function addDept(apiToken, data) {
      return (0, _axios.default)({
        url: orgDeptEndpoint,
        method: 'post',
        headers: {
          'X-STRINGEE-AUTH': apiToken
        },
        data: {
          "queue_id": data.organization_id,
          "group_id": data.dept_id,
          "primary_group": data.isPrime || 0
        }
      }).then(function (_ref9) {
        var response = _ref9.data;
        if (response.r !== 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response
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
     * @param {string}apiToken
     * @param {string}mappingId
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf organizationMng
     */

  }, {
    key: "removeDept",
    value: function removeDept(apiToken, mappingId) {
      return (0, _axios.default)({
        url: orgDeptEndpoint + mappingId,
        method: 'delete',
        headers: {
          'X-STRINGEE-AUTH': apiToken
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
  }]);

  return organizationMng;
}();

exports.organizationMng = organizationMng;