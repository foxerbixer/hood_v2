'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _expressAsyncRouter = require('express-async-router');

var _gravatar = require('gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _isImageUrl = require('is-image-url');

var _isImageUrl2 = _interopRequireDefault(_isImageUrl);

var _register = require('../helpers/register');

var _register2 = _interopRequireDefault(_register);

var _login = require('../helpers/login');

var _login2 = _interopRequireDefault(_login);

var _cloudinary = require('../helpers/cloudinary');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ctx) {

  var api = (0, _expressAsyncRouter.AsyncRouter)();
  var User = ctx.models.User;

  //*** @api    POST api/users/register
  //*** @desc   Register users route
  //*** @access Public

  api.post('/register', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var _ref2, isValid, errors, isImage, user, cloud_avatar, avatar, newUser;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _register2.default)(req.body);

            case 3:
              _ref2 = _context.sent;
              isValid = _ref2.isValid;
              errors = _ref2.errors;

              if (isValid) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', res.status(400).json(errors));

            case 8:
              if (!(req.body.avatar.trim().length > 0)) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return (0, _isImageUrl2.default)(req.body.avatar);

            case 11:
              isImage = _context.sent;

              if (isImage) {
                _context.next = 14;
                break;
              }

              return _context.abrupt('return', errors.avatar = 'This image is not valid');

            case 14:
              _context.next = 16;
              return User.findOne({ email: req.body.email });

            case 16:
              user = _context.sent;

              if (!user) {
                _context.next = 22;
                break;
              }

              errors.email = 'Email already exists';
              res.status(400).json(errors);
              _context.next = 31;
              break;

            case 22:
              _context.next = 24;
              return (0, _cloudinary.fetchPictureToCloudinary)(req.body.avatar, ctx.config.cloudinary);

            case 24:
              cloud_avatar = _context.sent;
              avatar = cloud_avatar || _gravatar2.default.url(req.body.email, { s: 200, r: 'pg', d: 'mm' });
              newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
              });
              _context.next = 29;
              return _bcryptjs2.default.genSalt(10, function (err, salt) {
                _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
                  newUser.password = hash;
                  newUser.save();
                });
              });

            case 29:
              _context.next = 31;
              return res.json('success');

            case 31:
              _context.next = 36;
              break;

            case 33:
              _context.prev = 33;
              _context.t0 = _context['catch'](0);

              console.log(_context.t0);

            case 36:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 33]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  //*** @api    POST api/users/login
  //*** @desc   Return jwt
  //*** @access Public
  api.post('/login', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var _req$body, email, password, _validateLoginInput, isValid, errors, user, isMatch, payload, token;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _validateLoginInput = (0, _login2.default)(req.body), isValid = _validateLoginInput.isValid, errors = _validateLoginInput.errors;

              if (isValid) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', res.status(400).json(errors));

            case 5:
              _context2.next = 7;
              return User.findOne({ email: email });

            case 7:
              user = _context2.sent;

              if (user) {
                _context2.next = 13;
                break;
              }

              errors.email = 'User not found';
              res.status(404).json(errors);
              _context2.next = 27;
              break;

            case 13:
              _context2.next = 15;
              return _bcryptjs2.default.compare(password, user.password);

            case 15:
              isMatch = _context2.sent;

              if (!isMatch) {
                _context2.next = 25;
                break;
              }

              payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              };
              _context2.next = 20;
              return _jsonwebtoken2.default.sign(payload, ctx.config.secretOrKey, { expiresIn: 36000 * 24 });

            case 20:
              token = _context2.sent;
              _context2.next = 23;
              return res.json({ success: true, token: 'Bearer ' + token });

            case 23:
              _context2.next = 27;
              break;

            case 25:
              errors.password = 'Password incorrect';
              res.status(400).json(errors);

            case 27:
              _context2.next = 32;
              break;

            case 29:
              _context2.prev = 29;
              _context2.t0 = _context2['catch'](0);

              console.log(_context2.t0);

            case 32:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 29]]);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());
  return api;
};