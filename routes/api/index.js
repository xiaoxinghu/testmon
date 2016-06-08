var express = require('express'),
    router = express.Router();

router.get('/', function (req, res, next) {
  res.json({ message: 'Hello API.' });
})
router.use('/projects', require('./projects'));
router.use('/runs', require('./runs'));
router.use('/tests', require('./tests'));
router.use('/import', require('./import'));

module.exports = router;
