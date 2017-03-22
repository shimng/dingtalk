/**
 * Created by nico on 2017/3/22.
 */
var Q = require('q');
var ae = require('apiengine');
var config = require("../config");
var AE = ae({mode:config.dev,scope:'api',adapter:'rest',appkey:config.api.appkey,masterKey:config.api.masterKey});
module.exports = {
    login:function (args) {
        var q = Q.defer();
        var phone = args.phone ,
            password = args.password ;
        var query = new AE.Function('api.logistics.login') ;
        query.invoke({phone:phone,password:password}).then(function (data) {
            q.resolve(data) ;
        }).catch(function (err) {
            q.reject(err) ;
        });
        return q.promise;
    }
}