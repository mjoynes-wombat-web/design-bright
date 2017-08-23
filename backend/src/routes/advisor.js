// Create API Users Router
import { Router } from 'express';

const router = Router();

/*
******ADVISOR ROUTES******
*/

// Accepts a new advisor request. Returns a confirmation message.
router.post('/', (req, res) => {
  res.json({
    status: 200,
    message: `
    Accepts a new advisor request. Returns a confirmation message.
    `,
  });
});

// Exporting router as default.
export default router;
