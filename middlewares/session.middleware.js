var shortid=require('shortid');

module.exports=function(req,res,next){
    if(!req.signedCookies.sessionID){
        var sessID=shortid.generate();
        res.cookie('sessionID',sessID,{
            signed:true
        })
    }
    next();
}