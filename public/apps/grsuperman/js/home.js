/**
 * Created by nico on 2017/3/23.
 */
grApp.controller('HomeCtrl',['$scope','$http','HomeService','toaster',function($scope,$http,$homeService,toaster){
    $scope.CODE = "" ;
    $scope.user = {} ;
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
                'biz.util.scan']
        });
        dd.ready(function () {

            if(userInSession === 'false'){
                //判断缓存中是否有用户信息
                //获取授权码CODE
                dd.runtime.permission.requestAuthCode({
                    corpId: corpId,
                    onSuccess: function(result) {
                        $homeService.getUserInfo(result.code).then(function (data) {
                            if(data.uid){
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
                switch (action){
                    case 'get':
                        //扫码领单
                        $homeService.findOrdersByOid(code.OID).then(function (result) {
                            
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
                            
                        });
                }
            },
            onFail : function(err) {
                alert(err);
            }
        });
    };
    $scope.search = function () {
        $homeService.findOrdersByOid($scope.orderId).then(function (result) {
            alert(JSON.stringify(result))
            layer.open({
                content: result.msg
                ,btn: 'OK'
            })
        }).catch(function (err) {

        });
    }
}]);