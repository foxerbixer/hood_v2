'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateRegisterInput = function validateRegisterInput(data) {
  var errors = {};

  data.name = !_lodash2.default.isEmpty(data.name) ? data.name : '';
  data.email = !_lodash2.default.isEmpty(data.email) ? data.email : '';
  data.password = !_lodash2.default.isEmpty(data.password) ? data.password : '';
  data.password2 = !_lodash2.default.isEmpty(data.password2) ? data.password2 : '';
  data.avatar = !_lodash2.default.isEmpty(data.avatar) ? data.avatar : '';

  // NAME
  if (!_validator2.default.isLength(data.name, { min: 2, max: 15 })) {
    errors.name = 'Name must be betweet 2 and 20 characters';
  }
  if (_validator2.default.isEmpty(data.name)) errors.name = 'Name is required';

  // EMAIL
  if (!_validator2.default.isEmail(data.email)) errors.email = 'Email is invalid';
  if (_validator2.default.isEmpty(data.email)) errors.email = 'Email is required';

  // PASSWORD
  if (!_validator2.default.isLength(data.password, { min: 6, max: 25 })) {
    errors.password = 'Password must be between 6 and 25';
  }
  if (_validator2.default.isEmpty(data.password)) errors.password = 'Password is required';

  // PASSWORD2
  if (_validator2.default.isEmpty(data.password2)) errors.password2 = 'Repeat password is required';
  if (!_validator2.default.equals(data.password, data.password2)) {
    errors.password2 = 'Password must match';
  }

  //AVATAR
  if (!_validator2.default.isEmpty(data.avatar) && !_validator2.default.isURL(data.avatar)) {
    errors.avatar = 'Image url is not valid';
  }

  return {
    errors: errors,
    isValid: _lodash2.default.isEmpty(errors)
  };
};

exports.default = validateRegisterInput;