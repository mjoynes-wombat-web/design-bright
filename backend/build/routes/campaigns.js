'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const router = (0, _express.Router)();

/*
******CAMPAIGN ROUTES******
*/

// Returns the list of campaigns based on the search as sort queries.
// Create API Users Router
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

// Returns the information for the campaign with the campaignId param.
router.get('/:campaignId', (req, res) => {
  const id = req.params.campaignId;
  if (!isNaN(id)) {
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

// Accepts a new campaign information. Returns the new created campaign.
router.post('/create', (req, res) => {
  res.send(`
  Accepts a new campaign.
  Returns the newly created campaign information for that campaign.
  `);
});

// Exporting router as default.
exports.default = router;
//# sourceMappingURL=campaigns.js.map