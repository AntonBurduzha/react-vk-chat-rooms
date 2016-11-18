var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");

var config = require('./config.json');
var monk = require('monk');
var db = monk(config.db);

var loginControl = require('./controllers/user.controller');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use((req,res,next) => {
  req.db = db;
  next();
});

app.use('/userdata', loginControl);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
});

module.exports = app;