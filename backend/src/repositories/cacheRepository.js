const cache = require('../config/cache');

// Save results to cache
const saveToCache = (keyword, data) => {
  cache.set(keyword, data);
};

// Retrieve results from cache
const getFromCache = (keyword) => {
  return cache.get(keyword);
};

// Clear cache
const clearCache = () => {
  cache.flushAll();
};

module.exports = {
  saveToCache,
  getFromCache,
  clearCache
};
