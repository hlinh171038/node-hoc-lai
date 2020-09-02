var express = require('express');
const shortid = require('shortid');
var router = express.Router();

var db = require('../db.js');
var userController = require('../controller/auth.controller');

router.get('/', userController.login );
router.post('/',userController.postAuth)

module.exports = router;