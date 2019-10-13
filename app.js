const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(bodyParser.json())

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(
    'mongodb://mongo:27017/local',
    { useNewUrlParser: true }
  );
  mongoose.set('debug', true);
}
require('./db/mongoModels/User');
require('./config/passport');

app.use(require('./routes'));

const server = app.listen( process.env.PORT || 8080, function(){
  console.log('Listening on port ' + server.address().port);
});
