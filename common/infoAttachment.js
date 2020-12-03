"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoAttachment = void 0;

var _utilities = require("omoeo-helper/utilities");

var _ = require("./");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var infoAttachment =
/*#__PURE__*/
function () {
  function infoAttachment() {
    _classCallCheck(this, infoAttachment);
  }

  _createClass(infoAttachment, null, [{
    key: "attach",

    /**
     * Attach additional information to source based on criteria
     * @param {string} service Name of service to get information
     * @param {object} source Source will carry attached information
     * @param {string[]|string} infoKeys
     * If #infoKeys is an array. It includes fields needed to get information. This is present with the following format: [field_name/present_name]
     *                            For example: If `full_name` field is the field to get information, but it must be displayed as `student_name` in carry object so the the format should be 'full_name/student_name'
     *                            `present_name` is an alternative and not required.
     * A string otherwise. It is a name key for store all information.
     * @param {string} getKey Id of resource would be referred to get information
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf infoAttachment
     */
    value: function attach(service, source, infoKeys, getKey) {
      if (!source.data || _utilities.utils.isEmpty(source.data[getKey])) return Promise.resolve(source);
      return (0, _.apiAdapter)(service, {
        'info-attach-request': true
      }).get("/view/".concat(source.data[getKey])).then(function (_ref) {
        var info = _ref.data;

        if (info.data) {
          if (_utilities.utils.isArray(infoKeys)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = infoKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                var _key$split = key.split('/'),
                    _key$split2 = _slicedToArray(_key$split, 2),
                    primaryKey = _key$split2[0],
                    alterKey = _key$split2[1];

                var assignKey = alterKey || primaryKey;
                source.data[assignKey] = info.data[primaryKey];
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
          } else source.data[infoKeys] = info.data;
        }

        return source;
      });
    }
    /**
     * Attach a list of info
     * @param {string} service Name of service to get information
     * @param {object} source Source will carry attached information
     * @param {string} keySignal key name to store info list
     * @param {string} [keyRef] Id of resource would be referred to get information, this NULL will make it to `keySignal`
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf infoAttachment
     */

  }, {
    key: "attachList",
    value: function attachList(service, source, keySignal, keyRef) {
      keyRef = keyRef || keySignal;
      if (!source.data || _utilities.utils.isEmpty(source.data[keyRef])) return Promise.resolve(source);
      return (0, _.apiAdapter)(service, {
        'info-attach-request': true
      }).get('/list', {
        params: {
          id: source.data[keyRef],
          status: 'publish',
          limit: null
        }
      }).then(function (_ref2) {
        var result = _ref2.data;
        if (result.status_code === 200) source.data[keySignal] = result.data.rows;
        return source;
      });
    }
    /**
     * Return info of location
     * @param {Object} source Data source to place info
     * @param {Object} [keyMap] Key to get info
     * @param {{keyGet, keyStore}} [keyMap.city]
     * @param {{keyGet, keyStore}} [keyMap.district]
     * @returns {Promise<{status_code: number, description: string, data: object}>}
     * @memberOf infoAttachment
     */

  }, {
    key: "attachLocationInfo",
    value: function attachLocationInfo(source) {
      var keyMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _keyMap$city = keyMap.city,
          city = _keyMap$city === void 0 ? {
        keyGet: 'city_id',
        keyStore: 'city_name'
      } : _keyMap$city,
          _keyMap$district = keyMap.district,
          district = _keyMap$district === void 0 ? {
        keyGet: 'district_id',
        keyStore: 'district_name'
      } : _keyMap$district;
      if (!source.data || _utilities.utils.isAnyEmpty(source.data[city.keyGet], source.data[district.keyGet])) return Promise.resolve(source);
      var promise = [];
      var locationAdapter = (0, _.apiAdapter)('location', {
        'info-attach-request': true
      });
      promise.push(source.data[city.keyGet] ? locationAdapter.get("/view/city/".concat(source.data[city.keyGet])) : {});
      promise.push(source.data[district.keyGet] ? locationAdapter.get("/view/district/".concat(source.data[district.keyGet])) : {});
      return Promise.all(promise).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            cityInfo = _ref4[0].data,
            districtInfo = _ref4[1].data;

        if (cityInfo.data) source.data[city.keyStore] = cityInfo.data.city_name;
        if (districtInfo.data) source.data[district.keyStore] = districtInfo.data.district_name;
        return source;
      });
    }
    /**
     * Add media to source
     * @param {object} source
     * @param {object} [config={}]
     * @param {string} [config.key=media_id] Name of key to matching
     * @param {boolean} [config.recursive=false] `true` to make deeply matching
     * @param {string} [config.store_key=media] name of key will store info
     * Source of list has format of data as the following:
     *      {
     *        status_code: 200,
     *        data: {
     *          total: 2,
     *          rows: [{
     *            id: 1,
     *            name: 'a'
     *          }, {
     *            id: 2,
     *            name: 'b'
     *          }]
     *        }
     *      }
     *
     * @return {Promise<any>|Promise<{data: any} | [AxiosResponse<any>, any, any, any, any, any, any, any, any, any]>}
     * @memberOf infoAttachment
     */

  }, {
    key: "attachMediaInfo",
    value: function attachMediaInfo(source) {
      var _this = this;

      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!source.data) return Promise.resolve(source); // Pluck data

      var mediaIdArray = this._pluckMediaId(source, config);

      if (!mediaIdArray.length) return Promise.resolve(source); // Get a chunk of media

      return (0, _.apiAdapter)('media', {
        'info-attach-request': true
      }).get('/list', {
        params: {
          id: mediaIdArray,
          status: 'publish',
          limit: null
        }
      }).then(function (_ref5) {
        var mediasInfo = _ref5.data;
        if (mediasInfo.status_code === 200) _this._injectMedia(source, mediasInfo.data.rows, config);
        return source;
      });
    }
    /**
     * Get array of id of media
     * @param {object} source
     * @param {object} [config]
     * @param {string} [config.key=media_id] Name of key to matching
     * @param {boolean} [config.recursive=false] `true` to make deeply matching
     * @return {number[]}
     * @private
     * @memberOf infoAttachment
     */

  }, {
    key: "_pluckMediaId",
    value: function _pluckMediaId(source, config) {
      var _config$key = config.key,
          key = _config$key === void 0 ? 'media_id' : _config$key,
          _config$recursive = config.recursive,
          recursive = _config$recursive === void 0 ? false : _config$recursive;
      var dataArray = source.data.rows ? source.data.rows : _utilities.utils._toArray(source.data);
      var mediaIdArray = [];

      if (recursive) {
        var recursiveExtract = function recursiveExtract(_source) {
          // Loop each item in array
          if (_utilities.utils.isArray(_source)) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = _source[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;
                // Extract nested array
                if (_utilities.utils.isArray(item)) recursiveExtract(item); // Extract nested object

                if (_utilities.utils.isObject(item)) recursiveExtract(item);
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } // Loop value per key in object


          if (_utilities.utils.isObject(_source)) {
            for (var _i2 = 0, _Object$entries = Object.entries(_source); _i2 < _Object$entries.length; _i2++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
                  _item = _Object$entries$_i[1];

              // Extract nested array
              if (_utilities.utils.isArray(_item)) recursiveExtract(_item); // Extract nested object

              if (_utilities.utils.isObject(_item)) recursiveExtract(_item);
            }
          }

          if (_source[key] !== undefined) {
            // If info key is an array, flatten all items to the keeper (in this case is `mediaIdArray`)
            if (_utilities.utils.isArray(_source[key])) mediaIdArray = mediaIdArray.concat(_source[key]); // Just push otherwise
            else mediaIdArray.push(_source[key]);
          }
        };

        recursiveExtract(source);
      } else {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = dataArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var i = _step3.value;
            if (_utilities.utils.isArray(i[key])) mediaIdArray = mediaIdArray.concat(i[key]);else mediaIdArray.push(i[key]);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } // Remove falsy and duplicate items


      return _utilities._array.clean(mediaIdArray, true);
    }
    /**
     * Make a matching to inject media info to source
     * @param {object<{data: object | {total: number, rows: object[]}}>} source
     * @param {object[]} mediaArray
     * @param {object} [config]
     * @param {string} [config.key=media_id] Name of key to matching
     * @param {boolean} [config.recursive=false] `true` to make deeply matching
     * @param {string} [config.store_key=media] name of key will store info
     * @memberOf infoAttachment
     * @private
     */

  }, {
    key: "_injectMedia",
    value: function _injectMedia(source, mediaArray, config) {
      var _config$key2 = config.key,
          key = _config$key2 === void 0 ? 'media_id' : _config$key2,
          _config$recursive2 = config.recursive,
          recursive = _config$recursive2 === void 0 ? false : _config$recursive2,
          _config$store_key = config.store_key,
          store_key = _config$store_key === void 0 ? 'media' : _config$store_key;

      if (recursive) {
        var recursiveInject = function recursiveInject(_source) {
          var sourceId = _utilities.utils._clone(_source[key]); // Loop item in array


          if (_utilities.utils.isArray(_source)) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = _source[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var item = _step4.value;
                // Inject nested array
                if (_utilities.utils.isArray(item)) recursiveInject(item); // Inject nested object

                if (_utilities.utils.isObject(item)) recursiveInject(item);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          } // Loop value per key in object


          if (_utilities.utils.isObject(_source)) {
            for (var _i3 = 0, _Object$entries2 = Object.entries(_source); _i3 < _Object$entries2.length; _i3++) {
              var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
                  _item2 = _Object$entries2$_i[1];

              // Inject nested array
              if (_utilities.utils.isArray(_item2)) recursiveInject(_item2); // Inject nested object

              if (_utilities.utils.isObject(_item2)) recursiveInject(_item2);
            }
          } // Force initializing array to store media object


          _source[store_key] = [];
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            var _loop = function _loop() {
              var media = _step5.value;

              // If info key is an array, loop to fill the store key
              if (_utilities.utils.isArray(sourceId)) {
                sourceId.forEach(function (sid) {
                  if (media.id === Number(sid)) {
                    // Then fill
                    _source[store_key].push(media); // Then out the loop


                    return false;
                  }
                });
              } // Otherwise, just push
              else if (media.id === Number(sourceId)) {
                  _source[store_key].push(media);

                  return {
                    v: false
                  };
                }
            };

            for (var _iterator5 = mediaArray[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _ret = _loop();

              if (_typeof(_ret) === "object") return _ret.v;
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          if (!_source[store_key].length) delete _source[store_key];
        };

        recursiveInject(source.data);
      } else {
        // Pluck data
        var dataArray = source.data.rows ? source.data.rows : _utilities.utils._toArray(source.data); // Inject media

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          var _loop2 = function _loop2() {
            var sourceItem = _step6.value;

            var sourceId = _utilities.utils._clone(sourceItem[key]); // Force initializing array to store media object


            sourceItem[store_key] = []; // Loop to inject media to correct source

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              var _loop3 = function _loop3() {
                var media = _step7.value;

                // If info key is an array, loop to fill the store key
                if (_utilities.utils.isArray(sourceId)) {
                  sourceId.forEach(function (sid) {
                    if (media.id === Number(sid)) {
                      // Then fill
                      sourceItem[store_key].push(media); // Then out the loop

                      return false;
                    }
                  });
                } // Otherwise, just push
                else if (media.id === Number(sourceId)) {
                    sourceItem[store_key].push(media);
                    return "break";
                  }
              };

              for (var _iterator7 = mediaArray[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var _ret2 = _loop3();

                if (_ret2 === "break") break;
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                  _iterator7.return();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }

            if (!sourceItem[store_key].length) delete sourceItem[store_key];
          };

          for (var _iterator6 = dataArray[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        var data = dataArray.length > 1 || source.data.rows ? dataArray : dataArray[0];
        source.data = source.data.rows ? {
          total: source.data.total,
          rows: data
        } : data;
      }
    }
  }]);

  return infoAttachment;
}();

exports.infoAttachment = infoAttachment;