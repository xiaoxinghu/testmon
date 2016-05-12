var router = require('express').Router(),
    debug = require('debug')('server'),
    models = require('../../models'),
    util = require('util'),
    Run = models.Run,
    Project = models.Project;

var index = (req, res, next) => {
  let q = {};
  if (req.query.project) q.project = req.query.project;
  return Run.find(q).then(runs => {
    res.json(runs);
  }).catch(err => {
    res.send(err);
  });
};

var show = (req, res, next) => {
  return Run.findById(req.params.id).then(run => {
    res.json(run);
  }).catch(err => {
    res.send(err.message);
  });
};

var evalCreate = (req, res, next) => {

  req.checkBody('name', 'Invalid name').exists();
  req.checkBody('project', 'invalid project').exists().idExists(Project);

  req.sanitizeBody('project').trim();
  req.sanitizeBody('project').toLowerCase();

  return req.asyncValidationErrors()
    .then(() => {
      next(); })
    .catch(errors => {
      res.status(400).send(util.inspect(errors));
    });
};

var create = (req, res, next) => {
  return new Run({
    project: req.body.project,
    name: req.body.name,
    status: req.body.status }).save().then(run => {
      res.json({
        message: 'Run Created',
        run: run
      }).catch(err => {
        res.status(500).send(util.inspect(err));
      });
    });
};

router
  .get('/', index)
  .get('/:id', show)
  .post('/', evalCreate, create);

module.exports = router;
