var mongoose=require('mongoose');

var billSchema=mongoose.Schema({
    customerName:String,
    address:String,
    email:String,
    phone:String,
    note:String,
    orderTime:String,
    sessionID:String
})

var Bill=mongoose.model('Bill',billSchema,'bills');

module.exports=Bill;