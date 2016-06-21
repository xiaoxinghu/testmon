var factory = require('./factory'),
    mongoose = require('mongoose'),
    mockgoose = require('mockgoose'),
    R = require('ramda'),
    Models = require('../models'),
    utils = require('../utils'),
    fixture = require('./fixture')

var seedRun = run => {
  let data = {
    run: R.omit(['tests'], run),
    tests: run.tests
  }
  return utils.import(data)
}

function seed() {
  return Promise.all(
    fixture.runs.map(run => {
      return seedRun(run)
    }))
}

module.exports = () => {
  return mockgoose.reset(() => {
    return seed()
  })
}

/*
 If run directly, this script will populate data.
*/
if (!module.parent) {
  var utils = require('../utils')
  utils.db.qc(() => {
    return mongoose.connection.db.dropDatabase()
    .then(() => {
      return seed()
    })
  }).catch(err => {
    console.log(err)
    process.exit(-1)
  })
}
