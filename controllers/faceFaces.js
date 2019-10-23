const faceFace = require('../db/models').faceFace;
const facepp = require('../externalAPI/models/facepp');
const imgur = require('../externalAPI/models/imgur');
const config = require('../config');

faceppObj = new facepp(config.facepp.faceppKey, config.facepp.faceppSecret, config.facepp.faceppFaceset);
imgurObj = new imgur(config.imgur.clientAccessToken);

module.exports = {
    create(req, res) {
        return Promise.all([faceppObj.detect(req.file.path), imgurObj.upload(req.file.path)])
        .then(values => {
            let faceTokenOne = JSON.parse(values[0].body).faces[0]
            if(faceTokenOne === undefined){
                return Promise.reject('Not get any face_token')
            }
            let faceToken = faceTokenOne.face_token
            let preview = JSON.parse(values[1].body).data.link
            return Promise.resolve({
                faceToken: faceToken,
                preview: preview
            })
        })
        .then(data => {
            return Promise.all([faceppObj.addFace(config.facepp.faceppFaceset, data.faceToken), Promise.resolve(data)])
            .then(value => {
                return {...value[1]}
            })
        })
        .then(data => {
            return faceFace
            .create({
                token: data.faceToken,
                preview: data.preview,
                infoId: req.body.infoId,
            })
        })
        .then(faceFace => {
            return res.status(200).json(faceFace)
        })
        .catch(error => {
            console.error(error)
            throw res.status(400).json(error)
        })
    },
    getFaceListByInfoId (req, res) {
        return faceFace
        .findAll({
            where: {
                infoId: req.query.infoId,
            }
        })
        .then(users => {
            if(users.length === 0) {
                return res.status(404).send('Not found')
            }
            return res.status(200).json(users)
        })
        .catch(error => res.status(500).json(error));
    },
    destroy (req, res) {
        return faceFace
        .findByPk(req.params.id)
        .then(user => {
            if(!user){
                return res.status(404).send('Not found')
            }
            return user
            .destroy()
            .then(user => {
                return res.status(200).json(user)
            })
            .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
    },
}