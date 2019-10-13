const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const items = require('./routes/api/items');

const app = express();

// Bodyparse Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/items', items);

// Email
app.post('/api/form', (req, res) => {
  console.log(req.body);
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));