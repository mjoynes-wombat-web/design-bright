/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

var _dotenv = __webpack_require__(3);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = __webpack_require__(4);

var _morgan2 = _interopRequireDefault(_morgan);

var _fs = __webpack_require__(5);

var _fs2 = _interopRequireDefault(_fs);

var _http = __webpack_require__(6);

var _http2 = _interopRequireDefault(_http);

var _https = __webpack_require__(7);

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dotenv$config$parsed = _dotenv2.default.config().parsed,
    _dotenv$config$parsed2 = _dotenv$config$parsed.HTTP_PORT,
    HTTP_PORT = _dotenv$config$parsed2 === undefined ? 80 : _dotenv$config$parsed2,
    _dotenv$config$parsed3 = _dotenv$config$parsed.HTTPS_PORT,
    HTTPS_PORT = _dotenv$config$parsed3 === undefined ? 437 : _dotenv$config$parsed3,
    STATUS = _dotenv$config$parsed.STATUS,
    _dotenv$config$parsed4 = _dotenv$config$parsed.HOST,
    HOST = _dotenv$config$parsed4 === undefined ? '0.0.0.0' : _dotenv$config$parsed4;

var app = (0, _express2.default)();

if (STATUS !== undefined) {
  app.use((0, _morgan2.default)(STATUS));
}

app.use(_express2.default.static('./dist'));

app.get('/', function (req, res) {
  console.log('test');
  res.sendFile('./dist', 'index.html');
});

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.resolve('./dist', 'index.html'));
});

_http2.default.createServer(function (req, res) {
  console.log('HTTP redirects to HTTPS');
  var hostname = req.headers.host.match(/:/g) ? req.headers.host.slice(0, req.headers.host.indexOf(':')) : req.headers.host;
  var redirect = 'https://' + hostname + ':' + HTTPS_PORT + req.url;
  console.log(redirect);
  res.writeHead(301, { Location: redirect });
  res.end();
}).listen(HTTP_PORT, HOST);

_https2.default.createServer({
  key: _fs2.default.readFileSync('./private.key'),
  cert: _fs2.default.readFileSync('./certificate.pem')
}, app).listen(HTTPS_PORT, HOST, function () {
  console.log('Design Bright site running on ' + HOST + ':' + HTTPS_PORT + '.');
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ })
/******/ ]);