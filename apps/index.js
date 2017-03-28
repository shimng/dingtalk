/**
 * Created by nico on 2017/3/22.
 * 这里存放各个app的路由
 */
//果然超人app
var grsuperman = require('./grsuperman/router');
//世果超人app
var sgsuperman = require('./sgsuperman/router');

var express = require('express');
var router = express.Router();

grsuperman.bind(router);
sgsuperman.bind(router);
module.exports = router;