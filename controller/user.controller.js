var db = require('../db');
var shortid = require('shortid');
var md5 = require('md5');

module.exports.index = function(req,res){
    console.log(res.locals);
    res.render('user',{
        user:db.get("users").value()    
    });
};

//search user
module.exports.search = function(req, res){
    var q = req.query.q;
     var age = req.query.age;
    // console.log(req.query);

    var matchSearch = db.get("users").filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1 && user.age === age;
    });
    res.render('user',{
        user:matchSearch
    })
};

//craete user
module.exports.getCreate = function(req,res){
    res.render('create');
};
module.exports.postCreate = function(req,res){
    req.body.id = shortid.generate();
    req.body.file = req.file.path.split('\\').slice(1).join('/') ;
    req.body.password =md5(req.body.password);
    db.get("users")
      .push(req.body)
      .write();
    console.log(res.locals);
    res.redirect('/user');
};

//update user

module.exports.getUpdate = function(req,res){
    var id = req.params.id;
   var user= db.get('users')
        .find({id:id})
        .value();
    res.render('update',{
        user:user
    })
//     var nameToFind=req.body.nameToFind;
//     db.get('users')
//             .find({ name: nameToFind })
//             .assign({ name: req.body.nameToChange})
//             .write();
//    res.redirect('/user');
 };
module.exports.postUpdate = function(req,res){
    var id = req.params.id;
    var user = db.get('users')
                .find({id:id})
                .value();
    var defaultName = req.body.DefaultName;
    var changeName = req.body.nameToChange;
    var defaultPhone = req.body.DefaultPhone;
    var changePhone = req.body.phoneToChange;
    var defaultPassword = req.body.DefaultPassword;
    var changePassword = md5(req.body.passwordToChange);
    var defaultAvatar = user.file;
    var changeAvatar = req.body.avatarToChange;//?
    var hashPassword = md5(defaultPassword);
    var error =[];
    if(hashPassword !== user.password){
        error.push('wrong password !!!')
    }
    if(changeName ==="")
    {
        error.push('type name to change !!!')
    }
    if(changePhone ==="")
    {
        error.push('type phone to change !!!')
    }
    if(error.length){
        res.render('update',{
            error:error
        });
        return;
    }
    
    db.get('users')
            .find({ name: defaultName ,phone:defaultPhone, password:hashPassword})
            .assign({ name:changeName, phone:changePhone, password:changePassword})
            .write();
   res.redirect('/user');
}
 //delete user
 module.exports.delete = function(req,res){
    var id = req.params.id;
        console.log(id);
        db.get('users')
        .remove({id:id})
        .write();
        res.redirect('/user');
};
//detail user
module.exports.detail = function(req,res){
    var id= req.params.id;
    var user = db.get('users')
    .find({ id: id })
    .value();
    res.render('view',{
    user:user
  });
};