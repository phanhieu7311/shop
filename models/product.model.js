var mongoose=require('mongoose');

var productSchema=mongoose.Schema({
    prodName:String,
    image:String,
    category:String,
    description:String,
    price:Number
});

var Product=mongoose.model('Product',productSchema,'products');

module.exports=Product;