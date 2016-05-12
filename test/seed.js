var factory = require('./factory'),
    mongoose = require('mongoose'),
    mockgoose = require('mockgoose'),
    Models = require('../models'),
    fixture = require('./fixture'),
    Project = Models.Project,
    Run = Models.Run;

function seed() {
  return Promise.all(
    fixture.projects.map(proj => {
      return new Project({ _id: proj._id, meta: proj.meta })
        .save().then(() => {
          return Promise.all(( proj.runs || [] ).map(r => {
            return new Run({name: r.name, project: r.project}).save();
          }));
        });
    }));
};

module.exports = () => {
  return mockgoose.reset(() => {
    return seed();
  });
};

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
