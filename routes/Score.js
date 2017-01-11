var express = require('express');

var badgeController = require('../controllers/Badge');

// ROUTES FOR OUR API
// =============================================================================
var badgeRouter = express.Router(); // get an instance of the express Router

badgeRouter.get('/', badgeController.badgeGetAll);
badgeRouter.post('/', badgeController.badgePost);

badgeRouter.get('/:id', badgeController.badgeGet);
badgeRouter.delete('/:id', badgeController.badgeDelete);
badgeRouter.put('/:id', badgeController.badgePut);

module.exports = badgeRouter;
