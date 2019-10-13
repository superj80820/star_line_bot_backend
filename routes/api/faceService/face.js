const router = require('express').Router();
const faceFaceController = require('../../../controllers').faceFaces
const authController = require('../../../controllers').auth

router.get('/', authController.required, faceFaceController.listAll)
router.post('/', faceFaceController.create)
router.delete('/:id', faceFaceController.destroy)

module.exports = router;