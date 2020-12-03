"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adapterCache = void 0;

var _redis = _interopRequireDefault(require("redis"));

var _utilities = require("omoeo-helper/utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var expire = 24 * 3600;

var redisCache =
/*#__PURE__*/
function () {
  function redisCache() {
    _classCallCheck(this, redisCache);

    this.client = _redis.default.createClient({
      host: 'localhost',
      port: '6379',
      prefix: process.env.CACHE_PREFIX
    });
  }

  _createClass(redisCache, [{
    key: "add",
    value: function add(key, value) {
      var groupKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.client.setex(key, expire, JSON.stringify(value));

      if (groupKey) {
        this.groupCache(groupKey, key);
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      var _this = this;

      return new Promise(function (fulfill, reject) {
        _this.client.get(key, function (err, obj) {
          if (err) reject(err);else {
            fulfill(JSON.parse(obj));
          }
        });
      }).catch(function () {
        return null;
      });
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      this.client.del(key);
    }
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.client.flushall();
    }
  }, {
    key: "generateKey",
    value: function generateKey(key, params) {
      return _utilities._string.hashString(key + JSON.stringify(params));
    }
  }, {
    key: "groupCache",
    value: function groupCache(tagKey, value) {
      this.client.sadd(tagKey, value);
    }
  }, {
    key: "deleteGroupCache",
    value: function deleteGroupCache(tagKey) {
      var _this2 = this;

      this.client.smembers(tagKey, function (err, obj) {
        if (obj) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              _this2.delete(item);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          _this2.delete(tagKey);
        }
      });
    }
  }]);

  return redisCache;
}();

var groupKey = {
  resource: 'resource',
  privilege: 'privilege',
  role: 'role',
  class: 'class',
  media: 'media',
  user: 'user',
  location: 'location',
  campaign: 'campaign',
  campaignUser: 'campaignUser',
  question: 'question',
  center: 'center',
  answer: 'answer',
  lab: 'lab',
  level: 'level',
  term: 'term',
  unit: 'unit',
  coupon: 'coupon',
  account: 'account',
  warehouse: 'warehouse',
  option: 'option',
  subscriber: 'subscriber',
  package: 'package',
  order: 'order',
  ticket: 'ticket',
  stringee: 'stringee',
  product: 'product',
  productTerm: 'productTerm',
  statistic: 'statistic',
  gift: 'gift',
  organization: 'organization',
  surcharge: 'surcharge',
  receipt: 'receipt'
};

var adapterCache = function adapterCache() {
  var service = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'redis';
  var prefix = arguments.length > 1 ? arguments[1] : undefined;
  var adapter;
  if (service === 'redis') adapter = new redisCache(prefix);
  return Object.assign(adapter, {
    groupKey: groupKey
  });
};

exports.adapterCache = adapterCache;