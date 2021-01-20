var vm = new Vue({
    el: '#app',
    data() {
        return {
            isTax: true,
            id: '',
            del_model: false,
            istrue: true,
            text: "禁用/解禁",
            teacId: '',
            passwordmodel: false,
            smallmodel: false,
            view_model: false,
            eduNames: '',
            btnstatus: false,
            btnval: "确 定",
            teachers: false,
            professionalCoursesNames: '',
            professionalCourses: '',
            tableDataBegin: [],
            activeName: 'first',
            showa: true,
            showb: false,
            showc: false,
            showd: false,
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            detail: true,
            total: 0,
            filterTableDataEnd: [],
            dialogFormVisible2: false,
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            key: '',
            val: 1,
            limit: 15,
            page: "",
            name: '',
            superId: '',
            countrys: '',
            universitys: '',
            label: '',
            dialogStatus: "",
            specializedss: '',
            specializeds: '',
            levels: [{
                    label: "全部",
                    value: "0,1,2,3",
                },
                {
                    label: "S级别",
                    value: "0",
                },
                {
                    label: "A级别",
                    value: "1",
                },
                {
                    label: "B级别",
                    value: "2",
                },
                {
                    label: "C级别",
                    value: "3",
                }
            ],
            tudStatuseds: [{
                    label: "全部",
                    value: "4,6,10",
                },
                {
                    label: "待培训1",
                    value: "4",
                },
                {
                    label: "待培训2",
                    value: "6",
                },
                {
                    label: "工作中",
                    value: "10",
                }
                // {
                //   label:"全部",
                //   value:"0,1,2,3,4,5,6,7,8,9,10",
                // },
                // {
                //   label:"待推荐",
                //   value:"0",
                // },
                // {
                //   label:"待初试",
                //   value:"1",
                // },
                // {
                //   label:"初试通过，待复试",
                //   value:"2",
                // },
                // {
                //   label:"初试被拒",
                //   value:"3",
                // },
                // {
                //   label:"复试通过，待培训",
                //   value:"4",
                // },
                // {
                //   label:"复试被拒",
                //   value:"5",
                // },
                // {
                //   label:"工作规范培训合格",
                //   value:"6",
                // },
                // {
                //   label:"工作规范培训不合格",
                //   value:"7",
                // },
                // {
                //   label:"辅导技巧培训合格",
                //   value:"8",
                // },
                // {
                //   label:"辅导技巧培训不合格",
                //   value:"9",
                // },
                // {
                //   label:"工作中",
                //   value:"10",
                // }
            ],
            ruleForm: {
                mobileCode: '',
                remark: '',
                level: '0',
                tudStatused: "10",
                rank: '',
                rate1: '',
                rate2: '',
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
                proKnowledge: '',
                workingAttitude: '',
                jobSpecification: '',
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
                }],
                remark: [{
                    required: true,
                    message: '请输入理由',
                    trigger: 'blur'
                }],
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.getspecializeds();
        this.getprofessionalCoursesName();
        this.change_country();
        this.geteduNames();
        // this.hasPermission();
        this.view_detail(JSON.parse(localStorage.getItem('teacherlist')));
    },
    methods: {
        search() {
            vm.val = 1;
            vm.getTableData();
        },
        changeGradeEvent: function (val) {
            if (val == 1) {
                this.ruleForm.hourlyWage = 10;
            } else if (val == 2) {
                this.ruleForm.hourlyWage = 12;
            } else if (val == 3) {
                this.ruleForm.hourlyWage = 15;
            }
        },
        change_Typeed(value) {
            if (value == 1) {
                vm.teachers = false;
                this.ruleForm.hourlyWage = 10;
            } else {
                vm.teachers = true;
                if (this.ruleForm.grade == 1) {
                    this.ruleForm.hourlyWage = 10;
                } else if (this.ruleForm.grade == 2) {
                    this.ruleForm.hourlyWage = 12;
                } else if (this.ruleForm.grade == 3) {
                    this.ruleForm.hourlyWage = 15;
                }
            }
        },
        formatSex(row, column) {
            if (row.teacSmallSnitchsExt != "") {
                row.teacSmallSnitchsExt.forEach(element => {
                    if (element.snType == 1) {
                        return "男"
                    } else {
                        return "女"
                    }
                })
                //         return row.grade == 1 ? "男" : row.grade == 2 ? "女" : "aaa";
            }
        },
        setStudScreen(row, index) {
            var self = this;
            self.$confirm('是否要执行此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": localStorage.getItem("token"),
                            "teacId": row.id,
                        },
                        url: "" + baseURL + "/sys/oper/setTeacScreenRecordedInvalidation",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                        }
                    });
                })
        },
        // hasPermission(permission) {
        //     if (window.parent.permissions.indexOf(permission) > -1) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
        view_teacSyllabus(row, index) {
            window.location.href = "teacSyllabus.html?id=" + row.id + "";
        },
        repassword(row, index) {
            vm.teacId = row.id;
            vm.passwordmodel = true;
        },
        change_spoTypeArr(val) {
            vm.val = 1;
            vm.getTableData();
        },
        downfile1(row, index) {
            window.open(row.report);
        },
        changepassword(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true,
                        vm.btnval = "加载中",
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            headers: {
                                "token": token
                            },
                            data: {
                                teacId: vm.teacId,
                                password: vm.ruleForm.password
                            },
                            url: "" + baseURL + "/sys/oper/resetTeacPws",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false,
                                        vm.btnval = "确定",
                                        vm.passwordmodel = false;
                                    vm.getTableData();
                                }
                                if (json.status == 400) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确定";
                                }
                            }
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleClick(tab, first) {
            var val = tab.index;
            if (val == 0) {
                vm.showa = true;
                vm.showb = false;
                vm.showc = false;
                vm.showd = false;
            } else if (val == 1) {
                vm.showa = false;
                vm.showb = true;
                vm.showc = false;
                vm.showd = false;
            } else if (val == 2) {
                vm.showa = false;
                vm.showb = false;
                vm.showc = true;
                vm.showd = false;
            } else {
                vm.showa = false;
                vm.showb = false;
                vm.showc = false;
                vm.showd = true;
            }
        },
        rowClass({
            row
        }) {
            if (row.statused === 3) {
                return 'color1'
            }
        },
        back() {
            location.reload();
        },
        adddate(item) {
            var content = item.content;
            var snType = item.snType;
            var snLabel = item.snLabel;
            $.ajax({
                type: "post",
                dataType: "json",
                data: {
                    "taecId": vm.id,
                    "content": content,
                    "snType": snType,
                    "snLabel": snLabel
                },
                url: "" + baseURL + "sys/oper/smallSnitch/save",
                success: function (json) {
                    if (json.status == "200") {
                        vm.$message({
                            message: json.body.msg,
                            type: 'success',
                            duration: 1000
                        });
                        vm.getteacsmall();
                    }
                    if (json.status == "400") {
                        vm.$message({
                            message: json.body.msg,
                            type: 'wanring',
                            duration: 1000
                        });
                    }
                }
            });
        },
        change_level(val) {
            this.ruleForm.level = val;
            this.getTableData();
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
        change_university(val) {
            vm.ruleForm.universityName = "";
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
        change_specializeds(val) {
            vm.specializeds = val;
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
        getTableData: function () {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": this.limit,
                    "key": this.tableDataName,
                    "tudStatused": this.ruleForm.tudStatused,
                    "rank": this.ruleForm.level,
                    "teacType": 3
                },
                url: "" + baseURL + "sys/oper/teacList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            vm.getTableData();
            this.handleCurrentChange(this.currentPage);
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
        change_professionalCourse(val) {
            vm.professionalCoursesName = val;
        },
        handleChange(item) {},
        getteacsmall() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/oper/smallSnitch/list",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "teacId": vm.id
                },
                success: function (r) {
                    vm.ruleForm.domains = r.body.list;
                    r.body.list.map(function (item, index) {
                        vm.ruleForm.domains[index].snType = "" + item.snType + "";
                    })
                }
            });
        },
        view_detail(row, index) {
            // if (row.type == 1) {
            //     vm.istrue = false
            //     $("#tab-seconds").css("display", "none")
            // } else {
            //     vm.istrue = true
            // }
            this.id = row.id;
            // vm.getteacsmall();
            // vm.detail = false;
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "sys/train/teacInfo/" + this.id + "",
                success: function (json) {
                    var detail = json.body;
                    vm.isTax = json.body.taxesed;
                    vm.change_university(row.countryId);
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
                    if (detail.type == 1) {
                        vm.teachers = false;
                    } else {
                        vm.teachers = true;
                    }
                    if (detail.trainTeacList.length == 0) {
                        return;
                    }
                    if (detail.trainTeacList.length == 1) {
                        vm.ruleForm.rate1 = detail.trainTeacList[0].evaluate;
                    }
                    if (detail.trainTeacList.length == 2) {
                        vm.ruleForm.rate1 = detail.trainTeacList[0].evaluate;
                        vm.ruleForm.rate2 = detail.trainTeacList[1].evaluate;
                    }
                    if (detail.trainTeacList.length == 3) {
                        vm.ruleForm.rate1 = detail.trainTeacList[0].evaluate;
                        vm.ruleForm.rate2 = detail.trainTeacList[1].evaluate;
                    }
                    // vm.ruleForm.rate1 = detail.trainTeacList[0].evaluate;
                    // vm.ruleForm.rate2 = detail.trainTeacList[1].evaluate;
                }
            });
        },
        update(formName) {
            var self = this;
            console.log(this.$refs.ruleForm.model.specializeds)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var eduName = JSON.parse(this.$refs.ruleForm.model.eduName);
                    var type = JSON.parse(this.$refs.ruleForm.model.type);
                    var hourlyWage = JSON.parse(this.$refs.ruleForm.model.hourlyWage);
                    if (this.$refs.ruleForm.model.grade == "") {
                        var grade = null;
                    } else {
                        var grade = JSON.parse(this.$refs.ruleForm.model.grade);
                    }
                    var teachingExperience = JSON.parse(this.$refs.ruleForm.model
                        .teachingExperience);
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
                            id: vm.id,
                            taxesed: this.isTax,
                            countryId: this.$refs.ruleForm.model.country,
                            username: this.$refs.ruleForm.model.username,
                            password: this.$refs.ruleForm.model.password,
                            mobile: this.$refs.ruleForm.model.mobile,
                            nickName: this.$refs.ruleForm.model.nickName,
                            sex: this.$refs.ruleForm.model.sex,
                            birthday: this.$refs.ruleForm.model.birthday,
                            universityId: vm.ruleForm.universityName,
                            universityName: vm.universityName,
                            professionalIds: this.$refs.ruleForm.model
                                .professionalCourses,
                            eduBackgroundId: eduName,
                            specializedName: this.$refs.ruleForm.model.specializeds,
                            wxAccount: this.$refs.ruleForm.model.wxAccount,
                            email: this.$refs.ruleForm.model.email,
                            hourlyWage: hourlyWage,
                            teachingExperience: this.$refs.ruleForm.model
                                .teachingExperience,
                            presenterTimeLimit: this.$refs.ruleForm.model
                                .presenterTimeLimit,
                            maxLootNum: this.$refs.ruleForm.model.maxLootNum,
                            type: type,
                            grade: grade,
                            rank: Number(this.ruleForm.rank),
                            initialEvaluate: this.$refs.ruleForm.model
                                .initialEvaluate,
                            reexamineEvaluate: this.$refs.ruleForm.model
                                .reexamineEvaluate,
                            mobileCode: this.ruleForm.mobileCode
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                self.$message({
                                    message: r.body.msg,
                                    type: 'success'
                                });
                                setTimeout(function () {
                                    window.location.reload()
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
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        add1(row, index) {
            let a = [];
            a.push("" + row.id + "");
            vm.idss = a;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 100
                },
                url: "" + baseURL + "sys/user/getMyDeptUserList",
                success: function (json) {
                    vm.selects = json.body.list;
                }
            });
            this.dialogFormVisible2 = true;

        },
        add() {
            if (vm.idss == "") {
                this.$message({
                    message: '请选择讲师',
                    type: 'warning',
                    duration: 1000
                });
            } else {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        "token": token,
                        "page": 1,
                        "limit": 100
                    },
                    url: "" + baseURL + "sys/user/getMyDeptUserList",
                    success: function (json) {
                        vm.selects = json.body.list;
                    }
                });
                this.dialogFormVisible2 = true;
            }
        },
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },

        submitForm2(formName) {
            let _this = this;
            var datas = _this.ruleForm;
            var areaId = this.ruleForm.value3;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('确定要更换运营吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        vm.btnstatus = true,
                            vm.btnval = "加载中",
                            $.ajax({
                                type: "post",
                                dataType: "json",
                                cache: false,
                                contentType: "application/json",
                                headers: {
                                    "token": token
                                },
                                data: JSON.stringify({
                                    "operId": this.ruleForm.country,
                                    "teacIds": vm.idss
                                }),
                                url: "" + baseURL + "sys/oper/assignedTeac",
                                success: function (json) {
                                    if (json.status == "200") {
                                        vm.$message({
                                            message: json.body.msg,
                                            type: 'success',
                                            duration: 1000
                                        });
                                        vm.btnstatus = false;
                                        vm.btnval = "确 定"
                                        vm.dialogFormVisible2 = false;
                                        vm.getTableData();
                                    }
                                    if (json.status == "400") {
                                        vm.$message({
                                            message: json.body.msg,
                                            type: 'success',
                                            duration: 1000
                                        });
                                        vm.btnstatus = false;
                                        vm.btnval = "确 定"
                                        vm.dialogFormVisible2 = false;
                                        vm.getTableData();
                                    }
                                }
                            });
                    }).catch(() => {});

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            let ids = [];
            this.multipleSelection.map((item) => {
                var id = item.id;
                ids.push("" + id + "");
            });
            this.selectedIDs = ids;
            console.log('多选', ids);
            this.idss = this.selectedIDs;
            console.log(this.idss);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submit_del(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中"
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        data: {
                            "userId": vm.userId,
                            "remark": vm.ruleForm.remark,
                        },
                        url: "" + baseURL + "/sys/oper/deleteTeacher",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success',
                                    duration: 1000
                                });
                                vm.del_model = false;
                                vm.btnstatus = false;
                                vm.btnval = "确 定"
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'wanring',
                                    duration: 1000
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定"
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        delteacher(row, index) {
            vm.userId = row.id;
            vm.del_model = true;
        },

        forbiddenteacher(row, index) {
            this.$confirm('是否要执行该操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": token,
                            "userId": row.id,
                        },
                        url: "" + baseURL + "/sys/oper/lockTeacher",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                        }
                    });
                })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var self = this;
            this.$confirm('是否要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    var id = item.id;
                    $.ajax({
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify([id]),
                        url: "" + baseURL + "sys/oper/smallSnitch/delete",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success',
                                    duration: 1000
                                });
                                vm.getteacsmall();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'wanring',
                                    duration: 1000
                                });
                            }
                        }
                    });
                })
                .catch(_ => {

                });
        },
        submit(item) {
            var id = item.id;
            var content = item.content;
            var snType = item.snType;
            var snLabel = item.snLabel;
            $.ajax({
                type: "post",
                dataType: "json",
                data: {
                    "id": id,
                    "content": content,
                    "snType": snType,
                    "snLabel": snLabel
                },
                url: "" + baseURL + "sys/oper/smallSnitch/update",
                success: function (json) {
                    if (json.status == "200") {
                        vm.$message({
                            message: json.body.msg,
                            type: 'success',
                            duration: 1000
                        });
                        vm.getteacsmall();
                    }
                    if (json.status == "400") {
                        vm.$message({
                            message: json.body.msg,
                            type: 'wanring',
                            duration: 1000
                        });
                    }
                }
            });
        },
        // addDomain() {
        //   this.ruleForm.domains.push({
        //     content: '',
        //     snType:'',
        //     snLabel:'',
        //   });
        // },
        addsmall(row, index) {
            vm.id = row.id;
            vm.smallmodel = true;
        },
        view_small(row, index) {
            vm.ruleForm.domains = row.teacSmallSnitchsExt;
            row.teacSmallSnitchsExt.map(function (item, index) {
                vm.ruleForm.domains[index].snType = "" + item.snType + "";
            })
            vm.view_model = true;
        },
        adddate(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        data: {
                            "taecId": vm.id,
                            "content": vm.ruleForm.content,
                            "snType": vm.ruleForm.snType,
                            "snLabel": vm.ruleForm.snLabel
                        },
                        url: "" + baseURL + "sys/oper/smallSnitch/save",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success',
                                    duration: 1000
                                });
                                vm.smallmodel = false;
                                // vm.getteacsmall();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'wanring',
                                    duration: 1000
                                });
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