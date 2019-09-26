var Category=require('../models/category.model');
var Product=require('../models/product.model');
var Session=require('../models/session.model');
var Bill=require('../models/bill.model');

//home
module.exports.index=function(req,res){
    res.render('index');
}

//shop
module.exports.shop=function(req,res){
    var page=parseInt(req.query.page)||1;
    var perPage=9;
    var start=(page-1)*perPage;
    var end=page*perPage;

    var id=req.params.id;
    Category.find().then(function(categories){
        if(id==0){
            Product.find().then(function(products){
                var prod=0;
                products.forEach(function(item){
                    prod++;
                })
                var maxpage=Math.ceil(prod/perPage);
                res.render('shop',{category:categories,product:products.slice(start,end),page:page,maxpage,id});
            })
        }else{
            Category.find({_id:id}).then(function(category){
                category.forEach(function(item){
                    var catname=item.catName;
                    Product.find({category:catname}).then(function(products){
                        var prod=0;
                        products.forEach(function(item){
                            prod++;
                        })
                        var maxpage=Math.ceil(prod/perPage);
                        res.render('shop',{category:categories,product:products.slice(start,end),page:page,maxpage,id});
                    })
                })
            })
        }
    })
}

//product
module.exports.product=function(req,res){
    var id=req.params.id;
    Product.find({_id:id}).then(function(product){
        res.render('product',{product:product});
    })
}

//cart
module.exports.cart=function(req,res){
    var sessionid=req.signedCookies.sessionID;
    Session.find({sessionID:sessionid}).then(function(session){
        res.render('cart',{session});
    })
}
//add to cart
module.exports.addToCart=function(req,res){
    var sessionid=req.signedCookies.sessionID;
    var quantity=req.body.quantity;
    var id=req.params.id;
    Product.find({_id:id}).then(function(product){
        product.forEach(function(item){
            var prodname=item.prodName;
            var prodid=item._id;
            var image=item.image;
            var price=item.price;
            Session.create({sessionID:sessionid,prodID:prodid,image:image,prodName:prodname,price:price,quantity:quantity}).then(function(){
                res.redirect('http://localhost:3333/cart');
            })
        })
        
    })
}
//delete from cart
module.exports.deleteCart=function(req,res){
    var sessionid=req.signedCookies.sessionID;
    var id=req.params.id;
    Session.remove({sessionID:sessionid,prodID:id}).then(function(session){
        res.redirect('http://localhost:3333/cart');
    })
}

//update cart
module.exports.updateCart=function(req,res){
    var sessionid=req.signedCookies.sessionID;
    var quantity=req.body.qty;
    Session.find({sessionID:sessionid}).then(function(session){
        for(i=0;i<session.length;i++){
            Session.update({_id:session[i]._id},{quantity:quantity[i]}).then(function(){
                res.redirect('http://localhost:3333/cart');
            })
        }
    })
}

//checkout
module.exports.checkout=function(req,res){
    var sessionid=req.signedCookies.sessionID;
    Session.find({sessionID:sessionid}).then(function(session){
        res.render('checkout',{session});
    })
}
module.exports.postCheckout=function(req,res){
    var d=new Date();
    var ordertime=d.getHours()+':'+d.getMinutes()+' '+d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
    var sessionid=req.signedCookies.sessionID;
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var address=req.body.address;
    var note=req.body.note;
    Bill.create({customerName:name,phone:phone,email:email,address:address,note:note,orderTime:ordertime,sessionID:sessionid}).then(function(){
        res.redirect('http://localhost:3333/confirmation');
    })
}

//confirmation
module.exports.confirm=function(req,res){
    var sessionid=req.signedCookies.sessionID;
    Bill.find({sessionID:sessionid}).then(function(bill){
        Session.find({sessionID:sessionid}).then(function(session){
            res.render('confirmation',{bill,session});
        })
    })
}

//search
module.exports.search=function(req,res){
    var prodname=req.body.search;
    var id=0;
    //prodname=prodname.toLowerCase();
    var page=parseInt(req.query.page)||1;
    var perPage=9;
    var start=(page-1)*perPage;
    var end=page*perPage;

    Category.find().then(function(categories){
        Product.find({prodName:prodname}).then(function(products){
            var prod=0;
                products.forEach(function(item){
                    prod++;
            })
            var maxpage=Math.ceil(prod/perPage);
            res.render('shop',{category:categories,product:products.slice(start,end),page:page,maxpage,id})
        })
    })
}