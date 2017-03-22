/**
 * Created by nico on 2017/3/22.
 */
var config = require("../config");
var ding = require("ding_jsapi_redis");
ding.conf.ding = config.ding;
ding.conf.redis = config.redis;
var setting = require("../model/SettingModel");
module.exports = {
    index:function(req,res){

    },
    login:function (req,res) {
        res.render("setting/login",{title:"登录"});
    },
    loginFunc1:function (req,res) {
        console.log(req.query);
        console.log(req.query);
        console.log(req.query);
        res.json({code:0});
    },
    loginF:function (req,res) {
        var url = req.originalUrl ;
        setting.login(req.query).then(function (data) {
            if(data.id){
                req.session.user = data ;
                return res.redirect(url) ;
            }
            return res.json(data);
        }).catch(function (err) {
            return res.json(err);
        })
    }
}