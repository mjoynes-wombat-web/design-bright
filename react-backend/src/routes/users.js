// Create API Users Router
import { Router } from 'express';
import { add } from '../models/users';

const router = Router();

/*
******USER ROUTES******
*/

// Accepts a new user information. Returns a confirmation message.
router.post('/create', (req, res) => {
  add(req.body,
    test => res.json(test),
    test => res.send(test));
});

// Accepts a user login info. Returns authorization credentials.
router.post('/login', (req, res) => {
  console.log('You are attempting to login with: ');
  console.log(req.body.email);
  res.json(req.body);
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
