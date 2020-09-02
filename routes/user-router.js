var express = require('express');
const shortid = require('shortid');
var router = express.Router();

var db = require('../db.js');
var userController = require('../controller/user.controller');
var userValidate = require('../validate/user.validate');

router.get('/', userController.index );
router.get('/cokie',function(req,res,next){
    res.cookie('cokies-id',"1232");
    res.send('hello');
})
//search user
router.get('/search',userController.search);
//create user
router.get('/create',userController.getCreate);
router.post('/create',userValidate.postCreate,userController.postCreate);
//update user
router.get('/update',userController.getUpdate);
router.post('/update',userController.postUpdate);
//delete user
router.get('/delete/:id',userController.delete);
// view detail user
router.get('/:id', userController.detail);
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
//router
module.exports = router;