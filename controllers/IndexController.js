/**
 * Created by nico on 2017/3/11.
 */
var config = require("../config");
var ding = require("ding_jsapi_redis");
ding.conf.ding = config.ding;
ding.conf.redis = config.redis;
module.exports = {
    index:function(req,res){
        // {redis:config.redis,ding:config.ding}
        var params = {
            id:"31441266"
        }
        var url = config.domain+req.url;
        console.log(url);
        ding.getSignature(url).then(function(data){
            console.log(data);
            res.render('index', { title: 'Express',dd_config:data });
        }).catch(function (err) {
            console.log(err)
        })
    }
}