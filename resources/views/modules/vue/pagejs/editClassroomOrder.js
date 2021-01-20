var vm = new Vue({
    el: '#app',
    data() {
        return {
            showBigClassInfo:true,
            countryName: '',
            studName: '',
            mobile: '',
            universityName: '',
            studId: null,
            index: '',
            classrooms: [],
            currency: '',
            number: 1,
            btnval: "续课",
            btnstatus: false,
            btnvallession: "添加课堂",
            btnstatusession: false,
            universitys: '',
            countrys: '',
            disabled: false,
            university: false,
            tip: '',
            error: false,
            success: false,
            color: '',
            studPreferentialPolicies: '',
            ruleForm: {
                mobile: '',
                username: '',
                classCourseCountryId: '',
                classCourseUniversityId: '',
                preferentialPolicId: '',
                name: null,
                domains: [{
                    checked: false,
                    preferentialPolicId: null,
                    preferentialPolicRemark: null,
                    entered: null,
                }],
            },
            rules: {
                // mobile: [
                //   { required: true, message: '请填写班课名称', trigger: 'blur' }
                // ],
                // username: [
                //   { required: true, message: '请填写课程代码', trigger: 'blur' }
                // ],
                // classCourseCountryId: [
                //   { required: true, message: '请选择班课国家', trigger: 'change' }
                // ],
                // classCourseUniversityId: [
                //   { required: true, message: '请选择班课学校', trigger: 'change' }
                // ],
                // descriptions: [
                //   { required: true, message: '请填写课堂描述', trigger: 'blur' }
                // ],
            }
        }
    },

    mounted() {
        this.getcountrys();
        this.getUniversity();
        // this.getLession();
        this.getstudPreferentialPolicies();
    },
    methods: {
        getLession() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var ids = getUrlStr("ids");
            var a;
            if (id == '') {
                a = JSON.parse(ids)[0]
            } else {
                a = id
            }
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "courseId": a,
                    "page": 1,
                    "limit": 1000,
                    "status": 63,
                    "studId": this.studId,
                },
                url: "" + baseURL + "/sys/seller/classcourse/queryClassroomList",
                success: function (json) {
                    vm.ruleForm.domains = json.body;
                }
            });
        },
        changePrice(item) {
            vm.studPreferentialPolicies.forEach(function (items, index) {
                if (items.id == item.preferentialPolicId) {
                    var as = items.preferential.split("折")
                    item.realRoomCost = (Number(as[0]) / 10 * Number(item.roomCost)).toFixed(2) + item.currency
                }
            })
        },
        saveClass(formName) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var ids = getUrlStr("ids");
            var a;
            var data = [];
            if (id == '') {
                vm.btnstatus = true;
                this.ruleForm.domains.forEach(function (item, index) {
                    var obj = {};
                    if (item.checked == true) {
                        obj.classroomId = item.id;
                        if (item.preferentialPolicId == undefined) {
                            item.preferentialPolicId = null
                        }
                        if (item.preferentialPolicRemark == undefined) {
                            item.preferentialPolicRemark = null
                        }
                        obj.preferentialPolicId = item.preferentialPolicId;
                        obj.preferentialPolicRemark = item.preferentialPolicRemark;
                        // obj.decimalPreferRoomCost = item.decimalPreferRoomCost
                        data.push(obj)
                    }
                });
                a = JSON.parse(ids)[0];
                var bbb = JSON.parse(ids);
                for (var i in bbb) {
                    bbb[i] = bbb[i] * 1;
                }
                $.ajax({
                    url: "" + baseURL + "sys/seller/classcourse/continueClassBatch",
                    type: "POST",
                    headers: {
                        "token": token
                    },
                    contentType: "application/json",
                    data: JSON.stringify({
                        courseIds: bbb,
                        classrooms: data,
                    }),
                    success: function (r) {
                        if (r.status == 200) {
                            vm.$message({
                                message: r.body.msg,
                                type: 'success',
                            });
                            vm.addModel = false;
                            vm.btnstatus = false;
                            // vm.btnval = "修改订单";
                            // vm.getLession();
                            setTimeout(function () {
                                window.history.back(-1);
                            }, 1500);
                        }
                        if (r.status == 400) {
                            vm.$message({
                                message: r.body.msg,
                                type: 'warning',
                            });
                            vm.btnstatus = false;
                            // vm.btnval = "修改订单";
                        }
                    },
                    error: function (er) {

                    }
                })
            } else {
                vm.btnval = "续课";
                a = id;
                this.ruleForm.domains.forEach(function (item, index) {
                    var obj = {};
                    if (item.checked == true) {
                        obj.classroomId = item.id;
                        if (item.preferentialPolicId == undefined) {
                            item.preferentialPolicId = null
                        }
                        if (item.preferentialPolicRemark == undefined) {
                            item.preferentialPolicRemark = null
                        }
                        obj.preferentialPolicId = item.preferentialPolicId;
                        obj.preferentialPolicRemark = item.preferentialPolicRemark;
                        data.push(obj)
                    }
                });
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.btnstatus = true;
                        vm.btnval = "加载中";
                        $.ajax({
                            type: "POST",
                            headers: {
                                "token": token
                            },
                            url: "" + baseURL + "sys/seller/classcourse/continueClass",
                            contentType: "application/json",
                            data: JSON.stringify({
                                courseId: a,
                                classrooms: data,
                            }),
                            success: function (r) {
                                if (r.status == 200) {
                                    vm.$message({
                                        message: r.body.msg,
                                        type: 'success',
                                    });
                                    vm.addModel = false;
                                    vm.btnstatus = false;
                                    // vm.btnval = "修改订单";
                                    vm.getLession();
                                    setTimeout(function () {
                                        window.history.back(-1);
                                    }, 1500);
                                }
                                if (r.status == 400) {
                                    vm.$message({
                                        message: r.body.msg,
                                        type: 'warning',
                                    });
                                    vm.btnstatus = false;
                                    // vm.btnval = "修改订单";
                                }
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }

        },

        checkSelectable(row, index) {
            return row.name !== "测试课堂"
        },
        handleSelectionChange(val) {

        },
        back() {
            window.history.back(-1);
        },
        iftrue() {
            if (vm.ruleForm.mobile == "") {
                return
            }
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "absoluteMobile": vm.ruleForm.mobile,
                    "page": 1,
                    "limit": 100000,
                },
                url: "" + baseURL + "/sys/seller/order/checkMobile",
                success: function (json) {
                    if (json.status == 200) {
                        if (json.body.studUserRVO == null) {
                            vm.error = "";
                            vm.success = false;
                            vm.error = false;
                        } else {
                            vm.ruleForm.classCourseUniversityId = json.body.studUserRVO
                                .universityId;
                            vm.ruleForm.username = json.body.studUserRVO.nickName;
                            vm.ruleForm.classCourseCountryId = json.body.studUserRVO.countryId;
                            vm.success = true;
                            vm.error = false;
                            vm.tip = "该学生已注册，你现在可以直接给TA下单啦";
                            vm.color = 'green';
                            if (json.body.studUserRVO.universityId == null) {
                                vm.university = false;
                            } else {
                                vm.university = true;
                            }
                            vm.studId = json.body.userId;
                            vm.disabled = true;
                            vm.getLession();
                        }
                        if (json.body.teacUserRVO != null) {
                            vm.success = false;
                            vm.error = true;
                            vm.color = 'red';
                            vm.tip = "该账号已经被老师注册，请更换手机号";
                            vm.disabled = true;
                            vm.university = true;
                        }
                        if (json.body.sysUserEntity != null) {
                            vm.success = false;
                            vm.error = true;
                            vm.color = 'red';
                            vm.tip = "该账号已经在CRM注册，请更换手机号";
                            vm.disabled = true;
                            vm.university = true;
                        }
                        if (json.body.studUserRVO == null && json.body.sysUserEntity == null &&
                            json.body.teacUserRVO == null) {
                            vm.ruleForm.classCourseUniversityId = null;
                            vm.ruleForm.username = null;
                            vm.ruleForm.classCourseCountryId = null;
                            vm.success = false;
                            vm.error = true;
                            vm.tip = "该账号未被注册";
                            vm.color = 'green';
                            vm.disabled = false;
                            vm.university = false;
                            vm.studId = null;
                            vm.getLession();
                        }
                    }
                    if (json.status == 400) {
                        vm.$message({
                            type: 'warning',
                            message: json.body.msg
                        });
                    }
                }
            });
        },
        getUniversity(val) {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "countryId": val
                },
                url: "" + baseURL + "sys/basedata/university/list",
                success: function (json) {
                    vm.universitys = json.body.list;
                }
            });
        },
        getstudPreferentialPolicies() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var ids = getUrlStr("ids");
            var a;
            if (id == '') {
                a = JSON.parse(ids)[0];
                this.showBigClassInfo = false;
                // vm.ruleForm.domains.entered = true;
            } else {
                a = id
            }
            $.ajax({
                type: "get",
                dataType: "json",
                url: "" + baseURL + "/sys/seller/classcourse/getCourseObject",
                data: {
                    "id": a
                },
                success: function (json) {
                    vm.countryName = json.body.countryName;
                    vm.studName = json.body.callName;
                    vm.mobile = json.body.mobile;
                    vm.universityName = json.body.universityName;
                    if (json.body.studPreferentialPolicies != "") {
                        json.body.studPreferentialPolicies.map(function (item) {
                            item.preferential = item.preferential + "折"
                        });
                        vm.studPreferentialPolicies = json.body.studPreferentialPolicies;
                        vm.ruleForm.domains = json.body.classroomList;
                        vm.ruleForm.domains.map(function (item) {
                            item.preferentialPolicId = item.preferId;
                            item.preferentialPolicRemark = item.preferDescription;
                        });
                        console.log(vm.ruleForm.domains)
                    } else {
                        vm.studPreferentialPolicies = json.body.studPreferentialPolicies;
                        vm.ruleForm.domains = json.body.classroomList;
                        vm.ruleForm.domains.map(function (item) {
                            item.preferentialPolicId = item.preferId;
                            item.preferentialPolicRemark = item.preferDescription;
                        });
                    };
                    if (id == '') {
                        for (var i in vm.ruleForm.domains) {
                            vm.ruleForm.domains[i].entered = false;
                        }
                        vm.btnval = "批量续课";
                    } else {

                    }
                }
            });
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
        removeDomain(item) {

        },
    },
});