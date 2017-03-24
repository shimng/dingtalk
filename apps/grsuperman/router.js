/**
 * Created by nico on 2017/3/22.
 */
var homeCtrl = require("./controllers/HomeController");
var tasksCtrl = require("./controllers/TasksController");
module.exports = {
    bind:function(router){
        router.get('/grsuperman/index',homeCtrl.index);
        router.get('/grsuperman/tasks',tasksCtrl.index);
        router.get('/grsuperman/wait',tasksCtrl.wait);

        //ajax
        router.get('/grsuperman/getUserInfoAjax',homeCtrl.getUserInfo);
        router.get('/grsuperman/findOrdersByOidAjax',homeCtrl.findOrdersByOid);
        router.get('/grsuperman/getOrderStatusByOidAjax',homeCtrl.getOrderStatusByOid);
        router.get('/grsuperman/getTaskHomeAjax',homeCtrl.getTaskHome);
        router.get('/grsuperman/getWaitListAjax',homeCtrl.getWaitList);

    }
};