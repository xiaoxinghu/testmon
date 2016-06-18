var factory = require('./factory'),
    mongoose = require('mongoose'),
    mockgoose = require('mockgoose'),
    Models = require('../models'),
    fixture = require('./fixture');

var seedRun = run => {
  return new Models.Run({
    name: run.name,
    start: run.start,
    stop: run.stop,
    tags: run.tags || [],
    meta: run.meta || {}
  }).save().then(r => {
    return Promise.all((run.tests || []).map(test => {
      return seedTest(test, r._id);
    }));
  });
};

var seedTest = (test, runId) => {
  return new Models.BDTest({
    title: test.title,
    start: test.start,
    stop: test.stop,
    status: test.status,
    run: runId
  }).save();
};


function seed() {
  return Promise.all(
    fixture.runs.map(run => {
      return seedRun(run);
    }));
};

module.exports = () => {
  return mockgoose.reset(() => {
    return seed();
  });
};

/*
 If run directly, this script will populate data.
 */
if (!module.parent) {
  var utils = require('../utils');
  utils.db.connect()
    .then(() => {
      return mongoose.connection.db.dropDatabase()
        .then(() => {
          return seed();
        });})
    .then(() => { process.exit(0); })
    .catch(err => {
      console.log(err);
      process.exit(-1);
    });
}
