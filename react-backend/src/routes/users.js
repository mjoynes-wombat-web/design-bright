// Create API Users Router
import { Router } from 'express';

import { addNonProfit } from '../models/nonprofits';
import { createNewUser } from '../models/Auth0';
import jsonResponse from '../helpers/response';

const router = Router();

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
      zip,
    });
    const newNonProfit = NonProfit(req.body.nonProfitInfo);
    addNonProfit(
      newNonProfit,
      (nonprofit) => {
        const newUser = req.body.userInfo;
        newUser.app_metadata.nonProfitID = String(nonprofit.dataValues.nonprofitId);
        createNewUser(
          newUser,
          (createdUser) => {
            const newUserData = createdUser.data;
            return jsonResponse(201, newUserData, 'Your user was successfully created.', res);
          },
          (error) => {
            const { statusCode, message } = error.response.data;
    
            return jsonResponse(statusCode, newUser.email, message, res);
          },
        );
        // If user fails delete non-profit if new.
      },
      addNonProfitError => jsonResponse(500, addNonProfitError, 'There was an error adding the non-profit to the database.'),
    );
  } else {
    const newUser = req.body.userInfo;
    newUser.app_metadata.nonProfitID = '';
    createNewUser(
      newUser,
      (createdUser) => {
        const newUserData = createdUser.data;
        return jsonResponse(201, newUserData, 'Your user was successfully created.', res);
      },
      (error) => {
        const { statusCode, message } = error.response.data;

        return jsonResponse(statusCode, newUser.email, message, res);
      },
    );
  }
});

// Returns the user info with the userId param. Requires authorization.
router.get('/:authToken', (req, res) => {
  console.log(req.params.authToken);
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
