var express = require('express');
var router = express.Router();

var db = require('../db.js');
var userController = require('../controller/cart.controller');

router.get('/',userController.index);
router.get('/add/:productId', userController.AddToCart );
module.exports = router;