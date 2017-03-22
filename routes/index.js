var express = require('express');
var router = express.Router();

var indexCtr = require("../controllers/IndexController");
var homeCtrl = require("../controllers/HomeController") ;
var settingCtrl = require("../controllers/SettingController") ;
/* GET home page. */
router.get('/demo', indexCtr.index);
router.get('/', homeCtrl.index);

router.get('/login', settingCtrl.login);

//ajax
router.get('/setting/loginAjax', settingCtrl.loginF);

module.exports = router;
