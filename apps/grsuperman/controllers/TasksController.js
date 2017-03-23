/**
 * Created by nico on 2017/3/22.
 */
var _VIEW_PATH = '../apps/grsuperman/views/';

var config = require("../../../config");
var async = require('async');

var commonModel = require('../models/CommonModel');

module.exports =  {
    index : function (req, res, next) {
        var url = config.domain+req.originalUrl;
        console.log(req.session._user);
        if(!req.session._user){
            res.redirect(config.domain+'/apps/grsuperman/index');
        }else{
            res.render(_VIEW_PATH+'tasks', { title: '任务列表',user:req.session._user});
        }
    }
}