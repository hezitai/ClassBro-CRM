var vm = new Vue({
    el: '#app',
    data() {
        return {
            isCreated: false,
            disabled1: true,
            disabled2: true,
            disabled3: true,
            disabled4: true,
            disabled5: true,
            creat: '',
            checkList: '',
            activeName2: 'first',
            first: true,
            second: false,
            btnstatus: false,
            btnval: "确 定",
            btnstatus1: false,
            btnval1: "更 新",
            ruleForm: {
                channelName: '',
                channelType: '',
                approachesCooperation: '',
                account: '',
                password: '',
                phone: '',
                dockingPeople: '',
                dockingJob: '',
                clearingFormTime: '',
                propagandaCycleStart: '',
                propagandaCycleEnd: '',
                checkList: [],
                channelMale: '',
                meansPayments1: '',
                meansPayments2: '',
                meansPayments3: '',
                meansPayments4: '',
            },
            pic: {},
            pciker1: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pciker2: {
                disabledDate: (time) => {
                    let beginDateVal = this.ruleForm.propagandaCycleStart;
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal;
                    }
                }
            },
            rules: {
                channelName: [{
                    required: true,
                    message: '请输入渠道名称',
                    trigger: 'blur'
                }],
                channelMale: [{
                    required: true,
                    message: '请选择渠道性别',
                    trigger: 'change'
                }],
                channelType: [{
                    required: true,
                    message: '请选择渠道类别',
                    trigger: 'change'
                }],
                approachesCooperation: [{
                    required: true,
                    message: '请输入合作方式',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入渠道方密码',
                    trigger: 'blur'
                }],
                account: [{
                    required: true,
                    message: '请输入渠道方账号',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '请输入联系人电话',
                    trigger: 'blur'
                }],
                dockingPeople: [{
                    required: true,
                    message: '请输入对接人姓名',
                    trigger: 'blur'
                }],
                dockingJob: [{
                    required: true,
                    message: '请输入对接人职务',
                    trigger: 'blur'
                }],
                // clearingFormTime: [
                //   { required: true, message: '请选择开始时间', trigger: 'change' }
                // ],
                // propagandaCycleStart: [
                //   { required: true, message: '请选择开始时间', trigger: 'change' }
                // ],
                // propagandaCycleEnd: [
                //   { required: true, message: '请选择结束时间', trigger: 'change' }
                // ],
            }
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        chakantupian(url) {
            window.open(url)
        },
        getInfo() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var iscreat = getUrlStr("iscreat");
            if (iscreat == 'false') {
                this.isCreated = false;
                $("#creat").css("display", "none");
            } else {
                this.isCreated = true;
                $("#update").css("display", "none");
            }
            $.ajax({
                type: "get",
                url: "" + baseURL + "/sys/TeacChannel/channel/info/" + id + "",
                dataType: "json",
                data: {
                    "token": token,
                },
                success: function (r) {
                    if (r.status == 200) {
                        if (r.body.clearingFormStr == null) {

                        } else {
                            var clearingFormStr = (r.body.clearingFormStr).split(",");
                            clearingFormStr.forEach(v => {
                                if (v == 1) {
                                    vm.disabled1 = false;
                                }
                                if (v == 2) {
                                    vm.disabled2 = false;
                                }
                                if (v == 4) {
                                    vm.disabled3 = false;
                                }
                                if (v == 8) {
                                    vm.disabled4 = false;
                                }
                                if (v == 16) {
                                    vm.disabled5 = false;
                                }
                            })
                        }
                        if (r.body.sysTeacChannelExt === null) {
                            vm.pic.idCardFrontalUrl = ''
                            vm.pic.idCardRearUrl = ''
                            vm.pic.commonSealUrl = ''
                            vm.pic.businessLicenseUrl = ''
                        } else {
                            vm.pic.idCardFrontalUrl = r.body.sysTeacChannelExt.idCardFrontalUrl; //正面
                            vm.pic.idCardRearUrl = r.body.sysTeacChannelExt.idCardRearUrl; //反面
                            vm.pic.commonSealUrl = r.body.sysTeacChannelExt.commonSealUrl; // 公章
                            vm.pic.businessLicenseUrl = r.body.sysTeacChannelExt.businessLicenseUrl; //营业执照
                        }
                        vm.ruleForm.channelMale = r.body.sex;
                        vm.ruleForm.channelName = r.body.channelName;
                        vm.ruleForm.channelType = "" + r.body.channelType + "";
                        vm.ruleForm.approachesCooperation = r.body.approachesCooperation;
                        vm.ruleForm.account = r.body.account;
                        vm.ruleForm.password = r.body.password;
                        vm.ruleForm.phone = r.body.phone;
                        vm.ruleForm.dockingPeople = r.body.dockingPeople;
                        vm.ruleForm.dockingJob = r.body.dockingJob;
                        vm.ruleForm.clearingFormTime = (r.body.clearingFormTime).split(" ")[0];
                        vm.ruleForm.propagandaCycleEnd = (r.body.propagandaCycleEnd).split(" ")[
                            0];
                        vm.ruleForm.propagandaCycleStart = (r.body.propagandaCycleStart).split(
                            " ")[0];
                        vm.ruleForm.checkList = (r.body.clearingFormStr).split(",");
                        vm.ruleForm.meansPayments1 = r.body.meansPayments[1];
                        vm.ruleForm.meansPayments2 = r.body.meansPayments[3];
                        vm.ruleForm.meansPayments3 = r.body.meansPayments[5];
                        vm.ruleForm.meansPayments4 = r.body.meansPayments[7];
                    }
                }
            });
        },
        handleCheck1(val) {
            if (val == true) {
                vm.disabled1 = false
            } else {
                vm.disabled1 = true
            }
        },
        handleCheck2(val) {
            if (val == true) {
                vm.disabled2 = false
            } else {
                vm.disabled2 = true
            }
        },
        handleCheck3(val) {
            if (val == true) {
                vm.disabled3 = false
            } else {
                vm.disabled3 = true
            }
        },
        handleCheck4(val) {
            if (val == true) {
                vm.disabled4 = false
            } else {
                vm.disabled4 = true
            }
        },
        handleCheck5(val) {
            if (val == true) {
                vm.disabled5 = false
            } else {
                vm.disabled5 = true
            }
        },
        handleCheckAllChange(val) {
            var s = 0;
            val.forEach(function (a) {
                s += Number(a);
            }, 0);
            vm.checkList = s
        },
        changeTime(date) {
            this.ruleForm.propagandaCycleEnd = "";
            this.pciker2 = {
                disabledDate(time) { //开始时间-结束时间   
                    return (time.getTime() < new Date(date).getTime() - 8.64e7);
                }
            }
        },
        handleClick(tab, event) {
            var val = tab.index;
            if (val == 0) {
                vm.first = true;
                vm.second = false;
            }
            if (val == 1) {
                vm.first = false;
                vm.second = true;
            }
        },
        back: function () {
            window.history.go(-1);
        },

        iftrue() {
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
                            vm.userId = json.body.studUserRVO.userId;
                            vm.error = "该账号已经被学生注册，请更换手机号";
                            vm.color = 'red';
                        }
                        if (json.body.teacUserRVO != null) {
                            vm.color = 'red';
                            vm.error = "该账号已经被老师注册，请更换手机号";
                        }
                        if (json.body.sysUserEntity != null) {
                            vm.color = 'red';
                            vm.error = "该账号已经在CRM注册，请更换手机号";
                        }
                        if (json.body.studUserRVO == null && json.body.sysUserEntity == null &&
                            json.body.teacUserRVO == null) {
                            vm.error = "该账号未被注册";
                            vm.color = 'green';
                        }
                    }
                    if (json.status == 400) {
                        vm.error = json.body.msg;
                    }
                }
            });
        },
        update(formName) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var self = this;
            if (vm.ruleForm.clearingFormTime == "" || vm.ruleForm.clearingFormTime == null) {
                var clearingFormTime = "";
            } else {
                var clearingFormTime = vm.ruleForm.clearingFormTime + " 00:00:00"
            }
            if (vm.ruleForm.propagandaCycleStart == "" || vm.ruleForm.propagandaCycleStart == null) {
                var propagandaCycleStart = ""
            } else {
                var propagandaCycleStart = vm.ruleForm.propagandaCycleStart + " 00:00:00"
            }
            if (vm.ruleForm.propagandaCycleEnd == "" || vm.ruleForm.propagandaCycleEnd == null) {
                var propagandaCycleEnd = ""
            } else {
                var propagandaCycleEnd = vm.ruleForm.propagandaCycleEnd + " 00:00:00"
            }
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            vm.ruleForm.checkList = vm.checkList;
            vm.btnstatus = true;
            vm.btnval = "加载中";
            $.ajax({
                type: "POST",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "/sys/TeacChannel/channel/update",
                contentType: "application/json",
                data: JSON.stringify({
                    id: id,
                    sex: vm.ruleForm.channelMale,
                    channelName: vm.ruleForm.channelName,
                    channelType: Number(vm.ruleForm.channelType),
                    approachesCooperation: vm.ruleForm
                        .approachesCooperation,
                    account: vm.ruleForm.account,
                    password: vm.ruleForm.password,
                    phone: vm.ruleForm.phone,
                    dockingPeople: vm.ruleForm.dockingPeople,
                    dockingJob: vm.ruleForm.dockingJob,
                    clearingFormTime: clearingFormTime,
                    propagandaCycleStart: propagandaCycleStart,
                    propagandaCycleEnd: propagandaCycleEnd,
                    clearingForm: vm.ruleForm.checkList,
                }),
                success: function (r) {
                    if (r.status == 200) {
                        self.$message({
                            message: r.body.msg,
                            type: 'success'
                        });
                        vm.btnstatus = true;
                        vm.btnval = "确 定";
                        setTimeout(function () {
                            window.history.go(-1);
                        }, 1000);
                    }
                    if (r.status == 400) {
                        self.$message({
                            message: r.body.msg,
                            type: 'warning'
                        });
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                    }
                    if (r.status == 500) {
                        self.$message({
                            message: r.body.msg,
                            type: 'warning'
                        });
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                    }
                }
            });
            //     } else {
            //         this.$message.error('请完善信息');
            //         return false;
            //     }
            // });
        },
        submitForm(formName) {
            var self = this;
            if (vm.ruleForm.clearingFormTime == "" || vm.ruleForm.clearingFormTime == null) {
                var clearingFormTime = "";
            } else {
                var clearingFormTime = vm.ruleForm.clearingFormTime + " 00:00:00"
            }
            if (vm.ruleForm.propagandaCycleStart == "" || vm.ruleForm.propagandaCycleStart == null) {
                var propagandaCycleStart = ""
            } else {
                var propagandaCycleStart = vm.ruleForm.propagandaCycleStart + " 00:00:00"
            }
            if (vm.ruleForm.propagandaCycleEnd == "" || vm.ruleForm.propagandaCycleEnd == null) {
                var propagandaCycleEnd = ""
            } else {
                var propagandaCycleEnd = vm.ruleForm.propagandaCycleEnd + " 00:00:00"
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // vm.ruleForm.checkList = vm.checkList;
                    // vm.btnstatus = true;
                    // vm.btnval = "加载中";
                    // $.ajax({
                    //     type: "POST",
                    //     headers: {
                    //         "token": token
                    //     },
                    //     url: "" + baseURL + "/sys/TeacChannel/channel/save",
                    //     contentType: "application/json",
                    //     data: JSON.stringify({
                    //         channelName: vm.ruleForm.channelName,
                    //         channelType: Number(vm.ruleForm.channelType),
                    //         approachesCooperation: vm.ruleForm
                    //             .approachesCooperation,
                    //         account: vm.ruleForm.account,
                    //         password: vm.ruleForm.password,
                    //         phone: vm.ruleForm.phone,
                    //         dockingPeople: vm.ruleForm.dockingPeople,
                    //         dockingJob: vm.ruleForm.dockingJob,
                    //         clearingFormTime: clearingFormTime,
                    //         propagandaCycleStart: propagandaCycleStart,
                    //         propagandaCycleEnd: propagandaCycleEnd,
                    //         clearingForm: vm.ruleForm.checkList,
                    //         // meansPayments: "[" + vm.ruleForm.meansPayments1 * 1 +
                    //         //     "," + vm.ruleForm.meansPayments2 * 1 + "," + vm
                    //         //     .ruleForm.meansPayments3 * 1 + "," + vm.ruleForm
                    //         //     .meansPayments4 * 1 + "]"
                    //     }),
                    //     success: function (r) {
                    //         if (r.status == 200) {
                    //             self.$message({
                    //                 message: r.body.msg,
                    //                 type: 'success'
                    //             });
                    //             vm.btnstatus = true;
                    //             vm.btnval = "确 定";
                    //             setTimeout(function () {
                    //                 window.history.go(-1);
                    //             }, 1000);
                    //         }
                    //         if (r.status == 400) {
                    //             self.$message({
                    //                 message: r.body.msg,
                    //                 type: 'warning'
                    //             });
                    //             vm.btnstatus = false;
                    //             vm.btnval = "确 定";
                    //         }
                    //         if (r.status == 500) {
                    //             self.$message({
                    //                 message: r.body.msg,
                    //                 type: 'warning'
                    //             });
                    //             vm.btnstatus = false;
                    //             vm.btnval = "确 定";
                    //         }
                    //     }
                    // });
                } else {
                    // this.$message.error('请完善信息');
                    // return false;
                }
                vm.ruleForm.checkList = vm.checkList;
                vm.btnstatus = true;
                vm.btnval = "加载中";
                $.ajax({
                    type: "POST",
                    headers: {
                        "token": token
                    },
                    url: "" + baseURL + "/sys/TeacChannel/channel/save",
                    contentType: "application/json",
                    data: JSON.stringify({
                        sex: vm.ruleForm.channelMale,
                        channelName: vm.ruleForm.channelName,
                        channelType: Number(vm.ruleForm.channelType),
                        approachesCooperation: vm.ruleForm
                            .approachesCooperation,
                        account: vm.ruleForm.account,
                        password: vm.ruleForm.password,
                        phone: vm.ruleForm.phone,
                        dockingPeople: vm.ruleForm.dockingPeople,
                        dockingJob: vm.ruleForm.dockingJob,
                        clearingFormTime: clearingFormTime,
                        propagandaCycleStart: propagandaCycleStart,
                        propagandaCycleEnd: propagandaCycleEnd,
                        clearingForm: vm.ruleForm.checkList,
                        // meansPayments: "[" + vm.ruleForm.meansPayments1 * 1 +
                        //     "," + vm.ruleForm.meansPayments2 * 1 + "," + vm
                        //     .ruleForm.meansPayments3 * 1 + "," + vm.ruleForm
                        //     .meansPayments4 * 1 + "]"
                    }),
                    success: function (r) {
                        if (r.status == 200) {
                            self.$message({
                                message: r.body.msg,
                                type: 'success'
                            });
                            vm.btnstatus = true;
                            vm.btnval = "确 定";
                            setTimeout(function () {
                                window.history.go(-1);
                            }, 1000);
                        }
                        if (r.status == 400) {
                            self.$message({
                                message: r.body.msg,
                                type: 'warning'
                            });
                            vm.btnstatus = false;
                            vm.btnval = "确 定";
                        }
                        if (r.status == 500) {
                            self.$message({
                                message: r.body.msg,
                                type: 'warning'
                            });
                            vm.btnstatus = false;
                            vm.btnval = "确 定";
                        }
                    }
                });
            });
        },
    }
});