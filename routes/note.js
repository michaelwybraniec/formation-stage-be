

 
// function loginMatch(username, password) {
//   for (var i = 0; i < users.length; i++) {
//     var user = users[i];
//     if (user.username === username && user.password === password) {
//       return true;
//     }
//   }
//   return false;
// };


// function color(username, password) {
//   for (var i = 0; i < users.length; i++) {
//     var user = users[i];
//     var color = user.color;
//     if (user.username === username && user.password === password) {
//       return color;
//     }
//   }
//   return "#ecf9ec"; // light green
// };






// router.get('/smalldog', function (req, res, next) {
//   res.send('waf waf');
// });

// router.get('/bigdog', function (req, res, next) {
//   res.send('waf motherfucker!');
// });

// router.get('/', function (req, res, next) {
//   res.send("waf");
// });

// // router.get('/', function (req, res, next) {
// //   res.render('indexDogs');
// // });

// router.get('/:x', function (req, res, next) {
//   var result = "";
//   var text = "wof ";
//   for (var i = 0; i < req.params.x; i++) {
//     result += text;
//   }
//   res.send(result);
// });


// router.get('/:animal/:nbr', function (req, res, next) {
//   var result = "";
//   for (var i = 0; i < req.params.nbr; i++) {
//     result += req.params.animal;
//   }
//   res.send(result);
// });




// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

// router.post('/testpost', function(req, res, next) {
//   console.log(req.body);

//   res.send("You said : id=" + req.body.id + ", date=" + req.body.date + ", text=" + req.body.text);
// });




// router.get('/:animal/:nbr', function (req, res, next) {
//   var result = "";
//   for (var i = 0; i < req.params.nbr; i++) {
//     result += req.params.animal;
//   }
//   res.send(result);
// });




// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/prout', function(req, res, next) {
//   res.send('respond with a prout resource');
// });

// router.get('/michael', function(req, res, next) {
//   res.send('Gael gay');
// });


