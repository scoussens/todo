// server.js

//setup
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose'); //mongoose for mongodb
const morgan = require('morgan'); //log requests to the console
const bodyParser = require('body-parser'); //pull information from HTML post
const methodOverride = require('method-override'); //simulate DELETE and PUT

const passport = require('passport');
const User = require('./app/models/user');
const jwt = require('jwt-simple');
var port = process.env.PORT || 8080;

//configuration
var config = require('./config/database');
mongoose.connect(config.url); //connect to the db

app.use(express.static(__dirname + '/public'));

//log to console
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(passport.initialize());

//pass passport for configuration
require('./config/passport')(passport);

//load the routes
require('./app/routes')(app);

//listen
app.listen(port);
console.log("App listening on port %s", port);
