const express = require('express');
const router = express.Router();

// GET /api/restaurants — list restaurants (admin)
router.get('/', async (req, res) => {
  res.json({ message: 'Restaurant management endpoint — coming soon' });
});

module.exports = router;
