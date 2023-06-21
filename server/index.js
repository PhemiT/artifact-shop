const express = require('express');
const cors = require('cors');
const InitiateMongoServer = require('./db/conn');
const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
app.use('/api', routes)


InitiateMongoServer();
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });