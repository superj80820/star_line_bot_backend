const user = require('../db/models').User;
const comment = require('../db/models').Comment;
module.exports = {
    create(req, res) {
        return user
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
        .then(user => res.send('201'))
        .catch(error => res.send('400'))
    },
}