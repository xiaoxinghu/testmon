var mongoose = require('mongoose')
, mockgoose = require('mockgoose')
, R = require('ramda')
, db = require('../utils').db
, importer = require('../importer')
, fixture = require('./fixture')

function seed() {
  return Promise.all(R.map(importer.import, fixture.runs)).catch(console.log)
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
  db.qc(() => {
    return mongoose.connection.db.dropDatabase()
      .then(seed)
  }).catch(err => {
    console.log(err)
    process.exit(-1)
  })
}
