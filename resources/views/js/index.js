//生成菜单
var menuItem = Vue.extend({
    name: 'menu-item',
    props: {
        item: {},
        index: 0
    },
    template: [
        '<li :class="{active: (item.type===0 && index === 0)}">',
        '<a v-if="item.type === 0" href="javascript:;">',
        '<i v-if="item.icon != null" :class="item.icon"></i>',
        '<span>{{item.name}}</span>',
        '<i class="fa fa-angle-left pull-right"></i>',
        '</a>',
        '<ul v-if="item.type === 0" class="treeview-menu">',
        '<menu-item :item="item" :index="index" v-for="(item, index) in item.list"></menu-item>',
        '</ul>',
        '<a v-if="item.type === 1" :href="\'#\'+item.url">' +
        '<i v-if="item.icon != null" :class="item.icon"></i>' +
        '<i v-else class="fa fa-circle-o"></i> {{item.name}}' +
        '</a>',
        '</li>'
    ].join('')
});

//iframe自适应
$(window).on('resize', function () {
    var $content = $('.content');
    $content.height($(this).height() - 92);
    $content.find('iframe').each(function () {
        $(this).height($content.height());
    });
}).resize();

//注册菜单组件
Vue.component('menuItem', menuItem);
if (token == null) {
    parent.location.href = "login.html"
}
var vm = new Vue({
    el: '#rrapp',
    data: {
        firstSum: 0,
        firstCurrency: 'AUD',
        secondSum: 0,
        secondCurrency: '',
        firstCurrencyArray: [],
        secondCurrencyArray: [],
        user: {},
        menuList: {},
        main: "main.html",
        password: '',
        newPassword: '',
        navTitle: "欢迎页",
        finishTimeFrom: null,
        finishTimeTo: null,
        exchangeDialog: false,
        getCurrencyArray: [],
        publicExchange: 0,
        autoFirstSum: 0,
        autoFirstCurrency: '',
        bothSame: false,
        todayTime: '',
    },
    mounted() {
        this.Time();
        this.getCountry();
        this.getMonthDays();
        this.getMonthDay();
        this.getdomin();
        this.gets();
        this.getToday();
    },
    methods: {
        getToday() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            this.todayTime = yyyy + '年' + mm + '月' + dd + '日0时';
        },
        changeFirstCurrency(val) {
            if (this.firstCurrency == this.secondCurrency) {
                this.bothSame = true
            } else {
                this.bothSame = false;
            }
            var publicMoney = 0;
            var publicExchange = 0;
            if (this.secondCurrency != '') {
                for (var j in this.getCurrencyArray) {
                    if (this.getCurrencyArray[j].tagerCurrency == this.secondCurrency) {
                        publicExchange = this.getCurrencyArray[j].exchange
                    }
                }
                for (var i in this.getCurrencyArray) {
                    if (val == this.getCurrencyArray[i].tagerCurrency) {
                        this.secondSum = ((this.firstSum / publicExchange) * this.getCurrencyArray[i].exchange).toFixed(4);
                    }
                }
                this.autoFirstSum = this.firstSum;
                this.autoFirstCurrency = this.firstCurrency;
            } else {
                return;
            }
        },
        firstSumEvent() {
            if (this.firstCurrency == this.secondCurrency) {
                this.bothSame = true
            } else {
                this.bothSame = false;
            }
            var publicMoney = 0;
            var publicExchange = 0;
            if (this.firstCurrency != '' && this.secondCurrency != '') {
                for (var j in this.getCurrencyArray) {
                    if (this.getCurrencyArray[j].tagerCurrency == this.firstCurrency) {
                        publicExchange = this.getCurrencyArray[j].exchange
                    }
                }
                for (var i in this.getCurrencyArray) {
                    if (this.secondCurrency == this.getCurrencyArray[i].tagerCurrency) {
                        this.secondSum = ((this.firstSum * publicExchange) / this.getCurrencyArray[i].exchange).toFixed(4);

                    }
                }
                this.autoFirstSum = this.firstSum;
                this.autoFirstCurrency = this.firstCurrency;
            } else {
                return;
            }
        },
        changesecondCurrency(val) {
            if (this.firstCurrency == this.secondCurrency) {
                this.bothSame = true
            } else {
                this.bothSame = false;
            }
            var publicMoney = 0;
            var publicExchange = 0;
            if (this.firstCurrency != '') {
                for (var j in this.getCurrencyArray) {
                    if (this.getCurrencyArray[j].tagerCurrency == this.firstCurrency) {
                        publicExchange = this.getCurrencyArray[j].exchange
                    }
                }
                for (var i in this.getCurrencyArray) {
                    if (val == this.getCurrencyArray[i].tagerCurrency) {
                        this.secondSum = ((this.firstSum * publicExchange) / this.getCurrencyArray[i].exchange).toFixed(4);
                    }
                }
                this.autoFirstSum = this.firstSum;
                this.autoFirstCurrency = this.firstCurrency;
            } else {
                return;
            }
        },
        changeOther() {
            if (this.firstCurrency == this.secondCurrency) {
                this.bothSame = true;
                return;
            } else {
                this.bothSame = false;
            }
            var a = this.firstCurrency;
            var b = this.secondCurrency;
            var publicMoney = 0;
            var publicExchange = 0;
            if (this.firstSum != 0 && this.secondCurrency != '') {
                this.firstCurrency = b;
                this.secondCurrency = a;
                console.log(this.firstCurrency, this.secondCurrency);
                // debugger;
                for (var j in this.getCurrencyArray) {
                    if (this.getCurrencyArray[j].tagerCurrency == this.firstCurrency) {
                        publicExchange = this.getCurrencyArray[j].exchange
                    }
                }
                for (var i in this.getCurrencyArray) {
                    if (this.secondCurrency == this.getCurrencyArray[i].tagerCurrency) {
                        // publicMoney = (this.firstSum * publicExchange);
                        this.secondSum = ((this.firstSum * publicExchange) / this.getCurrencyArray[i].exchange).toFixed(4);
                    }

                }
                this.autoFirstSum = this.firstSum;
                this.autoFirstCurrency = this.firstCurrency;
            }
        },
        exchangeDialogShow() {
            this.exchangeDialog = true;
            this.getExchangeAjax();
        },
        getExchangeAjax() {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/basedata/exchangeRate/list',
                type: 'GET',
                dataType: 'json',
                headers: {},
                data: {
                    token: token,
                    page: 1,
                    limit: 100,
                    statused: '1;2',
                    type: 3
                },
                success: function (r) {
                    console.log(r);
                    _this.getCurrencyArray = r.body.list;
                }
            });
        },
        closeExchangeDialog() {
            this.exchangeDialog = false;
            this.firstSum = 0;
            this.firstCurrency = 'AUD';
            this.secondSum = 0;
            this.secondCurrency = '';
        },
        getCountry() {
            $.ajax({
                url: baseURL + 'sys/basedata/exchangeRate/list',
                type: 'GET',
                dataType: 'json',
                headers: {},
                data: {
                    token: token,
                    page: 1,
                    limit: 100,
                    statused: '1;2',
                    type: 3
                },
                success: function (r) {
                    vm.firstCurrencyArray = r.body.list;
                    vm.secondCurrencyArray = r.body.list;
                }
            });
        },

        getdomin() {
            var domain = window.location.href;
            var domains = domain.split("/")[3]
            var ll = domain.split("/")[2]
            if (ll == "www.classbro.ca" || ll == "www.classbro.com") {
                $("#title").html("万能班长");
                $("#tit").html("万能班长");
            } else {
                $.ajax({
                    type: "get",
                    url: baseURL + "api/agency/findAgnetByDomain?domain=" + domains + "",
                    dataType: "json",
                    success: function (r) {
                        // console.error(r);
                        if (r.status == 200) {
                            // $("#title").html(r.body.agentName);
                            // $("#tit").html(r.body.agentName);
                            // $("#title1").html(r.body.agentName);
                        }
                    }
                });
            }

        },
        Time(now) {
            let year = new Date(now).getFullYear();
            let month = new Date(now).getMonth() + 1;
            let date = new Date(now).getDate();
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            return year + "-" + month + "-" + date;
        },
        getMonthDays(myMonth) {
            let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
            let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
            let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },
        getMonthDay(myMonth) {
            var finishTimeFrom = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1)) + " 00:00:00";
            var finishTimeTo = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), this.getMonthDays(new Date().getMonth()))) + " 23:59:59";
            this.finishTimeTo = finishTimeTo;
            this.finishTimeFrom = finishTimeFrom;
            this.finishTimeToEcharts = finishTimeTo;
            this.data = [this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1)), this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), this.getMonthDays(new Date().getMonth())))]
        },
        gets() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "/sys/seller/order/queryPerformanceRankValue",
                dataType: "json",
                data: {
                    "token": token,
                    "timeFrom": this.finishTimeFrom,
                    "timeTo": this.finishTimeTo,
                },
                success: function (r) {
                    if (r.status == 200) {
                        var consumption = r.body.consumption;
                        var sales = r.body.sales;
                        $("#sales").html(sales)
                        $("#consumption").html(consumption)
                    }
                }
            });
        },
        getMenuList: function () {
            $.getJSON(baseURL + "sys/menu/nav", function (r) {
                vm.menuList = r.menuList;
                window.permissions = r.permissions;
            });
        },
        getUser: function () {
            $.getJSON(baseURL + "sys/user/info", function (r) {
                vm.user = r.user;
                localStorage.setItem("CRM_nickname", r.user.username);
                localStorage.setItem("crm_number", r.user.userId);
                setCookie('crmid', "crm" + r.user.userId);
                var roleIdList = r.user.roleIdList;
                roleIdList.forEach(v => {
                    if (v === 11 || v === 5 || v === 6) {
                        $("#xiaoshou").css("display", "block")
                    }
                })
            });
        },
        updatePassword: function () {
            layer.open({
                type: 1,
                skin: 'layui-layer-molv',
                title: "修改密码",
                area: ['450px', '270px'],
                shadeClose: false,
                content: jQuery("#passwordLayer"),
                btn: ['修改', '取消'],
                btn1: function (index) {
                    // var data = "password=" + vm.password + "&newPassword=" + vm.newPassword;
                    var data = {
                        password:vm.password,
                        newPassword:vm.newPassword
                    };
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/user/password",
                        data: data,
                        dataType: "json",
                        success: function (r) {
                            if (r.status == 200) {
                                layer.close(index);
                                layer.alert('修改成功', function () {
                                    location.reload();
                                });
                            } else {
                                layer.alert(r.body);
                            }
                        },
                        error: function (er) {
                            console.error(er);
                        }
                    });
                }
            });
        },
        donate: function () {
            layer.open({
                type: 2,
                title: false,
                area: ['806px', '467px'],
                closeBtn: 1,
                shadeClose: false,
                content: ['http://cdn.renren.io/donate.jpg', 'no']
            });
        }
    },
    created: function () {
        this.getMenuList();
        this.getUser();
    },
    updated: function () {
        //路由
        var router = new Router();
        routerList(router, vm.menuList);
        router.start();
    }
});


function routerList(router, menuList) {
    for (var key in menuList) {
        var menu = menuList[key];
        if (menu.type == 0) {
            routerList(router, menu.list);
        } else if (menu.type == 1) {
            router.add('#' + menu.url, function () {
                var url = window.location.hash;
                //替换iframe的url
                vm.main = url.replace('#', '');
                //导航菜单展开
                $(".treeview-menu li").removeClass("active");
                $(".sidebar-menu li").removeClass("active");
                $("a[href='" + url + "']").parents("li").addClass("active");
                vm.navTitle = $("a[href='" + url + "']").text();
                $(".treeview-menu li").click(function () {
                    $(this).removeClass("active");
                    var url = window.location.hash;
                    vm.main = url.replace('#', '');
                })
            });
        }
    }
};



$("#logout").click(function () {
    localStorage.removeItem("token");
    delCookie('crmid');
    delCookie('crmtoken');
    delCookie('nickName');
    setTimeout(function () {
        location.href = 'login.html';
    }, 500);
})

function xxs() {
    location.href = 'index.html#modules/vue/bad_ordered.html';
}
$(function () {
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
                // console.error(r);
                if (r.status == 200) {
                    if (r.body == null) {
                        $("#icon").attr("href",
                            "https://www.classbro.com/static/images/cont/logo.png")
                    } else {
                        $("#title").html(r.body.agentName);
                        $("#icon").attr("href", r.body.agnetIcon)
                    }
                }
            }
        });
    };
});

function logout() {
    delCookie('crmid');
    delCookie('crmtoken');
    delCookie('nickName');
};

function blinklink() {
    // if (!document.getElementById('chat').style.color) {
    //     document.getElementById('chat').style.color = "red";
    // }
    // if (document.getElementById('chat').style.color == "red") {
    //     document.getElementById('chat').style.color = "#fff";
    // } 
    // else {
    //     document.getElementById('chat').style.color = "red";
    // }
    // timer = setTimeout("blinklink()", 500);
}

function stoptimer() {
    // document.getElementById('chat').style.color == "#fff"
    //   clearTimeout(timer);
}

$(function () {
    // var oDiv = document.getElementsByClassName('drag')[0];
    // var disX = 0;
    // /*鼠标点击的位置距离DIV顶部的距离*/
    // var disY = 0;
    // oDiv.onmousedown = function () {
    //     var e = e || window.event;
    //     disX = e.clientX - oDiv.offsetLeft;
    //     disY = e.clientY - oDiv.offsetTop;

    //     document.onmousemove = function (e) {
    //         var e = e || window.event;
    //         // 横轴坐标
    //         var leftX = e.clientX - disX;
    //         // 纵轴坐标
    //         var topY = e.clientY - disY;

    //         if (leftX < 0) {
    //             leftX = 0;
    //         } else if (leftX > document.documentElement.clientWidth - oDiv.offsetWidth) {
    //             leftX = document.document.documentElement.clientWidth - oDiv.offsetWidth;
    //         }
    //         if (topY < 0) {
    //             topY = 0;
    //         } else if (topY > document.documentElement.clientHeight - oDiv.offsetHeight) {
    //             topY = document.documentElement.clientHeight - oDiv.offsetHeight;
    //         }
    //         oDiv.style.left = leftX + "px";
    //         oDiv.style.top = topY + "px";
    //     }
    //     document.onmouseup = function () {
    //         document.onmousemove = null;
    //         document.onmouseup = null;
    //     }
    // }

    // // $('.drag').each(function (index) {
    // //     $(this).myDrag({
    // //         randomPosition: false,
    // //         direction: 'all',
    // //         handler: false
    // //     });
    // // });
    // $("#del").click(function () {
    //     $(".drag").hide();
    // })
    $("#chat").click(function () {
        // $(".drag").show();
        window.open(imURL + 'im/main.html?token=' + token, '_blank', "top=20,left=20,width=800,height=600");
    })
    // $("#newchat").click(function(){
    //   $(".drag").show();
    //   $(this).css({"background":"url(im/chat1.png)","background-size":"100%"});
    // })
});

function method1() {
    $(".treeview-menu li").removeClass("active");
    history.pushState({
        page: 1
    }, '', '#modules/vue/connor/allSalesPerformance');
    $("#iframe").attr("src", "modules/vue/connor/allSalesPerformance.html");
}

function customerCard() {
    $(".treeview-menu li").removeClass("active");
    history.pushState({
        page: 1
    }, '', '#modules/vue/customerCard');
}

function creatqrh() {
    $(".treeview-menu li").removeClass("active");
    history.pushState({
        page: 1
    }, '', '#modules/vue/creatqrh');
}

function createStudAccount() {
    $(".treeview-menu li").removeClass("active");
    history.pushState({
        page: 1
    }, '', '#modules/vue/createStudAccount');
}

function chargeMoney() {
    $(".treeview-menu li").removeClass("active");
    history.pushState({
        page: 1
    }, '', '#modules/vue/charge_money');
}

function creatOrder() {
    $(".treeview-menu li").removeClass("active");
    history.pushState({
        page: 1
    }, '', '#modules/vue/creat_qrh');
}

function method() {
    var key = $("#allsearch").val();
    // alert(key);
    $("#iframe").attr("src", encodeURI("superSreach.html?key=" + key));
}
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        method();
        // $("#iframe").attr("src",encodeURI("main.html?key=" + key));
    }
});

function backIndex() {
    $("#iframe").attr("src", encodeURI("main.html"));
}