/**
 * Created by nico on 2017/3/25.
 */
//订单状态
const CONST_ORDER_STATE_MAP = {
    1000:'已创建，未付款',
    2000:'已付款，未审核',
    2500:'已审核，未出单',
    3000:'已出单，未打包',
    4000:'已打包，未中转',
    4500:'已中转，未抵达',
    5000:'已抵达，未分配',
    6000:'已分配，未领件',
    6900:'预约派送',
    7000:'已领件，未派送',
    8000:'已派送，未签收',
    9000:'已签收，未评价',
    9001:'退货待受理',
    9002:'退货受理中',
    9003:'退货已受理',
    9004:'客户拒收',
    9999:'已评价',
    '-1':'用户取消',
    '-2':'平台取消'
};

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
};
const CONST_ORDER_ERROR = {
    "-41":"该订单无法被领取，订单非可领件状态！",
    "-42":"该订单已被领取",
    "-43":"问题订单，请反馈！！",
    "-44":"该订单无法领取，未搜索到该订单。请反馈！！",
    "-45":"该订单不在可领件范围内！！",
    "-46":"LBS 错误",
    "NAN":"重新尝试下，若依旧弹出该窗口，请检查网络，并联系技术部！"
};

grApp.filter("orderType",function () {
    return function (code) {
        if(code <0 ){
            code = code+"";
        }
        return CONST_ORDER_TYPE[code];
    }
})
    .filter('payway',function () {
    return function (text) {
        if(text){
            return CONST_PAY_WAY[text];
        }else{
            return CONST_PAY_WAY['OTHERPAY'];
        }
    }
})
.filter("orderState",function () {
    return function(code){
        if(code<0){
            code = code+'';
        }
        return CONST_ORDER_STATE_MAP[code];
    }

})
    .filter('takeOrderError',function() {
        return function (err) {
            if(_.isNumber(parseInt(err.errno))){
                if(_.has(CONST_ORDER_ERROR,''+ err.errno)){
                    return CONST_ORDER_ERROR['' + err.errno];
                }else{
                    return err.message || CONST_ORDER_ERROR['NAN'];
                }
            }
            return CONST_ORDER_ERROR['NAN'];
        }
    })
