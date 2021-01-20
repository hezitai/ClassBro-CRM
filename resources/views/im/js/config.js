(function () {
    // 配置
    var envir = 'online';
    var configMap = {
        online: {
            //   appkey: '1fe5406367b44a65224e9e2a48e02b80',
            appkey: '39b5b8380a846355afbe1d31f0b83705',
            url: 'https://app.netease.im',
            chatroomList: 'https://app.netease.im/api/chatroom/homeList',
            chatroomAddr: 'https://app.netease.im/api/chatroom/requestAddress'
        }
    };
    window.CONFIG = configMap[envir];
    // 是否开启订阅服务
    window.CONFIG.openSubscription = true;
    //   window.CONFIG.privateConf = window.privateConf;
    getUrlStr = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    var token = getUrlStr("token");
    localStorage.setItem('token', token);
})();