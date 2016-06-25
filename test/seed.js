var factory = require('./factory')
, mongoose = require('mongoose')
, mockgoose = require('mockgoose')
, R = require('ramda')
, utils = require.main.require('utils')
, fixture = require('./fixture')

var seedRun = run => {
  let data = {
    run: R.omit(['tests'], run),
    tests: run.tests
  }
  return utils.eater.eat(run)
}

function seed() {
  return Promise.all(
    fixture.runs.map(run => {
      return seedRun(run)
    }))
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    mockgoose.reset(() => {
      seed().then(resolve)
    })
  })
}

/*
 If run directly, this script will populate data.
 */
if (!module.parent) {
  utils.db.qc(() => {
    return mongoose.connection.db.dropDatabase()
      .then(seed)
  }).catch(err => {
    console.log(err)
    process.exit(-1)
  })
}
