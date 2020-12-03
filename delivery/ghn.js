"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ghn = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _apiCode = require("../api-code");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ghn =
/*#__PURE__*/
function () {
  function ghn() {
    _classCallCheck(this, ghn);
  }

  _createClass(ghn, null, [{
    key: "getToken",
    value: function getToken() {
      return process.env.GHN_API_TOKEN;
    }
  }, {
    key: "getEndpoint",
    value: function getEndpoint() {
      return process.env.GHN_ENDPOINT;
    }
  }, {
    key: "getClientId",
    value: function getClientId() {
      return Number(process.env.GHN_CLIENT_ID);
    }
    /**
     * @param {number} districtId
     * @returns {Promise<{status_code: number, description: string, data: {total: number, rows: Ward[]}}>}
     * @memberOf ghn
     * @typedef {object} Ward {@link https://api.ghn.vn/home/docs/detail?id=40}
     */

  }, {
    key: "getWards",
    value: function getWards(districtId) {
      return (0, _axios.default)({
        url: this.getEndpoint() + 'GetWards',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          token: this.getToken(),
          DistrictID: districtId
        }
      }).then(function (_ref) {
        var response = _ref.data;
        if (response.code === 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          error_message: response
        });
        var wards = response.data.Wards;
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: {
            total: wards.length,
            rows: wards
          }
        });
      }).catch(function (_ref2) {
        var response = _ref2.response;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response.data
        });
      });
    }
    /**
     * @returns {Promise<{status_code: number, description: string, data: {total: number, rows: District[]}}>}
     * @memberOf ghn
     * @typedef {object} District {@link https://api.ghn.vn/home/docs/detail?id=26}
     */

  }, {
    key: "getDistricts",
    value: function getDistricts() {
      return (0, _axios.default)({
        url: this.getEndpoint() + 'GetDistricts',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          token: this.getToken()
        }
      }).then(function (_ref3) {
        var response = _ref3.data;
        if (response.code === 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          error_message: response
        });
        var districts = response.data;
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: {
            total: districts.length,
            rows: districts
          }
        });
      }).catch(function (_ref4) {
        var response = _ref4.response;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response.data
        });
      });
    }
    /**
     * @param {object} cfg
     * @param {number} cfg.fromDistId
     * @param {number} cfg.toDistId
     * @param {number} [cfg.weight] weight in gram
     * @param {number} [cfg.height] height in cm
     * @param {number} [cfg.length] length in cm
     * @param {number} [cfg.width] width in cm
     * @returns {Promise<{status_code: number, description: string, data: {total: number, rows: AvailableService[]}}>}
     * @memberOf ghn
     * @typedef {object} AvailableService {@link https://api.ghn.vn/home/docs/detail?id=27}
     */

  }, {
    key: "getAvailableServices",
    value: function getAvailableServices(cfg) {
      var parsedCfg = {};
      var fromDistId = cfg.fromDistId,
          toDistId = cfg.toDistId;
      if (cfg.weight) parsedCfg.Weight = cfg.weight;
      if (cfg.height) parsedCfg.Height = cfg.height;
      if (cfg.length) parsedCfg.Length = cfg.length;
      if (cfg.width) parsedCfg.Width = cfg.width;
      return (0, _axios.default)({
        url: this.getEndpoint() + 'FindAvailableServices',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: _objectSpread({
          token: this.getToken(),
          FromDistrictID: fromDistId,
          ToDistrictID: toDistId
        }, parsedCfg)
      }).then(function (_ref5) {
        var response = _ref5.data;
        if (response.code === 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          error_message: response
        });
        var availServices = response.data;
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: {
            total: availServices.length,
            rows: availServices
          }
        });
      }).catch(function (_ref6) {
        var response = _ref6.response;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response.data
        });
      });
    }
    /**
     * @param {object}    cfg
     * @param {number}    cfg.fromDistrictId
     * @param {number}    cfg.toDistrictId
     * @param {number}    cfg.serviceId
     * @param {number}    cfg.weight Weight (gram).
     * @param {number}    [cfg.length]                 Length (cm).
     * @param {number}    [cfg.width]                  Width (cm).
     * @param {number}    [cfg.height]                 Height (cm).
     * @param {number[]}  [cfg.extraServices] Include  Extra Service ID list.
     * @param {string}    [cfg.couponCode]             Coupon Code for discount.
     * @param {number}    [cfg.insuranceFee=0]         Declare package value. GHN will base on this value for compensation if any unexpected things happen (lost, broken...) Max is 10.000.000
     * @returns {Promise<{status_code: number, description: string, data: Fee}>}
     * @memberOf ghn
     * @typedef {object} Fee {@link https://api.ghn.vn/home/docs/detail?id=2}
     */

  }, {
    key: "getFee",
    value: function getFee(cfg) {
      var parsedCfg = {};
      var fromDistId = cfg.fromDistId,
          toDistId = cfg.toDistId,
          serviceId = cfg.serviceId,
          weight = cfg.weight;
      if (cfg.length) parsedCfg.Length = cfg.length;
      if (cfg.height) parsedCfg.Height = cfg.height;
      if (cfg.width) parsedCfg.Width = cfg.width;
      if (cfg.extraServices && cfg.extraServices.length) parsedCfg.OrderCosts = cfg.extraServices.map(function (i) {
        return {
          ServiceID: i
        };
      });
      if (cfg.couponCode) parsedCfg.CouponCode = cfg.couponCode;
      if (cfg.insuranceFee) parsedCfg.InsuranceFee = cfg.insuranceFee;
      return (0, _axios.default)({
        url: this.getEndpoint() + 'CalculateFee',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: _objectSpread({
          token: this.getToken(),
          FromDistrictID: fromDistId,
          ToDistrictID: toDistId,
          ServiceID: serviceId,
          Weight: weight
        }, parsedCfg)
      }).then(function (_ref7) {
        var response = _ref7.data;
        if (response.code === 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          error_message: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response.data
        });
      }).catch(function (_ref8) {
        var response = _ref8.response;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response.data
        });
      });
    }
    /**
     * @param {object}  cfg
     * @param {int}     cfg.fromTime	                    From time you want to get callback logs (timestamp).
     * @param {int}     cfg.toTime	                      To time you want to get callback logs (timestamp).
     * @param {int}     cfg.customerID	        ID you want to get callback logs. This is the same value as ClientID.
     * @param {int}     [cfg.shippingOrderID]	  Shipping order ID you want to get callback logs.
     * @param {string}  [cfg.orderCode]	        Order Code you want to get callback logs.
     * @param {string}  [cfg.currentStatus]	    Order status which you want to get callback logs.
     * @returns {Promise<{status_code: number, description: string, data: {total: number, rows: Log[]}}>}
     * @memberOf ghn
     * @typedef {object} Log {@link https://api.ghn.vn/home/docs/detail?id=42}
     */

  }, {
    key: "getOrderLogs",
    value: function getOrderLogs(cfg) {
      var fromTime = cfg.fromTime,
          toTime = cfg.toTime,
          customerID = cfg.customerID;
      var condition = {
        CustomerID: customerID
      };
      if (cfg.shippingOrderID) condition.ShippingOrderID = cfg.shippingOrderID;
      if (cfg.orderCode) condition.OrderCode = cfg.orderCode;
      if (cfg.currentStatus) condition.CurrentStatus = cfg.currentStatus;
      return (0, _axios.default)({
        url: this.getEndpoint() + 'GetOrderLogs',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          token: this.getToken(),
          FromTime: fromTime,
          ToTime: toTime,
          Conditions: condition,
          Skip: 0
        }
      }).then(function (_ref9) {
        var response = _ref9.data;
        if (response.code === 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          error_message: response
        });
        var _response$data = response.data,
            rows = _response$data.Logs,
            total = _response$data.Total;
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: {
            total: total,
            rows: rows
          }
        });
      }).catch(function (_ref10) {
        var response = _ref10.response;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response.data
        });
      });
    }
    /**
     * @param {string} orderCode
     * @returns {Promise<{status_code: number, description: string, data: OrderInfo}>}
     * @memberOf ghn
     * @typedef {object} OrderInfo {@link https://api.ghn.vn/home/docs/detail?id=29}
     */

  }, {
    key: "getOrderInfo",
    value: function getOrderInfo(orderCode) {
      return (0, _axios.default)({
        url: this.getEndpoint() + 'OrderInfo',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          token: this.getToken(),
          OrderCode: orderCode
        }
      }).then(function (_ref11) {
        var response = _ref11.data;
        if (response.code === 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          error_message: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response.data
        });
      }).catch(function (_ref12) {
        var response = _ref12.response;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response.data
        });
      });
    }
    /**
     * @param {string} orderCode
     * @returns {Promise<{status_code: number, description: string, data: CancelOrder}>}
     * @memberOf ghn
     * @typedef {object} CancelOrder {@link https://api.ghn.vn/home/docs/detail?id=32}
     */

  }, {
    key: "cancelOrder",
    value: function cancelOrder(orderCode) {
      return (0, _axios.default)({
        url: this.getEndpoint() + 'CancelOrder',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          token: this.getToken(),
          OrderCode: orderCode
        }
      }).then(function (_ref13) {
        var response = _ref13.data;
        if (response.code === 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          error_message: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response.data
        });
      }).catch(function (_ref14) {
        var response = _ref14.response;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response.data
        });
      });
    }
    /**
     * @param {object}  cfg
     * @param {int}     [cfg.paymentTypeId=2]         Choose who pay shipping fee.
     *                                                1: Shop/Seller.
     *                                                2: Buyer/Consignee.
     * @param {int}     cfg.fromDistrictId	          District ID pick up parcels. Use API GetDistricts or look up from District List.
     * @param {string}  cfg.fromWardCode	            Ward Code pick up parcels. Use API GetWards.
     * @param {int}     cfg.toDistrictId	            District ID drop off parcels. Use API GetDistricts or look up from District List.
     * @param {string}  cfg.toWardCode	              Ward Code drop off parcels. Use API GetWards.
     * @param {string}  cfg.clientContactName	        Client name. (Shop / Seller)
     * @param {string}  cfg.clientContactPhone	      Client phone number. (Shop / Seller)
     * @param {string}  cfg.clientAddress	            Client address. (Shop / Seller)
     * @param {string}  cfg.customerName	            Customer name. (Buyer / Consignee)
     * @param {string}  cfg.customerPhone	            Customer phone number. (Buyer / Consignee)
     * @param {string}  cfg.shippingAddress	          Customer address. (Buyer / Consignee)
     * @param {string}  cfg.noteCode	                Note shipping order. Allowed values: CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG
     * @param {int}     cfg.serviceId	                Shipping service ID (Express, Standard or Saving). Use API FindAvailableServices or look up from Service List.
     * @param {int}     cfg.weight	                  Weight (gram).
     * @param {int}     cfg.length	                  Length (cm).
     * @param {int}     cfg.width	                    Width (cm).
     * @param {int}     cfg.height	                  Height (cm).
     * @param {int}     [cfg.insuranceFee=0]	        Use to declare parcel value. GHN will base on this value for compensation if any unexpected things happen (lost, broken...). Maximum 10.000.000
     * @param {int[]}   [cfg.extraServices]           Extra Service ID to use
     * @param {int}     [cfg.codAmount=0]	            Amount cash to collect. Maximum 50.000.000
     * @param {string}  [cfg.note]	                  Client note for shipper. Ex: Please call before delivery
     * @param {string}  [cfg.returnContactName]	      Contact name to return parcels
     * @param {string}  [cfg.returnContactPhone]	    Contact phone number to return parcels
     * @param {string}  [cfg.returnAddress]	          Address return parcels
     * @param {int}     [cfg.returnDistrictId]	      District ID return parcels
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf ghn
     */

  }, {
    key: "createOrder",
    value: function createOrder(cfg) {
      var params = {
        PaymentTypeID: 2,
        FromDistrictID: cfg.fromDistrictId,
        FromWardCode: cfg.fromWardCode,
        ToDistrictID: cfg.toDistrictId,
        ToWardCode: cfg.toWardCode,
        ClientContactName: cfg.clientContactName,
        ClientContactPhone: cfg.clientContactPhone,
        ClientAddress: cfg.clientAddress,
        CustomerName: cfg.customerName,
        CustomerPhone: cfg.customerPhone,
        ShippingAddress: cfg.shippingAddress,
        NoteCode: cfg.noteCode,
        ServiceID: cfg.serviceId,
        Weight: cfg.weight,
        Length: cfg.length,
        Width: cfg.width,
        Height: cfg.height,
        InsuranceFee: cfg.insuranceFee || 0,
        CoDAmount: cfg.codAmount || 0,
        Note: cfg.note,
        ReturnContactName: cfg.returnContactName,
        ReturnContactPhone: cfg.returnContactPhone,
        ReturnAddress: cfg.returnAddress,
        ReturnDistrictId: cfg.returnDistrictId,
        ExternalReturnCode: cfg.returnContactName + cfg.returnContactPhone + cfg.returnAddress,
        AffiliateID: this.getClientId()
      };
      if (cfg.extraServices && cfg.extraServices.length) params.ShippingOrderCosts = cfg.extraServices.map(function (i) {
        return {
          ServiceID: i
        };
      });
      return (0, _axios.default)({
        url: this.getEndpoint() + 'CreateOrder',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: _objectSpread({
          token: this.getToken()
        }, params)
      }).then(function (_ref15) {
        var response = _ref15.data;
        if (response.code === 0) return _apiCode.apiCode.getMessage({
          status_code: 500,
          error_message: response
        });
        return _apiCode.apiCode.getMessage({
          status_code: 200,
          data: response.data
        });
      }).catch(function (_ref16) {
        var response = _ref16.response;
        return _apiCode.apiCode.getMessage({
          status_code: 500,
          custom: response.data
        });
      });
    }
  }]);

  return ghn;
}();

exports.ghn = ghn;