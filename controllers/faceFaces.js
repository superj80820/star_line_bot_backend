const faceFace = require('../db/models').faceFace;

module.exports = {
    create(req, res) {
        return faceFace
        .create({
            token: req.body.token,
            preview: req.body.preview,
            infoId: req.body.infoId,
        })
        .then(faceFace => res.status(200).json(faceFace))
        .catch(error => res.send('400'))
    },
    listAll (req, res) {
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
    }
}