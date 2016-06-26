var R = require('ramda')
, models = require('../models')
, exports = module.exports = {}

var taste = data => {
  return new Promise((resolve, reject) => {
    if (typeof data.name !== 'string') reject('cannot find run within data')
    // if (!Array.isArray(data.tests)) reject('cannot find tests within data')
    resolve(data)
  })
}

var process = ( data, root ) => {
  if (!data.tests && !root) {
    return models.Case(data).save()
  }
  let Type = models.Suite
  if (root) Type = models.Run

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
