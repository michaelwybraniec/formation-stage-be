var express = require('express');
var router = express.Router();

var articles = [];
var users = [];

/** ======================== PAGES ============================ */

router.get('/write', function (req, res, next) {
  res.render('write');
});


router.get('/read', function (req, res, next) {
  res.render("read");
});

router.get('/registration', function (req, res, next) {
  res.render("registration");
});

router.get('/login', function (req, res, next) {
  res.render("login");
});



/** ======================== DATA ============================ */

// ==== Registration 

router.post('/registration', function (req, res, next) {
  console.log(req.body);
  users.push(req.body);

  res.send("<b>Submitted successfully!</b>");
});



// ==== Articles 

router.get('/', function (req, res, next) {
  res.send(articles);
});

router.post('/', function (req, res, next) {
  console.log(req.body);

  articles.push(req.body);

  console.log(articles)

  res.send("Submitted successfully!");
});


module.exports = router;
