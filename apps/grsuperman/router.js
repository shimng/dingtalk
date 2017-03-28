/**
 * Created by nico on 2017/3/22.
 */
var homeCtrl = require("./controllers/HomeController");
var tasksCtrl = require("./controllers/TasksController");
var pluginsCtrl = require("./controllers/PluginsController");
module.exports = {
    bind:function(router){
        router.get('/grsuperman/index',homeCtrl.index);
        router.get('/grsuperman/tasks',tasksCtrl.index);
        router.get('/grsuperman/wait',tasksCtrl.wait);
        router.get('/grsuperman/inexpress',tasksCtrl.inexpress);
        router.get('/grsuperman/backgoods',tasksCtrl.backgoods);
        router.get('/grsuperman/exchange',tasksCtrl.exchange);
        router.get('/grsuperman/finished',tasksCtrl.finished);
        router.get('/grsuperman/booked',tasksCtrl.booked);
        router.get('/grsuperman/rejected',tasksCtrl.rejected);
        //生态圈
        router.get('/grsuperman/plugins',pluginsCtrl.plugins);

        //ajax
        router.get('/grsuperman/getUserInfoAjax',homeCtrl.getUserInfo);
        router.get('/grsuperman/findOrdersByOidAjax',homeCtrl.findOrdersByOid);
        router.get('/grsuperman/getOrderStatusByOidAjax',homeCtrl.getOrderStatusByOid);
        router.get('/grsuperman/getTaskHomeAjax',homeCtrl.getTaskHome);
        router.get('/grsuperman/getWaitListAjax',homeCtrl.getWaitList);
        router.get('/grsuperman/getInExpressAjax',homeCtrl.getInExpress);
        router.get('/grsuperman/finishExpressAjax',homeCtrl.finishExpress);
        router.get('/grsuperman/rejectExpressAjax',homeCtrl.rejectExpress);
        router.get('/grsuperman/bookTimeAjax',homeCtrl.bookTime);
        router.get('/grsuperman/getBackGoodsAjax',homeCtrl.getBackGoods);
        router.get('/grsuperman/getExchangeGoodsAjax',homeCtrl.getExchangeGoods);
        router.get('/grsuperman/getFinishedMissionAjax',homeCtrl.getFinishedMission);
        router.get('/grsuperman/getBookedMissionAjax',homeCtrl.getBookedMission);
        router.get('/grsuperman/getRejectedMissionAjax',homeCtrl.getRejectedMission);
        router.get('/grsuperman/restartExpressAjax',homeCtrl.restartExpress);
        router.get('/grsuperman/takeOrderAjax',homeCtrl.takeOrder);
        router.get('/grsuperman/accountNowAjax',homeCtrl.accountNow);


    }
};