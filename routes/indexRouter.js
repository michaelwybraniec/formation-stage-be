var express = require('express');
var router = express.Router();
var Database = require('../db/Database.js');
var passport = require('passport');

/** ======================== PAGES ============================ */

router.get('/', function (req, res, next) {
  res.render("login"); 
});

router.get('/', function (req, res, next) {
  res.render("login"); 
});

router.get('/registration', function (req, res, next) {
  if(req.user) res.redirect('/articles');
  else res.render("registration");
});

/** ======================== DATA ============================ */

// ==== Registration 
router.post('/registration', function (req, res, next) {
  console.log(req.body);

  // If user already exists, return an error
  var user = Database.getUser(req.body.username);
  if (user) res.sendStatus(500);
 
  Database.addUser(req.body);

  console.log(Database.users);

  res.sendStatus(200);
});


// ==== Login 
router.post('/login', function (req, res, next) {
  var user = Database.getUser(req.body.username);

  // If user does not exist or passwords don't match, return error
  if (!user || user.password !== req.body.password) {
    res.sendStatus(500);
  }

  // Then pass the user to Passport so that Passport can log in him
  passport.authenticate('local', function(err, user, info) {
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.sendStatus(200);
    });
  })(req, res, next);
});





module.exports = router;
