const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const knex = require('knex');
const { Model } = require('objection');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const knexConfig = require('./knexfile');
const cache = require('memory-cache');

const app = express();

const database = knex(knexConfig.development);
Model.knex(database);


app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const cacheKey = req.originalUrl;

  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  res.sendResponse = res.json;
  res.json = (data) => {

    cache.put(cacheKey, data, 60 * 60 * 1000); 
    res.sendResponse(data);
  };
  next();
});


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
