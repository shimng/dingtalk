/**
 * Created by nico on 2017/3/22.
 */
grApp.service('SettingService',['$q','$http',function ($q,$http) {
    var _service = {
        login:function (params) {
            console.log(params);
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/setting/loginAjax',
                params: { phone:params.phone,password: params.password  }
            }).success(function (data, status, headers, config) {
                console.log(status);
                console.log(headers);
                console.log(config);
                console.log(data);
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                console.log();
                q.reject(data);
            });
            return q.promise;
        }
    };
    return _service ;
}])