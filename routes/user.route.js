var express=require('express');
var router=express.Router();

var controller=require('../controllers/user.controller');

var bodyparser=require("body-parser");
var urlendcodeParser=bodyparser.urlencoded({extended:false});

//home
router.get('/',controller.index);

//shop
router.get('/shop&:id',controller.shop);

//product
router.get('/product&:id',controller.product);

//cart
router.get('/cart',controller.cart);

//add to cart
router.post('/cart&:id',urlendcodeParser,controller.addToCart);

//delete from cart
router.get('/delete_cart&:id',controller.deleteCart);

//update from cart
router.post('/update_cart',urlendcodeParser,controller.updateCart);

//checkout
router.get('/checkout',controller.checkout);
router.post('/checkout',urlendcodeParser,controller.postCheckout);

//confirmation
router.get('/confirmation',controller.confirm);

//search
router.post('/search',urlendcodeParser,controller.search);

module.exports=router;