/**
 * Created by nico on 2017/3/11.
 */
var key = require('./key');
exports.ding = key.ding ;
exports.redis = key.redis;
exports.domain = "http://192.168.1.6:3000";
exports.dev = key.dev ;
var dev = (function(){
    if('linux' == process.platform){
        //在linux环境中运行
        if(__dirname.indexOf('mguoran100')>0 || __dirname.indexOf('data/www/dingtalk')>0){
            // logger.info('在正式环境中启动!');
            return 'PRODUCT';
        }
        //判断执行的目录
        // logger.info('在沙箱环境中启动!');
        return 'STAGING';
    }
    // logger.info('在测试环境中启动!');
    return 'DEV';
})();




exports.api = key.API_KEYS ;