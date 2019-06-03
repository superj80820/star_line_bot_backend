const express = require('express');
const multer = require('multer');
const faceppController = require('../controller/facepp');

const router = express.Router();
const C = new faceppController();
// const storage = multer.memoryStorage()
const upload = multer()
  

router.get('/faceSet/list',
    (req, res, next) => C.getFaceSetsList(req, res, next)
);
router.post('/faceSet/search',
    upload.single('image'),
    (req, res, next) => C.searchFaceInFaceSets(req, res, next)
);
module.exports = router;
