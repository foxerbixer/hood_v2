'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _socket3 = require('./socket');

var _socket4 = _interopRequireDefault(_socket3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  function App() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, App);

    Object.assign(this, params);
    this.log = this.getLogger();
    this.init();
  }

  (0, _createClass3.default)(App, [{
    key: 'getLogger',
    value: function getLogger(params) {
      return _bunyan2.default.createLogger(Object.assign({
        name: 'app',
        level: 'trace'
      }, params));
    }
  }, {
    key: 'getDataBase',
    value: function getDataBase() {
      var _this = this;

      return {
        run: function run() {
          new Promise(function (resolve) {
            _mongoose2.default.connect(_this.config.db.url, { useNewUrlParser: true });
            resolve();
          });
        }
      };
    }
  }, {
    key: 'getModels',
    value: function getModels() {
      return (0, _models2.default)(this);
    }
  }, {
    key: 'getMiddlewares',
    value: function getMiddlewares() {
      return (0, _middlewares2.default)(this);
    }
  }, {
    key: 'init',
    value: function init() {
      this.log.info('App init');
      this.app = (0, _express2.default)();
      this.httpServer = _http2.default.Server(this.app);
      this.io = (0, _socket2.default)(this.httpServer);
      this.db = this.getDataBase();
      this.middlewares = (0, _middlewares2.default)();
      this.log.info('middlewares', Object.keys(this.middlewares));
      this.models = this.getModels();
      this.log.info('models', Object.keys(this.models));
      this.passport = _passport2.default;

      this.useMiddlewares();
      this.getRoutes();
      this.middlewares.passport(_passport2.default, this);
      this.getSocket();

      this.app.use(_express2.default.static('./client/build'));
      this.app.get('*', function (req, res) {
        res.sendFile(_path2.default.resolve(__dirname, 'client', 'build', 'index.html'));
      });
    }
  }, {
    key: 'useMiddlewares',
    value: function useMiddlewares() {
      this.app.use(this.middlewares.reqParser), this.app.use(this.middlewares.compress), this.app.use(this.passport.initialize());
    }
  }, {
    key: 'getRoutes',
    value: function getRoutes() {
      var api = (0, _api2.default)(this);
      this.app.use('/api/users', api.users);
      this.app.use('/api/profile', api.profile);
      this.app.use('/api/posts', api.post);
    }
  }, {
    key: 'getSocket',
    value: function getSocket() {
      return (0, _socket4.default)(this);
    }
  }, {
    key: 'run',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.log.info('App run');
                _context.prev = 1;
                _context.next = 4;
                return this.db.run();

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](1);

                this.log.total(_context.t0);

              case 9:
                return _context.abrupt('return', new Promise(function (resolve) {
                  _this2.httpServer.listen(_this2.config.port, function () {
                    _this2.log.info('App "' + _this2.config.name + '" is working on port ' + _this2.config.port);
                    resolve(_this2);
                  });
                }));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6]]);
      }));

      function run() {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return App;
}();

exports.default = App;