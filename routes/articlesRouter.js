var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require("../models/User");
var Article = require("../models/Article");

/** ======================== PAGES ============================ */

router.get('/', function (req, res, next) {
  res.render("articles");
});



/** ======================== DATA ============================ */




router.get('/all', function (req, res, next) {

  Article.aggregate([
    { $lookup: { from: "users", localField: "ownerId", foreignField: "_id", as: "articleOwner" } },
    { $unwind: "$articleOwner" }
  ], function (err, results) {

    res.send(results);
  });

});

router.get('/user', function (req, res, next) {

  Article.aggregate([
    { $lookup: { from: "users", localField: "ownerId", foreignField: "_id", as: "articleOwner" } },
    { $unwind: "$articleOwner" },
    { $match: { "articleOwner._id": new mongoose.Types.ObjectId(req.user._id) } }
  ], function (err, results) {

    res.send(results);
  });

});


router.post('/', function (req, res, next) {
  // Fetch FE data and add a few important fields
  var article = req.body;
  article.ownerId = req.user._id;
  article.datePosted = Date.now();

  //  Save in Mongo
  new Article(article).save(function (err) {
    if (err) return res.sendStatus(500);

    return res.sendStatus(200);
  });
});


module.exports = router;