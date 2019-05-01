var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
 var connection = mysql.createConnection({
  host     : 'db',
  port     : '3306',
  user     : 'root',
  password : 'root',
  database : 'myDb'
 });
 connection.connect( function(err){
if (err){ 
    throw err;
}
else {
console.log('Connected');
res.render('index', { title: 'Connected'});
}
 });
   
  
});

module.exports = router;
