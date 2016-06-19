var q = require('../utils/q')

describe('utils.q', () => {
  it('recognize tags', done => {
    let result = q('tag:hello tag:world -tag:batman')
    console.log(result)
    done()
  })
  it('recognize keywords')
  it('recognize meta')
  it('tolerant extra spaces')
  it('tolerant illegal filters')
})
