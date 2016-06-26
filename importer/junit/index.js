var readFileP = require('../../utils').readFileP
, parse = require('./parse')

module.exports = ( file, name ) => {
  return readFileP(file).then(parse).then(d => {
    d.name = name
    return d
  })
}
