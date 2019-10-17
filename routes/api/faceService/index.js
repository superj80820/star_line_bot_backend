const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: faceService
 *   description: All about /faceService
 */
router.use('/info', require('./info'));
router.use('/face', require('./face'));

module.exports = router;