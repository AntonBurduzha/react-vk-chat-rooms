const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const config = require('./config.json');
const monk = require('monk');
const db = monk(config.db);

const userControl = require('./controllers/user.controller');
const chatListControl = require('./controllers/chat.list.controller');
const chatControl = require('./controllers/chat.controller');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use((req,res,next) => {
  req.db = db;
  next();
});

app.use('/userdata', chatControl);
app.use('/userdata', chatListControl);
app.use('/userdata', userControl);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
});

module.exports = app;