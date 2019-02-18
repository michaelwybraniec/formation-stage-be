var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require("../models/User");
var UserDAO = require("../dao/UserDAO");

/** ======================== PAGES ============================ */

router.get('/', function (req, res, next) {
  res.render("login");
});

router.get('/', function (req, res, next) {
  res.render("login");
});

router.get('/registration', function (req, res, next) {
  if (req.user) res.redirect('/articles');
  else res.render("registration");
});

/** ======================== DATA ============================ */

router.get('/logout', function (req, res, next) {
  
  var errorCallback = function () { return res.sendStatus(500); };
  var successCallback = function() {
  req.logout();
  res.redirect("/");
  };

  UserDAO.updateStatusOnline(req.user._id, false, successCallback, errorCallback);
});


// ==== Registration 
router.post('/registration', function (req, res, next) {
  var successCallback = function () { return res.sendStatus(200); };
  var errorCallback = function () { return res.sendStatus(500); };
  UserDAO.create(req.body, successCallback, errorCallback);

});


// ==== Login and Authenticate
router.post('/login', function (req, res, next) {
  var errorCallback = function () { return res.sendStatus(500); };
  var successCallback = function () { return res.sendStatus(200); };

  var logUserIn = function (user) {
    // If user does not exist or passwords don't match, return error
    if (!user || user.password !== req.body.password) {
      return res.sendStatus(500);
    }

    // Then pass the user to Passport so that Passport can log in him
    passport.authenticate('local', function (err, user, info) {
      req.logIn(user, function (err) {
        if (err) return next(err);

        UserDAO.updateStatusOnline(user._id, true, successCallback, errorCallback);
      });
    })(req, res, next);
    
  }; 

  UserDAO.find(req.body.username, logUserIn, errorCallback);
});














module.exports = router;