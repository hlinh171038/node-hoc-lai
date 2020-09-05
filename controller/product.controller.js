var db = require('../db.js')
module.exports.index = function(req, res, next){
    var page = parseInt(req.query.page) || 1;
    var ItemPerPage = 8;
    var start = (page -1)*ItemPerPage;
    var end = page *ItemPerPage;
    var product = db.get('products').value().slice(start,end);
    res.render('products/index',
    {product:product});
}