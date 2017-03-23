/**
 * Created by nico on 2017/3/23.
 */

var ae = require('apiengine');
var config = require("../../../config");
var AE = ae({mode:config.dev,scope:'api',adapter:'rest',appkey:config.api.appkey,masterKey:config.api.masterKey});
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
}