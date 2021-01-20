var vm = new Vue({
    el: '#rrapp',
    data: {
        div: true,
        btnstatus: false,
        btnval: "登陆",
        username: '',
        password: '',
        captcha: '',
        error: false,
        errorMsg: '',
        // src: 'http://192.168.155.1:8088/captcha.jpg'
    },
    beforeCreate: function () {
        if (self != top) {
            top.location.href = self.location.href;
        }
    },
    mounted() {
        this.getdomin();
        // this.check();
    },
    methods: {
        getdomin() {
            var domain = window.location.href;
            var domains = domain.split("/")[3]
            var ll = domain.split("/")[2]
            if (ll == "www.classbro.ca" || ll == "www.classbro.com") {
                $("#title").html("万能班长");
            } else {
                $.ajax({
                    type: "get",
                    url: baseURL + "api/agency/findAgnetByDomain?domain=" + domains + "",
                    dataType: "json",
                    success: function (r) {
                        // console.error(r)
                        if (r.status == 200) {
                            if (r.body == null) {
                                $("#icon").attr("href",
                                    "https://www.classbro.com/static/images/cont/logo.png"
                                )
                            } else {
                                $("#title").html(r.body.agentName);
                                $("#icon").attr("href", r.body.agnetIcon)
                            }
                        }
                    }
                });
            }

        },
        alerts() {
            this.$confirm('不是谷歌,是否下载?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.open(
                    "https://sm.myapp.com/original/Browser/70.0.3538.67_chrome_installer_x64.exe"
                );
            }).catch(() => {

            });
        },
        check() {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            let element = document.getElementById("browserType");
            if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) { //判断是否Opera浏览器
                this.alerts();
                this.div = false;
                return;
            } else if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
                this.alerts();
                this.div = false;
                return;
            } else if (userAgent.indexOf("Chrome") > -1) { //判断是否Chrome浏览器
                return;
            } else if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
                this.alerts();
                this.div = false;
                return;
            } else {

            }

        },
        login: function () {
            vm.btnstatus = true;
            vm.btnval = "加载中";
            var data = "username=" + vm.username + "&password=" + vm.password + "&captcha=" + vm
                .captcha;
            $.ajax({
                type: "POST",
                url: baseURL + "sys/login",
                data: data,
                dataType: "json",
                success: function (r) {
                    if (r.status == 200) {
                        vm.btnstatus = true,
                            vm.btnval = "加载中",
                            localStorage.setItem("token", r.body.token);
                        setCookie('crmtoken', r.body.token);
                        setTimeout(function () {
                            parent.location.href = 'index.html';
                        }, 800);
                    } else {
                        vm.error = true;
                        vm.errorMsg = r.body.msg;
                        vm.btnstatus = false;
                        vm.btnval = "登录";
                    }
                }
            });
        }
    }
});

$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        $("#login").click();
    }
});