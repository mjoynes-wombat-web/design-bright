// Import components.
import { Router } from 'express';

// Create API Router
const router = Router();

/*
******CAMPAIGN ROUTES******
*/

// Returns the list of campaigns based on the search as sort queries.
router.get('/campaigns', (req, res) => {
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

// Returns the information for the campaign with the campaignId param.
router.get('/campaigns/:campaignId', (req, res) => {
  const id = req.params.campaignId;
  if (Number.isInteger(id)) {
    res.send(`
    Returns the campaign information for the campaign with the id of ${req.params.campaignId}
    `);
  } else {
    res.status(404).send(`
    You provided ${id} for an id but it is not a number. Please provide a number.
    `);
  }
});

// Accepts information changes to a campaign with the campaignId param.
// Returns the update campaign information.
router.patch('/campaigns/:campaignId/edit', (req, res) => {
  const id = req.params.campaignId;
  if (Number.isInteger(id)) {
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

// Accepts a new campaign information. Returns the new created campaign.
router.post('/campaigns/create', (req, res) => {
  res.send(`
  Accepts a new campaign.
  Returns the newly created campaign information for that campaign.
  `);
});

// Accepts a new user information. Returns a confirmation message.
router.post('/users/create', (req, res) => {
  res.send(`
  Accepts a new user. Returns a confirmation that that user was created.
  `);
});

// Accepts a user login info. Returns authorization credentials.
router.post('/users/login', (req, res) => {
  res.send(`
  Accepts a email and password. Returns authorization credentials.
  `);
});

// Returns the user info with the userId param. Requires authorization.
router.get('/users/:userId', (req, res) => {
  res.send(`
  Returns the user information from the user with the id of ${req.params.userId}. 
  Requires authorization.
  `);
});

// Accepts new information for the user with the userId param.
// Returns the updated user information. Requires authorization.
router.patch('/users/:userId/edit', (req, res) => {
  res.send(`
  Accepts new information for the user with the id of ${req.params.userId}. 
  Returns the updated user information. Requires authorization.
  `);
});

// Accepts a new advisor request. Returns a confirmation message.
router.post('/advisor', (req, res) => {
  res.send(`
  Accepts a new advisor request. Returns a confirmation message.
  `);
});

// Accepts a help contact request. Returns a confirmation message.
router.post('/help', (req, res) => {
  res.send(`
  Accepts a help contact request. Returns a confirmation message.
  `);
});

export default router;
