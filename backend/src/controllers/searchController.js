const searchService = require('../services/searchService');

// Handle search requests
const searchMovies = async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const { data, fromCache } = await searchService.searchMovies(keyword);

    // Set Cache-Control header if the data was from the cache
    if (fromCache) {
      res.set('Cache-Control', 'public, max-age=30');
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Handle cache clearing
const clearCache = (req, res) => {
  searchService.clearCacheService();
  res.json({ message: 'Cache cleared' });
};

module.exports = {
  searchMovies,
  clearCache
};
