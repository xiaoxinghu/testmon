var config = require('rc')('testmon', {
  db: {
    uri: 'mongodb://localhost/',
    name: 'testmon'
  },
  port: 3000
});

module.exports = config;
