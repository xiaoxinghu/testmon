var eater = require('../utils/eater')
var Models = require('../models')
var expect = require('chai').expect

describe('utils.eater', () => {
  it('can eat legit data', () => {
    let runName = 'imported run'
    let testNames = ['imported test 1', 'imported test 2']

    let data = {
      name: runName,
      tests: testNames.map(n => ({ name: n }))
    }
    return eater.eat(data).then(() => {
      return Models.Run
      .findOne({name: runName}).populate('tests').exec(( err, run ) => {
        expect(run).to.not.be.null
        expect(run.name).to.equal(runName)
        expect(run.tests).to.have.length(2)
        expect(run.tests.map(r => r.name)).to.have.members(testNames)
      })
    })
  })

  it('validate data')
})
