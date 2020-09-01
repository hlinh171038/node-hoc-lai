var express = require('express');
var app = express();
// cai req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//satic file
app.use(express.static('public'));

//require low db
var db = require('./db.js');

//require routes
var userRoute = require('./routes/user-router');

var port = 3000;
app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req,res){
 res.send('hello word');
})

app.use('/user', userRoute);
app.listen(port, ()=>{
    console.log("This is my port"+port);
})