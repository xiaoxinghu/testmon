var R = require('ramda')
, models = require.main.require('models')
, config = require.main.require('utils').config
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

var init = (data, name, type) => {
  if (!type) return new Promise((resolve, reject) => resolve(data))
  return require('./junit')(data, name)
}

exports.eval = eval
exports.import = R.pipeP(init, eval, save)
exports.poc = R.pipeP(init)
