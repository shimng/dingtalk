/**
 * Created by nico on 2017/3/23.
 */
grApp.controller('HomeCtrl',['$scope','toaster','$filter','$service','$sgSuperman',function($scope,toaster,$filter,$service,$sgSuperman){
    $scope.user = {} ;


    //初始化页面
    $scope.load = function (corpId,timeStamp,nonceStr,signature,agentId) {
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
                'dd.biz.navigation.setRight'
            ]
        });
        dd.ready(function () {

            dd.biz.navigation.setRight({
                show: false
            });
            dd.ui.pullToRefresh.disable() ;
            if("false" === 'false'){
                //判断缓存中是否有用户信息
                //获取授权码CODE
                dd.runtime.permission.requestAuthCode({
                    corpId: corpId,
                    onSuccess: function(result) {
                        console.log(result.code);
                        $service.getUserInfo(result.code).then(function (data) {
                            console.log(result.code);
                            if(data.uid){
                                console.log("before");
                                console.log($sgSuperman.get("_user"));
                                $sgSuperman.set("_user",data);
                                console.log("after");
                                console.log($sgSuperman.get("_user"));
                                // $sgSuperman.set("_user",data);
                                // console.log("store");
                                // console.log($sgSuperman.get("_user"));
                                // $scope.user = data ;
                                toaster.success("重新登陆成功");
                            }else{
                                toaster.error("重新登陆失败",data.message);
                            }
                        }).catch(function (err) {
                            console.log(err);
                            toaster.error("重新登陆失败");
                        });
                    },
                    onFail : function(err) {
                        console.log(err);
                        toaster.error("重新登陆失败");
                    }
                })
            }else{
                toaster.success("自动登陆成功");
            }
        });
        dd.error(function(err) {
            alert('dd error: ' + JSON.stringify(err));
        });
    }
}]);