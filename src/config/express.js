/* express.js */
const express = require('express');
const index = require('../server/routes/api.v1.index');
const callback = require('../server/routes/api.v1.callback');
const faceppRoute = require('../server/routes/api.v1.facepp');
const cors = require('cors');
const app = express();

app.use(cors())
app.use('/index', index);
app.use('/callback', callback);
app.use('/facepp', faceppRoute);

module.exports = app;