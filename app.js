const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const { Model } = require('objection');
const userRoutes = require('./routes/userRoutes');
const knexConfig = require('./knexfile');

const app = express();

const database = knex(knexConfig.development);
Model.knex(database);


app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
