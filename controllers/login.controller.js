var Account=require('../models/account.model');

module.exports.login=function(req,res){
    var err='';
    res.render('login',{err});
}
module.exports.postLogin=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var err='Failed to login';
    Account.find({userName:username,password:password}).then(function(account){
        test='test'+account;
        if(test!='test'){
            account.forEach(function(item){
                if(item.role==1){
                    res.redirect('/admin/index');
                }else{
                    res.redirect('/');
                }
            })
        }
        else{
            res.render('login',{err:err});
        }
    })
}