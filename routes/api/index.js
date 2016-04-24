var express = require('express'),
    router = express.Router();

router.get('/', function (req, res, next) {
  res.json({ message: 'Hello API.' });
})
router.use('/projects', require('./projects'));
router.use('/runs', require('./runs'));

module.exports = router;
