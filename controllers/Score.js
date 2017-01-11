var request = require('request');
var Score = require('../models/Score');
var Node = require('../models/Node');

exports.scorePost = function(req, res, next) {
    // req.body.name
    // req.body.score
    // req.body.node_id

    Node.find(req.body.node_id, function(err, node) {
        if (err){
            res.send(err);
            return;
        }

        var score = new Score();
        score.score = req.body.score;
        score.name = req.body.name;
        score.node = node

       // save the score and check for errors
       score.save(function(err) {
           if (err){
               res.send(err);
               return;
           }

           res.json({ message: 'Badge created!' });
       });
   });
};
