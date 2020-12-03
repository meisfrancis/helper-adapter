"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ghn = require("./ghn");

Object.keys(_ghn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ghn[key];
    }
  });
});