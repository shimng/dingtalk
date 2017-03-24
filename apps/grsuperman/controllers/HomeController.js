/**
 * Created by nico on 2017/3/22.
 */
var _VIEW_PATH = '../apps/grsuperman/views/';

var config = require("../../../config");
var async = require('async');
var ding = require("ding_jsapi_redis");
ding.conf.ding = config.ding;
ding.conf.redis = config.redis;

var commonModel = require('../models/CommonModel');

module.exports =  {
    index : function (req, res, next) {
        var url = config.domain+req.originalUrl;
        var userInSession = false ;
        var user = '' ;
        if(req.session._user){
            userInSession = true ;
        }
        ding.getSignature(url).then(function(data){
            data['agentId'] = config.ding.agentId ;
            res.render(_VIEW_PATH+'home', { title: '果然超人',dd_config:data,userInSession:userInSession});
        }).catch(function (err) {
            console.log(err)
        });
    },
    getUserInfo:function (req, res, next) {
        var code = req.query.code ;
        async.waterfall([
            function (cb) {
                //获取用户userid
                ding.httpGetFunc({action:"user/getuserinfo",params:{code:code}}).then(function (result) {
                    if(result.errcode === 0){
                        cb(null,result.userid)
                    }else{
                        cb({})
                    }
                }).catch(function (err) {
                    cb(err)
                })
            },
            function (userid,cb) {
                //获取用户信息
                ding.httpGetFunc({action:"user/get",params:{userid:userid}}).then(function (result) {
                    if(result.errcode === 0){
                        cb(null,result);
                    }else{
                        cb({})
                    }
                }).catch(function (err) {
                    cb(err)
                })
            },
            function (dd_user,cb) {
                commonModel.getUserByPhone({phone:dd_user.mobile}).then(function (result) {
                    req.session._user = {
                        name:dd_user.name,
                        orderInDepts : dd_user.orderInDepts,
                        position:dd_user.position,
                        department:dd_user.department,
                        workPlace:dd_user.workPlace,
                        mobile:dd_user.mobile,
                        orgEmail:dd_user.orgEmail,
                        unionid:dd_user.unionid,
                        position:dd_user.position,
                        avatar:dd_user.avatar,
                        jobnumber:dd_user.jobnumber,
                        uid:result.id,
                        area:result.area,
                        areaIds:result.areaIds
                    };
                    console.log(req.session._user);
                    cb(null,req.session._user)
                }).catch(function (err) {
                    cb(err)
                })
            }
        ],function (err,result) {
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
        
    } ,
    findOrdersByOid : function (req,res,next) {
        var orderId = req.query.orderId ;
        commonModel.findOrdersByOid(orderId).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            res.json(err);
        })
    },
    getOrderStatusByOid: function (req,res,next) {
        var orderId = req.query.orderId ;
        commonModel.getOrderStatusByOid(orderId).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            res.json(err);
        })
    },
    getTaskHome:function (req, res, next) {
        var user = req.session._user || {};
        commonModel.getTaskHome(user.uid).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        })
    },
    getWaitList:function (req, res, next) {
        var user = req.session._user || {};
        console.log(user);
        commonModel.getWaitList(user.uid).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        })
    },
}