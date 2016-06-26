var R = require('ramda')
, models = require('../models')
, config = require('../utils').config
, exports = module.exports = {}

var eval = data => {
  return new Promise((resolve, reject) => {
    if (typeof data.name !== 'string') reject('cannot find run name within data')
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

var save = data => {
  return process(data, true)
}

var parsers = {
  junit: require('./junit')
}

var init = (data, name, type) => {
  if (!type) return data
  let parse = parsers[type]
  if (!parse) return new Promise((_, reject) => reject(`${type} is not supported yet.`))
  return parse(data, name)
}

exports.eval = eval
exports.import = R.pipeP(init, eval, save)
exports.poc = R.pipeP(init)
