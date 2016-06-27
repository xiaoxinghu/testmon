var R = require('ramda')
, models = require('../models')
, config = require('../utils').config
, eval = require('./eval')
, exports = module.exports = {}

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
  let d = data.evaluated ? data.data : data
  // return process(d, true).then(() => Promise.reslove(data.report || data))
  return process(d, true)
}

var parsers = {
  junit: require('./junit')
}

var init = (data, name, type) => {
  if (!type) return Promise.resolve(data)
  let parse = parsers[type]
  if (!parse) return Promise.reject(`${type} is not supported yet.`)
  return parse(data, name)
}

exports.eval = eval
exports.import = R.pipeP(init, eval, save)
