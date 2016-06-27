var request = require('supertest')
, util = require('util')
, expect = require('chai').expect
, app = require('../server')
, fixture = require('./fixture')
, seed = require('./seed')

describe('api.run', () => {
  describe('GET:/:id', () => {
    it('returns test run details found by id')
  })
  describe('GET:/', () => {

    it('return list of runs', done => {
      request(app)
        .get(`/api/runs`)
        .expect(200)
        .expect(res => {
          expect(res.body.docs).to.have.length(5)
        }).end((err, res) => {
          if (err) throw err
          done()
        })
    })

    it.skip('can filter runs by tag', done => {
      let tag = 'iPhone'
      let q = `tag:${tag}`
      request(app)
        .get(`/api/runs?q=${q}`)
        .expect(200)
        .expect(res => {
          expect(res.body.docs).to.have.length.above(0)
        }).end((err, res) => {
          if (err) throw err
          done()
        })
    })

    it('can filter runs by multiple tags')
    it('can filter runs by meta')

    it('return empty array when no match.')
  })
  describe('POST:/', () => {
    it('can create new run', done => {
      var run = {
        name: 'newly created',
        status: 'running'
      }
      request(app)
        .post('/api/runs/')
        .send(run)
        .expect(200)
        .expect(res => {
          expect(res.body.run.name).to.equal(run.name)
          expect(res.body.run.status).to.equal(run.status)
        }).end((err, res) => {
          if (err) throw err
          done()
        })
    })
  })
})
