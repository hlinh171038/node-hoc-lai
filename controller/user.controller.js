var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req,res){
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
    db.get("users")
      .push(req.body)
      .write();
    console.log(res.locals);
    res.redirect('/user');
};

//update user
module.exports.getUpdate = function(req,res){
    res.render('update');
};
module.exports.postUpdate = function(req,res){
    var nameToFind=req.body.nameToFind;
    db.get('users')
   .find({ name: nameToFind })
   .assign({ name: req.body.nameToChange})
   .write();
   res.redirect('/user');
 };

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