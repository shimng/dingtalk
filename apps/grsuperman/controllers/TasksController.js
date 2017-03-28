/**
 * Created by nico on 2017/3/22.
 */
var _VIEW_PATH = '../apps/grsuperman/views/';

var config = require("../../../config");
var async = require('async');

module.exports =  {
    index : function (req, res, next) {
        var url = config.domain+req.originalUrl;
        console.log(!req.session._user);
        // if(!req.session._user){
        //     res.redirect(config.domain+'/apps/grsuperman/index');
        // }else{
        //     res.render(_VIEW_PATH + 'tasks', { title: '任务列表',user:req.session._user});
        // }
        res.render(_VIEW_PATH+'tasks', { title: '任务列表'});
    },
    wait:function (req,res,next) {
        res.render(_VIEW_PATH+"tasks/wait",{title:"待领取"});
    },

    inexpress:function (req,res,next) {
        res.render(_VIEW_PATH+"tasks/inexpress",{title:"派送中"});
    },

    backgoods:function (req,res,next) {
        res.render(_VIEW_PATH+"tasks/backgoods",{title:"退货"});
    },
    exchange:function (req,res,next) {
        res.render(_VIEW_PATH+"tasks/exchange",{title:"换货"});
    },
    finished:function (req,res,next) {
        res.render(_VIEW_PATH+"tasks/finished",{title:"已完成"});
    },
    booked:function (req,res,next) {
        res.render(_VIEW_PATH+"tasks/booked",{title:"预约"});
    },
    rejected:function (req,res,next) {
        res.render(_VIEW_PATH+"tasks/rejected",{title:"拒收"});
    },

}