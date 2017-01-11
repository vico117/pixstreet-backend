var request = require('request');
var Badge = require('../models/Badge');
var Site = require('../models/Site');




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
        });
        .exec(function(err, nodes) {
            if (err){
                res.send(err);
                return;
            }
        res.json(nodes);
    });
};
