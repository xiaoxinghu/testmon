var router = require('express').Router()
, models = require.main.require('models')
, upload = require('multer')({dest: 'uploads'})
, util = require('util')

var process = (req, res, next) => {
  res.json({
    message: 'got it',
    body: req.body,
    file: req.file});
};

router.post('/', upload.single('file'), process);

module.exports = router;
