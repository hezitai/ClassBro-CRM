var vm = new Vue({
    el: '#app',
    data() {
        return {
            // ruleForm: {
            //   domains: [{
            //     content: '',
            //     snType: '0',
            //   }],
            // },
            eduNames: '',
            yes: false,
            no: false,
            error: '',
            color: '',
            data: [],
            btnstatus: false,
            btnval: "生成教师账号",
            dw: false,
            show: false,
            ruleForm: {
                username: '',
                university: '',
                gread: '',
                hourlyWage: 10,
                specializedName: '',
                type: "1",
                rate1: '',
                rate2: '',
                rate3: '',
                domains: [{
                    content: null,
                    snType: null,
                    snLabel: null,
                }],
            },
            mobileCode: '',
            professionalCourses: '',
            activeName: 'first',
            countrys: '',
            universitys: '',
            showa: false,
            showb: true,
            showc: true,
            id: '',
            name: '',
            specializedss: '',
            specializeds: '',
            professionalCoursesName: '',
            professionalCoursesNames: '',
            rules: {
                nickName: [{
                    required: true,
                    message: '请输入教师昵称',
                    trigger: 'blur'
                }, ],
                username: [{
                    required: true,
                    message: '请输入教师姓名',
                    trigger: 'blur'
                }, ],
                mobile: [{
                    required: true,
                    message: '请输入教师手机号',
                    trigger: 'blur'
                }, ],
                password: [{
                    required: true,
                    message: '请输入教师密码',
                    trigger: 'blur'
                }, ],
                coachingSkills: [{
                    required: true,
                    message: '请输入教师辅导技巧',
                    trigger: 'change'
                }, ],
                proKnowledge: [{
                    required: true,
                    message: '请输入专业知识评级',
                    trigger: 'change'
                }, ],
                workingAttitude: [{
                    required: true,
                    message: '请输入工作态度评级',
                    trigger: 'change'
                }, ],
                jobSpecification: [{
                    required: true,
                    message: '请输入工作规范评级',
                    trigger: 'change'
                }, ],
                professionalCourses: [{
                    required: true,
                    message: '请选择专业名称',
                    trigger: 'change'
                }, ],
                specializeds: [{
                    required: true,
                    message: '请选择擅长学科',
                    trigger: 'change'
                }, ],
                specializedName: [{
                    required: true,
                    message: '请选择擅长学科',
                    trigger: 'change'
                }, ],
                type: [{
                    required: true,
                    message: '请选择老师类型',
                    trigger: 'change'
                }, ],
                eduName: [{
                    required: true,
                    message: '请选择老师学历',
                    trigger: 'change'
                }, ],
                universityName: [{
                    required: true,
                    message: '请选择大学',
                    trigger: 'change'
                }, ],
                country: [{
                    required: true,
                    message: '请选择国家',
                    trigger: 'change'
                }]
            }
        };
    },
    mounted() {
        this.getcountry();
        this.getprofessionalCoursesName();
        this.getspecializeds();
        this.geteduNames();
    },
    methods: {
        add() {
            $("#content").append(
                "<el-form-item label='content' prop='content'><el-input v-model='ruleForm.content'></el-input></el-form-item>"
            )
        },
        getcountry() {
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
                    vm.ruleForm.teachingExperience = Math.floor(Math.random() * 11 + 10);
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
        change_gread(val) {
            if (val == 1) {
                vm.ruleForm.hourlyWage = 100;
            }
            if (val == 2) {
                vm.ruleForm.hourlyWage = 120;
            }
            if (val == 3) {
                vm.ruleForm.hourlyWage = 150;
            }
        },
        change_country(val) {
            vm.$refs.ruleForm.model.university = "";
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
        change_university(val) {
            let obj = {};
            obj = this.universitys.find((item) => {
                return item.id === val;
            });
            vm.universityId = obj.id;
            vm.universityName = obj.name;
        },

        getuniversity() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/basedata/university/list",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                success: function (r) {
                    vm.universitys = r.body.list;
                }
            });
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
                            vm.ifis = true;
                            vm.userId = json.body.studUserRVO.userId;
                            vm.mobile_show = false;
                            vm.$refs.ruleForm.model.nickName = json.body.studUserRVO.nickName;
                            vm.ruleForm.countryId = json.body.studUserRVO.countryId;
                            vm.countryId = json.body.studUserRVO.countryId;
                            vm.$refs.ruleForm.model.wxAccount = json.body.studUserRVO.wxAccount;
                            vm.ruleForm.universityId = json.body.studUserRVO.universityId;
                            vm.ruleForm.levelId = json.body.studUserRVO.eduId;
                            vm.ruleForm.schoolYear = "" + json.body.studUserRVO.schoolYear + "";
                            vm.ruleForm.professionalId = json.body.studUserRVO.professionalId;
                            vm.error = "该手机号已被学生注册，请更换手机号";
                            vm.color = 'red';
                        }
                        if (json.body.teacUserRVO != null) {
                            vm.ifis = false;
                            vm.color = 'red';
                            vm.error = "该账号已经被老师注册，请更换手机号";
                            vm.ruleForm.nickName = "";
                            vm.ruleForm.wxAccount = "";
                            vm.ruleForm.countryId = "";
                            vm.ruleForm.universityId = "";
                            vm.ruleForm.levelId = "";
                            vm.ruleForm.schoolYear = "";
                            vm.ruleForm.professionalId = "";
                        }
                        if (json.body.sysUserEntity != null) {
                            vm.ifis = false;
                            vm.color = 'red';
                            vm.error = "该账号已经在CRM注册，请更换手机号";
                            vm.ruleForm.nickName = "";
                            vm.ruleForm.wxAccount = "";
                            vm.ruleForm.countryId = "";
                            vm.ruleForm.universityId = "";
                            vm.ruleForm.levelId = "";
                            vm.ruleForm.schoolYear = "";
                            vm.ruleForm.professionalId = "";
                        }
                        if (json.body.studUserRVO == null && json.body.sysUserEntity == null &&
                            json.body.teacUserRVO == null) {
                            vm.ifis = false;
                            vm.mobile_show = true;
                            vm.error = "该账号未被注册";
                            vm.color = 'green';
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
        change_professionalCourse(val) {
            vm.professionalCoursesName = val;
        },
        change_specializeds(val) {
            vm.specializeds = val;
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
        getspecializeds() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/basedata/specialtyCourses/list",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                success: function (r) {
                    vm.specializedss = r.body.list;
                }
            });
        },
        next() {
            vm.showa = true;
            vm.showb = false;
            vm.showc = true;
            vm.activeName = 'second';
        },
        next1() {
            vm.showa = true;
            vm.showb = true;
            vm.showc = false;
            vm.activeName = 'testlist';
        },
        submitForm(formName) {
            console.log(vm.ruleForm.domains)
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    var coachingSkills = Number(this.$refs.ruleForm.model.coachingSkills);
                    var proKnowledge = Number(this.$refs.ruleForm.model.proKnowledge);
                    var workingAttitude = Number(this.$refs.ruleForm.model.workingAttitude);
                    var jobSpecification = Number(this.$refs.ruleForm.model.jobSpecification);
                    var eduName = Number(this.$refs.ruleForm.model.eduName);
                    var type = Number(this.$refs.ruleForm.model.type);
                    var hourlyWage = Number(this.$refs.ruleForm.model.hourlyWage);
                    if (this.$refs.ruleForm.model.grade == undefined) {
                        grade = null;
                    } else {
                        grade = Number(this.$refs.ruleForm.model.grade);
                    }
                    var teachingExperience = Number(this.$refs.ruleForm.model.teachingExperience);
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "/sys/train/saveTeac",
                        contentType: "application/json",
                        data: JSON.stringify({
                            trainTeacNames: ["" + vm.ruleForm.rate1 + "", "" + vm
                                .ruleForm.rate2 + "", "" + vm.ruleForm.rate3 +
                                ""
                            ],
                            username: this.$refs.ruleForm.model.username,
                            nickName: this.$refs.ruleForm.model.nickName,
                            password: this.$refs.ruleForm.model.password,
                            mobile: this.$refs.ruleForm.model.mobile,
                            sex: this.$refs.ruleForm.model.sex,
                            birthday: this.$refs.ruleForm.model.birthday,
                            universityId: vm.universityId,
                            universityName: vm.universityName,
                            professionalIds: vm.professionalCoursesName,
                            eduBackgroundId: eduName,
                            countryId: this.$refs.ruleForm.model.country,
                            // specializedIds:vm.specializeds,
                            specializedName: vm.ruleForm.specializedName,
                            wxAccount: this.$refs.ruleForm.model.wxAccount,
                            email: this.$refs.ruleForm.model.wxAccount,
                            hourlyWage: 10,
                            teachingExperience: this.$refs.ruleForm.model
                                .teachingExperience,
                            presenterTimeLimit: this.$refs.ruleForm.model
                                .presenterTimeLimit,
                            maxLootNum: this.$refs.ruleForm.model.maxLootNum,
                            type: type,
                            grade: grade,
                            teacRate: {
                                coachingSkills: coachingSkills,
                                proKnowledge: proKnowledge,
                                workingAttitude: workingAttitude,
                                jobSpecification: jobSpecification,
                            },
                            teacSmallSnitchs: this.ruleForm.domains,
                            mobileCode: this.mobileCode,
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
                                    window.location.reload();
                                }, 1500);
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
                    this.$message.error('请完善信息');
                    return false;
                }
            });
        },
        change(value) {
            if (value == 1) {
                vm.show = false;
                vm.ruleForm.hourlyWage = 10;
                vm.dw = false;
            } else {
                vm.show = true;
                vm.ruleForm.hourlyWage = "";
                vm.dw = true;
            }
        },
        handleClick(tab, first) {
            var val = tab.index;
            if (val == 0) {
                vm.showa = false;
                vm.showb = true;
                vm.showc = true;
            }
            if (val == 1) {
                vm.showa = true;
                vm.showb = false;
                vm.showc = true;
            }
            if (val == 2) {
                vm.showa = true;
                vm.showb = true;
                vm.showc = false;
            }
        },
        // submitForm(formName) {
        //         this.$refs[formName].validate((valid) => {
        //           if (valid) {
        //             console.log(vm.ruleForm.domains)
        //           } else {
        //             console.log('error submit!!');
        //             return false;
        //           }
        //         });
        //       },
        removeDomain(item) {
            var index = this.ruleForm.domains.indexOf(item)
            if (index !== -1) {
                this.ruleForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.ruleForm.domains.push({
                content: '',
                snType: '',
                snLabel: '',
            });
        }
    }
});
$("#del").click();