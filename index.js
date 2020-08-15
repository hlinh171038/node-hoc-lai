var express = require('express');
var app = express();

var port = 3000;
app.set('view engine', 'pug');
app.set('views', './views')

var users = [
    {name:"linh", age:'21'},
    {name:"thinh", age:'23'}
]
app.get('/', function(req,res){
 res.send('hello word');
})

app.get('/user', function(req,res){
    res.render('user',{
        user:users
    })
})

app.get('/user/search',function(req, res){
    var q = req.query.q;
    var age = req.query.age;
    console.log(req.query);

    var matchSearch = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1 && user.age === age;
    });
    res.render('user',{
        user:matchSearch
    })
})
app.listen(port, ()=>{
    console.log("This is my port"+port);
})