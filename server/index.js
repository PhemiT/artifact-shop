const express = require('express');
const cors = require('cors');
const InitiateMongoServer = require('./config/conn');
const api = require('./routes/api');
const auth = require('./routes/auth');
const passport = require('./config/passport')

const app = express();

app.use(passport.initialize());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
require('dotenv').config('../server');
app.use('/api', api);
app.use('/auth', auth);

// Success and Failure Redirect Routes for Social Login
app.get('/success', (req, res) => {
  res.send('Authentication successful!');
});

app.get('/failure', (req, res) => {
  const error = req.query.error;
  if (error) {
    res.send(`Authentication failed: ${decodeURIComponent(error)}`);
  } else {
    res.send('Authentication failed for unknown reasons.');
  }
});


InitiateMongoServer();
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });