var express = require('express');
var router = express.Router();
var users = [];

function getUser(username) {
  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    if (user.username === username) {
      return user;
    }
  }
};


/** ======================== PAGES ============================ */

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

  var user = getUser(req.body.username);
  if (user) res.sendStatus(500);
 
  users.push(req.body);
  console.log("Users arrays after registration : ");
  console.log(users);
  res.sendStatus(200);
});


// ==== Login 
router.post('/login', function (req, res, next) {
  var user = getUser(req.body.username);

  // User does not exist or passwords don't match
  if (!user || user.password !== req.body.password) {
    res.sendStatus(500);
  }
  res.send(user.color);
});

module.exports = router;
