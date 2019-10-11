const router = require('express').Router();

router.get('/', function(_, res){
    res.send('jiji')
})

router.post('/', function(_, res){
    res.send('jiji')
})

router.put('/', function(_, res){
    res.send('jiji')
})

router.delete('/', function(_, res){
    res.send('jiji')
})

module.exports = router;