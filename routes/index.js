const bodyParser = require('body-parser')
const cors = require('cors');
const router = require('express').Router();

router.use('/api',
    bodyParser.json(),
    cors(),
    require('./api')
)
router.use('/lineWebhook',
    require('./line')
)

module.exports = router;
