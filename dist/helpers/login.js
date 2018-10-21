'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateLoginInput = function validateLoginInput(data) {
  var errors = {};

  data.email = !_lodash2.default.isEmpty(data.email) ? data.email : '';
  data.password = !_lodash2.default.isEmpty(data.password) ? data.password : '';

  // EMAIL
  if (!_validator2.default.isEmail(data.email)) errors.email = 'Email is invalid';
  if (_validator2.default.isEmpty(data.email)) errors.email = 'Email is required';

  // PASSWORD
  if (!_validator2.default.isLength(data.password, { min: 6, max: 25 })) {
    errors.password = 'Password must be between 6 and 25';
  }
  if (_validator2.default.isEmpty(data.password)) errors.password = 'Password is required';

  return {
    errors: errors,
    isValid: _lodash2.default.isEmpty(errors)
  };
};

exports.default = validateLoginInput;