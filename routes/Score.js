var express = require('express');

var scoreController = require('../controllers/Score');

// ROUTES FOR OUR API
// =============================================================================
var scoreRouter = express.Router(); // get an instance of the express Router

scoreRouter.post('/', scoreController.scorePost);


module.exports = scoreRouter;
