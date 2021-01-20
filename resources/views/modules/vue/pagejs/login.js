var vm = new Vue({
    el: '#rrapp',
    data: {
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
    methods: {
        // refreshCode: function(){
        //     this.src = "http://192.168.1.127:8088/captcha.jpg?t=" + $.now();
        // },
        login: function () {
            var data = "username=" + vm.username + "&password=" + vm.password + "&captcha=" + vm.captcha;
            $.ajax({
                type: "POST",
                url: baseURL + "sys/login",
                data: data,
                dataType: "json",
                success: function (r) {
                    if (r.status == 200) { //登录成功
                        localStorage.setItem("token", r.body.token);
                        localStorage.setItem("CRM_userid", r.body.userId);
                        parent.location.href = '../../index.html';
                    } else {
                        vm.error = true;
                        vm.errorMsg = r.body.msg;
                    }
                }
            });
        }
    }
});