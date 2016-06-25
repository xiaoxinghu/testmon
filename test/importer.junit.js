var junit = require.main.require('importer/junit')
, util = require('util')
, expect = require('chai').expect

describe('importer.junit', () => {
  it.only('can import legit data', () => {
    let file = __dirname + '/sample/junit.xml'
    junit(file, 'test 1')
      .then(d => {
        console.log(util.inspect(d, {
          showHidden: false,
          depth: null
        }))
      })
      .catch(err => console.log)
  })
})
