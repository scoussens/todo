// server.js

//setup
var express = require('express');
var app = express();
var mongoose = require('mongoose'); //mongoose for mongodb
var morgan = require('morgan'); //log requests to the console
var bodyParser = require('body-parser'); //pull information from HTML post
var methodOverride = require('method-override'); //simulate DELETE and PUT

//configuration
var database = require('./config/database');
mongoose.connect(database.url); //connect to the db

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//load the routes
require('./app/routes')(app);

//listen
app.listen(8080);
console.log("App listening on port 8080");