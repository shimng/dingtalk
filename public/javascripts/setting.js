/**
 * Created by nico on 2017/3/21.
 */

grApp.controller('LoginCtrl',['$scope','$http','SettingService','toaster',function($scope,$http,SettingService,toaster){
    $scope.user = {phone:"",password:""};
    //用户登陆按钮
    $scope.login = function () {
        SettingService.login($scope.user).then(function (data) {
            toaster.success('登录成功');
        }).catch(function (err) {
            console.log(err);
        })
    };
}]);
