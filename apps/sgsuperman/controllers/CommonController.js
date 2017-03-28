/**
 * Created by nico on 2017/3/28.
 */
var config = require("../../../config");
var async = require('async');
var ding = require("ding_jsapi_redis");
ding.conf.ding = config.ding;
ding.conf.redis = config.redis;


var commonModel = require('../models/CommonModel');

module.exports = {
    getDingSignature:function (req,res,next) {
        var url = config.domain+req.originalUrl;

        ding.getSignature(req.query.url).then(function(data){
            data['agentId'] = config.ding.agentId ;
            res.json({status:1,data:data});
        }).catch(function (err) {
            res.json({status:-1,data:err});
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
                    var _user = {
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
                    cb(null,_user)
                }).catch(function (err) {
                    cb(err)
                })
            }
        ],function (err,result) {
            if(err){
                res.json(err);
            }else{
                console.log("ding user");
                console.log(result);
                res.json(result);
            }
        })

    } ,
}
