var express=require('express');
var router=express.Router();

var bodyparser=require('body-parser');
var urlendcodeParser=bodyparser.urlencoded({extended:false});

var controller=require('../controllers/admin.controller');

//admin index
router.get('/index',controller.index);

//categories
router.get('/categories',controller.categories);

//delete category
router.get('/delete_category&:id',controller.deleteCat);

//add category
router.get('/add_category',controller.addCat);
router.post('/add_category',urlendcodeParser,controller.postAddCat);

//edit category
router.get('/edit_category&:id',controller.editCat);
router.post('/edit_category&:id',urlendcodeParser,controller.postEditCat);

//products
router.get('/products',controller.products);

//delete product
router.get('/delete_product&:id',controller.deleteProd);

//add product
router.get('/add_product',controller.addProd);
router.post('/add_product',urlendcodeParser,controller.postAddProd);

//edit product
router.get('/edit_product&:id',controller.editProd);
router.post('/edit_product&:id',urlendcodeParser,controller.postEditProd);

//bills
router.get('/bills',controller.bills);

//bill detail
router.get('/bill_detail&:id',controller.billDetail);

//edit bill
router.get('/edit_bill&:id',controller.editBill);

//post edit bill
router.post('/edit_bill&:id',urlendcodeParser,controller.postEditBill);

//delete product from bill
router.get('/delete_product_bill&:prodid&:sesid',controller.deleteFromBill);

module.exports=router;