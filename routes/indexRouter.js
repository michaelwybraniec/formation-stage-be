var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/testpost', function(req, res, next) {
  console.log(req.body);

  res.send("You said : id=" + req.body.id + ", date=" + req.body.date + ", text=" + req.body.text);
});

module.exports = router;
