'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

const router = (0, _express.Router)();

/*
******ADVISOR ROUTES******
*/

// Accepts a new advisor request. Returns a confirmation message.
// Create API Users Router
router.post('/', (req, res) => {
  res.json({
    status: 200,
    message: `
    Accepts a new advisor request. Returns a confirmation message.
    `
  });
});

// Exporting router as default.
exports.default = router;
//# sourceMappingURL=advisor.js.map