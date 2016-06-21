var i = require('../utils/import')
var Models = require('../models')
var expect = require('chai').expect

describe('utils.import', () => {
  it('can import legit data', () => {
    let runName = 'imported run'
    let testNames = ['imported test 1', 'imported test 2']

    let data = {
      run: { name: runName },
      tests: testNames.map(n => ({ name: n }))
    }
    return i(data).then(() => {
      return Models.Run
        .findOne({name: runName}).then(run => {
        expect(run).to.not.be.null
        expect(run.name).to.equal(runName)
        return Models.Test.find({run: run._id})
          .then(runs => {
            expect(runs).to.have.length(2)
            expect(runs.map(r => r.name)).to.have.members(testNames)
          })
      })
    })
  })

  it('validate data')
})
