/**
 * Created by nico on 2017/3/17.
 */

dd.config({
    agentId: '82143702',
    corpId:corpId,
    timeStamp:  timeStamp,
    nonceStr: nonceStr,
    signature:  signature,
    jsApiList: ['device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'version',
        'runtime.permission.requestAuthCode',
        'device.base.getUUID',
        'biz.map.view',
        'biz.util.scan',
        'biz.util.scan',
        'device.base',
        'device.accelerometer.watchShake',
        'biz.chat.chooseConversation',
        'device.notification.vibrate',
        'biz.ding.post']
});
dd.ready(function () {
    alert("dd ready");
    document.addEventListener("pause",function () {
        alert("pause");
    });
    document.addEventListener("resume",function () {
        alert("resume");
    });
    var head = document.querySelector("h1");
    head.innerHTML = head.innerHTML+" it rocks";

//          dd.device.notification.alert({
//              message: 'dd.device.notification.alert',
//              title: 'This is title',
//              buttonName: 'button',
//              onSuccess: function(data) {
//                  alert('win: ' + JSON.stringify(data));
//              },
//              onFail: function(err) {
//                  alert('fail: ' + JSON.stringify(err));
//              }
//          });
    console.log(JSON.stringify(_config));
    dd.runtime.permission.requestAuthCode({
        corpId: "<%= dd_config.corpId %>",
        onSuccess: function(result) {
            console.log(result);
            /*{
             code: 'hYLK98jkf0m' //string authCode
             }*/
        },
        onFail : function(err) {
            console.log(err)
        }

    })
    dd.error(function(err) {
        alert('dd error: ' + JSON.stringify(err));
    });
})
dd.error(function(err) {
    alert('dd error: ' + JSON.stringify(err));
});
function scan() {
    alert("i am scan");
    dd.biz.util.scan({
        type: "barCode",//type为qrCode或者barCode
        onSuccess: function(data) {
            //onSuccess将在扫码成功之后回调
            alert(data.text);
            console.log(data);
            /* data结构
             { 'text': String}
             */
        },
        onFail : function(err) {
            alert(err);
        }
    })
}