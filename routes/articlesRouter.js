var express = require('express');
var router = express.Router();
var Database = require('../db/Database.js');

/** ======================== PAGES ============================ */

router.get('/write', function (req, res, next) {
  res.render('write');
});

router.get('/read', function (req, res, next) {
  res.render("read"); 
});

/** ======================== DATA ============================ */


router.get('/', function (req, res, next) {
  res.send(Database.articles);
});

router.get('/last', function (req, res, next) { 
  console.log("GET LAST")
  res.send(Database.getLastArticle());
});

router.get('/user', function (req, res, next) { 
  console.log("Articles for a specific user")
  res.send(Database.getArticlesFrom(req.user.username));
});

router.post('/', function (req, res, next) {
  console.log(req.body);

  var article = req.body;

  article.ownerName = req.user.username;
  article.color = req.user.color;

  Database.addArticle(article);

  console.log(Database.articles)
  res.send("Submitted successfully!");
});

module.exports = router;
