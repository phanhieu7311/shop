var mongoose=require('mongoose');

var sessionSchema=mongoose.Schema({
    sessionID:String,
    prodID:String,
    image:String,
    prodName:String,
    price:Number,
    quantity:Number,
});

var Session=mongoose.model('Session',sessionSchema,'session');

module.exports=Session;