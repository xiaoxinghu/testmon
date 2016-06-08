var router = require('express').Router(),
    util = require('util');

var index = (req, res, next) => {
  res.render('import');
};

router.get('/', index);

module.exports = router;
