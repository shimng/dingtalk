/**
 * Created by nico on 2017/3/22.
 */
var homeCtrl = require("./controllers/HomeController");
var commonCtrl = require("./controllers/CommonController");
module.exports = {
    bind:function(router){
        router.get('/sgsuperman/index',homeCtrl.index);

        router.get('/sgsuperman/getDingSignatureAjax',commonCtrl.getDingSignature);
        router.get('/sgsuperman/getUserInfoAjax',commonCtrl.getUserInfo);

    }
};
