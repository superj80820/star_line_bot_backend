const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors())

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

app.use(process.env.BASE_URL, require('./routes'));

const options = {
  swaggerDefinition: {
    info: {
      title: 'swagger-express-jsdodc', // Title (required)
      version: '1.0.0', // Version (required)
    },
    basePath: '/api', // Base path (optional)
  },
  apis: ['./routes/**/*.js'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);
app.get('/api-docs.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = app.listen( process.env.PORT || 8080, function(){
  console.log('Listening on port ' + server.address().port);
});
