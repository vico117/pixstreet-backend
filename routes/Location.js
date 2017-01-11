var express = require('express');

var locationController = require('../controllers/Location');

// ROUTES FOR OUR API
// =============================================================================
var locationRouter = express.Router(); // get an instance of the express Router

//locationRouter.get('/correct', locationController.locationGetCorrectCoordonnates);
locationRouter.get('/', locationController.locationGetAll);
locationRouter.get('/:lon&:lat&:distance', locationController.locationGetArrayFromCoordonates);
locationRouter.get('/:id', locationController.locationGetFromId);


module.exports = locationRouter;
