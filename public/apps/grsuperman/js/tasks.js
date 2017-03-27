/**
 * Created by nico on 2017/3/23.
 */
grApp.controller('TasksCtrl',['$scope','$http','HomeService','toaster',function($scope,$http,$homeService,toaster){
    $scope.taskHome = {
        inExpress:0,
        finishExpress:0,
        backGoods:0,
        changeGoods:0,
        bookTime:0,
        reject:0
    };
    $scope.wait = {
        waittask:0,
        dsd:0,
        sd:0
    }
    //初始化页面
    $scope.load = function () {
        $homeService.taskHome1().then(function (data) {
            $scope.taskHome = {
                inExpress:data.taskHome.zp || 0,
                finishExpress:data.taskHome.ywc|| 0,
                backGoods:data.taskHome.th|| 0,
                changeGoods:data.taskHome.hh|| 0,
                bookTime:data.taskHome.yy|| 0,
                reject:data.taskHome.js|| 0
            };
            $scope.wait = {
                waittake:data.taskWaitTake.waittake|| 0,
                dsd:data.taskWaitTake.dsd|| 0,
                sd:data.taskWaitTake.sd || 0
            }
        }).catch(function (err) {
            console.log(err);
        })
    }
}]);
grApp.controller("WaitCtrl",['$scope','$http','HomeService',function($scope,$http,$homeService){
    $scope.dsd = {
        items:[],
        busy:false
    };
    $scope.tasks = {dsd:[],brd:[],mfd:[],other:[]} ;
    $scope.load = function () {
        $homeService.getWaitList().then(function (data) {
            if(data.errno === undefined){
                $scope.tasks = data ;
            }else{
                layer.open({
                    content: "请返回领单页面或者重新应用。优化中..."
                    ,btn: 'OK'
                })
            }
        }).catch(function (err) {
            layer.open({
                content: "请返回领单页面或者重新应用。优化中..."
                ,btn: 'OK'
            })
        });
    }
}]);
grApp.controller('InexpressCtrl',['$scope','$http','HomeService','toaster','$filter',function($scope,$http,$homeService,toaster,$filter){
    $scope.tasks = [] ;
    $scope.inExpress = {show_book_date:0,book_date:""} ;
    //初始化
    $scope.load = function () {
        $homeService.getInExpress().then(function (data) {
            if(data.errno === undefined){
                $scope.tasks = data ;
            }else{
                layer.open({
                    content: "请返回领单页面或者重新应用。优化中..."
                    ,btn: 'OK'
                })
            }
        }).catch(function (err) {
            alert(JSON.stringify(err));
            layer.open({
                content: "请返回领单页面或者重新应用。优化中..."
                ,btn: 'OK'
            })
        });
    }
    //完成任务
    $scope.finishExpress = function (event,code,task,index) {
        layer.open({
            title:"提醒",
            content: '您确定要完成派送？'
            ,btn: ['确定', '取消']
            ,yes: function(i){
                //确定完成
                $homeService.finishExpress(code+"").then(function (data) {
                    if(data.code === 0){
                        $scope.tasks.splice(index,1);
                        layer.close(i);
                        toaster.success("派送完成");
                    }else{
                        layer.close(i);
                        if(data.errno === undefined){
                            toaster.error(data.msg);
                        }else{
                            toaster.error(data.message);
                        }
                    }
                }).catch(function () {
                    layer.close(i);
                    toaster.error("出问题了，刷新重新尝试下")
                })
            }
        });
    } ;
    //用户拒收
    $scope.rejectExpress = function (event,code,task,index) {
        layer.prompt({title: '确认客户拒收？', formType: 2}, function(text, i){
            //确定完成
            $homeService.rejectExpress(code+"",text.replace(/^(?!.*[%\'\"?])/g,'')).then(function (data) {
                if(data.code === 0){
                    $scope.tasks.splice(index,1);
                    layer.close(i);
                    layer.msg("确认用户拒收");
                }else{
                    layer.close(i);
                    if(data.errno === undefined){
                        toaster.error(data.msg);
                    }else{
                        toaster.error(data.message);
                    }
                }
            }).catch(function () {
                layer.close(i);
                toaster.error("出问题了，刷新重新尝试下");
            })
        });
    };

    $scope.bookTime = function(event,code,task,index){
        dd.biz.util.datetimepicker({
            format: 'yyyy-MM-dd HH:mm',
            value:$filter('date')(new Date(),'yyyy-MM-dd HH:mm'), //默认显示
            onSuccess : function(result) {
                var boot_time = new Date(result.value).getTime()/1000 ;
                $homeService.bookTime(code,boot_time).then(function (data) {
                    if(data.code === 0){
                        $scope.tasks.splice(index,1);
                        toaster.success("预约成功");
                    }else{
                        if(data.errno === undefined){
                            toaster.error(data.msg);
                        }else{
                            toaster.error(data.message);
                        }
                    }
                }).catch(function () {
                    toaster.error("出问题了，刷新重新尝试下");
                });
            },
            onFail : function() {
                toaster.error("出问题了，刷新重新尝试下");
            }
        })
    };
}]);
//退货
grApp.controller("BackgoodsCtrl",['$scope','$http','HomeService',function($scope,$http,$homeService){
    $scope.tasks = [] ;
    $scope.load = function () {
        $homeService.getBackGoods().then(function (data) {
            if(data.errno === undefined){
                $scope.tasks = data ;
            }else{
                layer.open({
                    content: "请返回领单页面或者重新应用。优化中..."
                    ,btn: 'OK'
                })
            }
        }).catch(function (err) {
            layer.open({
                content: "请返回领单页面或者重新应用。优化中..."
                ,btn: 'OK'
            })
        });
    }
}]);
//换货
grApp.controller("ExchangeCtrl",['$scope','$http','HomeService',function($scope,$http,$homeService){
    $scope.tasks = [] ;
    $scope.load = function () {
        $homeService.getExchangeGoods().then(function (data) {
            if(data.errno === undefined){
                $scope.tasks = data ;
            }else{
                layer.open({
                    content: "请返回领单页面或者重新应用。优化中..."
                    ,btn: 'OK'
                })
            }
        }).catch(function (err) {
            layer.open({
                content: "请返回领单页面或者重新应用。优化中..."
                ,btn: 'OK'
            })
        });
    }
}]);
//已完成
grApp.controller('FinishedCtrl',['$scope','$http','HomeService',function($scope,$http,$homeService){
    $scope.tasks = [] ;
    $scope.summary = {count:0,amount:0};
    $scope.load = function () {
        $homeService.getFinishedMission().then(function (data) {
            if(data.errno === undefined){
                $scope.summary = {count:data.count,amount:data.amount};
                $scope.tasks = data.list ;
            }else{
                layer.open({
                    content: "请返回领单页面或者重新应用。优化中..."
                    ,btn: 'OK'
                })
            }
        }).catch(function (err) {
            layer.open({
                content: "请返回领单页面或者重新应用。优化中..."
                ,btn: 'OK'
            })
        });
    }
}]);
//预约
grApp.controller('BookedCtrl',['$scope','$http','HomeService','toaster',function($scope,$http,$homeService,toaster){
    $scope.tasks = [] ;
    $scope.load = function () {
        $homeService.getBookedMission().then(function (data) {
            if(data.errno === undefined){
                $scope.tasks = data ;
            }else{
                layer.open({
                    content: "请返回领单页面或者重新应用。优化中..."
                    ,btn: 'OK'
                })
            }
        }).catch(function (err) {
            layer.open({
                content: "请返回领单页面或者重新应用。优化中..."
                ,btn: 'OK'
            })
        });
    };

    $scope.restartExpress = function (event,code,task,index) {
        $homeService.restartExpress(code).then(function (data) {
            if(data.code === 0){
                $scope.tasks.splice(index,1);
                toaster.success("已重新开始派送");
            }else{
                if(data.errno === undefined){
                    toaster.error(data.msg);
                }else{
                    toaster.error(data.message);
                }
            }
        }).catch(function () {
            toaster.error("出问题了，刷新重新尝试下")
        })
    }
}]);
//拒收
grApp.controller('RejectedCtrl',['$scope','$http','HomeService','toaster',function($scope,$http,$homeService,toaster){
    $scope.tasks = [] ;
    $scope.load = function () {
        $homeService.getRejectedMission().then(function (data) {
            if(data.errno === undefined){
                $scope.tasks = data ;
            }else{
                layer.open({
                    content: "请返回领单页面或者重新应用。优化中..."
                    ,btn: 'OK'
                })
            }
        }).catch(function (err) {
            layer.open({
                content: "请返回领单页面或者重新应用。优化中..."
                ,btn: 'OK'
            })
        });
    };
    $scope.restartExpress = function (event,code,task,index) {
        $homeService.restartExpress(code).then(function (data) {
            if(data.code === 0){
                $scope.tasks.splice(index,1);
                toaster.success("已重新开始派送");
            }else{
                if(data.errno === undefined){
                    toaster.error(data.msg);
                }else{
                    toaster.error(data.message);
                }
            }
        }).catch(function () {
            toaster.error("出问题了，刷新重新尝试下")
        })
    }
}]);


