var importer = require('../importer')
, Models = require('../models')
, factory = require('./factory')
, readFileP = require('../utils').readFileP
, chai = require('chai')
, expect = require('chai').expect
, util = require('util')

chai.should()
chai.use(require("chai-as-promised"))

describe('importer', () => {
  describe('import', () => {
    it('can import data directly', () => {
      let runName = 'directly imported run'
      let numTests = 3

      let data = factory.run.basic.build({name: runName}, {numTests})
      let testNames = data.tests.map(t => t.name)
      return importer.import(data).then(() => {
        return Models.Run
          .findOne({
            name: runName
          }).populate('tests').exec((err, run) => {
            expect(run).to.not.be.null
            expect(run.name).to.equal(runName)
            expect(run.tests).to.have.length(numTests)
            expect(run.tests.map(r => r.name)).to.have.members(testNames)
          })
      })
    })


    it('reject test with unsupported type')
  })

  describe('eval', () => {
    it('reject test without name', () => {
      let data = factory.run.basic.build()
      delete data.name
      return importer.eval(data).should.be.rejected
        .then(result => {
          expect(result.report.errors).to.have.length(1)
          // TODO more asserts
        })
    })

    it('warn test cases without time info', () => {
      let data = {
        name: 'have test without time',
        tests: [
          { name: 'test without time' }
        ]
      }

      return importer.eval(data)
        .then(result => {
          expect(result.report.warns).to.have.length(1)
          // TODO more asserts
        })
    })
    it('reject/warn test with wrong type of properties', () => {
      let data = {
        name: 5, // warn and converted
        tests: 'tests', // error
        tags: 'tags', // error
        start: 123, // error
        duration: '2' // warn and converted
      }

      return importer.eval(data)
        .should.be.rejected.then(result => {
          let d = result.data
          let report = result.report
          expect(report.errors).to.have.length(3)
          expect(report.warns).to.have.length(2)
          expect(d.name).to.equal('5') // converted
          expect(d.duration).to.equal(2) // converted
          // TODO more asserts
        })
    })

    it('reject test with detailed report', () => {
      let data = {
        name: 'root',
        tests: [
          { name: 'hello' },
          { name: 'world', tests: 'all' },
          { tests: [
            { name: 2, start: '123' },
            { name: 'with tags', tags: 'iPhone' }
          ]}
        ]
      }

      return importer.eval(data).then(d => {
        // console.log(util.inspect(d, true, null ))
      }).catch(err => {
        // console.log(util.inspect(err, false, null, true ))
      })
    })
  })
})
