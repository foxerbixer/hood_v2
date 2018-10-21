'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _expressAsyncRouter = require('express-async-router');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _profile2 = require('../helpers/profile');

var _profile3 = _interopRequireDefault(_profile2);

var _experience = require('../helpers/experience');

var _experience2 = _interopRequireDefault(_experience);

var _education = require('../helpers/education');

var _education2 = _interopRequireDefault(_education);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ctx) {

  var api = (0, _expressAsyncRouter.AsyncRouter)();
  var _ctx$models = ctx.models,
      Profile = _ctx$models.Profile,
      User = _ctx$models.User;

  //*** @api    GET api/profile
  //*** @desc   Get current user profile
  //*** @access Private

  api.get('/', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var _errors, profile;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _errors = {};
              _context.next = 4;
              return Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

            case 4:
              profile = _context.sent;

              if (!profile) {
                _errors.noprofile = 'There\'s no profile for this user';
                res.status(404).json(_errors);
              } else {
                res.json(profile);
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              res.status(404).json({ error: _context.t0 });

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  //*** @api    GET api/profile/all
  //*** @desc   Get all profiles
  //*** @access Public
  api.get('/all', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var _errors2, profiles;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _errors2 = {};
              _context2.next = 4;
              return Profile.find().populate('user', ['name', 'avatar']);

            case 4:
              profiles = _context2.sent;

              if (!profiles) {
                _errors2.noprofiles = 'There\'re no profiles';
                res.status(404).json(_errors2);
              } else {
                res.json(profiles);
              }
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](0);

              res.status(404).json({ error: _context2.t0 });

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 8]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  //*** @api    GET api/profile/handle/:handle
  //*** @desc   Get profile by handle
  //*** @access Public
  api.get('/handle/:handle', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var _errors3, profile;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _errors3 = {};
              _context3.next = 4;
              return Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar']);

            case 4:
              profile = _context3.sent;

              if (!profile) {
                _errors3.handle = 'There\'s no profile for this user';
                res.status(404).json(_errors3);
              } else {
                res.json(profile);
              }
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3['catch'](0);

              res.status(404).json({ error: _context3.t0 });

            case 11:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 8]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  //*** @api    GET api/profile/user/:user_id
  //*** @desc   Get profile by user ID
  //*** @access Public
  api.get('/user/:user_id', function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      var profile;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              ctx.log.info(req.params);

              _context4.next = 4;
              return Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

            case 4:
              profile = _context4.sent;

              if (!profile) {
                errors.handle = 'There\'s no profile for this user';
                res.status(404).json(errors);
              } else {
                res.json(profile);
              }

              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4['catch'](0);

              res.status(404).json({ error: _context4.t0 });

            case 11:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 8]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  //*** @api    POST api/profile
  //*** @desc   Create or edit user profile
  //*** @access Private
  api.post('/', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      var _validateProfileInput, isValid, _errors4, profilefields, profile, updatedProfile, _profile, newProfile;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _validateProfileInput = (0, _profile3.default)(req.body), isValid = _validateProfileInput.isValid, _errors4 = _validateProfileInput.errors;

              if (isValid) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt('return', res.status(400).json(_errors4));

            case 4:
              profilefields = {};

              profilefields.user = req.user.id;
              if (req.body.handle) profilefields.handle = req.body.handle;
              if (req.body.company) profilefields.company = req.body.company;
              if (req.body.website) profilefields.website = req.body.website;
              if (req.body.location) profilefields.location = req.body.location;
              if (req.body.bio) profilefields.bio = req.body.bio;
              if (req.body.status) profilefields.status = req.body.status;
              if (req.body.steam) profilefields.steam = req.body.steam;

              if ((0, _typeof3.default)(req.body.skills) !== undefined) profilefields.skills = req.body.skills.split(',');

              profilefields.social = {};
              if (req.body.youtube) profilefields.social.youtube = req.body.youtube;
              if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
              if (req.body.instagram) profilefields.social.instagram = req.body.instagram;
              if (req.body.twitter) profilefields.social.twitter = req.body.twitter;
              if (req.body.steam) profilefields.social.steam = req.body.steam;
              if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;

              _context5.next = 23;
              return Profile.findOne({ user: req.user.id });

            case 23:
              profile = _context5.sent;

              if (!profile) {
                _context5.next = 31;
                break;
              }

              _context5.next = 27;
              return Profile.findOneAndUpdate({ user: req.user.id }, { $set: profilefields }, { new: true });

            case 27:
              updatedProfile = _context5.sent;

              res.json(updatedProfile);

              _context5.next = 43;
              break;

            case 31:
              _context5.next = 33;
              return Profile.findOne({ handle: profilefields.handle });

            case 33:
              _profile = _context5.sent;

              if (!_profile) {
                _context5.next = 39;
                break;
              }

              _errors4.handle = 'This profile is already exists';
              res.json(_errors4);
              _context5.next = 43;
              break;

            case 39:
              _context5.next = 41;
              return new Profile(profilefields).save();

            case 41:
              newProfile = _context5.sent;

              res.json(newProfile);

            case 43:
              _context5.next = 48;
              break;

            case 45:
              _context5.prev = 45;
              _context5.t0 = _context5['catch'](0);

              res.status(404).json({ error: _context5.t0 });

            case 48:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 45]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  //*** @api    POST api/profile/experience
  //*** @desc   Add experience to profile
  //*** @access Private
  api.post('/experience', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
      var _validateExperienceIn, isValid, _errors5, profile, newExp, updatedProf;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _validateExperienceIn = (0, _experience2.default)(req.body), isValid = _validateExperienceIn.isValid, _errors5 = _validateExperienceIn.errors;

              if (isValid) {
                _context6.next = 4;
                break;
              }

              return _context6.abrupt('return', res.status(404).json(_errors5));

            case 4:
              _context6.next = 6;
              return Profile.findOne({ user: req.user.id });

            case 6:
              profile = _context6.sent;

              if (!profile) {
                _context6.next = 14;
                break;
              }

              newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
              };

              profile.experience.unshift(newExp);

              _context6.next = 12;
              return profile.save();

            case 12:
              updatedProf = _context6.sent;

              res.json(updatedProf);

            case 14:
              _context6.next = 19;
              break;

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6['catch'](0);

              res.status(404).json({ error: _context6.t0 });

            case 19:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 16]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  //*** @api    POST api/profile/education
  //*** @desc   Add education to profile
  //*** @access Private
  api.post('/education', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
      var _validateEducationInp, isValid, _errors6, profile, newEdu, updatedProf;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _validateEducationInp = (0, _education2.default)(req.body), isValid = _validateEducationInp.isValid, _errors6 = _validateEducationInp.errors;

              if (isValid) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt('return', res.status(404).json(_errors6));

            case 4:
              _context7.next = 6;
              return Profile.findOne({ user: req.user.id });

            case 6:
              profile = _context7.sent;

              if (!profile) {
                _context7.next = 14;
                break;
              }

              newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
              };

              profile.education.unshift(newEdu);

              _context7.next = 12;
              return profile.save();

            case 12:
              updatedProf = _context7.sent;

              res.json(updatedProf);

            case 14:
              _context7.next = 19;
              break;

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7['catch'](0);

              res.status(404).json({ error: _context7.t0 });

            case 19:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 16]]);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());

  //*** @api    DELETE api/profile/experience/:exp_id
  //*** @desc   Delete experience from profile
  //*** @access Private
  api.delete('/experience/:exp_id', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
      var profile, updatedProf;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return Profile.findOne({ user: req.user.id });

            case 3:
              profile = _context8.sent;

              if (!profile) {
                _context8.next = 10;
                break;
              }

              profile.experience = _lodash2.default.remove(profile.experience, function (item) {
                return item.id !== req.params.exp_id;
              });
              _context8.next = 8;
              return profile.save();

            case 8:
              updatedProf = _context8.sent;

              res.json(updatedProf);

            case 10:
              _context8.next = 15;
              break;

            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8['catch'](0);

              res.status(404).json({ error: _context8.t0 });

            case 15:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[0, 12]]);
    }));

    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());

  //*** @api    DELETE api/profile/education/:edu_id
  //*** @desc   Delete education from profile
  //*** @access Private
  api.delete('/education/:edu_id', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
      var profile, updatedProf;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return Profile.findOne({ user: req.user.id });

            case 3:
              profile = _context9.sent;

              if (!profile) {
                _context9.next = 10;
                break;
              }

              profile.education = _lodash2.default.remove(profile.education, function (item) {
                return item.id !== req.params.edu_id;
              });
              _context9.next = 8;
              return profile.save();

            case 8:
              updatedProf = _context9.sent;

              res.json(updatedProf);

            case 10:
              _context9.next = 15;
              break;

            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9['catch'](0);

              res.status(404).json({ error: _context9.t0 });

            case 15:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[0, 12]]);
    }));

    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());

  //*** @api    DELETE api/profile
  //*** @desc   Delete user and profile
  //*** @access Private
  api.delete('/', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
      var resp;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return Profile.findOneAndRemove({ user: req.user.id });

            case 3:
              resp = _context10.sent;

              if (!resp) {
                _context10.next = 8;
                break;
              }

              _context10.next = 7;
              return User.findOneAndRemove({ _id: req.user.id });

            case 7:
              res.json('success');

            case 8:
              _context10.next = 13;
              break;

            case 10:
              _context10.prev = 10;
              _context10.t0 = _context10['catch'](0);

              res.status(404).json({ error: _context10.t0 });

            case 13:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined, [[0, 10]]);
    }));

    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());

  return api;
};