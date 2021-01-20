var token = localStorage.getItem("token");

var baseURL = "http://121.43.174.41/crm/";
var ossURL = "http://121.43.174.41/";
var url = "https://121.43.174.41/";
var wybaseUrl = 'http://47.101.209.72/api/dbwy/'
var wytoken = '9K9Z5j6jgetBHvw1SfwveRAxl1zb-fGB';
var redirectURL = "http://121.43.174.41/crmweb/";
var imURL = "http://121.43.174.41/crmweb/";

// var imURL = "http://192.168.1.168/crmweb/";
// var redirectURL = "http://192.168.1.168/crmweb/";
var versions = '2.2.41';
// var baseURL = "http://www.classbro.com/crm/";
// var ossURL = "http://www.classbro.com/";
// var url = "https://www.classbro.com/"
// var wybaseUrl = 'http://149.129.137.141/dbwy/'
// var wytoken = 'VkGLtspm1L3HGhi42i_AiPKEqXBd-pkz';
// var redirectURL = "http://www.classbro.com/crmweb/";
// var imURL = "http://www.classbro.com/crmweb/";


$.ajaxSetup({
    dataType: "json",
    cache: false,
    headers: {
        "token": token
    },
});
var checkToken = function() {
    if (window.location.href.indexOf('login') != -1 || window.location.href.indexOf('createOutUrl') != -1 || window.location.href.indexOf('im/main') != -1) {
        return;
    } else {
        $.ajax({
            url: baseURL + 'sys/checkToken?token=' + token,
            type: 'GET',
            success: function(r) {
                if (r.status == 400) {
                    window.location.href = redirectURL + '/login.html';
                    return;
                }
            },
            error: function(r) {
                window.location.href = redirectURL + '/login.html';
                return;
            },
        });
    }
}
checkToken();

function loadJsOrCss(url) {
    // var date = new Date().getTime();
    var tamp = '?vers=' + versions;
    var body = document.getElementsByTagName('body')[0];
    if (url) {
        var urlStr = url.slice(-2);
        if (urlStr === 'js') {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url + tamp;
            body.appendChild(script);
        } else if (urlStr == 'ss') {
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.src = url + tamp;
            body.appendChild(link);
        } else {
            console.error('无法识别文件')
        }
    }
}