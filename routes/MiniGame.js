var express = require('express');

var miniGameController = require('../controllers/MiniGame');

// ROUTES FOR OUR API
// =============================================================================
var miniGameRouter = express.Router(); // get an instance of the express Router

miniGameRouter.post('/add', miniGameController.addMiniGame);
miniGameRouter.get('/:name', miniGameController.getGame);

module.exports = miniGameRouter;
