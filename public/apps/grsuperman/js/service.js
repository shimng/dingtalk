/**
 * Created by nico on 2017/3/22.
 */
grApp.service('HomeService',['$q','$http',function ($q,$http) {
    var _service = {
        getUserInfo:function (params) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getUserInfoAjax',
                params: { code:params }
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        //根据完整订单编号查找订单
        findOrdersByOid:function (params) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/findOrdersByOidAjax',
                params: { orderId:params }
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        //根据完整订单编号查找订单
        getOrderStatus:function (params) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getOrderStatusByOidAjax',
                params: { orderId:params }
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        taskHome1:function () {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getTaskHomeAjax'
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getWaitList:function () {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getWaitListAjax'
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