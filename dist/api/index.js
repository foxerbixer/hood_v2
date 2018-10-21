'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _require, _require2, _require3;

  return {
    users: (_require = require('./users')).default.apply(_require, arguments),
    profile: (_require2 = require('./profile')).default.apply(_require2, arguments),
    post: (_require3 = require('./posts')).default.apply(_require3, arguments)
  };
};