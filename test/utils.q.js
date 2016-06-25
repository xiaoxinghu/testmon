var q = require.main.require('utils').q
var expect = require('chai').expect

describe('utils.q', () => {
  it('recognize tags', done => {
    let result = q('tag:testmon tag:rocks -tag:batman')
    expect(result).to.have.property('tags')
    expect(result.tags).to.have.property('$all')
    expect(result.tags).to.have.property('$nin')
    expect(result.tags.$all).to.have.members(['testmon', 'rocks'])
    expect(result.tags.$nin).to.have.members(['batman'])
    done()
  })
  it('recognize keywords', done => {
    let result = q('testmon rocks testmon_rocks')
    expect(result).to.have.property('keywords')
    expect(result.keywords).to.have.members(['testmon', 'rocks', 'testmon_rocks'])
    done()
  })
  it('understand start/stop time')
  it('recognize meta')
  it('tolerant extra spaces', done => {
    let result = q(' testmon   rocks  tag:batman  ')
    expect(result).to.have.property('tags')
    expect(result.tags).to.have.property('$all')
    expect(result.tags.$all).to.have.members(['batman'])
    done()
  })
  it('tolerant illegal filters')
})
