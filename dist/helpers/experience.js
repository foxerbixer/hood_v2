'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateExperienceInput = function validateExperienceInput(data) {
  var errors = {};
  data.title = !_lodash2.default.isEmpty(data.title) ? data.title : '';
  data.company = !_lodash2.default.isEmpty(data.company) ? data.company : '';
  data.from = !_lodash2.default.isEmpty(data.from) ? data.from : '';

  // title
  if (_validator2.default.isEmpty(data.title)) errors.title = 'Title is required';
  // Company
  if (_validator2.default.isEmpty(data.company)) errors.company = 'Company is required';
  // from
  if (_validator2.default.isEmpty(data.from)) errors.from = 'From is required';

  return {
    errors: errors,
    isValid: _lodash2.default.isEmpty(errors)
  };
};

exports.default = validateExperienceInput;