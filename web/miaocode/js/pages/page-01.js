$(function() {
    //初始化
    $("html,body").animate({"scrollTop": "0"},1);

    //基本信息
    var company='miaoxiaocheng',
        userId=getUUID(),
        ua=navigator.userAgent,
        ip=returnCitySN["cip"],
        url=window.location.href,
        sign=getRequestByName("sign"),
        startTime = new Date().getTime();


    //保存页面初始化信息 http://mm.jnrise.cn/loading/server/enter
    $.ajax({
        type:'POST',
        url: 'http://mm.jnrise.cn/loading/server/enter',
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        data:{
            'company':company,
            'userId':userId,
            'userAgent':ua,
            'ip':ip,
            'url':url,
            'sign':sign,
            'flag':2
        },
        dataType: 'json',
        success: function(data){
            // console.log(data);
        },
        error: function(xhr){
            console.log(xhr);
        }
    });

    //每秒刷新页面停留时间
    var timer=window.setInterval(function(){

        var time=getShowTimes(startTime);

        if(time<=180){
            //console.log(time);
            $.ajax({
                type:'POST',
                url: 'http://mm.jnrise.cn/loading/server/stay',
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                data:{
                    'company':company,
                    'userId':userId,
                    'userAgent':ua,
                    'ip':ip,
                    'url':url,
                    'sign':sign,
                    'totalTime':time,
                    'otherInfo':''
                },
                dataType: 'json',
                success: function(data){
                    // console.log(data);
                },
                error: function(xhr){
                    console.log(xhr);
                }
            });
        }else{
            //console.log("stop");
            window.clearInterval(timer);
        }
    },2000);
});

//获取Url参数
function getRequestByName(name) {
    var url = window.location.search; //获取url中"?"符后的字串
    var result="";
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            if(strs[i].indexOf(name+"=")!=-1){
                result= unescape(strs[i].substring(name.length+1,strs[i].length));
            }
        }
    }
    return result;
}
//页面停留时间
function getShowTimes (start_time){
    var time_now = new Date();
    var i_total_secs = Math.round((time_now.getTime() - start_time)/1000);
    return i_total_secs;
}
//创建UUID
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
function getUUID(){
    var times=new Date().getTime().toString();
    return uuid(8,16)+times.substr(6,8);
}


