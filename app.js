var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local');

var indexRouter = require('./routes/indexRouter');
var articlesRouter = require('./routes/articlesRouter');
var usersRouter = require('./routes/usersRouter');

var mongoose = require('mongoose');

var User = require("./models/User");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ======== PASSPORT (AUTHENTICATION) SETUP ========
app.use(session({
  secret: "some-secret",
  resave: true,
  saveUninitialized: true,
  secure: false
})); // Note: we can plug Redis on this line for multi-server session handling
app.use(passport.initialize());
app.use(passport.session({
  secret: "some-secret",
  resave: true,
  saveUninitialized: true,
  secure: false
}));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    User.findOne({username: username}, function(err, result){
      var user = result;

      // Check is passwords match
      if (password === user.password) return done(null, user);
      else return done(null, false);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  User.findOne({username: username}, function(err, result){
    var user = result;

    return done(null, user);
  });
});

// Database 

mongoose.connect('mongodb://localhost:27017/formation-be', function (err, db) {
  if (err) throw 'Unable to connect to the server. Please start the server. Error:' + err;
  else console.error('Connected to MongoDB successfully!');
});


// ================================================================
//                         <IMPORTANT>
// ================================================================

// "http://localhost:3000" + ...

app.use('/', indexRouter);        // "http://localhost:3000/"

// Secure routes above with passport : user will need to be authenticated to access them
app.use(function (req, res, next) {
  if (req.session.passport == null || !req.isAuthenticated()) res.redirect("/");
  else next();
});

app.use('/articles', articlesRouter);
app.use('/user', usersRouter);


// ================================================================
//                         </IMPORTANT>
// ================================================================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.sendStatus(err.status || 500);
});






module.exports = app;
