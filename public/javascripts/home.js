/**
 * Created by nico on 2017/3/21.
 */
grApp.controller('HomeCtrl',['$scope','$http',function($scope,$http){
    $scope.load = function () {
    }
    $scope.scan = function () {
        dd.biz.util.scan({
            type: "barCode",//type为qrCode或者barCode
            onSuccess: function(data) {
                //onSuccess将在扫码成功之后回调
                alert(data.text);
                console.log(data);
                /* data结构
                 { 'text': String}
                 */
            },
            onFail : function(err) {
                alert(err);
            }
        });
    }
}]);