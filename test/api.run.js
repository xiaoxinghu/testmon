var request = require('supertest'),
    expect = require('chai').expect,
    app = require('../app').server,
    seed = require('./seed');

describe('api.run', () => {
  describe('GET:/:id', () => {
    it('returns test run details found by id');
  });
  describe('GET:/', () => {

    it('return list of runs belongs to project', done => {
      var id = 'with runs';
      request(app)
        .get(`/api/runs/?project=${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body).to.have.length.above(0);
        }).end((err, res) => {
          if (err) throw err;
          done();
        });
    });

    it('return empty array when project does not exist.', done => {
      var id = "batman";
      request(app)
        .get(`/api/runs/?project=${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body).to.have.length(0);
        }).end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });
  describe('POST:/', () => {
    it('can create new run', done => {
      var project = "with runs";
      var run = {
        name: 'newly created',
        project: 'with runs',
        status: 'running' };
      request(app)
        .post('/api/runs/')
        .send(run)
        .expect(200)
        .expect(res => {
          expect(res.body.run.name).to.equal(run.name);
          expect(res.body.run.project).to.equal(run.project);
          expect(res.body.run.status).to.equal(run.status);
        }).end((err, res) => {
          if (err) throw err;
          done();
        });
    });
    it('return 400 with project not given', done => {
      var run = {
        name: 'newly created',
        status: 'running' };
      request(app)
        .post('/api/runs/')
        .send(run)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });
});
