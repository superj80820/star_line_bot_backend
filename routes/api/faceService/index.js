const router = require('express').Router();

router.use('/info', require('./info'));
router.use('/face', require('./face'));

module.exports = router;