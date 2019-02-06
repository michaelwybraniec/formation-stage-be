var express = require('express');
var router = express.Router();

var articles = [];

/** ======================== PAGES ============================ */

router.get('/write', function(req, res, next) {
    res.render('write');
  });


router.get('/read', function(req, res, next) {
  res.render("read");
});

/** ======================== DATA ============================ */

router.get('/', function(req, res, next) {
   res.send(articles);
});

router.post('/', function(req, res, next) {
  console.log(req.body);

  articles.push(req.body);

  console.log(articles)

  res.send("Submitted successfully!");
});


module.exports = router;
