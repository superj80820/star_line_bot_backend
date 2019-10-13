const router = require('express').Router();
const faceInfoController = require('../../../controllers').faceInfos

router.get('/', faceInfoController.listAll)
router.get('/:id', faceInfoController.get)
router.post('/', faceInfoController.create)
router.put('/:id', faceInfoController.update)
router.delete('/:id', faceInfoController.destroy)

module.exports = router;