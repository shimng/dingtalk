/**
 * Created by nico on 2017/3/23.
 */
var grApp = angular.module('gr-app', ['toaster', 'ngAnimate','angular-storage']);
grApp.factory("$store",['store',function (store) {
    return store.getNamespacedStore("gr_superman");
}]);