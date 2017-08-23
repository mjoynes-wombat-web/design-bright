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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNonProfit = exports.findNonProfitByID = exports.findNonProfitByEIN = undefined;

var _db = __webpack_require__(12);

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var findNonProfitByEIN = exports.findNonProfitByEIN = function findNonProfitByEIN(ein, success, error) {
  db.nonProfits.find({ where: { ein: ein } }).then(function (results) {
    return success(results);
  }).catch(function (err) {
    return error(err);
  });
};

var findNonProfitByID = exports.findNonProfitByID = function findNonProfitByID(nonprofitId, success, error) {
  db.nonProfits.find({ where: { nonprofitId: nonprofitId } }).then(function (results) {
    return success(results);
  }).catch(function (err) {
    return error(err);
  });
};

var addNonProfit = exports.addNonProfit = function addNonProfit(nonProfitData, success, error) {
  findNonProfitByEIN(nonProfitData.ein, function (findResults) {
    if (findResults !== null) {
      var nonProfit = findResults;
      nonProfit.status = 200;
      return success(nonProfit);
    }
    db.nonProfits.create(nonProfitData).then(function (createResults) {
      var nonProfit = createResults;
      nonProfit.status = 201;
      return success(nonProfit);
    }).catch(function (createError) {
      return error(createError);
    });
  }, error);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfo = exports.createNewUser = undefined;

var _axios = __webpack_require__(14);

var _axios2 = _interopRequireDefault(_axios);

var _dotenv = __webpack_require__(1);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _auth0Js = __webpack_require__(15);

var _auth0Js2 = _interopRequireDefault(_auth0Js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dotenv$config$parsed = _dotenv2.default.config().parsed,
    AUTH0_API_ID = _dotenv$config$parsed.AUTH0_API_ID,
    AUTH0_API_SECRET = _dotenv$config$parsed.AUTH0_API_SECRET,
    AUTH0_DOMAIN = _dotenv$config$parsed.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID = _dotenv$config$parsed.AUTH0_CLIENT_ID;

var clientWebAuth = new _auth0Js2.default.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID
});

var createNewUser = exports.createNewUser = function createNewUser(_ref, success, error) {
  var email = _ref.email,
      password = _ref.password,
      user_metadata = _ref.user_metadata,
      app_metadata = _ref.app_metadata;

  _axios2.default.post('https://designbright.auth0.com/oauth/token', {
    client_id: AUTH0_API_ID,
    client_secret: AUTH0_API_SECRET,
    audience: 'https://designbright.auth0.com/api/v2/',
    grant_type: 'client_credentials'
  }, { 'content-type': 'application/json' }).then(function (results) {
    _axios2.default.post('https://designbright.auth0.com/api/v2/users', {
      connection: 'Username-Password-Authentication',
      email: email,
      name: email,
      password: password,
      user_metadata: user_metadata,
      app_metadata: {
        userType: app_metadata.userType,
        nonProfitID: app_metadata.nonProfitID
      }
    }, {
      headers: {
        Authorization: 'Bearer ' + results.data.access_token,
        'content-type': 'application/json'
      }
    }).then(function (newUser) {
      return success(newUser);
    }).catch(function (userErr) {
      return error(userErr);
    });
  }).catch(function (authErr) {
    return error(authErr);
  });
};

var getUserInfo = exports.getUserInfo = function getUserInfo(accessToken, callback, error) {
  clientWebAuth.client.userInfo(accessToken, function (userErr, user) {
    if (userErr) {
      return error(userErr);
    }
    return callback(user);
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var jsonResponse = function jsonResponse(statusCode, data, message, res) {
  var response = {
    statusCode: statusCode,
    data: data,
    message: message
  };
  return res.status(response.statusCode).json(response);
};

exports.default = jsonResponse;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _morgan = __webpack_require__(6);

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = __webpack_require__(1);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cors = __webpack_require__(7);

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = __webpack_require__(9);

var _fs2 = _interopRequireDefault(_fs);

var _https = __webpack_require__(10);

var _https2 = _interopRequireDefault(_https);

var _users = __webpack_require__(11);

var _users2 = _interopRequireDefault(_users);

var _nonprofits = __webpack_require__(16);

var _nonprofits2 = _interopRequireDefault(_nonprofits);

var _campaigns = __webpack_require__(18);

var _campaigns2 = _interopRequireDefault(_campaigns);

var _advisor = __webpack_require__(19);

var _advisor2 = _interopRequireDefault(_advisor);

var _help = __webpack_require__(20);

var _help2 = _interopRequireDefault(_help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grabbing Environment Variables
// Import Dependencies
var _dotenv$config$parsed = _dotenv2.default.config().parsed,
    _dotenv$config$parsed2 = _dotenv$config$parsed.API_PORT,
    API_PORT = _dotenv$config$parsed2 === undefined ? 3000 : _dotenv$config$parsed2,
    STATUS = _dotenv$config$parsed.STATUS,
    _dotenv$config$parsed3 = _dotenv$config$parsed.HOST,
    HOST = _dotenv$config$parsed3 === undefined ? '0.0.0.0' : _dotenv$config$parsed3,
    PRIVATE_KEY_FILE = _dotenv$config$parsed.PRIVATE_KEY_FILE,
    CERTIFICATE_FILE = _dotenv$config$parsed.CERTIFICATE_FILE;

// Setting up the express application.


// Import Routes


var app = (0, _express2.default)();

// Setting the morgan logger to the development status if it exists
if (STATUS !== undefined) {
  app.use((0, _morgan2.default)(STATUS));
}

var whitelist = ['https://192.168.86.200:3002', 'https://192.168.1.9:3002', 'https://165.227.7.212', 'https://www.designbright.org'];

var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use((0, _cors2.default)(corsOptions));

app.use(_bodyParser2.default.json());

// Setting up the API routes.
app.use('/api/users', _users2.default);
app.use('/api/nonprofits', _nonprofits2.default);
app.use('/api/campaigns', _campaigns2.default);
app.use('/api/advisor', _advisor2.default);
app.use('/api/help', _help2.default);

_https2.default.createServer({
  key: _fs2.default.readFileSync(PRIVATE_KEY_FILE),
  cert: _fs2.default.readFileSync(CERTIFICATE_FILE)
}, app).listen(API_PORT, HOST, function () {
  console.log('Design Bright API running on ' + HOST + ':' + API_PORT + '.');
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _nonprofits = __webpack_require__(2);

var _Auth = __webpack_require__(3);

var _response = __webpack_require__(4);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create API Users Router
var router = (0, _express.Router)();

/*
******USER ROUTES******
*/

// Accepts a new user information. Returns a confirmation message.
router.post('/create', function (req, res) {
  if (req.body.userInfo.app_metadata.userType === 'non-profit') {
    var NonProfit = function NonProfit(_ref) {
      var name = _ref.name,
          ein = _ref.ein,
          address = _ref.address,
          city = _ref.city,
          state = _ref.state,
          zip = _ref.zip;
      return {
        name: name,
        ein: ein,
        address: address,
        city: city,
        state: state,
        zip: zip
      };
    };
    var newNonProfit = NonProfit(req.body.nonProfitInfo);
    (0, _nonprofits.addNonProfit)(newNonProfit, function (nonprofit) {
      var newUser = req.body.userInfo;
      newUser.app_metadata.nonProfitID = String(nonprofit.dataValues.nonprofitId);
      (0, _Auth.createNewUser)(newUser, function (createdUser) {
        var newUserData = createdUser.data;
        return (0, _response2.default)(201, newUserData, 'Your user was successfully created.', res);
      }, function (error) {
        var _error$response$data = error.response.data,
            statusCode = _error$response$data.statusCode,
            message = _error$response$data.message;


        return (0, _response2.default)(statusCode, newUser.email, message, res);
      });
      // If user fails delete non-profit if new.
    }, function (addNonProfitError) {
      return (0, _response2.default)(500, addNonProfitError, 'There was an error adding the non-profit to the database.');
    });
  } else {
    var newUser = req.body.userInfo;
    newUser.app_metadata.nonProfitID = '';
    (0, _Auth.createNewUser)(newUser, function (createdUser) {
      var newUserData = createdUser.data;
      return (0, _response2.default)(201, newUserData, 'Your user was successfully created.', res);
    }, function (error) {
      var _error$response$data2 = error.response.data,
          statusCode = _error$response$data2.statusCode,
          message = _error$response$data2.message;


      return (0, _response2.default)(statusCode, { email: newUser.email }, message, res);
    });
  }
});

// Accepts new information for the user with the userId param.
// Returns the updated user information. Requires authorization.
router.patch('/:userId/edit', function (req, res) {
  res.send('\n  Accepts new information for the user with the id of ' + req.params.userId + '. \n  Returns the updated user information. Requires authorization.\n  ');
});

// Exporting router as default.
exports.default = router;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.advisors = exports.campaignContent = exports.campaignImages = exports.campaigns = exports.nonProfits = exports.sequelize = undefined;

var _sequelize = __webpack_require__(13);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _dotenv = __webpack_require__(1);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dotenv$config$parsed = _dotenv2.default.config().parsed,
    DB_NAME = _dotenv$config$parsed.DB_NAME,
    DB_USER = _dotenv$config$parsed.DB_USER,
    DB_PASS = _dotenv$config$parsed.DB_PASS,
    DB_HOST = _dotenv$config$parsed.DB_HOST,
    DB_SCHEMA = _dotenv$config$parsed.DB_SCHEMA,
    DB_PORT = _dotenv$config$parsed.DB_PORT;

var sequelize = exports.sequelize = new _sequelize2.default(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_SCHEMA,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    ssl: 0
  }
});

var nonProfits = exports.nonProfits = sequelize.define('nonprofits', {
  nonprofitId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'nonprofit_id'
  },
  name: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'name'
  },
  address: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'address'
  },
  city: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'city'
  },
  state: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'state'
  },
  zip: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    field: 'zip'
  },
  ein: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    unique: true,
    field: 'ein'
  }
}, {
  tableName: 'nonprofits'
});

var campaigns = exports.campaigns = sequelize.define('campaigns', {
  campaignId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'campaign_id'
  },
  name: {
    type: _sequelize2.default.STRING(100),
    allowNull: false,
    unique: true,
    field: 'name'
  },
  nonprofitId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    references: {
      model: 'nonprofits',
      key: 'nonprofit_id'
    },
    field: 'nonprofit_id'
  },
  length: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    field: 'length'
  },
  fundingNeeded: {
    type: _sequelize2.default.DECIMAL,
    allowNull: false,
    field: 'funding_needed'
  },
  donationsMade: {
    type: _sequelize2.default.DECIMAL,
    allowNull: false,
    field: 'donations_made'
  },
  startDate: {
    type: _sequelize2.default.DATE,
    allowNull: true,
    field: 'start_date'
  },
  endDate: {
    type: _sequelize2.default.DATE,
    allowNull: true,
    field: 'end_date'
  }
}, {
  tableName: 'campaigns'
});

var campaignImages = exports.campaignImages = sequelize.define('campaign_images', {
  imageId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'image_id'
  },
  contentId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    references: {
      model: 'campaign_content',
      key: 'content_id'
    },
    field: 'content_id'
  },
  imageDescription: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'image_description'
  },
  imageUrl: {
    type: _sequelize2.default.TEXT,
    allowNull: false,
    field: 'image_url'
  }
}, {
  tableName: 'campaign_images'
});

var campaignContent = exports.campaignContent = sequelize.define('campaign_content', {
  contentId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    field: 'content_id'
  },
  campaignId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    references: {
      model: 'campaigns',
      key: 'campaign_id'
    },
    field: 'campaign_id'
  },
  content: {
    type: _sequelize2.default.TEXT,
    allowNull: false,
    field: 'content'
  },
  contentStatus: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'content_status'
  },
  createdDate: {
    type: _sequelize2.default.DATE,
    allowNull: false,
    field: 'created_date'
  }
}, {
  tableName: 'campaign_content'
});

var advisors = exports.advisors = sequelize.define('advisors', {
  advisorId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'advisor_id'
  },
  firstName: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'last_name'
  },
  email: {
    type: _sequelize2.default.STRING(100),
    allowNull: false,
    unique: true,
    field: 'email'
  },
  position: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'position'
  },
  yearsExperience: {
    type: _sequelize2.default.DECIMAL,
    allowNull: false,
    field: 'years_experience'
  },
  advisorStatus: {
    type: _sequelize2.default.STRING(75),
    allowNull: false,
    field: 'advisor_status'
  },
  nonprofitId: {
    type: _sequelize2.default.INTEGER(11),
    allowNull: true,
    references: {
      model: 'nonprofits',
      key: 'nonprofit_id'
    },
    unique: true,
    field: 'nonprofit_id'
  }
}, {
  tableName: 'advisors'
});

sequelize.sync();

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("auth0-js");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _nonprofits = __webpack_require__(2);

var _requireAuth = __webpack_require__(17);

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _Auth = __webpack_require__(3);

var _response = __webpack_require__(4);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/create', function (req, res) {
  (0, _nonprofits.addNonProfit)(req.body, function (results) {
    res.status(results.status).json(results);
  }, function (error) {
    res.json(error);
  });
});

router.get('/:accessToken', function (req, res) {
  var accessToken = req.params.accessToken;
  if ((0, _requireAuth2.default)(accessToken)) {
    (0, _Auth.getUserInfo)(accessToken, function (user) {
      var nonprofitId = user.app_metadata.nonProfitID;
      (0, _nonprofits.findNonProfitByID)(nonprofitId, function (results) {
        return results === null ? (0, _response2.default)(404, { nonprofitId: nonprofitId }, 'This account belongs to a non-profit that doesn\'t exist. Please contact support.', res) : (0, _response2.default)(200, results.dataValues, 'You have successfully retrieved the nonprofit\'s info that has the id of ' + user.app_metadata.nonProfitID + '.', res);
      }, function (error) {
        return (0, _response2.default)(500, error, 'There was an issue retrieving the non-profit information from the database. Please contact support.', res);
      });
    }, function (error) {
      return (0, _response2.default)(error.statusCode, error.original, 'This access token is not authorized.', res);
    });
  }
});

exports.default = router;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var requireAuth = function requireAuth(accessToken) {
  if (accessToken && accessToken.length === 16) {
    return true;
  }
  return false;
};

exports.default = requireAuth;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var router = (0, _express.Router)();

/*
******CAMPAIGN ROUTES******
*/

// Returns the list of campaigns based on the search as sort queries.
// Create API Users Router
router.get('/', function (req, res) {
  if (Object.keys(req.query).length > 0) {
    var search = req.query.search;
    var sort = req.query.sort;
    if (sort && search) {
      res.send('\n        Returns campaigns filtered by ' + search + ' and sorted by ' + sort + '.\n      ');
    } else if (sort) {
      res.send('\n        Returns all campaigns sorted by ' + sort + '.\n      ');
    } else if (search) {
      res.send('\n        Returns campaigns filtered by ' + req.query.search + '\n      ');
    }
  } else {
    res.send('Returns all campaigns paginated.');
  }
});

// Returns the information for the campaign with the campaignId param.
router.get('/:campaignId', function (req, res) {
  var id = req.params.campaignId;
  if (!isNaN(id)) {
    res.send('\n    Returns the campaign information for the campaign with the id of ' + req.params.campaignId + '\n    ');
  } else {
    res.status(404).send('\n    You provided ' + id + ' for an id but it is not a number. Please provide a number.\n    ');
  }
});

// Accepts information changes to a campaign with the campaignId param.
// Returns the update campaign information.
router.patch('/:campaignId/edit', function (req, res) {
  var id = req.params.campaignId;
  if (!isNaN(id)) {
    res.send('\n    Accepts new information for the campaign with the id of ' + id + '.\n    Returns the newly updated campaign information for that campaign.\n  ');
  } else {
    res.send('\n    You provided ' + id + ' for an id but it is not a number. Please provide a number.\n    ');
  }
});

// Accepts a new campaign information. Returns the new created campaign.
router.post('/create', function (req, res) {
  res.send('\n  Accepts a new campaign.\n  Returns the newly created campaign information for that campaign.\n  ');
});

// Exporting router as default.
exports.default = router;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var router = (0, _express.Router)();

/*
******ADVISOR ROUTES******
*/

// Accepts a new advisor request. Returns a confirmation message.
// Create API Users Router
router.post('/', function (req, res) {
  res.json({
    status: 200,
    message: '\n    Accepts a new advisor request. Returns a confirmation message.\n    '
  });
});

// Exporting router as default.
exports.default = router;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var router = (0, _express.Router)();

/*
******HELP ROUTES******
*/

// Accepts a help contact request. Returns a confirmation message.
// Create API Users Router
router.post('/', function (req, res) {
  res.send('\n  Accepts a help contact request. Returns a confirmation message.\n  ');
});

// Exporting router as default.
exports.default = router;

/***/ })
/******/ ]);