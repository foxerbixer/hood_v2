'use strict';

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _App2.default({ config: _config2.default });

app.run();