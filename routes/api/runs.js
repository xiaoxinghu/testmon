var router = require('express').Router();
var models = require('../../models');
var Run = models.Run;
var Project = models.Project;

router
  .get('/:id', function(req, res, next) {
    Run.findById(req.params.id).then(run => {
      res.json(run);
    }).catch(err => {
      res.send(err.message);
    });
  })
  .post('/', function(req, res) {
    Project.findById(req.body.project)
      .then(project => {
        if (!project) throw new Error(`Cannot find project ${req.body.project}`);
        var run = new Run({
          _project: project._id,
          name: req.body.name,
          status: req.body.status });
        return run.save();
      }).then(run => {
        res.json({ message: 'Run Created!'});
      }).catch(err => {
        res.send(err.message);
      });
  });

module.exports = router;
