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
        getInExpress:function () {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getInExpressAjax'
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        finishExpress:function (code) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/finishExpressAjax',
                params: { code:code }
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        rejectExpress:function (code,dialog) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/rejectExpressAjax',
                params:{code:code,dialog:dialog}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        bookTime:function (code,book_time) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/bookTimeAjax',
                params:{code:code,book_time:book_time}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getBackGoods:function (code,book_time) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getBackGoodsAjax',
                params:{code:code,book_time:book_time}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getExchangeGoods:function (code,book_time) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getExchangeGoodsAjax',
                params:{code:code,book_time:book_time}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getFinishedMission:function () {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getFinishedMissionAjax'
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getBookedMission:function () {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getBookedMissionAjax'
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getRejectedMission:function () {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getRejectedMissionAjax'
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        restartExpress:function (params) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/restartExpressAjax',
                params:{code:params}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        }
    };
    return _service ;
}])