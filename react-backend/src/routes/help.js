// Create API Users Router
import { Router } from 'express';

const router = Router();

/*
******HELP ROUTES******
*/

// Accepts a help contact request. Returns a confirmation message.
router.post('/', (req, res) => {
  res.send(`
  Accepts a help contact request. Returns a confirmation message.
  `);
});

// Exporting router as default.
export default router;
