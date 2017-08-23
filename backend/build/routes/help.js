'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const router = (0, _express.Router)();

/*
******HELP ROUTES******
*/

// Accepts a help contact request. Returns a confirmation message.
// Create API Users Router
router.post('/', (req, res) => {
  res.send(`
  Accepts a help contact request. Returns a confirmation message.
  `);
});

// Exporting router as default.
exports.default = router;
//# sourceMappingURL=help.js.map