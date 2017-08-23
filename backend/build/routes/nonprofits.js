'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _nonprofits = require('../models/nonprofits');

var _requireAuth = require('../helpers/requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _Auth = require('../models/Auth0');

var _response = require('../helpers/response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

router.post('/create', (req, res) => {
  (0, _nonprofits.addNonProfit)(req.body, results => {
    res.status(results.status).json(results);
  }, error => {
    res.json(error);
  });
});

router.get('/:accessToken', (req, res) => {
  const accessToken = req.params.accessToken;
  if ((0, _requireAuth2.default)(accessToken)) {
    (0, _Auth.getUserInfo)(accessToken, user => {
      const nonprofitId = user.app_metadata.nonProfitID;
      (0, _nonprofits.findNonProfitByID)(nonprofitId, results => results === null ? (0, _response2.default)(404, { nonprofitId }, 'This account belongs to a non-profit that doesn\'t exist. Please contact support.', res) : (0, _response2.default)(200, results.dataValues, `You have successfully retrieved the nonprofit's info that has the id of ${user.app_metadata.nonProfitID}.`, res), error => (0, _response2.default)(500, error, 'There was an issue retrieving the non-profit information from the database. Please contact support.', res));
    }, error => (0, _response2.default)(error.statusCode, error.original, 'This access token is not authorized.', res));
  }
});

exports.default = router;
//# sourceMappingURL=nonprofits.js.map