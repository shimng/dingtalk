/**
 * Created by nico on 2017/3/23.
 */
grApp.controller('TasksCtrl',['$scope','$http','HomeService','toaster','$store','$location',function($scope,$http,$homeService,toaster,$store,$location){
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
    };
    //初始化页面
    $scope.load = function () {
        var user = $store.get("_user") ;
        if(!user){
            toaster.error("需要重新登录");
            window.location.href = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/apps/grsuperman/index" ;
            return ;
        }

        dd.ready(function () {
            dd.biz.navigation.setRight({
                show: false
            });
            dd.ui.pullToRefresh.enable({
                onSuccess: function() {
                    $scope.load();
                    dd.ui.pullToRefresh.stop() ;
                },
                onFail: function() {
                    dd.ui.pullToRefresh.stop()
                }
            });
        });
        $homeService.taskHome(user.uid).then(function (data) {
            console.log();
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
        });
    }
}]);
grApp.controller("WaitCtrl",['$scope','$http','HomeService','$store','$location','toaster',function($scope,$http,$homeService,$store,$location,toaster){
    $scope.dsd = {
        items:[],
        busy:false
    };

    dd.ready(function () {
        dd.ui.pullToRefresh.enable({
            onSuccess: function() {
                dd.ui.pullToRefresh.stop() ;
            },
            onFail: function() {
                dd.ui.pullToRefresh.stop()
            }
        });
    });
    $scope.tasks = {dsd:[],brd:[],mfd:[],other:[]} ;
    $scope.load = function () {
        var user = $store.get("_user") ;
        if(!user){
            toaster.error("需要重新登录");
            window.location.href = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/apps/grsuperman/index" ;
            return ;
        }
        $homeService.getWaitList(user.uid).then(function (data) {
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
grApp.controller('InexpressCtrl',['$scope','$http','HomeService','toaster','$filter','$store','$location',function($scope,$http,$homeService,toaster,$filter,$store,$location){
    $scope.tasks = [] ;
    $scope.inExpress = {show_book_date:0,book_date:""} ;
    dd.ready(function () {
        dd.biz.navigation.setRight({
            show: false
        });
        dd.ui.pullToRefresh.enable({
            onSuccess: function() {
                dd.ui.pullToRefresh.stop() ;
            },
            onFail: function() {
                dd.ui.pullToRefresh.stop()
            }
        });
    });

    var user = $store.get("_user") ;
    //初始化
    $scope.load = function () {
        if(!user){
            toaster.error("需要重新登录");
            window.location.href = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/apps/grsuperman/index" ;
            return ;
        }
        $homeService.getInExpress(user.uid).then(function (data) {
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
                $homeService.finishExpress(user.uid,code+"").then(function (data) {
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
            $homeService.rejectExpress(user.uid,code+"",text.replace(/^(?!.*[%\'\"?])/g,'')).then(function (data) {
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
                var boot_time = new Date((result.value).replace(/-/g,'/')+":00").getTime()/1000 ;
                $homeService.bookTime(user.uid,code,boot_time).then(function (data) {
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
grApp.controller("BackgoodsCtrl",['$scope','$http','HomeService','$location','toaster','$store',function($scope,$http,$homeService,$location,toaster,$store){
    $scope.tasks = [] ;
    dd.ready(function () {
        dd.biz.navigation.setRight({
            show: false
        });
        dd.ui.pullToRefresh.enable({
            onSuccess: function() {
                dd.ui.pullToRefresh.stop() ;
            },
            onFail: function() {
                dd.ui.pullToRefresh.stop()
            }
        });
    });
    var user = $store.get("_user");
    $scope.load = function () {
        if(!user){
            toaster.error("需要重新登录");
            window.location.href = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/apps/grsuperman/index" ;
            return ;
        }
        $homeService.getBackGoods(user.uid).then(function (data) {
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
grApp.controller("ExchangeCtrl",['$scope','$http','HomeService','$location','toaster','$store',function($scope,$http,$homeService,$location,toaster,$store){
    $scope.tasks = [] ;
    dd.ready(function () {
        dd.biz.navigation.setRight({
            show: false
        });
        dd.ui.pullToRefresh.enable({
            onSuccess: function() {
                dd.ui.pullToRefresh.stop() ;
            },
            onFail: function() {
                dd.ui.pullToRefresh.stop()
            }
        });
    });
    var user = $store.get("_user");
    $scope.load = function () {
        if(!user){
            toaster.error("需要重新登录");
            window.location.href = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/apps/grsuperman/index" ;
            return ;
        }
        $homeService.getExchangeGoods(user.uid).then(function (data) {
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
grApp.controller('FinishedCtrl',['$scope','$http','HomeService','$store','$location','toaster',function($scope,$http,$homeService,$store,$location,toaster){
    $scope.tasks = [] ;
    $scope.summary = {count:0,amount:0};
    var user = $store.get("_user");
    dd.ready(function () {
        dd.biz.navigation.setRight({
            show: true ,//控制按钮显示， true 显示， false 隐藏， 默认true
            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: '清理',//控制显示文本，空字符串表示显示默认文本
            onSuccess : function(result) {
                //如果control为true，则onSuccess将在发生按钮点击事件被回调
                if($scope.tasks.length <= 0){
                    layer.msg("无需交账");
                    return ;
                }
                layer.open({
                    title:"提醒",
                    content:"交账后无法修改，确认交账？",
                    btn:["确认","取消"],
                    yes:function (i) {
                        layer.close(i);
                        $homeService.accountNow(user.uid).then(function () {
                            $scope.tasks.splice(0) ;
                            $scope.summary = {count:0,amount:0};
                            layer.msg("交账成功");
                        })
                    }
                })
            },
            onFail : function(err) {}
        });
        dd.ui.pullToRefresh.enable({
            onSuccess: function() {
                dd.ui.pullToRefresh.stop() ;
            },
            onFail: function() {
                dd.ui.pullToRefresh.stop()
            }
        });
    });
    $scope.load = function () {
        if(!user){
            toaster.error("需要重新登录");
            window.location.href = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/apps/grsuperman/index" ;
            return ;
        }
        $homeService.getFinishedMission(user.uid).then(function (data) {
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
grApp.controller('BookedCtrl',['$scope','$http','HomeService','toaster','$store','$location',function($scope,$http,$homeService,toaster,$store,$location){
    $scope.tasks = [] ;
    dd.ready(function () {
        dd.biz.navigation.setRight({
            show: false
        });
        dd.ui.pullToRefresh.enable({
            onSuccess: function() {
                dd.ui.pullToRefresh.stop() ;
            },
            onFail: function() {
                dd.ui.pullToRefresh.stop()
            }
        });
    });
    var user = $store.get("_user");
    $scope.load = function () {
        if(!user){
            toaster.error("需要重新登录");
            window.location.href = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/apps/grsuperman/index" ;
            return ;
        }
        $homeService.getBookedMission(user.uid).then(function (data) {
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
        $homeService.restartExpress(user.uid,code).then(function (data) {
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
grApp.controller('RejectedCtrl',['$scope','$http','HomeService','toaster','$store','$location',function($scope,$http,$homeService,toaster,$store,$location){
    $scope.tasks = [] ;
    dd.ready(function () {
        dd.biz.navigation.setRight({
            show: false
        });
        dd.ui.pullToRefresh.enable({
            onSuccess: function() {
                dd.ui.pullToRefresh.stop() ;
            },
            onFail: function() {
                dd.ui.pullToRefresh.stop()
            }
        });
    });
    var user = $store.get("_user");
    $scope.load = function () {
        if(!user){
            toaster.error("需要重新登录");
            window.location.href = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/apps/grsuperman/index" ;
            return ;
        }
        $homeService.getRejectedMission(user.uid).then(function (data) {
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
        $homeService.restartExpress(user.uid,code).then(function (data) {
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



