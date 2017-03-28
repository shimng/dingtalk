/**
 * Created by nico on 2017/3/23.
 */
var grApp = angular.module('sg-app', ['toaster', 'ngAnimate','angular-storage']);
grApp.factory("$sgSuperman",['store',function (store) {
    return store.getNamespacedStore("sg_superman");
}]);