var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./utils/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use(require('./routes'));

// mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.serve = function() {
  mongoose.connect(config.db);
  app.listen(3000);
  console.log('Server started.');
};

module.exports = app;
