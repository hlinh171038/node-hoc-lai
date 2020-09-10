var shortid = require('shortid');
var db = require('../db');

module.exports = function(req,res,next){
    var sessionId = req.signedCookies.sessionId
    if(!req.signedCookies.sessionId)
    {
        let sessionId = shortid.generate()
        res.cookie('sessionId',sessionId,{
            signed: true
        });
        db.get('session')
        .push({id:sessionId})
        .write();
    }
    res.locals.countCart =  db.get("session")
                             .find({ id: sessionId})
                             .get("cart")
                             .size()
                             .value();
    next();
}