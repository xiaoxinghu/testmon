var readFileP = require.main.require('utils').readFileP
, parse = require('./parse')

module.exports = ( file, name ) => {
  return readFileP(file).then(parse)
}
