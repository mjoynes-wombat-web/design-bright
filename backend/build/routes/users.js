'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _nonprofits = require('../models/nonprofits');

var _Auth = require('../models/Auth0');

var _response = require('../helpers/response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create API Users Router
const router = (0, _express.Router)();

/*
******USER ROUTES******
*/

// Accepts a new user information. Returns a confirmation message.
router.post('/create', (req, res) => {
  if (req.body.userInfo.app_metadata.userType === 'non-profit') {
    const NonProfit = ({ name, ein, address, city, state, zip }) => ({
      name,
      ein,
      address,
      city,
      state,
      zip
    });
    const newNonProfit = NonProfit(req.body.nonProfitInfo);
    (0, _nonprofits.addNonProfit)(newNonProfit, nonprofit => {
      const newUser = req.body.userInfo;
      newUser.app_metadata.nonProfitID = String(nonprofit.dataValues.nonprofitId);
      (0, _Auth.createNewUser)(newUser, createdUser => {
        const newUserData = createdUser.data;
        return (0, _response2.default)(201, newUserData, 'Your user was successfully created.', res);
      }, error => {
        const { statusCode, message } = error.response.data;

        return (0, _response2.default)(statusCode, newUser.email, message, res);
      });
      // If user fails delete non-profit if new.
    }, addNonProfitError => (0, _response2.default)(500, addNonProfitError, 'There was an error adding the non-profit to the database.'));
  } else {
    const newUser = req.body.userInfo;
    newUser.app_metadata.nonProfitID = '';
    (0, _Auth.createNewUser)(newUser, createdUser => {
      const newUserData = createdUser.data;
      return (0, _response2.default)(201, newUserData, 'Your user was successfully created.', res);
    }, error => {
      const { statusCode, message } = error.response.data;

      return (0, _response2.default)(statusCode, { email: newUser.email }, message, res);
    });
  }
});

// Accepts new information for the user with the userId param.
// Returns the updated user information. Requires authorization.
router.patch('/edit', (req, res) => {
  const { accessToken, editData } = req.body;
  const updatedUserInfo = editData.userInfo;

  (0, _Auth.getUserInfo)(accessToken, user => {
    (0, _Auth.editUserInfo)(user.user_id, updatedUserInfo, editUserResponse => {
      const updatedUser = editUserResponse.data;
      if (updatedUser.app_metadata.userType === 'non-profit') {
        const nonprofitId = updatedUser.app_metadata.nonProfitID;
        const updatedNonProfitInfo = editData.nonProfitInfo;

        (0, _nonprofits.editNonProfit)(nonprofitId, updatedNonProfitInfo, updatedNonProfit => {
          console.log(updatedUser);
          return (0, _response2.default)(200, {
            updatedUser,
            updatedNonProfit
          }, `${updatedUser.email.charAt(0).toUpperCase()}${updatedUser.email.slice(1)} has been updated.`, res);
        }, editNonProfitError => (0, _response2.default)(500, { editNonProfitError }, 'There was an error editing the nonprofit. Please contact support.', res));
      } else {
        return (0, _response2.default)(200, { updatedUser }, `${updatedUser.email.charAt(0).toUpperCase()}${updatedUser.email.slice(1)} has been updated.`, res);
      }
    }, editUserError => (0, _response2.default)(editUserError.response.status, { userId: user.user_id }, editUserError.response.data.message, res));
  }, findUserError => (0, _response2.default)(findUserError.statusCode, findUserError.original, 'This access token is not authorized.', res));
  // res.status(200).json(req.body);
});

// Exporting router as default.
exports.default = router;
//# sourceMappingURL=users.js.map