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