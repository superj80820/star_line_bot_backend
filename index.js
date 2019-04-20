var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
   res.send('Hello World');
})
 
var server = app.listen(5000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("express is running", host, port)
 
})
