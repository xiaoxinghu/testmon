var config = require('rc')('sane', {
  db: 'mongodb://localhost/sane-report'
});

module.exports = config;
