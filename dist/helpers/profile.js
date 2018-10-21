'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateProfileInput = function validateProfileInput(data) {
    var errors = {};

    data.handle = !_lodash2.default.isEmpty(data.handle) ? data.handle : '';
    data.status = !_lodash2.default.isEmpty(data.status) ? data.status : '';
    data.skills = !_lodash2.default.isEmpty(data.skills) ? data.skills : '';

    //handle
    if (!_validator2.default.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be betweet 2 and 40';
    }
    if (_validator2.default.isEmpty(data.handle)) errors.handle = 'Handle is required';

    // status
    if (_validator2.default.isEmpty(data.status)) errors.status = 'Status is required';

    // skills
    if (_validator2.default.isEmpty(data.skills)) errors.skills = 'Skills are required';

    // url
    if (!_lodash2.default.isEmpty(data.website)) {
        if (!_validator2.default.isURL(data.website)) {
            errors.website = 'Not valid url';
        }
    }

    // soocial
    if (!_lodash2.default.isEmpty(data.youtube)) {
        if (!_validator2.default.isURL(data.youtube)) {
            errors.youtube = 'Not valid url';
        }
    }

    if (!_lodash2.default.isEmpty(data.twitter)) {
        if (!_validator2.default.isURL(data.twitter)) {
            errors.twitter = 'Not valid url';
        }
    }

    if (!_lodash2.default.isEmpty(data.instagram)) {
        if (!_validator2.default.isURL(data.instagram)) {
            errors.instagram = 'Not valid url';
        }
    }

    if (!_lodash2.default.isEmpty(data.facebook)) {
        if (!_validator2.default.isURL(data.facebook)) {
            errors.facebook = 'Not valid url';
        }
    }

    if (!_lodash2.default.isEmpty(data.linkedin)) {
        if (!_validator2.default.isURL(data.linkedin)) {
            errors.linkedin = 'Not valid url';
        }
    }

    if (!_lodash2.default.isEmpty(data.steam)) {
        if (!_validator2.default.isURL(data.steam)) {
            errors.steam = 'Not valid url';
        }
    }

    return {
        errors: errors,
        isValid: _lodash2.default.isEmpty(errors)
    };
};

exports.default = validateProfileInput;