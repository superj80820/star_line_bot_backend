const router = require('express').Router();
const userController = require('../controllers').users

router.post('/test', userController.create)

router.use('/api', require('./api'))

module.exports = router;
