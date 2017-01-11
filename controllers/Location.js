var request = require('request');
var Node = require('../models/Node');
var async = require('async');


exports.locationGetCorrectCoordonnates = function(req, res, next) {
        /* This piece of code  */
        Node.find({}, function(err, nodes) {
        if (err){
            res.send(err);
            return;
        }


        async.each(nodes, function(node, callback) {
            var loc = [node.toObject().lon, node.toObject().lat];
            node.loc = loc;
            node.lat = undefined;
            node.lon = undefined;
            node.save(function(err) {
                if(err) {
                    callback(err);
                    return;
                }
                callback();
            });
        }, function(err) {
            if (err){
                res.send(err);
                return;
            }
            res.json("Success");
        });

    });
};


exports.locationGetFromId = function(req, res, next) {
        Node.findOne({id: req.params.id}, function(err, node) {
        if (err){
            res.send(err);
            return;
        }
        res.json(node);
    });
};


exports.locationGetAll = function(req,res,next) {
    console.log("Finding all locations");
    Node.find({}, function(err, nodes) {
        if (err){
            res.send(err);
            return;
        }
        res.json(nodes);
    });
}

exports.locationGetArrayFromCoordonates = function(req, res, next) {
    console.log(req.params);
    Node.find({})
    .where('loc')
    .near({
        center: { type: 'Point', coordinates: [req.params.lon, req.params.lat] },
        maxDistance: req.params.distance || 15000, //15km
        spherical: true
    })
    .exec(function(err, nodes) {
        if (err){
            res.send(err);
            return;
        }
        res.json(nodes);
    });
};
