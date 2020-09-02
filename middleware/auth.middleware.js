var db = require('../db');

module.exports.requireAuth = function(req,res,next){
   
    if(!req.cookies.cookiesId){
        res.redirect('/auth');
        return;
    }
    var user = db.get('users').find({id: req.cookies.cookiesId}).value()
    if(!user)
    {
        res.redirect('/auth');
        return;  
    }
    next();
}