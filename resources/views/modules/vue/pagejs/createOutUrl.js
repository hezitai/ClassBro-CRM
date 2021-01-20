var vm = new Vue({
    el: '#app',
    data() {
        return {
            isWyard: false,
            orderNo: '',
            percentage: 0,
            percentagestatus: "exception",
            studTermCardHour: '',
            studCardBag: true,
            rviews: [],
            alltime: true,
            rviewsmodel: false,
            cailiaofei: true,
            divType: true,
            typeOrder: true,
            aboutOrder: false,
            radshow: false,
            checks: '',
            priceshow: false,
            b1: false,
            b2: "确 定",
            s1: true,
            s2: true,
            red: '',
            radio: '1',
            badMoney: '',
            isFromOrder: true,
            studCourses: [],
            btnstatus: false,
            dialogVisible: false,
            checked: false,
            courses: "",
            files: [{
                children: [

                ],
            }],
            history: '',
            urls: [],
            id: '',
            classroomdata: [],
            extSysPaymentdata: [],
            studCoursewareList: [],
            filelist: [],
            ruleForm: {
                materialCost: '',
                course: '',
                parentTotalPrice: '',
                Integer: '',
                parentLastPrepayment: '',
            },
            ruleForm1: {
                onePrice: '',
                username: '',
                nickname: '',
                sellerDemandDesc: '',
                persenterTime: '',
                allSchooltime: '',
                reaMonetary: '',
                current: '',
                amount1: '',
                amount: '',
                studname: '',
                studId: '',
                arrearageMoney: '',
                wordsNum: "",
                theSpecialOffer: "",
                specialOfferUser: "",
                specialOffer: "",

            },
            ruleForm2: {
                courseCode: '',
                courseName: '',
                type: '',
                current: '',
                amount: '',
                studId: '',
                id: '',
                amount1: '',
                courseId: '',
            },
            rules1: {},
            rules: {},
            dropboxList: [],
            wyactiveNames: null,
            wylog: null,
            wyassociated: null,
            wyorder: {
                upload: {
                    lecture_notes: [],
                    original_work: [],
                    other_materials: [],
                    personal_information: [],
                    requirement: [],
                    samples: [],
                    suggested_readings: [],
                    unit_guide: [],
                }
            },
            coursesItem: [],
        }
    },
    mounted() {
        this.getclassroomdata();
    },
    filters: {
        rounding(value) {
            return value.split(' ')[0]
        }
    },
    methods: {
        // check(val) {
        //     vm.checks = val
        //     if (val == true) {
        //         $(".checkbox").prop("checked", true);
        //     } else {
        //         $(".checkbox").prop("checked", false);
        //     }
        // },
        down: function (url, name) {
            // alert('请点击右上角选择用浏览器打开下载浏览！')
            // if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
            //     var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
            //     if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //         alert('请点击右上角选择用浏览器打开下载浏览！')
            //     } else {
            //         // window.location = url;
            //         alert('请点击右上角选择用浏览器打开下载浏览！2')
            //     }
            // } else {
            //     // window.location = url;
            //     alert('请点击右上角选择用浏览器打开下载浏览！1')
            // }
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
                alert('请点击右上角选择用浏览器打开下载浏览！')
            } else {
                window.location.href = url;
            }
        },
        downFiles: function (row) {
            // alert('请点击右上角选择用浏览器打开下载浏览！')
            // // window.open(row.url)
            // if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
            //     alert('22222');
            //     var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
            //     if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //         alert('请点击右上角选择用浏览器打开下载浏览！')
            //     } else {
            //         // window.open(row.url);
            //         alert('请点击右上角选择用浏览器打开下载浏览！1')
            //     }
            // } else {
            //     // window.open(row.url);
            //     alert('请点击右上角选择用浏览器打开下载浏览！2')
            // }
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
                alert('请点击右上角选择用浏览器打开下载浏览！')
            } else {
                window.location.href = row.url;
            }
        },
        coursedata() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/seller/courseware/groupList",
                dataType: "json",
                data: {
                    // "token": token,
                    "page": 1,
                    "limit": 1000
                },
                success: function (r) {
                    if (r.status == 200) {
                        var lists = [];
                        r.body.list.forEach(function (element) {
                            var list = {};
                            list.groupName = element.groupName;
                            list.name = element.groupName.split(" ")[0];
                            list.id = element.id;
                            lists.push(list);
                        })
                        vm.courses = lists;
                    }
                }
            });
        },
        downfile() {
            $(".el-progress-bar__inner").css("width", "0%");
            var arr = [];
            var checkedCount = 0;
            for (var i = 0; i < $("#ul li input").length; i++) {
                var Uarry = $("#ul li input");
                var Tresult = Uarry.eq(i).attr("data-name");
                var checkbox = document.getElementsByName("tie_in[]");
                if (checkbox[i].checked) {
                    checkedCount++;
                    arr.push(Tresult);
                }
            }
            var arrjoin = arr.join(";");
            if (arrjoin == '') {
                return
            }
            vm.btnstatus = true;
            vm.$message({
                message: '文件正在服务器打包,请耐心等待,不要刷新页面',
                type: 'success'
            });
            $.ajax({
                type: "GET",
                dataType: "json",
                headers: {
                    "token": token
                },
                data: {
                    fileStr: arrjoin
                },
                url: "" + baseURL + "/resource/getZipFile",
                beforeSend: function (json) {
                    $(".el-progress-bar__inner").animate({
                        width: "60%"
                    });
                },
                success: function (json) {
                    if (json.status == 200) {
                        vm.btnstatus = false;
                        $(".el-progress-bar__inner").animate({
                            width: "100%"
                        });
                        vm.percentagestatus = 'success'
                        window.open(json.body.filePath);
                    }
                    if (json.status == 400) {
                        vm.btnstatus = false;
                        vm.$message({
                            message: json.body.msg,
                            type: 'warning'
                        });
                        $(".el-progress-bar__inner").animate({
                            width: "90%"
                        });
                        vm.percentagestatus = 'exception'
                    }
                    if (json.status == 500) {
                        vm.$message({
                            message: '下载失败',
                            type: 'warning'
                        });
                        $(".el-progress-bar__inner").animate({
                            width: "75%"
                        });
                        vm.percentagestatus = 'exception'
                    }
                }
            });
        },

        getclassroomdata: function () {
            var _this = this;
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var url = getUrlStr("v");
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            $.ajax({
                type: "get",
                dataType: "json",
                url: "" + baseURL + url,
                success: function (json) {
                    if (json.body.code == 401) {
                        window.location.href = './getOrderFinished.html';
                        return;
                    }
                    if (json.body.typeed == 4) {
                        _this.isWyard = true;
                        // $.ajax({
                        //     type: "get",
                        //     dataType: "json",
                        //     url: wybaseUrl + "queryorderdetail?access-token=" +
                        //         wytoken + "&orderNum=" + json.body.offCourseName,
                        //     success: function (response) {
                        //         vm.dropboxList = response.data.order
                        //             .completed_work;
                        //         vm.wyorder = response.data.order
                        //         vm.wyassociated = response.data.associated
                        //         vm.wylog = response.data.log;
                        //         vm.wyactiveNames = response.data.order
                        //             .activeNames;
                        //         document.title = vm.wyorder.order_name;
                        //     }
                        // });
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            data: {},
                            headers: {
                                token: token
                            },
                            url: baseURL + "sys/seller/order/queryWyardOrderInfo?courseId=" + json.body.studPurchaseOrder.courseId,
                            success: function (response) {
                                vm.dropboxList = response.data.order
                                    .completed_work;
                                vm.wyorder = response.data.order
                                vm.wyassociated = response.data.associated
                                vm.wylog = response.data.log;
                                vm.wyactiveNames = response.data.order
                                    .activeNames;
                                document.title = vm.wyorder.order_name;
                            },
                            error: function (er) {
                                loading.close();
                            }
                        });
                    } else {
                        _this.coursedata();
                        _this.isWyard = false;
                        document.title = json.body.orderNo;
                    }

                    if (json.body.studPurchaseOrder.type == "4") {
                        vm.typeOrder = true
                    }
                    if (json.body.studPurchaseOrder.type == '0') {
                        vm.cailiaofei = false
                        vm.alltime = false
                    }
                    if (json.body.studPurchaseOrder.type == '1') {
                        vm.alltime = false
                    }
                    if (json.body.studPurchaseOrder.type == '32') {
                        vm.typeOrder = false
                    }
                    if (json.body.studUser.studCardBag != null) {
                        vm.studTermCardHour = json.body.studPurchaseOrder.studTermCardHour,
                            vm.studCardBag = true
                    } else {
                        vm.studCardBag = false
                    }
                    vm.ruleForm1.wordsNum = json.body.studPurchaseOrder.wordsNum
                    vm.ruleForm1.theSpecialOffer = json.body.studPurchaseOrder
                        .theSpecialOffer
                    if (json.body.studPurchaseOrder.theSpecialOffer == true) {
                        vm.ruleForm1.specialOfferUser = json.body.studPurchaseOrder
                            .specialOfferSysUser.username
                        vm.divType = true
                    } else {
                        vm.ruleForm1.specialOfferUser = ""
                        vm.divType = false
                    }

                    vm.ruleForm1.specialOffer = json.body.studPurchaseOrder.specialOffer,
                        vm.extSysPaymentdata = json.body.extSysPaymentDemandsList;
                    vm.ruleForm.parentTotalPrice = json.body.parentTotalPrice + " " + json
                        .body.studPurchaseOrder.currency;
                    vm.ruleForm.Integer = json.body.studPurchaseOrder.prepayment + " " +
                        json.body.studPurchaseOrder.currency;
                    vm.ruleForm.materialCost = json.body.studPurchaseOrder.materialCost +
                        " " + json.body.studPurchaseOrder.currency;
                    vm.ruleForm.parentLastPrepayment = json.body.parentLastPrepayment +
                        " " + json.body.studPurchaseOrder.currency;
                    vm.studCourses = json.body.studCourses
                    if (json.body.studCourses == "") {

                    } else {
                        vm.aboutOrder = true;
                    }
                    if (json.body.studPurchaseOrder.type == 0 || json.body.studPurchaseOrder
                        .type == 1) {
                        vm.priceshow = true;
                    }
                    vm.ruleForm1.arrearageMoney = json.body.studPurchaseOrder
                        .arrearageMoney + " " + json.body.studPurchaseOrder.currency;
                    vm.ruleForm1.onePrice = json.body.studPurchaseOrder.price + " " + json
                        .body.studPurchaseOrder.currency;
                    vm.classroomdata = json.body.classroomList;
                    vm.studCoursewareList = json.body.studCoursewareList;
                    vm.studdate = json.body.studUser;
                    vm.filelist = json.body.studCoursewareList;
                    vm.ruleForm1.orderNo = json.body.orderNo;
                    vm.ruleForm1.remark = json.body.remark;
                    if (json.body.studPurchaseOrder.scheduledTime == null) {
                        vm.ruleForm1.scheduledTime = 0;
                    } else {
                        vm.ruleForm1.scheduledTime = json.body.studPurchaseOrder
                            .scheduledTime;
                    }
                    if (json.body.allSchooltime == null) {
                        vm.ruleForm1.allSchooltime = 0;
                    } else {
                        vm.ruleForm1.allSchooltime = json.body.allSchooltime;
                    }
                    if (json.body.studPurchaseOrder.persenterTime == null) {
                        vm.ruleForm1.persenterTime = 0;
                    } else {
                        vm.ruleForm1.persenterTime = json.body.studPurchaseOrder
                            .persenterTime;
                    }
                    vm.ruleForm1.reaMonetary = json.body.studPurchaseOrder.prepayment - json
                        .body.studPurchaseOrder.reaMonetary + " " + json.body
                        .studPurchaseOrder.currency
                    vm.ruleForm1.totalPrice = json.body.studPurchaseOrder.totalPrice + " " +
                        json.body.studPurchaseOrder.currency;
                    vm.ruleForm1.prepayment = json.body.studPurchaseOrder.prepayment + " " +
                        json.body.studPurchaseOrder.currency;
                    vm.ruleForm1.prices1 = Number(json.body.teacG) + Number(json.body
                        .teacPreG);
                    vm.ruleForm1.prices2 = Number(json.body.teacOtg) + Number(json.body
                        .teacPreOtg);
                    vm.ruleForm1.sellerDemandDesc = json.body.studPurchaseOrder
                        .sellerDemandDesc;
                    vm.ruleForm2.spareTime = json.body.studPurchaseOrder.spareTime;
                    if (vm.ruleForm2.spareTime != null) {
                        var spareTime = json.body.studPurchaseOrder.spareTime.split("|");
                        var one = spareTime[0];
                        var ones = one.split(",");
                        vm.ruleForm2.am1 = ones[0];
                        vm.ruleForm2.bm1 = ones[1];
                        vm.ruleForm2.pm1 = ones[2];
                        var two = spareTime[1];
                        var twos = two.split(",");
                        vm.ruleForm2.am2 = twos[0];
                        vm.ruleForm2.bm2 = twos[1];
                        vm.ruleForm2.pm2 = twos[2];
                        var three = spareTime[2];
                        var threes = three.split(",");
                        vm.ruleForm2.am3 = threes[0];
                        vm.ruleForm2.bm3 = threes[1];
                        vm.ruleForm2.pm3 = threes[2];
                        var four = spareTime[3];
                        var fours = four.split(",");
                        vm.ruleForm2.am4 = fours[0];
                        vm.ruleForm2.bm4 = fours[1];
                        vm.ruleForm2.pm4 = fours[2];
                        var five = spareTime[4];
                        var fives = five.split(",");
                        vm.ruleForm2.am5 = fives[0];
                        vm.ruleForm2.bm5 = fives[1];
                        vm.ruleForm2.pm5 = fives[2];
                        var six = spareTime[5];
                        var sixs = six.split(",");
                        vm.ruleForm2.am6 = sixs[0];
                        vm.ruleForm2.bm6 = sixs[1];
                        vm.ruleForm2.pm6 = sixs[2];
                        var seven = spareTime[6];
                        var sevens = seven.split(",");
                        vm.ruleForm2.am7 = sevens[0];
                        vm.ruleForm2.bm7 = sevens[1];
                        vm.ruleForm2.pm7 = sevens[2];
                    }
                    if (json.body.statused == 1) {
                        vm.ruleForm1.statused = "未处理（无任何销售接单）"
                    }
                    if (json.body.statused == 2) {
                        vm.ruleForm1.statused = "待审核"
                    }
                    if (json.body.statused == 4) {
                        vm.ruleForm1.statused = "待确定"
                    }
                    if (json.body.statused == 8) {
                        vm.ruleForm1.statused = "待规划（等待教师/运营接单）"
                    }
                    if (json.body.statused == 16) {
                        vm.ruleForm1.statused = "规划中(订单第一次超时等待运营接单)"
                    }
                    if (json.body.statused == 32) {
                        vm.ruleForm1.statused = "规划中(订单第二次超时等待运营主管强制指派)"
                    }
                    if (json.body.statused == 64) {
                        vm.ruleForm1.statused = "规划中(运营接单待指派，正在处理)"
                    }
                    if (json.body.statused == 128) {
                        vm.ruleForm1.statused = "待排课"
                    }
                    if (json.body.statused == 256) {
                        vm.ruleForm1.statused = "已排课"
                    }
                    if (json.body.statused == 512) {
                        vm.ruleForm1.statused = "申请结课中"
                    }
                    if (json.body.statused == 1024) {
                        vm.ruleForm1.statused = "已结课"
                    }
                    if (json.body.statused == 2048) {
                        vm.ruleForm1.statused = "已强制结课"
                    }
                    if (json.body.statused == 4096) {
                        vm.ruleForm1.statused = "已取消"
                    }
                    if (json.body.statused == 8192) {
                        vm.ruleForm1.statused = "坏单申请中"
                    }
                    if (json.body.statused == 16384) {
                        vm.ruleForm1.statused = "订单作废"
                    }
                    if (json.body.statused == 32768) {
                        vm.ruleForm1.statused = "销售被更换"
                    }
                    vm.ruleForm1.username = json.body.sysSeller.username;
                    vm.ruleForm1.nickname = json.body.sysUserEntity.username;
                    vm.ruleForm1.nickname1 = json.body.teacUser.username;
                    vm.ruleForm1.teacFixedPrice = json.body.teacFixedPrice;

                    vm.ruleForm2.courseName = json.body.studPurchaseOrder.courseName;
                    vm.ruleForm2.courseCode = json.body.studPurchaseOrder.courseCode;
                    if (json.body.studPurchaseOrder.type == 0) {
                        vm.ruleForm2.type = "定制辅导"
                    }
                    if (json.body.studPurchaseOrder.type == 1) {
                        vm.ruleForm2.type = "考前突击"
                    }
                    if (json.body.studPurchaseOrder.type == 2) {
                        vm.ruleForm2.type = "包课辅导"
                    }
                    if (json.body.studPurchaseOrder.type == 4) {
                        vm.ruleForm2.type = "论文辅导"
                    }
                    if (json.body.studPurchaseOrder.type == 32) {
                        vm.ruleForm2.type = "特殊订单"
                    }
                    if (json.body.typeed != 64) {
                        vm.ruleForm.nickname = json.body.studUser.nickName;
                        vm.ruleForm.levelName = json.body.studUser.eduName;
                    }
                    vm.ruleForm.schoolName = json.body.sysUniversity.name;
                    vm.ruleForm.temCourseName = json.body.sysProfessionalCourses
                        .chineseName;

                    vm.ruleForm.schoolYear = json.body.studPurchaseOrder.schoolYear;
                    if (json.body.studPurchaseOrder.endCourseTime === null) {

                    } else {
                        vm.ruleForm.endCourseTime = json.body.studPurchaseOrder
                            .endCourseTime.substring(0, 10);
                    }
                    if (json.body.studPurchaseOrder.examTime === null) {

                    } else {
                        vm.ruleForm.examTime = json.body.studPurchaseOrder.examTime
                            .substring(0, 10);
                    }
                    vm.ruleForm.schoolAccount = json.body.studPurchaseOrder.schoolAccount;
                    vm.ruleForm.schoolPws = json.body.studPurchaseOrder.schoolPws;
                    loading.close();
                    var studCoursewareList = json.body.studCoursewareList;
                    vm.coursesItem = json.body.studCoursewareList;
                    var groupName = studCoursewareList.groupName;
                    var courseLogs = json.body.courseLogs;
                    for (var i in courseLogs) {
                        var loghtml =
                            "<li class='clears'><i style='margin-right:10px;'>" +
                            courseLogs[i].createAt + "</i><i>" + courseLogs[i].description +
                            "</i></li>";
                        $("#logs").append(loghtml)
                    }

                }
            });
        },
    }
});