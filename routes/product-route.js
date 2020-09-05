var express = require('express');
const shortid = require('shortid');
var router = express.Router();

var db = require('../db.js');
var productController = require('../controller/product.controller');

router.get('/', productController.index );


module.exports = router;