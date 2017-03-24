/**
 * Created by nico on 2017/3/23.
 */

var ae = require('apiengine');
var config = require("../../../config");
var AE = ae({mode:config.dev,scope:'api',adapter:'rest',appkey:config.api.appkey,masterKey:config.api.masterKey});
var async = require('async');
var Q = require('q');
module.exports = {
    //根据手机号查询用户信息
    getUserByPhone : function (args) {
        var q = Q.defer();
        var phone = args.phone || 0 ;
        var query = new AE.Function('api.logistics.ddLogin') ;
        query.invoke({phone:phone}).then(function (data) {
            q.resolve(data) ;
        }).catch(function (err) {
            q.reject(err) ;
        });
        return q.promise;
    },
    findOrdersByOid:function (args) {
        var q = Q.defer();
        var query = new AE.Function('api.logistics.findOrder') ;
        query.invoke({orderid:args}).then(function (data) {
            q.resolve(data) ;
        }).catch(function (err) {
            q.reject(err) ;
        });
        return q.promise;
    },
    //根据订单编号获取订单状态
    getOrderStatusByOid:function (args) {
        var q = Q.defer();
        var query = new AE.Function('api.logistics.getOrderStatus') ;
        query.invoke({orderid:args}).then(function (data) {
            q.resolve(data) ;
        }).catch(function (err) {
            q.reject(err) ;
        });
        return q.promise;
    },
    getTaskHome:function (args) {
        var q = Q.defer();
        async.auto({
            f0:function (cb) {
                var query = new AE.Function('api.logistics.taskHome') ;
                query.invoke({uid:args}).then(function (data) {
                    cb(null,data) ;
                }).catch(function (err) {
                    cb(err);
                });
            },
            f1:function (cb) {
                var query = new AE.Function('api.logistics.taskWaitTake') ;
                query.invoke({uid:args}).then(function (data) {
                    cb(null,data) ;
                }).catch(function (err) {
                    cb(err);
                });
            },
            final:['f0','f1',function (result,cb) {
                cb(null,{taskHome:result.f0[0],taskWaitTake:result.f1[0]})
            }]
        },function (err,result) {
            if(err){
                q.reject(err);
            }else{
                console.log(result.final);
                q.resolve(result.final)
            }
        })

        return q.promise;
    },
    getWaitList:function (args) {
        var q = Q.defer();
        var query = new AE.Function('api.logistics.getTodoTaskList2') ;
        query.invoke({uid:args}).then(function (data) {
            console.log(data);
            q.resolve(data) ;
        }).catch(function (err) {
            q.reject(err) ;
        });
        return q.promise;
    },
}