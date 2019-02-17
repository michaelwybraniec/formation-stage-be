var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require("../models/User");
var Article = require("../models/Article");

var ArticleDAO = require("../dao/ArticleDAO");


/** ======================== PAGES ============================ */
router.get('/', function (req, res, next) {
  res.render("articles");
});


/** ======================== DATA ============================ */

router.get('/like/:articleId', function (req, res, next) {
  var errorCallback = function () { return res.sendStatus(500); };
  var successCallback = function () { return res.sendStatus(200); };

  var updateLikesCallback = function (article) { 
    // Article never ever had any like before
    if(!article.likersIds){
      article.likersIds = [];
    }
    // The article has some likes already
    else{
      for (var i = 0; i < article.likersIds.length; i++) {
        if (article.likersIds[i].toString() === req.user._id.toString()) return res.sendStatus(500);
      }
    }

    // Add the user to the likers
    article.likersIds.push(req.user._id);

    // Update in DB
    ArticleDAO.updateLikersIds(article._id, article.likersIds, successCallback, errorCallback);
  };

  ArticleDAO.getOneById(req.params.articleId, updateLikesCallback, errorCallback);

});


router.get('/all', function (req, res, next) {
  var successCallback = function (articles) { return res.send(articles); };
  var errorCallback = function () { return res.sendStatus(500); };
  ArticleDAO.getAll(successCallback, errorCallback);
});


router.get('/user', function (req, res, next) {
  var successCallback = function (articles) { return res.send(articles); };
  var errorCallback = function () { return res.sendStatus(500); };
  ArticleDAO.getByUserId(req.user._id, successCallback, errorCallback);
});


router.post('/', function (req, res, next) {
  var successCallback = function () { return res.sendStatus(200); };
  var errorCallback = function () { return res.sendStatus(500); };
  ArticleDAO.save(req.body, req.user._id, successCallback, errorCallback);
});


module.exports = router;