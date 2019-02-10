var express = require('express');
var router = express.Router();
var Database = require('../db/Database.js');

/** ======================== PAGES ============================ */



/** ======================== DATA ============================ */


router.get('/color', function (req, res, next) {
  res.send(req.user.color);
});

router.get('/', function (req, res, next) {
    res.send(req.user);
  });


module.exports = router;
