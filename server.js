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
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.emailSender}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      post: 587,
      auth: {
        user: 'wuandy22@gmail.com',
        pass: 'Woulard69'
      }
    })

    let mailOptions = {
      from: 'wuandy22@gmail.com',
      to: req.body.emailReceiver,
      replyTo: 'wuandy22@gmail.com',
      subject: 'Pool Party Notification',
      text: req.body.message,
      html: htmlEmail
    }

    transporter.sendMail(mailOptions, (err,info) => {
      if(err){
        return console.log(err);
      }

      console.log('Message sent: %s', info.message)
      console.log('Message URL %s', nodemailer.getTestMessageUrl(info))
    })
  })
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));