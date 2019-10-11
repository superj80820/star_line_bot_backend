const router = require('express').Router();

router.use('/faceService', require('./faceService'));

module.exports = router;