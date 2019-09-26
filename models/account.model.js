var mongoose=require('mongoose');

var accountSchema=mongoose.Schema({
    userName:String,
    password:String,
    role:Number
})

var Account=mongoose.model('Account',accountSchema,'accounts');

module.exports=Account;