var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash')


var indexRouter = require('./routes');
var usersRouter = require('./routes/users');

const expressSession = require("express-session");
const passport = require("passport");

var app = express();

// const cors = require('cors')
// const corsConfig = {
//     origin:"*",
//     credential: true,
//     methods:["GET","POST","PUT","DELETE"],
// };
// app.options("",cors(corsConfig));
// app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(expressSession({  // iski madat se session bana sakate ho means server pe data save kar paoge
  resave:false,
  saveUninitialized: false,
  secret:"hey hey"
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
