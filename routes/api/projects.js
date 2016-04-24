var router = require('express').Router();
var models = require('../../models');
var Run = models.Run;
var Project = models.Project;

router
/**
 * @api {get} /projects/ Request all projects
 * @apiName GetProjects
 * @apiGroup Project
 */
  .get('/', (req, res, next) => {
    Project.find({}).then(projects => {
      res.json(projects);
    });
  })
/**
 * @api {get} /projects/:id Request project by id/name
 * @apiName GetProject
 * @apiGroup Project
 */
  .get('/:id', (req, res) => {
    Project.findById(req.params.id.toLowerCase()).then(project => {
      res.json(project);
    }).catch(err => {
      res.send(err);
    });
  })
  .get('/:id/runs', (req, res) => {
    Run.find({ _project: req.params.id }).then(runs => {
      res.json(runs);
    }).catch(err => {
      res.send(err);
    });
  })
  .post('/', function(req, res) {
    var project = new Project({ _id: req.body.name, meta: req.body.meta });
    project.save().then(p => {
      res.json({ message: 'Project Created!'});
    }).catch(err => {
      res.send(err);
    });
  });

module.exports = router;
