// Create API Users Router
import { Router } from 'express';

import { addNonProfit, editNonProfit } from '../models/nonprofits';
import { createNewUser, getUserInfo, editUserInfo } from '../models/Auth0';
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

        return jsonResponse(statusCode, { email: newUser.email }, message, res);
      },
    );
  }
});

// Accepts new information for the user with the userId param.
// Returns the updated user information. Requires authorization.
router.patch('/edit', (req, res) => {
  const { accessToken, editData } = req.body;
  const updatedUserInfo = editData.userInfo;

  getUserInfo(
    accessToken,
    (user) => {
      editUserInfo(
        user.user_id,
        updatedUserInfo,
        (editUserResponse) => {
          const updatedUser = editUserResponse.data;
          if (updatedUser.app_metadata.userType === 'non-profit') {
            const nonprofitId = updatedUser.app_metadata.nonProfitID;
            const updatedNonProfitInfo = editData.nonProfitInfo;

            editNonProfit(
              nonprofitId,
              updatedNonProfitInfo,
              updatedNonProfit => jsonResponse(
                200,
                {
                  updatedUser,
                  updatedNonProfit,
                },
                `${updatedUser.email.charAt(0).toUpperCase()}${updatedUser.email.slice(1)} has been updated.`,
                res),
              editNonProfitError => jsonResponse(
                500,
                { editNonProfitError },
                'There was an error editing the nonprofit. Please contact support.',
                res,
              ),
            );
          }
          return jsonResponse(
            200,
            { updatedUser },
            `${updatedUser.email.charAt(0).toUpperCase()}${updatedUser.email.slice(1)} has been updated.`,
            res);
        },
        editUserError => jsonResponse(
          editUserError.response.status,
          { userId: user.user_id },
          editUserError.response.data.message,
          res,
        ),
      );
    },
    findUserError => jsonResponse(
      findUserError.statusCode,
      findUserError.original,
      'This access token is not authorized.',
      res),
  );
  // res.status(200).json(req.body);
});

// Exporting router as default.
export default router;
