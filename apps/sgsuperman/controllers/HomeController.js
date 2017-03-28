/**
 * Created by nico on 2017/3/22.
 */
var _VIEW_PATH = '../apps/sgsuperman/views/';
var config = require("../../../config");
var async = require('async');
var ding = require("ding_jsapi_redis");
ding.conf.ding = config.ding;
ding.conf.redis = config.redis;



module.exports =  {
    index : function (req, res, next) {
        var url = config.domain+req.originalUrl;
        ding.getSignature(url).then(function(data){
            data['agentId'] = config.ding.agentId ;
            console.log(data);
            res.render(_VIEW_PATH+'home', { title: '世果超人',dd_config:data});
        }).catch(function (err) {
            console.log(err)
        });
    },
}