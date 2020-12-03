"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dept = require("./dept");

Object.keys(_dept).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dept[key];
    }
  });
});

var _organization = require("./organization");

Object.keys(_organization).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _organization[key];
    }
  });
});

var _agent = require("./agent");

Object.keys(_agent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _agent[key];
    }
  });
});

var _hotline = require("./hotline");

Object.keys(_hotline).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hotline[key];
    }
  });
});

var _token = require("./token");

Object.keys(_token).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _token[key];
    }
  });
});