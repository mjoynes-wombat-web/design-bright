// Create API Users Router
import { Router } from 'express';
import multer from 'multer';

import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

import { getCampaignContent } from '../models/campaigns';
import jsonResponse from '../helpers/response';
import uploadImage from '../models/Cloudinary';


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
    error => jsonResponse(500,
      error,
      'There was an error on the server.',
      res,
    ),
  );
});

// Accepts information changes to a campaign with the campaignId param.
// Returns the update campaign information.
router.patch('/:campaignId/edit', (req, res) => {
  const id = req.params.campaignId;
  if (!isNaN(id)) {
    res.send(`
    Accepts new information for the campaign with the id of ${id}.
    Returns the newly updated campaign information for that campaign.
  `);
  } else {
    res.send(`
    You provided ${id} for an id but it is not a number. Please provide a number.
    `);
  }
});

router.post('/:campaignId/upload/photo', upload.single('file'), (req, res) => {
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
  res.send(`
  Accepts a new campaign.
  Returns the newly created campaign information for that campaign.
  `);
});

// Exporting router as default.
export default router;
