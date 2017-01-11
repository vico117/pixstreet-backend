var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var request = require('request');


// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Models
var Node = require('./models/Node');
var Score = require('./models/Score');
var MiniGame = require('./models/MiniGame');

// Controllers
var locationController = require('./controllers/Location');
var scoreController = require('./controllers/Score');


var app = express();


mongoose.connect('mongodb://localhost:27017/pixstreet');
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.set('port', 8000);

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());


var router = express.Router(); // get an instance of the express Router


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
router.use('/location', require('./routes/location'));
router.use('/score', require('./routes/score'));


app.use('/api',router);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
