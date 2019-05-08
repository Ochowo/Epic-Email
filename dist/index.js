'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

require('babel-polyfill');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _index = require('./routes/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// // import morgan from 'morgan';
_dotenv2.default.config();
var app = (0, _express2.default)();

// Enable CORS
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)());
app.options('*', (0, _cors2.default)());
app.use((0, _cors2.default)({
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

// Parse incoming request data

// app.use(morgan('combined'));


// Serve ui templates
app.use(_express2.default.static('ui'));
app.use('/ui', _express2.default.static(_path2.default.resolve(__dirname, '../../ui/')));

app.use('/api/v1/auth', _index.users);
app.use('/api/v1', _index.messages);
app.use('/api/v1/groups', _index.groups);

app.get('/', function (req, res) {
  res.send('Visit /api/v1 to view API cheers!!!');
});
var port = process.env.PORT || 8000;
app.listen(process.env.PORT || 8000, function () {
  return console.log('listening on port ' + port + '....');
});
exports.default = app;