var db = require('../db');

module.exports.index = function(req,res,next){
    var sessionId = req.signedCookies.sessionId;
    var productId = req.params.productId;
    if(!sessionId)
    {
        res.render('cart',{
            error:[
                'Do not product'
            ]
        });
        return;
    }
    var idCart = db.get('session')
      .find({id:sessionId})
      .value();
    res.render('cart',{
       cart:idCart,
       productId:productId
    })
};

module.exports.AddToCart = function(req,res,next){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId)
    {
        res.riderect('/product');
        return;
    }
    var count = db.get('session')
                    .find({id:sessionId})
                    .get('cart.'+productId,0)
                    .value();
    db.get('session')
        .find({id:sessionId})
        .set('cart.'+productId,count+1)
        .write();
   
    res.redirect('/product');
}