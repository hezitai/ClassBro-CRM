var vm = new Vue({
    el: '#app',
    data() {
        return {
            value: "1",
            url: "" + baseURL + "/sys/ntes/history/getGroupMessage",
            data: {

            },
        };
    },
    mounted() {
        this.change()
        // this.getchathistory();
    },
    methods: {
        change: function (val) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var tid = getUrlStr("tid");
            var sellerId = getUrlStr("sellerId");
            var studId = getUrlStr("studId");
            var token = localStorage.getItem("token");
            console.log(val);
            if (val == 0) {
                this.url = "" + baseURL + "/sys/ntes/history/getPrivateMessage";
                this.data = {
                    "token": token,
                    "page": 1,
                    "limit": 100,
                    "begintime": "1540023844000",
                    "endtime": "1577807999000",
                    "from": "crm" + sellerId + "",
                    "to": "stud" + studId + "",
                    "tid": tid
                };
            } else {
                this.url = "" + baseURL + "/sys/ntes/history/getGroupMessage";

                this.data = {
                    "token": token,
                    "page": 1,
                    "limit": 100,
                    "begintime": "1540023844000",
                    "endtime": "1577807999000",
                    "accid": "crm" + sellerId + "",
                    "tid": tid
                };
            }
            this.getchathistory();
        },
        getchathistory() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var tid = getUrlStr("tid");
            var sellerId = getUrlStr("sellerId");
            var studId = getUrlStr("studId");
            var token = localStorage.getItem("token");
            // this.data = {
            //     "token": token,
            //     "page": 1,
            //     "limit": 100,
            //     "begintime": "1540023844000",
            //     "endtime": "1572523217000",
            //     "accid": "crm" + sellerId + "",
            //     "tid": tid
            // };
            $("#chatul").empty()
            $.ajax({
                type: "post",
                dataType: "json",
                data: this.data,
                url: this.url,
                success: function (json) {
                    if (json.status == 200) {
                        var chatlist = json.body.msgs;
                        if (chatlist == null) {
                            $('body #chatul').html("暂无记录")
                            return;
                        }
                        var chatlists = chatlist.reverse();
                        chatlists.map(item => {
                            var inputTime = item.sendtime
                            var date = new Date(inputTime * 1);
                            var y = date.getFullYear()
                            var m = date.getMonth() + 1;
                            m = m < 10 ? ('0' + m) : m;
                            var d = date.getDate();
                            d = d < 10 ? ('0' + d) : d;
                            var h = date.getHours();
                            h = h < 10 ? ('0' + h) : h;
                            var minute = date.getMinutes();
                            var second = date.getSeconds();
                            minute = minute < 10 ? ('0' + minute) : minute;
                            second = second < 10 ? ('0' + second) : second;
                            var a = y + '-' + m + '-' + d + ' ' + h + ':' + minute +
                                ':' + second;
                            if (item.type === 6) {
                                var html = "<li class='clearfix'> \
                                            <div class='clearfix'><p data-id=" + item.identity +
                                    " class='chatp clearfix'><span class='nickName'>" + item
                                    .nickName + "</span><span class='time'>" + a + "</span></p></div> \
                                            <p class='chatmsg clearfix'><a class='downFile' style='font-wieght:600;color:#409EFF' download='" + item.body.name + "' href='" + item.body.url + "'>" + item.body.name + "</a></p> \
                                             \
                                        </li>";
                                        // $('.downFile').click()
                            } else {
                                var html = "<li class='clearfix'> \
                                            <div class='clearfix'><p data-id=" + item.identity +
                                    " class='chatp clearfix'><span class='nickName'>" + item
                                    .nickName + "</span><span class='time'>" + a + "</span></p></div> \
                                            <p class='chatmsg clearfix' data-id=" + item.identity + ">" + item.body.msg + "</p> \
                                             \
                                        </li>";
                            }
                            // <img src='' class='img'>
                            $("#chatul").append(html);
                            $(".chatmsg").each(function () {
                                var html = $(this).html()
                                if (html == "null") {
                                    $(this).css("display", "none");
                                    $(this).parents(".clearfix").css("display",
                                        "none");
                                }
                            });
                            $(".chatp").each(function () {
                                var id = $(this).attr("data-id");
                                if (id == 0) {
                                    $(this).addClass("crmp");
                                }
                                if (id == 1) {
                                    $(this).addClass("teacp");
                                }
                                if (id == 2) {
                                    $(this).addClass("studp");
                                }
                            });
                            $(".chatmsg").each(function () {
                                var ids = $(this).attr("data-id");
                                if (ids == 0) {
                                    $(this).addClass("crmmsg");
                                }
                                if (ids == 1) {
                                    $(this).addClass("teacmsg");
                                }
                                if (ids == 2) {
                                    $(this).addClass("studmsg");
                                }
                            });
                        })
                        chatlists.forEach(function (value, key) {
                            if (value.body.url != null) {
                                $("li:nth-child(" + key + ")").children("img").attr(
                                    "src", value.body.url)
                            }
                        });
                    }
                }
            });
        }
    }
});