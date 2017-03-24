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
grApp.controller("WaitCtrl",['$scope','$http','HomeService','toaster',function($scope,$http,$homeService,toaster){
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
        })
        // if($scope.dsd.busy) return ;
        // $scope.dsd.busy = true ;
        // alert("more");
    }
}]);