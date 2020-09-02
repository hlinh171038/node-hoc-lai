var db = require('../db');

module.exports.login = function(req,res,next){
    res.render('auth');
};

//post authentication
module.exports.postAuth = function(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({email:email}).value();
    if(!user)
    {
        res.render('auth',{
            error: [
                'User does not exist !!!!'
            ],
            value:req.body
        });
        return;
    }
    if(user.password !== password){
        res.render('auth',{
            error: [
                'password is wrong !!!!'
            ],
            value:req.body
        }); 
        return;
    }
    res.cookie("cookiesId",user.id);
    res.redirect('/user');
}