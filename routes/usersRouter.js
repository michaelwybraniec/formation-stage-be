var express = require('express');
var router = express.Router();

var UserDAO = require("../dao/UserDAO");

/** ======================== PAGES ============================ */



/** ======================== DATA ============================ */

router.get('/', function (req, res, next) {
  res.send(req.user);
});

router.get('/color', function (req, res, next) {
  res.send(req.user.color);
});

router.get('/connected', function (req, res, next) {
  var successCallback = function (usersConnected) { return res.send(usersConnected); };
  var errorCallback = function () { return res.sendStatus(500); };
  UserDAO.getConnectedUsers(true, successCallback, errorCallback);
});


module.exports = router;
