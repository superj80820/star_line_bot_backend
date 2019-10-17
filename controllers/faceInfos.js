const faceInfo = require('../db/models').faceInfo;

module.exports = {
    create(req, res) {
        return imgurObj.upload(req.file.path)
        .then(data => {
            return faceInfo
            .create({
                name: req.body.name,
                romanization: req.body.romanization,
                detail: req.body.detail,
                preview: JSON.parse(data.body).data.link,
            })
        })
        .then(faceInfo => res.status(200).json(faceInfo))
        .catch(error => res.status(400).json(error))
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
            return Promise.all([imgurObj.upload(req.file.path), Promise.resolve(faceInfo)])
            .then(values => {
                return {
                    preview: JSON.parse(values[0].body).data.link,
                    faceInfo: values[1]
                }
            })
        })
        .then(data => {
            return data.faceInfo
            .update({
                name: req.body.name || faceInfo.name,
                romanization: req.body.romanization || faceInfo.romanization,
                detail: req.body.detail || faceInfo.detail,
                preview: data.preview || faceInfo.preview,
            })
        })
        .then((faceInfo) => res.status(200).json(faceInfo))
        .catch((error) => {
            console.log(error)
            res.status(500).json(error)
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