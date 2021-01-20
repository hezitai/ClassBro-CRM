var vm = new Vue({
    el: '#app',
    data() {
        return {
            yes: false,
            no: false,
            error: '',
            color: '',
            btnstatus: false,
            btnval: "确 定",
            show: false,
            toOperIds: '',
            ruleForm: {
                channelId: '',
                countryId: '',
                mobile: '',
                username: '',
                nickName: '',
                specializedName: '',
                password: '',
                professionalIds: [],
                eduBackgroundId: '',
                universityId: '',
                universityName: '',
            },
            professionalCoursesNames: [],
            universitys: [],
            countrys: [],
            eduNames: [],
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
                professionalIds: [{
                    required: true,
                    message: '请选择专业名称',
                    trigger: 'change'
                }, ],
                specializeds: [{
                    required: true,
                    message: '请选择擅长学科',
                    trigger: 'change'
                }, ],
                channelId: [{
                    required: true,
                    message: '请选择渠道',
                    trigger: 'change'
                }, ],
                eduBackgroundId: [{
                    required: true,
                    message: '请选择老师学历',
                    trigger: 'change'
                }, ],
                universityId: [{
                    required: true,
                    message: '请选择大学',
                    trigger: 'change'
                }, ],
                countryId: [{
                    required: true,
                    message: '请选择国家',
                    trigger: 'change'
                }],
                sex: [{
                    required: true,
                    message: '请选择性别',
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
        this.getSysUserNames()
    },
    methods: {
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
        back: function () {
            window.history.go(-1);
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
        change_country(val) {
            vm.ruleForm.university = "";
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
            // vm.ruleForm.universityId = obj.id;
            vm.ruleForm.universityName = obj.name;
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
        result() {
            vm.iftrue();
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
        // change_professionalCourse(val){
        //   vm.professionalCoursesName = val;
        // },
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
        submitForm(formName) {
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
                        url: "" + baseURL + "/sys/teacherchannel/saveTeac",
                        contentType: "application/json",
                        data: JSON.stringify(vm.ruleForm),
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
                } else {
                    this.$message.error('请完善信息');
                    return false;
                }
            });
        },
    }
});