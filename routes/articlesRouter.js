var express = require('express');
var router = express.Router();
var articles = [];
var users = [];
var login = [];

function loginMatch() {
  for (var i; users.username.length; i++) {
    var user = users.username[i];
    if (user.username === login.username) {
      for (var j = 0; j < users.password.length; j++) {
        var pass = users.password[j];
        if (pass.password === login.password) {
          return true;
          console.log(user);
          console.log(pass);
        }
      }
    }
  }
}



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

// ==== Login 
router.post('/login', function (req, res, next) {
  console.log(req.body);
  login.push(req.body);

  function loginMatch() {
    for (var i; users.username.length; i++) {
      var user = users.username[i];
      if (user.username === login.username) {
        for (var j = 0; j < users.password.length; j++) {
          var pass = users.password[j];
          if (pass.password === login.password) {
            return true;
          }
        }
      }
    }
  } 
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