var request = require('request');
var MiniGame = require('../models/MiniGame');
var async = require('async');


/**
* POST /game/add
*/
exports.addMiniGame = function(req, res, next) {

    /* Attention à bien répercuter les modifications à tout les modules d'authentification */
    MiniGame.findOne({ name: req.body.name }, function(err, game) {
        if (game) {
            return res.status(400).send({ msg: 'The minigame you registered already exists.' });
        }
        var minigame = new MiniGame({
            name: req.body.name,
            tags: req.body.tags
        });
        minigame.save(function(err) {
            res.send({ minigame: minigame, success: true });
        });
    });
};

/**
* GET /game/:name
*/
exports.getGame = function(req, res, next) {
    console.log(req.params.name);
    /* Attention à bien répercuter les modifications à tout les modules d'authentification */
    MiniGame.findOne({ name: req.params.name }, function(err, game) {
        if (!game) {
            return res.status(400).send({ msg: 'Minigame not found.' });
        }
        res.json(game);
    });
};
