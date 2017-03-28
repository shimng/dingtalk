/**
 * Created by nico on 2017/3/28.
 */
grApp.service("$service",["$q","$http",function ($q,$http) {
    var _service = {
        //获取签名
        getDingSignature:function (url) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/sgsuperman/getDingSignatureAjax',
                params:{url:url}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getUserInfo:function (params) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/sgsuperman/getUserInfoAjax',
                params: { code:params }
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
    };
    return _service ;
}])