var factory = require('./factory'),
    mongoose = require('mongoose'),
    mockgoose = require('mockgoose'),
    Models = require('../models'),
    fixture = require('./fixture');

var seedProject = project => {
  return new Models.Project({ _id: project._id, meta: project.meta })
    .save().then(p => {
      return Promise.all((project.runs || []).map(run => {
        return seedRun(run, p._id);
      }));
    });
};

var seedRun = (run, projectId) => {
  return new Models.Run({
    name: run.name,
    start: run.start,
    stop: run.stop,
    project: projectId
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
    run: runId
  }).save();
};


function seed() {
  return Promise.all(
    fixture.projects.map(project => {
      return seedProject(project);
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
