/**
 * Created by nico on 2017/3/25.
 */
//订单类型常量
const CONST_ORDER_TYPE = {
    0:"普",
    1:'团',
    2:'秒',
    3:'普',
    4:'活动',
    5:'预',
    6:'外',
    7:'包月',
    8:'营销',
    9:'三方外卖',
    11:'退货',
    12:'换货',
    13:'百度饿了么'
};
const CONST_PAY_WAY = {
    WXPAY:'微信支付',
    ALIPAY:'支付宝支付',
    MEITUANPAY:'美团支付',
    BAIDUPAY:'百度支付',
    YUEPAY:'余额支付',
    DAOPAY:'到付',
    OTHERPAY:"其他方式支付"
}
grApp.filter("orderType",function () {
    return function (code) {
        if(code <0 ){
            code = code+"";
        }
        return CONST_ORDER_TYPE[code];
    }
});
grApp.filter('payway',function () {
    return function (text) {
        if(text){
            return CONST_PAY_WAY[text];
        }else{
            return CONST_PAY_WAY['OTHERPAY'];
        }
    }
})