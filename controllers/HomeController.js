/**
 * Created by nico on 2017/3/21.
 */
var config = require("../config");
var ding = require("ding_jsapi_redis");
ding.conf.ding = config.ding;
ding.conf.redis = config.redis;
module.exports = {
    index:function(req,res){
        var url = config.domain+req.url;
        ding.getSignature(url).then(function(data){
            data['agentId'] = config.ding.agentId ;
            res.render('home', { title: '果然超人',dd_config:data });
        }).catch(function (err) {
            console.log(err)
        })
    }
}