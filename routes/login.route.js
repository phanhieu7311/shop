var express=require('express');
var bodyParser=require('body-parser');

var router=express.Router();
var urlendcodeParser=bodyParser.urlencoded({extended:false});

var controller=require('../controllers/login.controller');

router.get('/login',controller.login);
router.post('/login',urlendcodeParser,controller.postLogin);

module.exports=router;