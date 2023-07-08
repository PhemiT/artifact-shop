const express = require('express');
const cors = require('cors');
const InitiateMongoServer = require('./db/conn');
const api = require('./routes/api');
const auth = require('./routes/auth');
const treblle = require('@treblle/express');

const app = express();

app.use(cors());
app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
    additionalFieldsToMask: [],
  })
)
app.use(express.json());
require('dotenv').config('../server');
app.use('/api', api);
app.use('/auth', auth);


InitiateMongoServer();
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });