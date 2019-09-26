var Category=require('../models/category.model');
var Product=require('../models/product.model');
var Bill=require('../models/bill.model');
var Session=require('../models/session.model');

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/product');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage }).single('image');

//admin index
module.exports.index=function(req,res){
    res.render('admin_index');
}

//categories
module.exports.categories=function(req,res){
    Category.find().then(function(category){
        res.render('admin_categories',{category:category});
    })
}

//delete category
module.exports.deleteCat=function(req,res){
    var id=req.params.id;
    Category.remove({_id:id}).then(function(categories){
        res.redirect('http://localhost:3333/admin/categories');
    })
}

//add category
module.exports.addCat=function(req,res){
    res.render('admin_add_category');
}
module.exports.postAddCat=function(req,res){
    var catName=req.body.catname;
    Category.create({catName:catName}).then(function(categories){
        res.redirect('http://localhost:3333/admin/categories');
    })
}

//edit category
module.exports.editCat=function(req,res){
    var id=req.params.id;
    Category.find({_id:id}).then(function(category){
        res.render('admin_edit_category',{category:category});
    })
}
module.exports.postEditCat=function(req,res){
    var id=req.params.id
    var catname=req.body.catname;
    Category.update({_id:id},{catName:catname}).then(function(){
        res.redirect('http://localhost:3333/admin/categories');
    })
}

//products
module.exports.products=function(req,res){
    var page=parseInt(req.query.page)||1;
    var perPage=9;
    var start=(page-1)*perPage;
    var end=page*perPage;

    Product.find().then(function(products){
        var prod=0;
        products.forEach(function(item){
            prod++;
        })
        var maxpage=Math.ceil(prod/perPage);
        res.render('admin_products',{product:products.slice(start,end),maxpage});
    })
}

//delete product
module.exports.deleteProd=function(req,res){
    var id=req.params.id;
    Product.remove({_id:id}).then(function(){
        res.redirect('http://localhost:3333/admin/products');
    })
}

//add product
module.exports.addProd=function(req,res){
    Category.find().then(function(categories){
        res.render('admin_add_product',{category:categories});
    })
}
module.exports.postAddProd=function(req,res){
    upload(req, res, function (err) {
        if (err) {
            res.send(err);
        } else{
            var filename=req.file.originalname;
            var prodname=req.body.prodname;
            var description=req.body.descript;
            var price=req.body.price;
            var category=req.body.category;
            Product.create({prodName:prodname,image:filename,category:category,description:description,price:price}).then(function(){
                res.redirect('http://localhost:3333/admin/products');
            })
        }
    })
}

//edit product
module.exports.editProd=function(req,res){
    var id=req.params.id;
    Product.find({_id:id}).then(function(product){
        Category.find().then(function(category){
            res.render('admin_edit_product',{product,category});
        })
    })
}
module.exports.postEditProd=function(req,res){
    upload(req, res, function (err) {
        if (err) {
            res.send(err);
        } else{
            var id=req.params.id;
            var prodname=req.body.prodname;
            var description=req.body.descript;
            var price=req.body.price;
            var category=req.body.category;
            if(req.file){
                var filename=req.file.originalname;
                Product.update({_id:id},{prodName:prodname,image:filename,category:category,description:description,price:price}).then(function(){
                    res.redirect('http://localhost:3333/admin/products');
                })
            }
            else{
                Product.update({_id:id},{prodName:prodname,category:category,description:description,price:price}).then(function(){
                    res.redirect('http://localhost:3333/admin/products');
                })
            }
        }
    })
}

//bills
module.exports.bills=function(req,res){
    Bill.find().then(function(bills){
        res.render('admin_bills',{bill:bills});
    })
}

//bill detail
module.exports.billDetail=function(req,res){
    var id=req.params.id;
    Bill.find({_id:id}).then(function(bill){
        bill.forEach(function(item){
            Session.find({sessionID:item.sessionID}).then(function(session){
                res.render('admin_bill_detail',{bill,session});
            })
        })
    })
}

//edit bill
module.exports.editBill=function(req,res){
    var id=req.params.id;
    Bill.find({_id:id}).then(function(bill){
        bill.forEach(function(item){
            Session.find({sessionID:item.sessionID}).then(function(session){
                res.render('admin_edit_bill',{bill,session});
            })
        })
    })
}

//post edit bill
module.exports.postEditBill=function(req,res){
    var id=req.params.id;
    var customername=req.body.customername;
    var address=req.body.address;
    var email=req.body.email;
    var phone=req.body.phone;
    Bill.update({_id:id},{customerName:customername,address:address,email:email,phone:phone}).then(function(){
        Bill.find({_id:id}).then(function(bill){
            bill.forEach(function(item){
                Session.find({sessionID:item.sessionID}).then(function(session){
                    res.render('admin_bill_detail',{bill,session});
                })
            })
        })
    })
}

//delete product form bill
module.exports.deleteFromBill=function(req,res){
    var prodid=req.params.prodid;
    var sessionid=req.params.sesid;
    Session.remove({sessionID:sessionid,prodID:prodid}).then(function(){
        res.redirect('back');
    })
}