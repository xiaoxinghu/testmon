var R = require('ramda')
var Models = require('../models')
var db = require('../utils').db

var validate = data => {
  return new Promise((resolve, reject) => {
    if (!data.run) reject('cannot find run within data')
    resolve(data)
  })
}

var importRun = data => {
  return new Models.Run(data.run)
  .save().then(r => {
    return Promise.all((data.tests || []).map(test => {
      return new Models.Test(Object.assign({}, test, { run: r._id })).save()
    }))
  })
}

var main = R.pipeP(validate, importRun)

module.exports = main
