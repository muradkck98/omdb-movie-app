const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Search movies route
router.get('/search', searchController.searchMovies);

// Clear cache route
router.get('/clear', searchController.clearCache);

module.exports = router;
