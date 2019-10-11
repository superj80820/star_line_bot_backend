const router = require('express').Router();

router.get('/', function(_, res){
    res.send('jiji')
})

router.post('/', function(req, res){
    res.send('jijiasdf')
})

router.delete('/', function(_, res){
    res.send('jiji')
})

module.exports = router;