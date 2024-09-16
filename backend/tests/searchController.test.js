const request = require('supertest');
const app = require('../src/app'); 


describe('Search Controller', () => {
  it('should return 400 if no keyword is provided', async () => {
    const response = await request(app).get('/api/search');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Keyword is required');
  });

  it('should return search results for a valid keyword', async () => {
    const response = await request(app).get('/api/search?keyword=foo');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should clear the cache successfully', async () => {
    const response = await request(app).get('/api/clear');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Cache cleared');
  });
});
