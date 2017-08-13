// Create API Users Router
import { Router } from 'express';
import { addDonor, addNonProfitUser } from '../models/users';

const router = Router();

/*
******USER ROUTES******
*/

// Accepts a new user information. Returns a confirmation message.
router.post('/create', (req, res) => {
  const User = ({ firstName, lastName, email, password, userType }) => ({
    firstName,
    lastName,
    email,
    password,
    userType,
  });

  if (req.body.userType === 'non-profit') {
    const newNonProfitUser = User(req.body);
    const newNonProfitUserPosition = req.body.position;

    const NonProfit = ({ nonProfitName, ein, address, city, state, zip }) => ({
      name: nonProfitName,
      ein,
      address,
      city,
      state,
      zip,
    });

    const newNonProfit = NonProfit(req.body);

    // console.log(newNonProfitUser);
    // console.log(newNonProfitUserPosition);
    // console.log(newNonProfit);

    addNonProfitUser(
      newNonProfitUser,
      newNonProfitUserPosition,
      newNonProfit,
      response => console.log('Added non-profit user.'),
      error => console.log(error),
    );
  } else {
    const newUser = User(req.body);

    addDonor(newUser, response => console.log('Added donor user.'), error => console.log(error));
  }
  // add(req.body,
  //   test => res.json(test),
  //   test => res.send(test));
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
