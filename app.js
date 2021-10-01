const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 80;
const hostname = '127.0.0.1';
const mongoose = require('mongoose');
const bodyparser = require("body-parser");


// Mongoose Server Set-up:-
mongoose.connect('mongodb://localhost:27017/Raj', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('Mongoose Connected!')
});

// Create Schema for FORM-Fill-up:

const formSchema = new mongoose.Schema({
  name: String,
  age: String,
  address: String,
  number: String,
  email: String
});

// Create Model to Finalize the Collection in MongoDB:-

const formdetail = mongoose.model('formdetail', formSchema);


// For serving STATIC File
app.use('/static', express.static('static'));


// Form  through Express
app.use(express.urlencoded());

// Setting template engine as PUG
app.set('view engine', 'pug');

//Set the views directory
app.set('views', path.join(__dirname, 'views'));



//PUB End-point Get Request:

app.get('/', (req, res) => {
  res.render('index.pug')
});

app.get('/about', (req, res) => {
  res.render('about.pug')
});



//PUB End-point Post Request:

app.post('/about', (req, res) => {

  var mydata = new formdetail(req.body);
  mydata.save().then(() => {
    res.send('Details are saved in the Database')
  }).catch(() => {
    res.status(400).render('Details are not saved in the Database');
  })


});


// Server Listening:-

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});