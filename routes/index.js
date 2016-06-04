var express = require('express'),
    util = require('util'),
    models = require('../models'),
    R = require('ramda'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Project.find({}).then(projects => {
    res.render('index', { projects });
  });
});

var countProject = stats => {
  return models.Project.count({})
    .then(count => {
      stats.projects = count;
      return stats;
    });
};

var countRun = stats => {
  return models.Run.count({})
    .then(count => {
      stats.runs = count;
      return stats;
    });
};

var countTest = stats => {
  return models.Test.count({})
    .then(count => {
      stats.tests = count;
      return stats;
    });
};

var stats = R.pipeP(countProject, countRun, countTest);

router.get('/stats', function(req, res, next) {
  return stats({title: 'the stats'}).then(stats => {
    res.json(stats);
  });
});

router.use(function(req, res, next) {
  // console.log(util.inspect(req.body, {showHidden: false, depth: 1}));
  next();
});

router.use('/api', require('./api'));

module.exports = router;
