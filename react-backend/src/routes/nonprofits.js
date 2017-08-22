import { Router } from 'express';
import { addNonProfit, findNonProfitByID } from '../models/nonprofits';

import requireAuth from '../helpers/requireAuth';
import { getUserInfo } from '../models/Auth0';
import jsonResponse from '../helpers/response';

const router = Router();

router.post('/create', (req, res) => {
  addNonProfit(req.body,
    (results) => {
      res.status(results.status).json(results);
    },
    (error) => {
      res.json(error);
    },
  );
});

router.get('/:accessToken', (req, res) => {
  const accessToken = req.params.accessToken;
  if (requireAuth(accessToken)) {
    getUserInfo(
      accessToken,
      (user) => {
        const nonprofitId = user.app_metadata.nonProfitID;
        findNonProfitByID(
          nonprofitId,
          results => (results === null ?
            jsonResponse(
              404,
              { nonprofitId },
              'The account belongs to a non-profit that doesn\'t exist. Please contact support.',
              res)
            : jsonResponse(
              200,
              results.dataValues,
              `You have successfully retrieved the nonprofit's info that has the id of ${user.app_metadata.nonProfitID}.`,
              res)
          ),
          error => jsonResponse(
            500,
            error,
            'There was an issue retrieving the non-profit information from the database. Please contact support.',
            res),
        );
      },
      error => jsonResponse(
        error.statusCode,
        error.original,
        'This access token is not authorized.',
        res),
    );
  }
});

export default router;
