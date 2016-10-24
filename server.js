// server.js

//setup
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); //mongoose for mongodb
const morgan = require('morgan'); //log requests to the console
const bodyParser = require('body-parser'); //pull information from HTML post
const methodOverride = require('method-override'); //simulate DELETE and PUT

//configuration
var database = require('./config/database');
mongoose.connect(database.url); //connect to the db

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//load the routes
require('./app/routes')(app);

//listen
app.listen(8080);
console.log("App listening on port 8080");
