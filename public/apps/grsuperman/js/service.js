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
        taskHome:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getTaskHomeAjax',
                params:{uid:uid}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getWaitList:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getWaitListAjax',
                params:{uid:uid}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getInExpress:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getInExpressAjax',
                params:{uid:uid}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        finishExpress:function (uid,code) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/finishExpressAjax',
                params: {uid:uid, code:code }
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        rejectExpress:function (uid,code,dialog) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/rejectExpressAjax',
                params:{uid:uid,code:code,dialog:dialog}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        bookTime:function (uid,code,book_time) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/bookTimeAjax',
                params:{uid:uid,code:code,book_time:book_time}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getBackGoods:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getBackGoodsAjax',
                params:{uid:uid}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getExchangeGoods:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getExchangeGoodsAjax',
                params:{uid:uid}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getFinishedMission:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getFinishedMissionAjax',
                params:{uid:uid}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getBookedMission:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getBookedMissionAjax',
                params:{uid:uid}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        getRejectedMission:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/getRejectedMissionAjax',
                params:{uid:uid}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        restartExpress:function (uid,code) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/restartExpressAjax',
                params:{uid:uid,code:code}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        takeOrder:function (params) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/takeOrderAjax',
                params:{orderid:params.orderid,ordertype:params.ordertype}
            }).success(function (data, status, headers, config) {
                q.resolve(data);
            }).error(function (data, status, headers, config) {
                q.reject(data);
            });
            return q.promise;
        },
        accountNow:function (uid) {
            var q = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'GET',
                url: '/apps/grsuperman/accountNowAjax',
                params:{uid:uid}
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
.service('$gRequire',['$q','toaster',function ($q,toaster) {
    return {
        requireOIDNotNullAndNotLessThan6:function (oid) {
            if(oid === undefined || (oid+"").length < 6){
                layer.open({
                    title:["错误",'background-color:#FF4351; color:#fff;'],
                    content:"请输入至少6位连续的订单单号！",
                    shadeClose: false
                });
                return false ;
            }
            return true ;
        },
        requireDefinedOid:function (oid) {
            if(oid === undefined){
                toaster.error("无法识别订单号！");
                return false ;
            }else{
                return true ;
            }
        }

    }
}])