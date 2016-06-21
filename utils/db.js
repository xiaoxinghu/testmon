"use strict";
var exports = module.exports = {},
    mongoose = require('mongoose'),
    debug = require('debug')('db'),
    config = require('./config');

mongoose.Promise = global.Promise;
var _connection;

var connect = () => {
  var db = config.db;
  // if (process.env.NODE_ENV == 'test') {
  //   db += '-test';
  // }
  return mongoose.connect(db.uri + db.name).then(() => {
    debug('connected');
  });
};

var close = () => {
  return mongoose.disconnect()
};

/*
Quick Connect, disconnect at the end of cb
*/
var qc = cb => {
  return connect().then(cb).then(close)
}

exports.connect = connect
exports.close = close
exports.qc = qc
