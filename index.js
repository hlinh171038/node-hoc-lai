var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')
// cai req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// cai cookie
app.use(cookieParser())
//satic file
app.use(express.static('public'));

//require low db
var db = require('./db.js');

//require md5 hash
var md5 = require('md5');

//require routes
var userRoute = require('./routes/user-router');
var authRoute = require('./routes/auth-route');

var port = 3000;
app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function(req,res){
 res.send('hello word');
})

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.listen(port, ()=>{
    console.log("This is my port"+port);
})