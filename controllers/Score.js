var request = require('request');
var Badge = require('../models/Badge');
var Site = require('../models/Site');

exports.badgeGetAll = function(req, res, next) {
    Badge.find(function(err, badges) {
            if (err){
                res.send(err);
                return;
            }
            res.json(badges);
        });
};

exports.badgePost = function(req, res, next) {
    Site.findById(req.body.site_id, function(err, site) {
        if (err){
            res.send(err);
            return;
        }
        var badge = new Badge();
        badge.site = site;
        badge.name = req.body.name;

       // save the badge and check for errors
       badge.save(function(err) {
           if (err){
               res.send(err);
               return;
           }

           res.json({ message: 'Badge created!' });
       });
   });
};

exports.badgeGet = function(req, res, next) {
        Badge.findById(req.params.id, function(err, badge) {
        if (err){
            res.send(err);
            return;
        }
        res.json(badge);
    });
};

exports.badgeDelete = function(req, res, next) {
    Badge.remove({
            _id: req.params.id
        }, function(err, badge) {
            if (err){
                res.send(err);
                return;
            }

            res.json({ message: 'Successfully deleted' });
        });
};

exports.badgePut = function(req, res, next) {
    // use our badge model to find the badge we want
    Badge.findById(req.params.id, function(err, badge) {

        if (err){
            res.send(err);
            return;
        }

        badge.name = req.body.name || badge.name;  // update the badges info
        badge.site = req.body.site || badge.site;  // update the badges info

        // save the badge
        badge.save(function(err) {
            if (err){
                res.send(err);
                return;
            }

            res.json({ message: 'Badge updated!' });
        });
    });
};
