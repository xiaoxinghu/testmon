var router = require('express').Router();
var models = require('../../models');
var util = require('util');
var Run = models.Run;
var Project = models.Project;

var index = (req, res, next) => {
  Project.find({}).then(projects => {
    res.json(projects);
  });
};

var evalShow = (req, res, next) => {
  req.checkParams('id', 'ID not found').idExists(Project);

  req.asyncValidationErrors().then(() => {
  }).then(() => next()).catch(errors => {
    res.status(400).send(util.inspect(errors));
  });
};

var show = (req, res, next) => {
  return Project.findById(req.params.id.toLowerCase()).then(project => {
    res.json(project);
  }).catch(err => {
    res.status(500).send(err);
  });
};

var evalCreate = (req, res, next) => {
  req.checkBody('name', 'Invalid name').notEmpty();
  req.checkBody('name', 'Project name exists').idAvailable(Project);

  return req.asyncValidationErrors()
    .then(() => next())
    .catch(errors => {
      res.status(400).send(util.inspect(errors));
    });
};

var create = (req, res, next) => {
  return new Project({ _id: req.body.name, meta: req.body.meta })
    .save().then(p => {
      res.json({ message: 'Project Created!', project: p });
    }).catch(err => {
      res.status(500).send(util.inspect(err));
    });
};

/**
 * @api {get} /projects/ Request all projects
 * @apiName get all projects
 * @apiGroup Project
 */
router.get('/', index);
/**
 * @api {get} /projects/:id Request project by id/name
 * @apiName get project by id
 * @apiGroup Project
 */
router.get('/:id', evalShow, show);
router.post('/', evalCreate, create);

module.exports = router;
