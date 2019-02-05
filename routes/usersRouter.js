var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/prout', function(req, res, next) {
  res.send('respond with a prout resource');
});

router.get('/michael', function(req, res, next) {
  res.send('Gael gay');
});


module.exports = router;
