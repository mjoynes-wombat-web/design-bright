import { Router } from 'express';
import { addNonProfit } from '../models/nonprofits';

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

export default router;
