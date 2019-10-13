const faceInfo = require('../db/models').faceInfo;

module.exports = {
    create(req, res) {
        return faceInfo
        .create({
            name: req.body.name,
            romanization: req.body.romanization,
            detail: req.body.detail,
        })
        .then(faceInfo => res.status(200).json(faceInfo))
        .catch(error => res.send(error))
    },
    listAll (req, res) {
        return faceInfo
        .findAll()
        .then(faceInfo => res.status(200).json(faceInfo))
        .catch(error => res.send(error))
    },
    get (req, res) {
        return faceInfo
        .findAll({
            where: {
                id: req.params.id,
            }
        })
        .then(faceInfo => {
            if(faceInfo.length === 0) {
                return res.status(404).send('Not found')
            }
            return res.status(200).json(faceInfo)
        })
        .catch(error => res.status(500).json(error));
    },
    update (req, res) {
        return faceInfo
        .findByPk(req.params.id)
        .then(faceInfo => {
            if(!faceInfo) {
                return res.status(404);
            }
            return faceInfo
            .update({
                name: req.body.name || faceInfo.name,
                romanization: req.body.romanization || faceInfo.romanization,
                detail: req.body.detail || faceInfo.detail,
            })
            .then(() => res.status(200).json(faceInfo))
            .catch((error) => res.status(500).json(error));
        });
    },
    destroy (req, res) {
        return faceInfo
        .findByPk(req.params.id)
        .then(faceInfo => {
            if(!faceInfo){
                return res.status(404).send('Not found')
            }
            return faceInfo
            .destroy()
            .then(faceInfo => {
                return res.status(200).json(faceInfo)
            })
            .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
    }
}