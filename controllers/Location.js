var request = require('request');
var Node = require('../models/Node');
var async = require('async');


exports.locationGetCorrectCoordonnates = function(req, res, next) {
        Node.findOne({}, function(err, node) {
        if (err){
            res.send(err);
            return;
        }

        console.log(node);
        console.log(node.lon);

        //nodes.forEach(function(node) {
            var loc = [node.toObject().lon, node.toObject().lat];
            node.loc = loc;
            node.lat = undefined;
            node.lon = undefined;
            node.save(function(err) {
                if(err) {
                    res.json(err);
                    return;
                }
                res.json(node);
            });
        //});

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
        Node.find({})
        .near({
            center: [req.params.lon, req.params.lat],
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
