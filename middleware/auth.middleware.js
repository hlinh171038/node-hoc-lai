var db = require('../db');

module.exports.requireAuth = function(req,res,next){
  
    if(!req.signedCookies.cookiesId){
        res.redirect('/auth');
        return;
    }
    var user = db.get('users').find({id: req.signedCookies.cookiesId}).value()
    if(!user)
    {
        res.redirect('/auth');
        return;  
    }
    res.locals.user = user
    next();
}