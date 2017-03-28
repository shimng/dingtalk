/**
 * Created by nico on 2017/3/23.
 */
grApp.controller('HomeCtrl',['$scope','$http','HomeService','toaster','$gRequire','$filter','$store',function($scope,$http,$homeService,toaster,$gRequire,$filter,$store){
    $scope.CODE = "" ;

    var user = $store.get("_user") ;
    //初始化页面
    $scope.load = function (corpId,timeStamp,nonceStr,signature,agentId,userInSession) {

        //设置config
        dd.config({
            agentId: agentId,
            corpId:corpId,
            timeStamp:  timeStamp,
            nonceStr: nonceStr,
            signature:  signature,
            jsApiList: [
                'runtime.permission.requestAuthCode',
                'biz.util.datetimepicker',
                'biz.util.scan',
                'ui.pullToRefresh.enable',
                'ui.pullToRefresh.stop',
                'ui.pullToRefresh.disable',
                'biz.util.ut',
                'dd.biz.navigation.setRight'
            ]
        });
        dd.ready(function () {
            document.addEventListener('resume', function() { alert('resume'); });
            dd.biz.navigation.setRight({
                show: false
            });
            dd.ui.pullToRefresh.disable() ;
            console.log($store.get("_user"));
            if(!user || !user.uid){
                //判断缓存中是否有用户信息
                //获取授权码CODE
                dd.runtime.permission.requestAuthCode({
                    corpId: corpId,
                    onSuccess: function(result) {
                        $homeService.getUserInfo(result.code).then(function (data) {
                            if(data.uid){

                                console.log("before");
                                console.log($store.get("_user"));
                                $store.set("_user",data);
                                console.log("after");
                                console.log($store.get("_user"));
                                // $scope.user = data ;
                                toaster.success("重新登陆成功");
                            }else{
                                toaster.error("重新登陆失败",data.message);
                            }
                        }).catch(function (err) {
                            toaster.error("重新登陆失败");
                        });
                    },
                    onFail : function(err) {
                        toaster.error("重新登陆失败");
                    }
                })
            }else{
                toaster.success("自动登陆成功");
            }
            dd.error(function(err) {
                alert('dd error: ' + JSON.stringify(err));
            });
        })
        dd.error(function(err) {
            alert('dd error: ' + JSON.stringify(err));
        });
    };
    $scope.scan = function (action) {
        dd.biz.util.scan({
            type: "barCode",//type为qrCode或者barCode
            onSuccess: function(data) {
                //onSuccess将在扫码成功之后回调
                var code = JSON.parse(data.text) || {'OID':"0"};
                if(!$gRequire.requireDefinedOid(code.OID)){
                    return ;
                }
                switch (action){
                    case 'get':
                        //扫码领单
                        $homeService.findOrdersByOid(code.OID).then(function (result) {
                            if(result.errno === undefined){
                                $scope.orders = result ;
                            }else{
                                layer.open({
                                    content: "订单编号不存在，或者编号错误！"
                                    ,btn: 'OK'
                                })
                            }
                        }).catch(function (err) {
                            toaster.error("出错了，请刷新重试！");
                        });
                        break;
                    default:
                        //扫码查单
                        $homeService.getOrderStatus(code.OID).then(function (result) {
                            var message = "还没设置" ;
                            if(result.errno === undefined){
                                message = result.msg
                            }else{
                                message = "订单编号不存在";
                            }
                            layer.open({
                                content: message
                                ,btn: 'OK'
                            })
                        }).catch(function (err) {
                            toaster.error("出错了，请刷新重试！");
                        });
                }
            },
            onFail : function(err) {
                alert(err);
            }
        });
    };
    $scope.search = function () {
        if(!$gRequire.requireOIDNotNullAndNotLessThan6($scope.orderId)){
            return ;
        }
        $homeService.findOrdersByOid($scope.orderId).then(function (result) {
            if(result.errno === undefined){
                $scope.orders = result ;
            }else{
                layer.open({
                    content: "订单编号不存在，或者编号错误！"
                    ,btn: 'OK'
                })
            };
        }).catch(function (err) {
            toaster.error("出错了，请刷新重试！");
        });
    };
    $scope.take = function (event ,code ,order,$index) {
        layer.open({
            content:"确定领取订单？",
            btn:["确定","取消"],
            shadeClose: false,
            yes:function (i) {
                layer.close(i);
                var order_ = order ;
                var param = {uid:user.uid,orderid:code,ordertype:order.expresstype};
                $homeService.takeOrder(param).then(function (result) {
                    $scope.orders.splice($index,1);
                    if(order_.errno === undefined){
                        alert(order_.type);
                        if(order_.expresstype === "定时送达"){
                            var time = $filter('date')(order_.deliveryTime*1000,'yyyy-MM-dd HH:mm');
                            layer.open({
                                title:"提示",
                                content: "注意:此订单为定时达订单，用户预约时间为"+time+" 请留心安排时间哦！",
                                btn: 'OK'
                            });
                        }else{
                            layer.open({
                                title:"提示",
                                content: "领单成功，请到任务中查看",
                                btn: 'OK'
                            });
                        }
                    }else{
                        layer.open({
                            title:"提示",
                            content: $filter("takeOrderError")(result)
                            ,btn: 'OK'
                        });
                    }
                })
            }
        })
    }
}]);