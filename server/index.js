const express = require('express');
const cors = require('cors');
const InitiateMongoServer = require('./db/conn');
const api = require('./routes/api');
const auth = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
app.use('/api', api);
app.use('/auth', auth);


InitiateMongoServer();
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });