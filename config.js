/**
 * Created by nico on 2017/3/11.
 */
var key = require('./key');
exports.ding = key.ding ;
exports.redis = key.redis;
exports.domain = "http://192.168.1.6:3000";

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
var REDIS_DEV = {RDS_PORT:6379,RDS_HOST :'61.147.98.84',RDS_AUTH:{}}
var REDIS_PRODUCT = {RDS_PORT:6379,RDS_HOST :'10.10.46.36',RDS_AUTH:{}}
exports.dev = dev;


var API_KEYS_DEV = {
    appkey:'45883198abcdc109',
    masterKey:'1b7e5703602b6fce1cae7364ac0f2246'
};
exports.api = (function(){
    switch (dev){
        case 'DEV':
            return API_KEYS_DEV;
        case 'STAGING':
            return API_KEYS_DEV;
        case 'PRODUCT':
            return API_KEYS_DEV;
    }
})();