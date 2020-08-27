var express = require('express');
var app = express();
// cai req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

//shortid
const shortid = require('shortid')

// Set some defaults
db.defaults({ users: {} })
  .write()

var port = 3000;
app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req,res){
 res.send('hello word');
})

app.get('/user', function(req,res){
    res.render('user',{
        user:db.get("users").value()
    })
})

app.get('/user/search',function(req, res){
    var q = req.query.q;
    var age = req.query.age;
    console.log(req.query);

    var matchSearch = db.get("users").filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1 && user.age === age;
    });
    res.render('user',{
        user:matchSearch
    })
})
app.get('/user/create',function(req,res){
    res.render('create');
});
app.post('/user/create',function(req,res){
    req.body.id = shortid.generate();
    db.get("users")
    .push(req.body)
    .write();
    res.redirect('/user');
});
app.get('/user/update',function(req,res){
    res.render('update');
});
app.post('/user/update',function(req,res){
   var nameToFind=req.body.nameToFind;
   db.get('users')
  .find({ name: nameToFind })
  .assign({ name: req.body.nameToChange})
  .write();
  res.redirect('/user');
});
app.get('/user/:id',function(req,res){
    var id = req.params.id;
    db.get('users')
    .remove({id:id})
    .write();
    res.redirect('/user');
});
// app.get('/user/remove',function(req,res){
//     res.render('remove');
// });
// app.post('/user/remove',function(req,res){
//     var nameRemove = req.body.nameToRemove;
//     console.log(nameRemove)
//     db.get('users')
//     .remove({ name: nameRemove })
//     .write();
//     res.redirect('/user');
// })


app.listen(port, ()=>{
    console.log("This is my port"+port);
})