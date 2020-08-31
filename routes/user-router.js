var express = require('express');
const shortid = require('shortid');
var router = express.Router();

var db = require('../db.js');
var userController = require('../controller/user.controller');

router.get('/', userController.index );
//search user
router.get('/search',userController.search);
//create user
router.get('/create',userController.getCreate);
router.post('/create',userController.postCreate);
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