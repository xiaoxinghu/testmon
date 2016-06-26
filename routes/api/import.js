var router = require('express').Router()
, app = require('../../importer')
, upload = require('multer')({dest: 'uploads'})
, util = require('util')

var eval = (req, res, next) => {
  req.checkBody('name', 'Invalid name').notEmpty()
  req.checkBody('type', 'Invalid type').notEmpty()

  return req.asyncValidationErrors()
    .then(next)
    .catch(errors => {
      res.status(400).send(util.inspect(errors))
    })
}

var process = (req, res, next) => {
  let name = req.body.name
  let type = req.body.type
  let file = req.file
  let data = file.path
  return app.import(data, name, type)
    .then(() => {
      res.json({message: 'got it'})
    }).catch(err => {
      res.status(500).send(err.message)
    })
};

router.post('/', upload.single('file'), eval, process);

module.exports = router;
