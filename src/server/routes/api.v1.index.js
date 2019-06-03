const express = require('express');
const config = require('./../../config/config');

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`Hi develop! localhost:${config.port}/api`);
});
module.exports = router;
