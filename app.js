const express = require('express')

const app = express();

app.use(cors());

const server = app.listen( process.env.PORT || 8080, function(){
  console.log('Listening on port ' + server.address().port);
});
