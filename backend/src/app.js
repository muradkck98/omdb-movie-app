const express = require('express');
const dotenv = require('dotenv');
const searchRoutes = require('./routes/searchRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
  }));
  

app.use('/api', searchRoutes);

module.exports = app;
