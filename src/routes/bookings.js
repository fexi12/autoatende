const express = require('express');
const router = express.Router();

// GET /api/bookings — list bookings
router.get('/', async (req, res) => {
  res.json({ message: 'Bookings endpoint — coming soon' });
});

module.exports = router;
