'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Create API Users Router


var _express = require('express');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _Auth = require('../models/Auth0');

var _campaigns = require('../models/campaigns');

var _response = require('../helpers/response');

var _response2 = _interopRequireDefault(_response);

var _Cloudinary = require('../models/Cloudinary');

var _Cloudinary2 = _interopRequireDefault(_Cloudinary);

var _requireAuth = require('../helpers/requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = _dotenv2.default.config().parsed;

_cloudinary2.default.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET
});

const upload = (0, _multer2.default)();
const router = (0, _express.Router)();

/*
******CAMPAIGN ROUTES******
*/

// Returns the list of campaigns based on the search as sort queries.
router.get('/', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    const search = req.query.search;
    const sort = req.query.sort;
    if (sort && search) {
      res.send(`
        Returns campaigns filtered by ${search} and sorted by ${sort}.
      `);
    } else if (sort) {
      res.send(`
        Returns all campaigns sorted by ${sort}.
      `);
    } else if (search) {
      res.send(`
        Returns campaigns filtered by ${req.query.search}
      `);
    }
  } else {
    res.send('Returns all campaigns paginated.');
  }
});

// Returns the information for the campaign with the identity param.
router.get('/:campaignId', (req, res) => {
  const id = req.params.campaignId;
  (0, _campaigns.getCampaignContent)(id, results => {
    if (results.campaignInfo.startDate) {
      return (0, _response2.default)(200, results, `This is the contents for the campaign id ${id}`, res);
    } else if ('accessToken' in req.query) {
      (0, _Auth.getUserInfo)(req.query.accessToken, user => {
        if (parseInt(user.app_metadata.nonProfitID, 10) === results.campaignInfo.nonprofitId) {
          return (0, _response2.default)(200, results, `This is the preview contents for the the campaign id ${id}`, res);
        }
        return (0, _response2.default)(401, {}, `You aren't authorize to preview the campaign id ${id}`, res);
      }, error => (0, _response2.default)(error.statusCode, error.original, 'There was an error getting the user info.', res));
    } else {
      return (0, _response2.default)(401, {}, 'There was no access token provided.', res);
    }
    return null;
  }, error => {
    if (Object.keys(error).length) {
      return (0, _response2.default)(500, error, 'There was an error on the server.', res);
    }
    return (0, _response2.default)(404, error, 'You are trying to access a campaign that doesn\'t exist.', res);
  });
});

// Accepts information changes to a campaign with the campaignId param.
// Returns the update campaign information.
router.patch('/edit/:campaignId', (req, res) => {
  const id = req.params.campaignId;
  console.log(req.body);
});

router.post('/upload/photo/:campaignId', upload.single('file'), (req, res) => {
  const id = req.params.campaignId;
  const { campaignName, imageType, imageAlt, nonprofitId } = req.body;
  const image = req.file;

  const imageDimensions = imgType => {
    switch (imgType) {
      case 'main':
        return { width: 1440, height: 820 };
      case 'left':
        return { width: 235, height: 290 };
      case 'right':
        return { width: 235, height: 290 };
      default:
        return { width: 235, height: 290 };
    }
  };

  const dimensions = imageDimensions(imageType);
  const originalName = image.originalname;
  const fileName = `${originalName.substring(0, originalName.lastIndexOf('.'))}-campaignId${id}-${new Date().toISOString()}`;

  (0, _Cloudinary2.default)(image, _extends({
    public_id: fileName,
    folder: nonprofitId
  }, dimensions, {
    tags: [id, 'campaign-image', campaignName, imageAlt]
  }), success => (0, _response2.default)(200, success, 'Image created successfully.', res), error => (0, _response2.default)(error.http_code, error, error.message, res));
});

// Accepts a new campaign information. Returns the new created campaign.
router.post('/create', (req, res) => {
  const { newCampaign, accessToken } = req.body;
  if ((0, _requireAuth2.default)(accessToken)) {
    (0, _Auth.getUserInfo)(accessToken, user => {
      const nonprofitId = user.app_metadata.nonProfitID;

      (0, _campaigns.createCampaign)(nonprofitId, newCampaign, success => console.log(success), error => console.log(error));
    }, error => (0, _response2.default)(error.statusCode, error.original, 'There was an error getting the user info.', res));
  } else {
    (0, _response2.default)(401, { accessToken }, 'The access token is not a valid access token.', res);
  }
});

// Exporting router as default.
exports.default = router;
//# sourceMappingURL=campaigns.js.map