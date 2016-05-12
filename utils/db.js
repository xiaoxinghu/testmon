"use strict";
var exports = module.exports = {},
    mongoose = require('mongoose'),
    debug = require('debug')('db'),
    config = require('./config');

mongoose.Promise = global.Promise;
var _connection;

exports.connect = () => {
  var db = config.db;
  // if (process.env.NODE_ENV == 'test') {
  //   db += '-test';
  // }
  return mongoose.connect(db.uri + db.name).then(() => {
    debug('connected');
  });
};

exports.close = () => {
};
