var R = require('ramda')
var Models = require('../models')
var db = require('../utils').db
var exports = module.exports = {}

var taste = data => {
  return new Promise((resolve, reject) => {
    if (typeof data.name !== 'string') reject('cannot find run within data')
    // if (!Array.isArray(data.tests)) reject('cannot find tests within data')
    resolve(data)
  })
}

var process = (parent, data) => {
  if (!parent) {
    let p = new Models.Run(R.omit('tests', data))
    return Promise.all((data.tests || []).map(test => {
      return process(p, test)
    })).then(() => p.save())
  }
  if (data.tests) {
  } else {
  }
}

var process = ( data, root ) => {
  if (!data.tests && !root) {
    return Models.Case(data).save()
  }
  if (root) Type = Models.Run
  else Type = Models.Suite

  let suite = new Type(R.omit('tests', data))
  return Promise.all((data.tests).map(test => {
    return process(test).then(t => suite.tests.push(t))
  })).then(() => {
    return suite.save() })
}

var digest = data => {
  return process(data, true)
}

var eat = R.pipeP(taste, digest)

exports.eat = eat
exports.taste = taste
