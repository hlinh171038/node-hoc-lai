var db = require('../db.js')
module.exports.index = function(req, res, next){
    var page = parseInt(req.query.page) || 1;
    var ItemPerPage = 8;
    var start = (page -1)*ItemPerPage;
    var end = page *ItemPerPage;
    var product = db.get('products').value().slice(start,end);
    res.render('products/index',
    {product:product});
};

// view detail product
module.exports.ViewDetail = function(req,res,next){
    var productId = req.params.productId;
    var product = db.get('products')
                    .find({id:productId})
                    .value();
        console.log(product)
    res.render('products/detail',
    {
        product:product
    })
}