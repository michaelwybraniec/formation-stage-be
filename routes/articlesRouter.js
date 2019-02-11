var express = require('express');
var router = express.Router();
var Database = require('../db/Database.js');

/** ======================== PAGES ============================ */

router.get('/', function (req, res, next) {
  res.render("articles");
});



/** ======================== DATA ============================ */
router.get('/all', function (req, res, next) {
  // Fetch articles from the Database and make a copy NOT to modify the original objects
  var articles = JSON.parse(JSON.stringify(Database.articles));
  // TODO : modify articles to add the name of who wrote what
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var user = Database.getUserByID(article.ownerId);
    article.ownerName = user.username;
  }
  res.send(articles);
});





router.get('/last', function (req, res, next) {
  console.log("GET LAST")
  res.send(Database.getLastArticle());
});





router.get('/user', function (req, res, next) {
  var articles = JSON.parse(JSON.stringify(Database.getArticlesFrom(req.user.id)));
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    article.ownerName = req.user.username;
  }
  res.send(articles);
  // res.send(Database.getArticlesFrom(req.user.username));
});





router.get('/user/:userId', function (req, res, next) {
  console.log("Getting articles for userId: " + req.params.userId)
  var userId = parseInt(req.params.userId);
  var articles = JSON.parse(JSON.stringify(Database.getArticlesFrom(userId)));
  console.log(articles)
  res.send(articles);
});




router.get('/article/:articleId', function (req, res, next) {
  var articleId = parseInt(req.params.articleId);
  var article = JSON.parse(JSON.stringify(Database.getArticleByID(articleId)));
  res.send(article);
});



router.get('/article/c/:articleId', function (req, res, next) {
  var articlesNumber = Database.nmberOfArticles(parseInt(req.params.articleId));
  // var articleNumber = JSON.parse(JSON.stringify(Database.nmberOfArticles(artcicleId)));
  res.send(""+articlesNumber);
});




router.post('/', function (req, res, next) {
  console.log(req.body);
  var article = req.body;
  // article.ownerName = req.user.username;
  article.ownerId = req.user.id;
  article.color = req.user.color;
  Database.addArticle(article);
  console.log(Database.articles);
  res.send("Submitted successfully!");
});



module.exports = router;
