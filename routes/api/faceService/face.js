const router = require('express').Router();
const faceFaceController = require('../../../controllers').faceFaces
const authController = require('../../../controllers').auth
const multer  = require('multer')
const upload = multer({ dest: 'other/temp/image' })

/**
 * @swagger
 * /faceService/face:
 *   get:
 *     summary: Get faces
 *     description: Get All faces
 *     tags: [faceService]
 *     parameters:
 *       - name: "infoId"
 *         in: "query"
 *         required: true
 *         type: "string"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all users
 */
router.get('/',
    authController.required,
    faceFaceController.getFaceListByInfoId
)
router.post('/',
    authController.required,
    upload.single('image'),
    faceFaceController.create
)
router.delete('/:id',
    authController.required,
    faceFaceController.destroy
)

module.exports = router;