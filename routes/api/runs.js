var router = require('express').Router(),
    debug = require('debug')('server'),
    models = require('../../models'),
    util = require('util'),
    Run = models.Run,
    Test = models.Test,
    Project = models.Project;

var index = (req, res, next) => {
  let q = {};
  if(req.query.project) q.project = req.query.project.toLowerCase();
  let option = {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
    sort: { start: -1 }
  };
  return Run.paginate(q, option).then(runs => {
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

var stats = (req, res, next) => {
  return new Promise((reslove, reject) => {
    Test.aggregate([
      { $match: { run: req.params.id } },
      { $group: { _id: "$status", count: {$sum: 1}} }
    ], (err, result) => {
      if (err) reject(err);
      var stats = result.reduce((map, obj) => {
        map[obj._id] = obj.count;
        return map;
      }, {});
      reslove(res.json(stats));
    });
  });
  // return Test.aggregate([
  //   { $match: { run: req.params.id } },
  //   { $group: { _id: "$status", count: {$sum: 1}} }
  // ]).then(stats => {
  //   res.json(stats);
  // }).catch(err => {
  //   res.status(500).send(err.message);
  // });
};

var evalCreate = (req, res, next) => {

  req.checkBody('name', 'Invalid name').exists();

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
  .get('/:id/stats', stats)
  .post('/', evalCreate, create);

module.exports = router;
