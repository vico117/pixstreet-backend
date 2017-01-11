var request = require('request');
var Score = require('../models/Score');
var Node = require('../models/Node');

exports.scorePost = function(req, res, next) {
    // req.body.name
    // req.body.score
    // req.body.node_id

    Node.findOne({id: req.body.node_id}, function(err, node) {
        if (err) {
            res.send(err);
            return;
        }

        if(node === null) {
            res.json("No corresponding node found.");
            return;
        }

        var score = new Score();
        score.score = req.body.score;
        score.name = req.body.name;
        score.node = node.toObject()._id;

        console.log(score);
       // save the score and check for errors
       score.save(function(err) {
           if (err) {
               res.send(err);
               console.log("Error during saving");
               return;
           }
           console.log("Score saved !");
           Node.update(
               { id: req.body.node_id },
               {$push: { 'scores' : score }},{upsert:true}, function(err, data) {
                   if (err){
                       res.send(err);
                       return;
                   }
                   res.json({ success: true });
            });
       });
   });
};
