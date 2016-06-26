var router = require('express').Router()
, debug = require('debug')('server')
, models = require('../../models')
, util = require('util')
, Run = models.Run
, Test = models.Test

var index = (req, res, next) => {
  let q = {};
  if (req.query.run) q.run = req.query.run;
  return Test.find(q).then(tests => {
    res.json(tests);
  }).catch(err => {
    res.send(err);
  });
};

var autoPopulate = test => {
  if (test.kind === 'Suite') {
    return test.populate('tests').exec((err, test) => {
      return Promise.all(( test.tests || [] ).map(t => {
        return autoPopulate(t)
      }))
    })
  }
  return test
}

var show = (req, res, next) => {
  // return Test.findById(req.params.id).populate('tests').exec(( err, run ) => {
  //   res.json(run);
  // }).catch(err => {
  //   res.send(err.message);
  // });
  // return Test.findOne({ _id: req.params.id }).then(autoPopulate).then(test => {
  //   res.json(test);
  // }).catch(err => {
  //   res.send(err.message);
  // });
  return Test.findOne({ _id: req.params.id }).then(test => {
    res.json(test);
  }).catch(err => {
    res.send(err.message);
  });
};

var evalCreate = (req, res, next) => {

  req.checkBody('name', 'Invalid name').exists();
  req.checkBody('project', 'invalid project').exists().idExists(Run);

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
