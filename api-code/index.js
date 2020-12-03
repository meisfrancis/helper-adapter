"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiCode = void 0;

var _utilities = require("omoeo-helper/utilities");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @namespace apiCode
 */
var apiCode =
/*#__PURE__*/
function () {
  function apiCode() {
    _classCallCheck(this, apiCode);
  }

  _createClass(apiCode, null, [{
    key: "getMessage",

    /**
     * Return message object based on given status code. If there is no valid code, it returns status `500` by default
     * List status:
     * ------------
     * ---
     *    <li>  200            Operation is successfully
     *    <li>  201            Operation is successfully but there is nothing changed
     *    <li>  204            Not found
     *    <li>  300            Required
     *    <li>  301            Wrong format
     *    <li>  302            Invalid
     *    <li>  303            Value is not accepted
     *    <li>  304            Value is null or empty string
     *    <li>  305            Value must be an array
     *    <li>  306            Value must be boolean
     *    <li>  307            Value must be a date
     *    <li>  308            Value must be a number
     *    <li>  309            Value must be a string
     *    <li>  310            Value must be an object
     *    <li>  311            Value must be a valid email
     *    <li>  312            Unknown validation
     *    <li>  401            Authorization error
     *    <li>  402            Access denied
     *    <li>  403            Permission denied
     *    <li>  500            Unknown error
     *    <li>  501            Wrong password
     *    <li>  502            Token is invalid
     *    <li>  503            New Password cannot be the same as old one
     *    <li>  504            Error when sending mail
     *    <li>  505            Token is expired
     *    <li>  506            Database error
     *    <li>  507            Object is existed
     *    <li>  508            Object isn't existed
     *    <li>  509            Not support
     *    <li>  510            Operation is failed
     *    <li>  511            Coupon has been run out
     *    <li>  512            Coupon has been expired
     *    <li>  513            Not available for this user
     *    <li>  514            Duplicate user when assigning Coupon
     *    <li>  515            Duplicate coupon name
     *    <li>  516            Class does not meet requirement to be published
     *    <li>  517            Cannot interact with a %status% %name%
     *    <li>  518            Don't have permission to update status of a %name%
     *    <li>  519            Class does not meet requirement to be finished
     *    <li>  520            Cannot duplicate attendance check
     *    <li>  521            The information has been used
     *    <li>  522            Object not available
     *    <li>  523            Has exchanged
     *    <li>  524            Only publish a pending class
     *    <li>  525            Only launching a publish class
     *    <li>  526            Organization has already had owner
     *    <li>  527            Product to group must not be owned by any group
     *    <li>  528            Receipt`s amount cannot be greater than balance
     *    <li>  529            User has no debt
     *    <li>  530            Cannot delete `debt` receipt.
     *
     * @param {object} config
     * @param {number} config.status_code
     * @param {object} [config.custom] Add more property from `custom` to status_code object even not including in prototype
     * @param {string[]} [config.fields] Add value of `fields` if status_code object prototype having property `fields`
     * @param {string} [config.error_message] Add value of `error_message` if status_code object prototype having property `error_message`
     * @param {string} [config.name] Add value of `name` if status_code object prototype having property `name`
     * @param {string} [config.format] Add value of `format` if status_code object prototype having property `format`
     * @param {string} [config.at] Add value of `at` if status_code object prototype having property `at`
     * @param {object} [config.data] Add value of `data` if status_code object prototype having property `data`
     * @param {object} [config.map] Map value to format description
     * @param {string[]} [config.accepted_value] Add value of `accepted_value` if status_code object prototype having property `accepted_value`
     * @returns {*|{status_code: number, description: string}}
     * @memberOf apiCode
     * @example
     *
     *    // To return a messages wrong format for field username
     *    apiCode.getMessage({status_code: 301, fields: ['username']})
     *    // return
     *    {
     *      status_code: 301,
     *      description: 'Wrong format',
     *      fields: ['username']
     *    }
     *
     *    // To return a messages wrong format for field username with additional key
     *    apiCode.getMessage({status_code: 301, fields: ['username'], custom: {hello: true}})
     *    // return
     *    {
     *      status_code: 301,
     *      description: 'Wrong format',
     *      fields: ['username'],
     *      hello: true
     *    }
     */
    value: function getMessage() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _config$status_code = config.status_code,
          status_code = _config$status_code === void 0 ? 500 : _config$status_code,
          fields = config.fields,
          accepted_value = config.accepted_value,
          data = config.data,
          error_message = config.error_message,
          name = config.name,
          at = config.at,
          custom = config.custom,
          format = config.format,
          map = config.map;

      var codeObj = _utilities.utils._clone(this._code[status_code]);

      if (fields !== undefined && codeObj.fields !== undefined) codeObj.fields = fields;
      if (accepted_value !== undefined && codeObj.accepted_value !== undefined) codeObj.accepted_value = accepted_value;
      if (data !== undefined && codeObj.data !== undefined) codeObj.data = data;
      if (error_message !== undefined && codeObj.error_message !== undefined) codeObj.error_message = error_message;
      if (name !== undefined && codeObj.name !== undefined) codeObj.name = name;
      if (at !== undefined && codeObj.at !== undefined) codeObj.at = at;
      if (format !== undefined && codeObj.format !== undefined) codeObj.format = format;
      if (!_utilities.utils.isEmpty(custom)) codeObj = _objectSpread({}, codeObj, {}, custom);
      if (!_utilities.utils.isEmpty(map) && /%([\w]+)?%/.test(codeObj.description)) codeObj.description = _utilities.utils.format(codeObj.description, map);
      return codeObj;
    }
  }]);

  return apiCode;
}();

exports.apiCode = apiCode;

_defineProperty(apiCode, "_code", {
  200: {
    status_code: 200,
    description: 'Operation is successfully',
    data: {}
  },
  201: {
    status_code: 201,
    description: 'Operation is successfully but there is nothing changed'
  },
  204: {
    status_code: 204,
    description: 'Not found'
  },
  300: {
    status_code: 300,
    description: 'Required',
    fields: []
  },
  301: {
    status_code: 301,
    description: 'Wrong format',
    format: '',
    fields: []
  },
  302: {
    status_code: 302,
    description: 'Invalid',
    fields: []
  },
  303: {
    status_code: 303,
    description: 'Value is not accepted',
    accepted_value: [],
    fields: []
  },
  304: {
    status_code: 304,
    description: 'Value is null or empty string, please remove this field if there is no value',
    fields: []
  },
  305: {
    status_code: 305,
    description: 'Value must be an array',
    fields: []
  },
  306: {
    status_code: 306,
    description: 'Value must be boolean',
    fields: []
  },
  307: {
    status_code: 307,
    description: 'Value must be a date',
    fields: []
  },
  308: {
    status_code: 308,
    description: 'Value must be a number',
    fields: []
  },
  309: {
    status_code: 309,
    description: 'Value must be a string',
    fields: []
  },
  310: {
    status_code: 310,
    description: 'Value must be an object',
    fields: []
  },
  311: {
    status_code: 311,
    description: 'Value must be a valid email',
    fields: []
  },
  312: {
    status_code: 312,
    description: 'Unknown validation',
    fields: []
  },
  313: {
    status_code: 313,
    description: 'Must be a safe number. It must be less than ' + Number.MAX_SAFE_INTEGER,
    fields: []
  },
  401: {
    status_code: 401,
    description: 'Authorization error'
  },
  402: {
    status_code: 402,
    description: 'Access denied'
  },
  403: {
    status_code: 403,
    description: 'Permission denied'
  },
  406: {
    status_code: 406,
    description: 'Account is blocked'
  },
  500: {
    status_code: 500,
    description: 'Unknown error'
  },
  501: {
    status_code: 501,
    description: 'Wrong password'
  },
  502: {
    status_code: 502,
    description: 'Token is invalid'
  },
  503: {
    status_code: 503,
    description: 'New Password cannot be the same as old one'
  },
  504: {
    status_code: 504,
    description: 'Error when sending mail'
  },
  505: {
    status_code: 505,
    description: 'Token is expired'
  },
  506: {
    status_code: 506,
    description: 'Database error',
    error_message: 'Error message'
  },
  507: {
    status_code: 507,
    description: 'Existed',
    name: 'Name of object'
  },
  508: {
    status_code: 508,
    description: 'Not existed',
    name: 'Name of object'
  },
  509: {
    status_code: 509,
    description: 'Not supported',
    name: 'Name of supporter'
  },
  510: {
    status_code: 510,
    description: 'Operation is failed',
    at: 'Where operation conducts'
  },
  511: {
    status_code: 511,
    description: 'Coupon has been run out'
  },
  512: {
    status_code: 512,
    description: 'Coupon has been expired'
  },
  513: {
    status_code: 513,
    description: 'This coupon is not available for this user'
  },
  514: {
    status_code: 514,
    description: 'This user has already owned this Coupon'
  },
  515: {
    status_code: 515,
    description: 'There is another coupon with this name'
  },
  516: {
    status_code: 516,
    description: 'The Class is not meet requirement to open'
  },
  517: {
    status_code: 517,
    description: 'Cannot interact with a %status% %name%'
  },
  518: {
    status_code: 518,
    description: 'You do not have permission to change status of %name%'
  },
  519: {
    status_code: 519,
    description: 'The Class is not meet requirement to finish'
  },
  520: {
    status_code: 520,
    description: 'Cannot duplicate attendance check'
  },
  521: {
    status_code: 521,
    description: 'The information has been used',
    fields: []
  },
  522: {
    status_code: 522,
    description: 'Not available',
    name: 'Name of thing(s)'
  },
  523: {
    status_code: 523,
    description: 'Has exchanged'
  },
  524: {
    status_code: 524,
    description: 'Only publish a pending class'
  },
  525: {
    status_code: 525,
    description: 'Only launching a publish class'
  },
  526: {
    status_code: 526,
    description: 'Organization has already had owner'
  },
  527: {
    status_code: 527,
    description: 'Products to be group must not be owned by any groups'
  },
  528: {
    status_code: 528,
    description: 'Receipt`s amount cannot be greater than balance'
  },
  529: {
    status_code: 529,
    description: 'User has no debt.'
  },
  530: {
    status_code: 530,
    description: 'Cannot delete `debt` receipt.'
  }
});