'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPictureToCloudinary = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchPictureToCloudinary = exports.fetchPictureToCloudinary = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(picture, cnf) {
    var result, $, cloud_link;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            _cloudinary2.default.config({
              cloud_name: cnf.name,
              api_key: cnf.key,
              api_secret: cnf.secret
            });

            if (!(picture.length !== 0)) {
              _context.next = 6;
              break;
            }

            result = _cloudinary2.default.image(picture, { type: 'fetch' });
            $ = _cheerio2.default.load(result);
            cloud_link = $(result).attr().src;
            return _context.abrupt('return', cloud_link);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchPictureToCloudinary(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();