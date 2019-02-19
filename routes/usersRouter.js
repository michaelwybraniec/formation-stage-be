var express = require('express');
var router = express.Router();

var UserDAO = require("../dao/UserDAO");
var ArticleDAO = require("../dao/ArticleDAO");


/** ======================== PAGES ============================ */



/** ======================== DATA ============================ */

router.get('/', function (req, res, next) {
  res.send(req.user);
});

router.get('/color', function (req, res, next) {
  res.send(req.user.color);
});

// router.get('/connected', function (req, res, next) {
//   var successCallback = function (usersConnected) { return res.send(usersConnected); };
//   var errorCallback = function () { return res.sendStatus(500); };
//   UserDAO.getConnectedUsers(true, successCallback, errorCallback);
// });

router.get('/connected', function (req, res, next) {
  var errorCallback = function () { return res.sendStatus(500); };
  var getConnectedUserCallback = function (usersConnected) {
    var getArticlesCallback = function (articles) {
      var modifiedUsers = [];

      for (var i = 0; i < usersConnected.length; i++) {
        var user = usersConnected[i].toJSON();

        var countPoops = 0;
        var countLikes = 0;

        for (var j = 0; j < articles.length; j++) {
          var article = articles[j];
          if (article.ownerId.toString() === user._id.toString()) {
            if (article.poopsIds) countPoops += article.poopsIds.length;
          }
        }
        user.poopsCount = countPoops;

        for (var k = 0; k < articles.length; k++) {
          var article = articles[k];
          if (article.ownerId.toString() === user._id.toString()) {
            if (article.likersIds) countLikes += article.likersIds.length;
          }
        }
        user.likesCount = countLikes;



        modifiedUsers.push(user);

      };


      return res.send(modifiedUsers);
    };
    ArticleDAO.getAll(getArticlesCallback, errorCallback);
  };
  UserDAO.getConnectedUsers(true, getConnectedUserCallback, errorCallback);
});




module.exports = router;
