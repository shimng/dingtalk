/**
 * Created by nico on 2017/3/27.
 */
var _VIEW_PATH = '../apps/grsuperman/views/';
module.exports =  {
    plugins:function (req,res,next) {
        res.render(_VIEW_PATH+"plugins",{title:"生态圈"});
    },
}
