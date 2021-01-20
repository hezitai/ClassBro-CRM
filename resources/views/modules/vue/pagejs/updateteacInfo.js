var vm = new Vue({
    el: '#app',
    data() {
        return {
            disstatus: false,
            toOperIds: '',
            teachers: '',
            eduNames: '',
            professionalCoursesNames: '',
            universitys: '',
            countrys: '',
            activeName: 'first',
            istrue: false,
            showa: true,
            showb: false,
            showc: false,
            showd: false,
            ruleForm: {
                mobileCode: '',
                channelId: '',
                rank: '',
                initialEvaluate: '',
                reexamineEvaluate: '',
                universityName: '',
                password: '',
                mobile: '',
                nickName: '',
                specializeds: '',
                professionalCourses: '',
                username: '',
                sex: '',
                birthday: '',
                eduName: '',
                type: '',
                grade: '',
                country: '',
                coachingSkills: '',
                content: '',
                snType: '',
                snLabel: '',
                operName: '',
                domains: [{
                    content: '',
                    snType: '0',
                    snLabel: '',
                    operName: '',
                }],
            },
            rules: {
                content: [{
                    required: true,
                    message: '请输入小报告描述',
                    trigger: 'blur'
                }],
                snLabel: [{
                    required: true,
                    message: '请输入小报告标题',
                    trigger: 'blur'
                }],
                snType: [{
                    required: true,
                    message: '请选择小报告评论',
                    trigger: 'change'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
        this.teacinfo();
        this.change_country();
        this.geteduNames();
        this.getprofessionalCoursesName();
        this.change_university();
        this.getSysUserNames();
    },
    methods: {
        teacinfo() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var update = getUrlStr("update");

            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "sys/train/teacInfo/" + id + "",
                success: function (json) {
                    if (update == "true") {
                        vm.disstatus = true;
                    } else {
                        vm.disstatus = false;
                    }

                    var detail = json.body;
                    // vm.change_university(row.countryId);
                    vm.ruleForm.channelId = detail.channelId;
                    vm.ruleForm.country = detail.countryId;
                    vm.ruleForm.mobileCode = detail.mobileCode;
                    vm.$refs.ruleForm.model.username = detail.username;
                    vm.$refs.ruleForm.model.nickName = detail.nickName;
                    vm.$refs.ruleForm.model.sex = detail.sex;
                    vm.$refs.ruleForm.model.hourlyWage = detail.hourlyWage;
                    vm.$refs.ruleForm.model.birthday = detail.birthday;
                    vm.$refs.ruleForm.model.wxAccount = detail.wxAccount;
                    vm.$refs.ruleForm.model.mobile = detail.mobile;
                    vm.$refs.ruleForm.model.email = detail.email;
                    vm.$refs.ruleForm.model.universityName = detail.universityId;
                    vm.ruleForm.professionalCourses = detail.professionalIds;
                    vm.ruleForm.specializeds = detail.specializeds;
                    vm.$refs.ruleForm.model.eduName = detail.eduBackgroundId;
                    vm.$refs.ruleForm.model.description = detail.description;
                    vm.$refs.ruleForm.model.presenterTimeLimit = detail.presenterTimeLimit;
                    vm.$refs.ruleForm.model.maxLootNum = detail.maxLootNum;
                    vm.$refs.ruleForm.model.teachingExperience = detail.teachingExperience;
                    vm.$refs.ruleForm.model.type = "" + detail.type + "";
                    vm.$refs.ruleForm.model.grade = "" + detail.grade + "";
                    vm.ruleForm.initialEvaluate = detail.initialEvaluate;
                    vm.ruleForm.reexamineEvaluate = detail.reexamineEvaluate;
                    vm.ruleForm.rank = "" + detail.rank + "";
                    if (detail.trainTeacList.length == 2) {
                        vm.ruleForm.rate1 = detail.trainTeacList[0].evaluate;
                        vm.ruleForm.rate2 = detail.trainTeacList[1].evaluate;
                    }
                    if (detail.trainTeacList.length == 1) {
                        vm.ruleForm.rate1 = detail.trainTeacList[0].evaluate;
                    }
                    if (detail.type == 1) {
                        vm.teachers = false;
                    } else {
                        vm.teachers = true;
                    }
                }
            });
        },
        change_country() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/basedata/country/list",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                success: function (r) {
                    vm.countrys = r.body.list;
                }
            });
        },
        getSysUserNames() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                },
                url: "" + baseURL + "/sys/TeacChannel/channel/list",
                success: function (json) {
                    vm.toOperIds = json.body.list;
                }
            });
        },
        change_university(val) {
            // vm.ruleForm.universityName = "";
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/basedata/university/list",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "countryId": val
                },
                success: function (r) {
                    vm.universitys = r.body.list;
                }
            });
        },
        geteduNames() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/basedata/edubackground/list",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                success: function (r) {
                    vm.eduNames = r.body.list;
                }
            });
        },
        getprofessionalCoursesName() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/basedata/professionalCourses/list",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                success: function (r) {
                    vm.professionalCoursesNames = r.body.list;
                }
            });
        },
        handleClick(tab, first) {
            var val = tab.index;
            console.log(val);
            if (val == 0) {
                vm.showa = true;
                vm.showc = false;
                vm.showd = false;
            } else if (val == 1) {
                vm.showa = false;
                vm.showc = true;
                vm.showd = false;
            } else {
                vm.showa = false;
                vm.showc = false;
                vm.showd = true;
            }
        },
        change(value) {
            if (value == 1) {
                vm.teachers = false;
            } else {
                vm.teachers = true;
            }
        },
        change_professionalCourse(val) {
            vm.professionalCoursesName = val;
        },
        back() {
            window.history.back();
        },
        update(formName) {
            console.log(this.ruleForm);
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "/sys/train/updateTeacher",
                        contentType: "application/json",
                        data: JSON.stringify({
                            trainTeacNames: ["" + this.$refs.ruleForm.model.rate1 +
                                "", "" + this.$refs.ruleForm.model.rate2 + ""
                            ],
                            id: id,
                            countryId: this.$refs.ruleForm.model.country,
                            username: this.$refs.ruleForm.model.username,
                            mobile: this.$refs.ruleForm.model.mobile,
                            nickName: this.$refs.ruleForm.model.nickName,
                            sex: this.$refs.ruleForm.model.sex,
                            birthday: this.$refs.ruleForm.model.birthday,
                            universityId: vm.ruleForm.universityName,
                            universityName: vm.universityName,
                            professionalIds: this.$refs.ruleForm.model
                                .professionalCourses,
                            specializedName: this.$refs.ruleForm.model.specializeds,
                            wxAccount: this.$refs.ruleForm.model.wxAccount,
                            email: this.$refs.ruleForm.model.email,
                            channelId: this.$refs.ruleForm.model.channelId,
                            mobileCode: this.ruleForm.mobileCode,
                            initialEvaluate: this.$refs.ruleForm.model
                                .initialEvaluate,
                            reexamineEvaluate: this.$refs.ruleForm.model
                                .reexamineEvaluate,
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                self.$message({
                                    message: r.body.msg,
                                    type: 'success'
                                });
                                //   setTimeout(function() { 
                                //   window.history.back();
                                // }, 1000);
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
});