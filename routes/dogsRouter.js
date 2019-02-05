var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/smalldog', function (req, res, next) {
  res.send('waf waf');
});

router.get('/bigdog', function (req, res, next) {
  res.send('waf motherfucker!');
});

router.get('/', function (req, res, next) {
  res.send("waf");
});

// router.get('/', function (req, res, next) {
//   res.render('indexDogs');
// });

router.get('/:x', function (req, res, next) {
  var result = "";
  var text = "wof ";
  for (var i = 0; i < req.params.x; i++) {
    result += text;
  }
  res.send(result);
});


router.get('/:animal/:nbr', function (req, res, next) {
  var result = "";
  for (var i = 0; i < req.params.nbr; i++) {
    result += req.params.animal;
  }
  res.send(result);
});

module.exports = router;
