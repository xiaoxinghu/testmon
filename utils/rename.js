var R = require('ramda')

var rename = R.curry((o, n, target) => {
  if (!target[o]) return target
  target[n] = target[o]
  delete target[o]
  return target
})

module.exports = rename
