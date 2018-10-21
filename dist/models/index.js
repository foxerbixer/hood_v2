'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx) {
  var _require, _require2, _require3;

  return {
    Post: (_require = require('./Post')).default.apply(_require, arguments),
    Profile: (_require2 = require('./Profile')).default.apply(_require2, arguments),
    User: (_require3 = require('./User')).default.apply(_require3, arguments)
  };
};