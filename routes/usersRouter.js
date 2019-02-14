var express = require('express');
var router = express.Router();

/** ======================== PAGES ============================ */



/** ======================== DATA ============================ */

router.get('/', function (req, res, next) {
  res.send(req.user);
});

router.get('/color', function (req, res, next) {
  res.send(req.user.color);
});



module.exports = router;
