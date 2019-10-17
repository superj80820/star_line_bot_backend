const router = require('express').Router();
const faceInfoController = require('../../../controllers').faceInfos
const authController = require('../../../controllers').auth
const multer  = require('multer')
const upload = multer({ dest: 'other/temp/image' })

router.get('/',
    authController.required,
    faceInfoController.listAll,
)
router.get('/:id',
    authController.required,
    faceInfoController.get,
)
router.post('/', 
    authController.required,
    upload.single('preview'),
    faceInfoController.create,
)
router.put('/:id',
    authController.required,
    upload.single('preview'),
    faceInfoController.update
)
router.delete('/:id',
    authController.required,
    faceInfoController.destroy,
)

module.exports = router;