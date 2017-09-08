// Create API Users Router
import { Router } from 'express';
import multer from 'multer';

import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

import { getUserInfo } from '../models/Auth0';
import { getCampaignContent, createCampaign } from '../models/campaigns';
import jsonResponse from '../helpers/response';
import uploadImage from '../models/Cloudinary';
import requireAuth from '../helpers/requireAuth';


const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = dotenv.config().parsed;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const upload = multer();
const router = Router();

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
  getCampaignContent(
    id,
    results => jsonResponse(
      200,
      results,
      `This is the content for the campaign id ${id}`,
      res,
    ),
    (error) => {
      if (Object.keys(error).length) {
        return jsonResponse(
          500,
          error,
          'There was an error on the server.',
          res,
        );
      }
      return jsonResponse(
        404,
        error,
        'You are trying to access a campaign that doesn\'t exist.',
        res,
      );
    },
  );
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

  const imageDimensions = (imgType) => {
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
  const fileName = `${originalName.substring(0, originalName.lastIndexOf('.'))}-campaignId${id}-${(new Date()).toISOString()}`;

  uploadImage(
    image,
    {
      public_id: fileName,
      folder: nonprofitId,
      ...dimensions,
      tags: [id, 'campaign-image', campaignName, imageAlt],
    },
    success => jsonResponse(
      200,
      success,
      'Image created successfully.',
      res,
    ),
    error => jsonResponse(
      error.http_code,
      error,
      error.message,
      res,
    ),
  );
});

// Accepts a new campaign information. Returns the new created campaign.
router.post('/create', (req, res) => {
  const { newCampaign, accessToken } = req.body;
  if (requireAuth(accessToken)) {
    getUserInfo(
      accessToken,
      (user) => {
        const nonprofitId = user.app_metadata.nonProfitID;

        createCampaign(
          nonprofitId,
          newCampaign,
          success => console.log(success),
          error => console.log(error),
        );
      },
      error => jsonResponse(
        error.statusCode,
        error.original,
        'There was an error getting the user info.',
        res),
    );
  } else {
    jsonResponse(
      401,
      { accessToken },
      'The access token is not a valid access token.',
      res,
    );
  }
});

// Exporting router as default.
export default router;
