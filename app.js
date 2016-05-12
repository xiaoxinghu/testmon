var utils = require('./utils');

var used = [];
var app = module.exports = {};

app.use = function(fn) {
  if (!~used.indexOf(fn)) {
    fn(this, utils);
    used.push(fn);
  }
  return app;
};

app.use(require('./server'));
