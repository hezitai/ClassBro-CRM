var vm = new Vue({
    el: '#app',
    data() {
        return {
            userId: '',
            btnshow: true,
            disabled: false,
            colors: '',
            btnstatus: false,
            btnval: "创建",
            btnstatus1: false,
            btnval1: "更新",
            countryId: '',
            error: '',
            mobile_show: true,
            yes: false,
            no: false,
            wxAccount: '',
            restaurants: [],
            mobiles: '',
            mobile: '',
            dis: true,
            dis1: false,
            order: false,
            cu: {},
            countrys: '',
            active: 0,
            courseFamiliaritys: '',
            purchaseOrderId: '',
            professionalNames: '',
            demands: '',
            levels: '',
            universitys: '',
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            phone: '',
            professionalName: '',
            idss: [],
            options: [],
            selectedOptions: [],
            name: '',
            label: '',
            sellerDemandDesc: '',
            dialogStatus: "",
            delivery: false,
            delivery1: false,
            // 确认函ID
            purchaseId: 0,
            cailiao: false,
            ruleForm: {
                mobileCode: '',
                decimalMaterialCost: '',
                minMoney: '',
                persenterTime: '',
                remark1: '',
                remark: '',
                aboutorder: '',
                amount: '',
                current: '',
                schoolYear: '',
                countryId: '',
                universityId: '',
                levelId: '',
                professionalId: '',
                nickName: '',
                wxAccount: '',
                mobile: '',
                totalPrice: '',
                price: '',
                scheduledTime: '',
                courseFamiliaritys: '',
                countrysid: '',
                startTime1: '',
                endTime1: '',
                startTime2: '',
                endTime2: '',
                startTime3: '',
                endTime3: '',
                startTime4: '',
                endTime4: '',
                startTime5: '',
                endTime5: '',
                startTime6: '',
                endTime6: '',
                startTime7: '',
                endTime7: '',
                startTime8: '',
                endTime8: '',
                startTime9: '',
                endTime9: '',
                startTime10: '',
                endTime10: '',
                startTime11: '',
                endTime11: '',
                startTime12: '',
                endTime12: '',
                startTime13: '',
                endTime13: '',
                startTime14: '',
                endTime14: '',
                startTime15: '',
                endTime15: '',
                startTime16: '',
                endTime16: '',
                startTime17: '',
                endTime17: '',
                startTime18: '',
                endTime18: '',
                startTime19: '',
                endTime19: '',
                startTime20: '',
                endTime20: '',
                startTime21: '',
                endTime21: '',
            },
            rules: {
                wxAccount: [{
                    required: true,
                    message: '请输入微信号',
                    trigger: 'blur'
                }, ],
                countrysid: [{
                    required: true,
                    message: '请选择留学国家',
                    trigger: 'change'
                }, ],
                mobile: [{
                    required: true,
                    message: '请输入学生手机号',
                    trigger: 'change'
                }, ],
                countryId: [{
                    required: true,
                    message: '请选择国家',
                    trigger: 'change'
                }, ],
                nickName: [{
                    required: true,
                    message: '请输入学生姓名',
                    trigger: 'blur'
                }, ],
                professionalId: [{
                    required: true,
                    message: '请输入学生专业',
                    trigger: 'change'
                }, ],
                universityId: [{
                    required: true,
                    message: '请选择学校',
                    trigger: 'change'
                }, ],
                levelId: [{
                    required: true,
                    message: '请选择学术级别',
                    trigger: 'change'
                }, ],
                schoolYear: [{
                    required: true,
                    message: '请选择学年',
                    trigger: 'change'
                }, ],
                courseFamiliarityId: [{
                    required: true,
                    message: '请选择课程熟悉度',
                    trigger: 'change'
                }],
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getcountrys();
        this.level();
        this.demand();
        this.professionalNamedata();
        this.get_courseFamiliarity();
        this.xx();
        this.getStudinfo();
        var self = this;
    },
    methods: {
        getStudinfo() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var mobile = getUrlStr("mobile");
            if (mobile != "null" && mobile != "") {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        "token": token,
                        "absoluteMobile": mobile
                    },
                    url: "" + baseURL + "sys/seller/order/checkMobile",
                    success: function (json) {
                        if (json.status == 200) {
                            vm.disabled = true
                            vm.btnshow = false
                            if (json.body.studUserRVO != null) {
                                vm.userId = json.body.studUserRVO.userId;
                                vm.ruleForm.mobile = json.body.studUserRVO.mobile;
                                vm.ruleForm.nickName = json.body.studUserRVO.nickName;
                                vm.ruleForm.wxAccount = json.body.studUserRVO.wxAccount;
                                vm.ruleForm.countryId = json.body.studUserRVO.countryId;
                                vm.ruleForm.mobileCode = json.body.studUserRVO.mobileCode;
                                vm.ruleForm.universityId = json.body.studUserRVO.universityId;
                                vm.ruleForm.professionalId = json.body.studUserRVO
                                    .professionalId;
                                vm.ruleForm.schoolYear = "" + json.body.studUserRVO.schoolYear +
                                    "";
                                vm.ruleForm.levelId = json.body.studUserRVO.eduId;
                                vm.ruleForm.schoolAccount = json.body.studUserRVO.schoolAccount;
                                vm.ruleForm.schoolPws = json.body.studUserRVO.schoolPws;
                                var spareTime = json.body.studUserRVO.spareTime;
                                var spareTimes = spareTime.split("|"); // 以|分割为每周的时间
                                var spareTime_1 = spareTimes[0]; // 周一的时间
                                var spareTime_week1s = spareTime_1.split(","); //以，分割为每天的早中晚时间
                                var spareTime1q = spareTime_week1s[0]; // 周一早上的时间
                                var ts1 = spareTime1q.split("-");
                                var t1s = ts1[0];
                                var t1e = ts1[1];
                                vm.ruleForm.startTime1 = t1s;
                                vm.ruleForm.endTime1 = t1e;
                                var spareTime1w = spareTime_week1s[1]; //周一中午的时间
                                var ts2 = spareTime1w.split("-");
                                var t2s = ts2[0];
                                var t2e = ts2[1];
                                vm.ruleForm.startTime2 = t2s;
                                vm.ruleForm.endTime2 = t2e;
                                var spareTime1e = spareTime_week1s[2]; //周一下午午的时间
                                var ts3 = spareTime1e.split("-");
                                var t3s = ts3[0];
                                var t3e = ts3[1];
                                vm.ruleForm.startTime3 = t3s;
                                vm.ruleForm.endTime3 = t3e;
                                //周二
                                var spareTime_2 = spareTimes[1]; // 周二的时间
                                var spareTime_week2s = spareTime_2.split(","); //以，分割为每天的早中晚时间
                                var spareTime2q = spareTime_week2s[0]; // 周二早上的时间
                                var ts4 = spareTime2q.split("-");
                                var t4s = ts4[0];
                                var t4e = ts4[1];
                                vm.ruleForm.startTime4 = t4s;
                                vm.ruleForm.endTime4 = t4e;
                                var spareTime2w = spareTime_week2s[1]; //周二中午的时间
                                var ts5 = spareTime2w.split("-");
                                var t5s = ts5[0];
                                var t5e = ts5[1];
                                vm.ruleForm.startTime5 = t5s;
                                vm.ruleForm.endTime5 = t5e;
                                var spareTime2e = spareTime_week2s[2]; //周二下午午的时间
                                var ts6 = spareTime2e.split("-");
                                var t6s = ts6[0];
                                var t6e = ts6[1];
                                vm.ruleForm.startTime6 = t6s;
                                vm.ruleForm.endTime6 = t6e;
                                //周三
                                var spareTime_3 = spareTimes[2]; // 周三的时间
                                var spareTime_week3s = spareTime_3.split(","); //以，分割为每天的早中晚时间
                                var spareTime3q = spareTime_week3s[0]; // 周三早上的时间
                                var ts7 = spareTime3q.split("-");
                                var t7s = ts7[0];
                                var t7e = ts7[1];
                                vm.ruleForm.startTime7 = t7s;
                                vm.ruleForm.endTime7 = t7e;
                                var spareTime3w = spareTime_week3s[1]; //周三中午的时间
                                var ts8 = spareTime3w.split("-");
                                var t8s = ts8[0];
                                var t8e = ts8[1];
                                vm.ruleForm.startTime8 = t8s;
                                vm.ruleForm.endTime8 = t8e;
                                var spareTime3e = spareTime_week3s[2]; //周三下午午的时间
                                var ts9 = spareTime3e.split("-");
                                var t9s = ts9[0];
                                var t9e = ts9[1];
                                vm.ruleForm.startTime9 = t9s;
                                vm.ruleForm.endTime9 = t9e;
                                //周四
                                var spareTime_4 = spareTimes[3]; // 周四的时间
                                var spareTime_week4s = spareTime_4.split(","); //以，分割为每天的早中晚时间
                                var spareTime4q = spareTime_week4s[0]; // 周四早上的时间
                                var ts10 = spareTime4q.split("-");
                                var t10s = ts10[0];
                                var t10e = ts10[1];
                                vm.ruleForm.startTime10 = t10s;
                                vm.ruleForm.endTime10 = t10e;
                                var spareTime4w = spareTime_week4s[1]; //周四中午的时间
                                var ts11 = spareTime4w.split("-");
                                var t11s = ts11[0];
                                var t11e = ts11[1];
                                vm.ruleForm.startTime11 = t11s;
                                vm.ruleForm.endTime11 = t11e;
                                var spareTime4e = spareTime_week4s[2]; //周四下午午的时间
                                var ts12 = spareTime4e.split("-");
                                var t12s = ts12[0];
                                var t12e = ts12[1];
                                vm.ruleForm.startTime12 = t12s;
                                vm.ruleForm.endTime12 = t12e;
                                //周五
                                var spareTime_5 = spareTimes[4]; // 周五的时间
                                var spareTime_week5s = spareTime_5.split(","); //以，分割为每天的早中晚时间
                                var spareTime5q = spareTime_week5s[0]; // 周五早上的时间
                                var ts13 = spareTime5q.split("-");
                                var t13s = ts13[0];
                                var t13e = ts13[1];
                                vm.ruleForm.startTime13 = t13s;
                                vm.ruleForm.endTime13 = t13e;
                                var spareTime5w = spareTime_week5s[1]; //周五中午的时间
                                var ts14 = spareTime5w.split("-");
                                var t14s = ts14[0];
                                var t14e = ts14[1];
                                vm.ruleForm.startTime14 = t14s;
                                vm.ruleForm.endTime14 = t14e;
                                var spareTime5e = spareTime_week5s[2]; //周五下午午的时间
                                var ts15 = spareTime5e.split("-");
                                var t15s = ts15[0];
                                var t15e = ts15[1];
                                vm.ruleForm.startTime15 = t15s;
                                vm.ruleForm.endTime15 = t15e;
                                //周六
                                var spareTime_6 = spareTimes[5]; // 周六的时间
                                var spareTime_week6s = spareTime_6.split(","); //以，分割为每天的早中晚时间
                                var spareTime6q = spareTime_week6s[0]; // 周六早上的时间
                                var ts16 = spareTime6q.split("-");
                                var t16s = ts16[0];
                                var t16e = ts16[1];
                                vm.ruleForm.startTime16 = t16s;
                                vm.ruleForm.endTime16 = t16e;
                                var spareTime6w = spareTime_week6s[1]; //周六中午的时间
                                var ts17 = spareTime6w.split("-");
                                var t17s = ts17[0];
                                var t17e = ts17[1];
                                vm.ruleForm.startTime17 = t17s;
                                vm.ruleForm.endTime17 = t17e;
                                var spareTime6e = spareTime_week6s[2]; //周六下午午的时间
                                var ts18 = spareTime6e.split("-");
                                var t18s = ts18[0];
                                var t18e = ts18[1];
                                vm.ruleForm.startTime18 = t18s;
                                vm.ruleForm.endTime18 = t18e;
                                //周日
                                var spareTime_7 = spareTimes[6]; // 周日的时间
                                var spareTime_week7s = spareTime_7.split(","); //以，分割为每天的早中晚时间
                                var spareTime7q = spareTime_week7s[0]; // 周六早上的时间
                                var ts19 = spareTime7q.split("-");
                                var t19s = ts19[0];
                                var t19e = ts19[1];
                                vm.ruleForm.startTime19 = t19s;
                                vm.ruleForm.endTime19 = t19e;
                                var spareTime7w = spareTime_week7s[1]; //周六中午的时间
                                var ts20 = spareTime7w.split("-");
                                var t20s = ts20[0];
                                var t20e = ts20[1];
                                vm.ruleForm.startTime20 = t20s;
                                vm.ruleForm.endTime20 = t20e;
                                var spareTime7e = spareTime_week7s[2]; //周六下午午的时间
                                var ts21 = spareTime7e.split("-");
                                var t21s = ts21[0];
                                var t21e = ts21[1];
                                vm.ruleForm.startTime21 = t21s;
                                vm.ruleForm.endTime21 = t21e;
                            }
                        }
                    }
                });
            }
            if (mobile == '') {

            }
        },
        update(formName) {
            var startTime1 = this.$refs.ruleForm.model.startTime1;
            var endTime1 = this.$refs.ruleForm.model.endTime1;
            var startTime2 = this.$refs.ruleForm.model.startTime2;
            var endTime2 = this.$refs.ruleForm.model.endTime2;
            var startTime3 = this.$refs.ruleForm.model.startTime3;
            var endTime3 = this.$refs.ruleForm.model.endTime3;
            var startTime4 = this.$refs.ruleForm.model.startTime4;
            var endTime4 = this.$refs.ruleForm.model.endTime4;
            var startTime5 = this.$refs.ruleForm.model.startTime5;
            var endTime5 = this.$refs.ruleForm.model.endTime5;
            var startTime6 = this.$refs.ruleForm.model.startTime6;
            var endTime6 = this.$refs.ruleForm.model.endTime6;
            var startTime7 = this.$refs.ruleForm.model.startTime7;
            var endTime7 = this.$refs.ruleForm.model.endTime7;
            var startTime8 = this.$refs.ruleForm.model.startTime8;
            var endTime8 = this.$refs.ruleForm.model.endTime8;
            var startTime9 = this.$refs.ruleForm.model.startTime9;
            var endTime9 = this.$refs.ruleForm.model.endTime9;
            var startTime10 = this.$refs.ruleForm.model.startTime10;
            var endTime10 = this.$refs.ruleForm.model.endTime10;
            var startTime11 = this.$refs.ruleForm.model.startTime11;
            var endTime11 = this.$refs.ruleForm.model.endTime11;
            var startTime12 = this.$refs.ruleForm.model.startTime12;
            var endTime12 = this.$refs.ruleForm.model.endTime12;
            var startTime13 = this.$refs.ruleForm.model.startTime13;
            var endTime13 = this.$refs.ruleForm.model.endTime13;
            var startTime14 = this.$refs.ruleForm.model.startTime14;
            var endTime14 = this.$refs.ruleForm.model.endTime14;
            var startTime15 = this.$refs.ruleForm.model.startTime15;
            var endTime15 = this.$refs.ruleForm.model.endTime15;
            var startTime16 = this.$refs.ruleForm.model.startTime16;
            var endTime16 = this.$refs.ruleForm.model.endTime16;
            var startTime17 = this.$refs.ruleForm.model.startTime17;
            var endTime17 = this.$refs.ruleForm.model.endTime17;
            var startTime18 = this.$refs.ruleForm.model.startTime18;
            var endTime18 = this.$refs.ruleForm.model.endTime18;
            var startTime19 = this.$refs.ruleForm.model.startTime19;
            var endTime19 = this.$refs.ruleForm.model.endTime19;
            var startTime20 = this.$refs.ruleForm.model.startTime20;
            var endTime20 = this.$refs.ruleForm.model.endTime20;
            var startTime21 = this.$refs.ruleForm.model.startTime21;
            var endTime21 = this.$refs.ruleForm.model.endTime21;
            if (startTime1 == "" || startTime1 == undefined || endTime1 == "" || endTime1 == undefined) {
                time1 = '';
            } else {
                time1 = startTime1 + "-" + endTime1;
            }
            if (startTime2 == "" || endTime2 == "" || startTime2 == undefined || endTime2 == undefined) {
                time2 = '';
            } else {
                time2 = startTime2 + "-" + endTime2;
            }
            if (startTime3 == "" || endTime3 == "" || startTime3 == undefined || endTime3 == undefined) {
                time3 = '';
            } else {
                time3 = startTime3 + "-" + endTime3;
            }
            if (startTime4 == "" || endTime4 == "" || startTime4 == undefined || endTime4 == undefined) {
                time4 = '';
            } else {
                time4 = startTime4 + "-" + endTime4;
            }
            if (startTime5 == "" || endTime5 == "" || startTime5 == undefined || endTime5 == undefined) {
                time5 = '';
            } else {
                time5 = startTime5 + "-" + endTime5;
            }
            if (startTime6 == "" || endTime6 == "" || startTime6 == undefined || endTime6 == undefined) {
                time6 = '';
            } else {
                time6 = startTime6 + "-" + endTime6;
            }
            if (startTime7 == "" || endTime7 == "" || startTime7 == undefined || endTime7 == undefined) {
                time7 = '';
            } else {
                time7 = startTime7 + "-" + endTime7;
            }
            if (startTime8 == "" || endTime8 == "" || startTime8 == undefined || endTime8 == undefined) {
                time8 = '';
            } else {
                time8 = startTime8 + "-" + endTime8;
            }
            if (startTime9 == "" || endTime9 == "" || startTime9 == undefined || endTime9 == undefined) {
                time9 = '';
            } else {
                time9 = startTime9 + "-" + endTime9;
            }
            if (startTime10 == "" || endTime10 == "" || startTime10 == undefined || endTime10 ==
                undefined) {
                time10 = '';
            } else {
                time10 = startTime10 + "-" + endTime10;
            }
            if (startTime11 == "" || endTime11 == "" || startTime11 == undefined || endTime11 ==
                undefined) {
                time11 = '';
            } else {
                time11 = startTime11 + "-" + endTime11;
            }
            if (startTime12 == "" || endTime12 == "" || startTime12 == undefined || endTime12 ==
                undefined) {
                time12 = '';
            } else {
                time12 = startTime12 + "-" + endTime12;
            }
            if (startTime13 == "" || endTime13 == "" || startTime13 == undefined || endTime13 ==
                undefined) {
                time13 = '';
            } else {
                time13 = startTime13 + "-" + endTime13;
            }
            if (startTime14 == "" || endTime14 == "" || startTime14 == undefined || endTime14 ==
                undefined) {
                time14 = '';
            } else {
                time14 = startTime14 + "-" + endTime14;
            }
            if (startTime15 == "" || endTime15 == "" || startTime15 == undefined || endTime15 ==
                undefined) {
                time15 = '';
            } else {
                time15 = startTime15 + "-" + endTime15;
            }
            if (startTime16 == "" || endTime16 == "" || startTime16 == undefined || endTime16 ==
                undefined) {
                time16 = '';
            } else {
                time16 = startTime16 + "-" + endTime16;
            }
            if (startTime17 == "" || endTime17 == "" || startTime17 == undefined || endTime17 ==
                undefined) {
                time17 = '';
            } else {
                time17 = startTime17 + "-" + endTime17;
            }
            if (startTime18 == "" || endTime18 == "" || startTime18 == undefined || endTime18 ==
                undefined) {
                time18 = '';
            } else {
                time18 = startTime18 + "-" + endTime18;
            }
            if (startTime19 == "" || endTime19 == "" || startTime19 == undefined || endTime19 ==
                undefined) {
                time19 = '';
            } else {
                time19 = startTime19 + "-" + endTime19;
            }
            if (startTime20 == "" || endTime20 == "" || startTime20 == undefined || endTime20 ==
                undefined) {
                time20 = '';
            } else {
                time20 = startTime20 + "-" + endTime20;
            }
            if (startTime21 == "" || endTime21 == "" || startTime21 == undefined || endTime21 ==
                undefined) {
                time21 = '';
            } else {
                time21 = startTime21 + "-" + endTime21;
            }
            var freetime = time1 + ',' + time2 + ',' + time3 + '|' + time4 + ',' + time5 + ',' + time6 +
                '|' + time7 + ',' + time8 + ',' + time9 + '|' + time10 + ',' + time11 + ',' + time12 + '|' +
                time13 + ',' + time14 + ',' + time15 + '|' + time16 + ',' + time17 + ',' + time18 + '|' +
                time19 + ',' + time20 + ',' + time21;
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus1 = true;
                    vm.btnval1 = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "/sys/seller/order/setStudInfo",
                        contentType: "application/json",
                        data: JSON.stringify({
                            userId: vm.userId,
                            mobile: vm.ruleForm.mobile,
                            wxAccount: vm.ruleForm.wxAccount,
                            nickName: vm.ruleForm.nickName,
                            countryId: Number(vm.ruleForm.countryId),
                            professionalId: Number(vm.ruleForm.professionalId),
                            universityId: Number(vm.ruleForm.universityId),
                            eduId: Number(vm.ruleForm.levelId),
                            schoolYear: Number(vm.ruleForm.schoolYear),
                            schoolAccount: vm.ruleForm.schoolAccount,
                            schoolPws: vm.ruleForm.schoolPws,
                            spareTime: freetime,
                            mobileCode: vm.ruleForm.mobileCode,
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                vm.btnstatus1 = false;
                                vm.btnval1 = "更新";
                                self.$message({
                                    message: r.body.msg,
                                    type: 'success',
                                });
                            }
                            if (r.status == 400) {
                                self.$message({
                                    message: r.body.msg,
                                    type: 'warning',
                                });
                                vm.btnstatus1 = false;
                                vm.btnval1 = "更新";
                            }
                        }
                    });
                } else {
                    this.$message.error('请完善信息');
                    return false;
                }
            });
        },
        get_courseFamiliarity() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 6,
                    "onlyMe": true
                },
                url: "" + baseURL + "sys/basedata/coursefamiliarity/list",
                success: function (json) {
                    vm.courseFamiliaritys = json.body.list;
                }
            });
        },
        change_state(val) {
            vm.ruleForm.universityId = "";
            let obj = {};
            obj = this.countrys.find((item) => {
                return item.id === val;
            });
            vm.cu = obj;
            vm.countryId = val;
            vm.xx();
        },
        getcountrys() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/country/list",
                success: function (json) {
                    vm.countrys = json.body.list;
                }
            });
        },
        // 返回
        back(tab, first) {
            window.history.back(-1);
        },
        result() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "absoluteMobile": vm.$refs.ruleForm.model.mobile,
                    "page": 1,
                    "limit": 100000,
                },
                url: "" + baseURL + "/sys/seller/order/checkMobile",
                success: function (json) {
                    if (json.status == 200) {
                        if (json.body.studUserRVO == null) {
                            vm.error = "";
                        } else {
                            if (json.body.studUserRVO.countryId == null) {
                                vm.coun = false
                            } else {
                                vm.coun = true
                            }
                            vm.error = "该账号已注册";
                            vm.colors = 'red';
                            vm.xx();
                            vm.getCurrent(vm.countrys, vm.countryId);
                        }
                        if (json.body.teacUserRVO != null) {
                            vm.ifis = false;
                            vm.colors = 'red';
                            vm.error = "该账号已注册";
                        }
                        if (json.body.sysUserEntity != null) {
                            vm.ifis = false;
                            vm.colors = 'red';
                            vm.error = "该账号已注册";
                        }
                        if (json.body.studUserRVO == null && json.body.sysUserEntity == null &&
                            json.body.teacUserRVO == null) {
                            vm.ifis = false;
                            vm.mobile_show = true;
                            vm.error = "该账号未被注册";
                            vm.colors = 'green';
                            vm.if = false;
                        }
                    }
                    if (json.status == 400) {
                        vm.ifis = false;
                        vm.error = json.body.msg;
                        vm.ruleForm.nickName = "";
                    }
                }
            });
        },

        // 保存      
        save(formName) {
            var startTime1 = this.$refs.ruleForm.model.startTime1;
            var endTime1 = this.$refs.ruleForm.model.endTime1;
            var startTime2 = this.$refs.ruleForm.model.startTime2;
            var endTime2 = this.$refs.ruleForm.model.endTime2;
            var startTime3 = this.$refs.ruleForm.model.startTime3;
            var endTime3 = this.$refs.ruleForm.model.endTime3;
            var startTime4 = this.$refs.ruleForm.model.startTime4;
            var endTime4 = this.$refs.ruleForm.model.endTime4;
            var startTime5 = this.$refs.ruleForm.model.startTime5;
            var endTime5 = this.$refs.ruleForm.model.endTime5;
            var startTime6 = this.$refs.ruleForm.model.startTime6;
            var endTime6 = this.$refs.ruleForm.model.endTime6;
            var startTime7 = this.$refs.ruleForm.model.startTime7;
            var endTime7 = this.$refs.ruleForm.model.endTime7;
            var startTime8 = this.$refs.ruleForm.model.startTime8;
            var endTime8 = this.$refs.ruleForm.model.endTime8;
            var startTime9 = this.$refs.ruleForm.model.startTime9;
            var endTime9 = this.$refs.ruleForm.model.endTime9;
            var startTime10 = this.$refs.ruleForm.model.startTime10;
            var endTime10 = this.$refs.ruleForm.model.endTime10;
            var startTime11 = this.$refs.ruleForm.model.startTime11;
            var endTime11 = this.$refs.ruleForm.model.endTime11;
            var startTime12 = this.$refs.ruleForm.model.startTime12;
            var endTime12 = this.$refs.ruleForm.model.endTime12;
            var startTime13 = this.$refs.ruleForm.model.startTime13;
            var endTime13 = this.$refs.ruleForm.model.endTime13;
            var startTime14 = this.$refs.ruleForm.model.startTime14;
            var endTime14 = this.$refs.ruleForm.model.endTime14;
            var startTime15 = this.$refs.ruleForm.model.startTime15;
            var endTime15 = this.$refs.ruleForm.model.endTime15;
            var startTime16 = this.$refs.ruleForm.model.startTime16;
            var endTime16 = this.$refs.ruleForm.model.endTime16;
            var startTime17 = this.$refs.ruleForm.model.startTime17;
            var endTime17 = this.$refs.ruleForm.model.endTime17;
            var startTime18 = this.$refs.ruleForm.model.startTime18;
            var endTime18 = this.$refs.ruleForm.model.endTime18;
            var startTime19 = this.$refs.ruleForm.model.startTime19;
            var endTime19 = this.$refs.ruleForm.model.endTime19;
            var startTime20 = this.$refs.ruleForm.model.startTime20;
            var endTime20 = this.$refs.ruleForm.model.endTime20;
            var startTime21 = this.$refs.ruleForm.model.startTime21;
            var endTime21 = this.$refs.ruleForm.model.endTime21;
            if (startTime1 == "" || startTime1 == undefined || endTime1 == "" || endTime1 == undefined) {
                time1 = '';
            } else {
                time1 = startTime1 + "-" + endTime1;
            }
            if (startTime2 == "" || endTime2 == "" || startTime2 == undefined || endTime2 == undefined) {
                time2 = '';
            } else {
                time2 = startTime2 + "-" + endTime2;
            }
            if (startTime3 == "" || endTime3 == "" || startTime3 == undefined || endTime3 == undefined) {
                time3 = '';
            } else {
                time3 = startTime3 + "-" + endTime3;
            }
            if (startTime4 == "" || endTime4 == "" || startTime4 == undefined || endTime4 == undefined) {
                time4 = '';
            } else {
                time4 = startTime4 + "-" + endTime4;
            }
            if (startTime5 == "" || endTime5 == "" || startTime5 == undefined || endTime5 == undefined) {
                time5 = '';
            } else {
                time5 = startTime5 + "-" + endTime5;
            }
            if (startTime6 == "" || endTime6 == "" || startTime6 == undefined || endTime6 == undefined) {
                time6 = '';
            } else {
                time6 = startTime6 + "-" + endTime6;
            }
            if (startTime7 == "" || endTime7 == "" || startTime7 == undefined || endTime7 == undefined) {
                time7 = '';
            } else {
                time7 = startTime7 + "-" + endTime7;
            }
            if (startTime8 == "" || endTime8 == "" || startTime8 == undefined || endTime8 == undefined) {
                time8 = '';
            } else {
                time8 = startTime8 + "-" + endTime8;
            }
            if (startTime9 == "" || endTime9 == "" || startTime9 == undefined || endTime9 == undefined) {
                time9 = '';
            } else {
                time9 = startTime9 + "-" + endTime9;
            }
            if (startTime10 == "" || endTime10 == "" || startTime10 == undefined || endTime10 ==
                undefined) {
                time10 = '';
            } else {
                time10 = startTime10 + "-" + endTime10;
            }
            if (startTime11 == "" || endTime11 == "" || startTime11 == undefined || endTime11 ==
                undefined) {
                time11 = '';
            } else {
                time11 = startTime11 + "-" + endTime11;
            }
            if (startTime12 == "" || endTime12 == "" || startTime12 == undefined || endTime12 ==
                undefined) {
                time12 = '';
            } else {
                time12 = startTime12 + "-" + endTime12;
            }
            if (startTime13 == "" || endTime13 == "" || startTime13 == undefined || endTime13 ==
                undefined) {
                time13 = '';
            } else {
                time13 = startTime13 + "-" + endTime13;
            }
            if (startTime14 == "" || endTime14 == "" || startTime14 == undefined || endTime14 ==
                undefined) {
                time14 = '';
            } else {
                time14 = startTime14 + "-" + endTime14;
            }
            if (startTime15 == "" || endTime15 == "" || startTime15 == undefined || endTime15 ==
                undefined) {
                time15 = '';
            } else {
                time15 = startTime15 + "-" + endTime15;
            }
            if (startTime16 == "" || endTime16 == "" || startTime16 == undefined || endTime16 ==
                undefined) {
                time16 = '';
            } else {
                time16 = startTime16 + "-" + endTime16;
            }
            if (startTime17 == "" || endTime17 == "" || startTime17 == undefined || endTime17 ==
                undefined) {
                time17 = '';
            } else {
                time17 = startTime17 + "-" + endTime17;
            }
            if (startTime18 == "" || endTime18 == "" || startTime18 == undefined || endTime18 ==
                undefined) {
                time18 = '';
            } else {
                time18 = startTime18 + "-" + endTime18;
            }
            if (startTime19 == "" || endTime19 == "" || startTime19 == undefined || endTime19 ==
                undefined) {
                time19 = '';
            } else {
                time19 = startTime19 + "-" + endTime19;
            }
            if (startTime20 == "" || endTime20 == "" || startTime20 == undefined || endTime20 ==
                undefined) {
                time20 = '';
            } else {
                time20 = startTime20 + "-" + endTime20;
            }
            if (startTime21 == "" || endTime21 == "" || startTime21 == undefined || endTime21 ==
                undefined) {
                time21 = '';
            } else {
                time21 = startTime21 + "-" + endTime21;
            }
            var freetime = time1 + ',' + time2 + ',' + time3 + '|' + time4 + ',' + time5 + ',' + time6 +
                '|' + time7 + ',' + time8 + ',' + time9 + '|' + time10 + ',' + time11 + ',' + time12 + '|' +
                time13 + ',' + time14 + ',' + time15 + '|' + time16 + ',' + time17 + ',' + time18 + '|' +
                time19 + ',' + time20 + ',' + time21;
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "/sys/seller/order/createStudAccount",
                        contentType: "application/json",
                        data: JSON.stringify({
                            mobile: vm.ruleForm.mobile,
                            wxAccount: vm.ruleForm.wxAccount,
                            studentName: vm.ruleForm.nickName,
                            countryId: vm.ruleForm.countryId,
                            professionalId: vm.ruleForm.professionalId,
                            universityId: vm.ruleForm.universityId,
                            eduId: Number(vm.ruleForm.levelId),
                            schoolYear: Number(vm.ruleForm.schoolYear),
                            schoolAccount: vm.ruleForm.schoolAccount,
                            schoolPws: vm.ruleForm.schoolPws,
                            spareTime: freetime,
                            mobileCode: vm.ruleForm.mobileCode,
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                vm.btnstatus = false;
                                vm.btnval = "创建";
                                self.$message({
                                    message: r.body.msg,
                                    type: 'success',
                                });
                                location.reload()
                            }
                            if (r.status == 400) {
                                self.$message({
                                    message: r.body.msg,
                                    type: 'warning',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "创建";
                            }
                        }
                    });
                } else {
                    this.$message.error('请完善信息');
                    return false;
                }
            });
        },
        level() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/edubackground/list",
                success: function (json) {
                    vm.levels = json.body.list;
                }
            });
        },
        professionalNamedata() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/professionalCourses/list",
                success: function (json) {
                    vm.professionalNames = json.body.list;
                }
            });
        },
        demand() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/demandtype/list",
                success: function (json) {
                    vm.demands = json.body.list;
                }
            });
        },
        xx() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "countryId": this.countryId
                },
                url: "" + baseURL + "sys/basedata/university/list",
                success: function (json) {
                    vm.universitys = json.body.list;
                }
            });
        },
    }
});