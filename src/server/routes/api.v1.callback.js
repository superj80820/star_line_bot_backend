const express = require('express');
const config = require('./../../config/config');
const line = require('@line/bot-sdk');
const lineHook = require('../modules/lineHook');

const router = express.Router();

/* GET localhost:[port]/api page. */
router.post('/', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(lineHook))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});
module.exports = router;
