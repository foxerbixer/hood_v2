'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateEducationInput = function validateEducationInput(data) {
  var errors = {};

  data.school = !_lodash2.default.isEmpty(data.school) ? data.school : '';
  data.degree = !_lodash2.default.isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !_lodash2.default.isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !_lodash2.default.isEmpty(data.from) ? data.from : '';

  // school
  if (_validator2.default.isEmpty(data.school)) errors.school = 'School is required';
  // degree
  if (_validator2.default.isEmpty(data.degree)) errors.degree = 'Degree is required';
  // fieldofstudy
  if (_validator2.default.isEmpty(data.fieldofstudy)) errors.fieldofstudy = 'Field of study is required';
  // from
  if (_validator2.default.isEmpty(data.from)) errors.from = 'From is required';

  return {
    errors: errors,
    isValid: _lodash2.default.isEmpty(errors)
  };
};

exports.default = validateEducationInput;