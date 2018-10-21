'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validatePostInput = function validatePostInput(data) {
  var errors = {};

  data.text = !_lodash2.default.isEmpty(data.text) ? data.text : '';

  // text
  if (!_validator2.default.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = 'Text must be between 1 and 100';
  }
  if (_validator2.default.isEmpty(data.text)) errors.text = 'Text is required';

  return {
    errors: errors,
    isValid: _lodash2.default.isEmpty(errors)
  };
};

exports.default = validatePostInput;