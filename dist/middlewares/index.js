'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _require, _require2;

  return {
    reqParser: (_require = require('./reqParser')).default.apply(_require, arguments),
    compress: (_require2 = require('./compress')).default.apply(_require2, arguments),
    passport: require('./passport')
  };
};