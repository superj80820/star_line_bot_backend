const router = require('express').Router();

router.use('/faceService', require('./faceService'));
router.use('/user', require('./user'));

module.exports = router;