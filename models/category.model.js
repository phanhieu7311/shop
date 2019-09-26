var mongoose=require('mongoose');

var categorySchema=new mongoose.Schema({
    catName:String
})

var Category=mongoose.model('Category',categorySchema,'categories');

module.exports=Category;