// Create API Users Router
import { Router } from 'express';

const router = Router();

/*
******USER ROUTES******
*/

router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      username: 'test',
    },
    {
      id: 2,
      username: 'test',
    },
  ]);
});

// Accepts a new user information. Returns a confirmation message.
router.post('/create', (req, res) => {
  res.send(`
  Accepts a new user. Returns a confirmation that that user was created.
  `);
});

// Accepts a user login info. Returns authorization credentials.
router.post('/login', (req, res) => {
  res.send(`
  Accepts a email and password. Returns authorization credentials.
  `);
});

// Returns the user info with the userId param. Requires authorization.
router.get('/:userId', (req, res) => {
  res.send(`
  Returns the user information from the user with the id of ${req.params.userId}. 
  Requires authorization.
  `);
});

// Accepts new information for the user with the userId param.
// Returns the updated user information. Requires authorization.
router.patch('/:userId/edit', (req, res) => {
  res.send(`
  Accepts new information for the user with the id of ${req.params.userId}. 
  Returns the updated user information. Requires authorization.
  `);
});

// Exporting router as default.
export default router;
