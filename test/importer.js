var importer = require.main.require('importer')
, Models = require.main.require('models')
, readFileP = require.main.require('utils').readFileP
, expect = require('chai').expect

describe('importer', () => {
  it('can import legit data', () => {
    let runName = 'imported run'
    let testNames = ['imported test 1', 'imported test 2']

    let data = {
      name: runName,
      tests: testNames.map(n => ({
        name: n
      }))
    }
    return importer.import(data).then(() => {
      return Models.Run
        .findOne({
          name: runName
        }).populate('tests').exec((err, run) => {
          expect(run).to.not.be.null
          expect(run.name).to.equal(runName)
          expect(run.tests).to.have.length(2)
          expect(run.tests.map(r => r.name)).to.have.members(testNames)
        })
    })
  })

  it('reject test without name')
  it('reject test with wrong type of properties')
  it('warning test cases without time info')
})
