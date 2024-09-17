const axios = require('axios');
const cacheRepository = require('../repositories/cacheRepository');

// External API configuration
const API_URL = 'http://www.omdbapi.com/';
const API_KEY = 'c247958e';

const searchMovies = async (keyword) => {
  // Check cache first
  const cachedResults = cacheRepository.getFromCache(keyword);
  if (cachedResults) {
    return { data: cachedResults, fromCache: true };
  }

  try {
    // Make two parallel requests for 20 results (10 per request)
    
    const request1 = axios.get(API_URL, { params: { s: keyword, page: 1, apikey: API_KEY } });
    const request2 = axios.get(API_URL, { params: { s: keyword, page: 2, apikey: API_KEY } });
    console.log('keyword', keyword)
    const [response1, response2] = await axios.all([request1, request2]);

    // Combine results
    const results1 = response1.data.Search || [];
    const results2 = response2.data.Search || [];
    const combinedResults = [...results1, ...results2];

    // Cache the results
    cacheRepository.saveToCache(keyword, combinedResults);

    return { data: combinedResults, fromCache: false };
  } catch (error) {
    throw new Error('Failed to fetch data from external API');
  }
};

// Clear cache service
const clearCacheService = () => {
  cacheRepository.clearCache();
};

module.exports = {
  searchMovies,
  clearCacheService
};
