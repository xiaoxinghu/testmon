var request = require('supertest'),
    expect = require('chai').expect,
    app = require('../app').server,
    seed = require('./seed'),
    fixture = require('./fixture');

describe('api.project', () => {
  describe('GET:/', () => {

    it('return a list of projects', done => {
      request(app)
        .get('/api/projects')
        .expect(200)
        .expect(res => {
          expect(res.body).to.have.length(fixture.projects.length);
        }).end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });

  describe('GET:/:id', () => {

    it('return the right project', done => {
      var project = fixture.projects[0];
      request(app)
        .get(`/api/projects/${project._id}`)
        .expect(200)
        .expect(res => {
          expect(res.body._id).to.equal(project._id);
        }).end((err, res) => {
          if (err) throw err;
          done();
        });
    });

    it('return error code when project does not exist', done => {
      var id = "batman";
      request(app)
        .get(`/api/projects/${id}`)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });

    it('ignore case, and store project id as lowercase in DB', done => {
      var id = fixture.projects[0]._id.toUpperCase();
      request(app)
        .get(`/api/projects/${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body._id).to.equal(id.toLowerCase());
        }).end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });

  describe('POST:/', () => {
    afterEach(() => {
      return seed();
    });

    it('can create new project', done => {
      var project = { name: 'Wonder woman', meta: { stream: 'DC' }};
      request(app)
        .post('/api/projects')
        .send(project)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          expect(res.body.project._id).to.equal(project.name.toLowerCase());
          expect(res.body.project.meta.stream).to.equal(project.meta.stream);
        }).end((err, res) => {
          if (err) throw err;
          done();
        });
    });
    it('returns 400 when id exists', done => {
      var project = { name: fixture.projects[0]._id, meta: { stream: 'DC' }};
      request(app)
        .post('/api/projects')
        .send(project)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });
});
