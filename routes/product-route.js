var express = require('express');
const shortid = require('shortid');
var router = express.Router();

var db = require('../db.js');
var productController = require('../controller/product.controller');
const { route } = require('./user-router.js');

router.get('/', productController.index );
router.get('/:productId',productController.ViewDetail)


module.exports = router;