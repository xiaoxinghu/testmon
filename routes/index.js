var express = require('express'),
    util = require('util'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(function(req, res, next) {
  // console.log(util.inspect(req.body, {showHidden: false, depth: 1}));
  next();
});

router.use('/api', require('./api'));

module.exports = router;
