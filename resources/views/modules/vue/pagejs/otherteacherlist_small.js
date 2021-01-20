var vm = new Vue({
    el: '#app',
    data() {
        return {
            view_model: false,
            smallmodel: false,
            eduNames: '',
            showc: false,
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
                    value: "",
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
                    value: "",
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
            ],
            ruleForm: {
                tudStatused: "10",
                level: '0',
                rank: null,
                initialEvaluate: '',
                reexamineEvaluate: '',
                universityName: '',
                mobile: '',
                nickName: '',
                country: '',
                professionalCourses: '',
                username: '',
                sex: '',
                birthday: '',
                eduName: '',
                type: '',
                grade: '',
                coachingSkills: '',
                proKnowledge: '',
                workingAttitude: '',
                jobSpecification: '',
                specializedName: '',
                content: '',
                snType: '',
                snLabel: '',
                domains: [{
                    content: '',
                    snType: '',
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
                }]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.change_country();
        this.getprofessionalCoursesName();
        this.getspecializeds();
        this.geteduNames();
    },
    methods: {
        search: function () {
            vm.val = 1;
            vm.getTableData();
        },
        change_level(val) {
            this.ruleForm.level = val;
            this.getTableData();
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
        downfile1(row, index) {
            window.open(row.report);
        },
        view_teacSyllabus(row, index) {
            window.location.href = "teacSyllabus.html?id=" + row.id + "";
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
        change_spoTypeArr(val) {
            vm.val = 1;
            vm.getTableData();
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
        change(value) {
            if (value == 1) {
                vm.teachers = false;
            } else {
                vm.teachers = true;
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
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
            console.log(vm.professionalCoursesName);
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
            if (row.type == 1) {
                vm.istrue = false
                $("#tab-seconds").css("display", "none")
            } else {
                vm.istrue = true
            }
            vm.id = row.id;
            vm.getteacsmall();
            vm.detail = false;
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "sys/train/teacInfo/" + vm.id + "",
                success: function (json) {
                    vm.change_university(row.countryId);
                    var detail = json.body;
                    vm.ruleForm.grade = "" + json.body.grade + "";
                    vm.ruleForm.country = detail.countryId;
                    vm.ruleForm.hourlyWage = detail.hourlyWage;
                    vm.$refs.ruleForm.model.username = detail.username;
                    vm.$refs.ruleForm.model.nickName = detail.nickName;
                    vm.$refs.ruleForm.model.sex = detail.sex;
                    vm.$refs.ruleForm.model.birthday = detail.birthday;
                    vm.$refs.ruleForm.model.wxAccount = detail.wxAccount;
                    vm.$refs.ruleForm.model.mobile = detail.mobile;
                    vm.$refs.ruleForm.model.email = detail.email;
                    vm.ruleForm.specializedName = detail.specializeds;
                    vm.$refs.ruleForm.model.universityName = detail.universityId;
                    vm.ruleForm.professionalCourses = detail.professionalIds;
                    // vm.ruleForm.professionalCourses = [detail.professionalCoursesName];
                    vm.$refs.ruleForm.model.eduName = detail.eduBackgroundId;
                    vm.$refs.ruleForm.model.specializeds = [detail.specializeds];
                    vm.$refs.ruleForm.model.description = detail.description;
                    vm.$refs.ruleForm.model.presenterTimeLimit = detail.presenterTimeLimit;
                    vm.$refs.ruleForm.model.maxLootNum = detail.maxLootNum;
                    vm.$refs.ruleForm.model.teachingExperience = detail.teachingExperience;
                    vm.$refs.ruleForm.model.type = "" + detail.type + "";
                    vm.ruleForm.rank = "" + detail.rank + "";
                    vm.$refs.ruleForm.model.hourlyWage = "" + detail.hourlyWage + "";
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
                    vm.ruleForm.initialEvaluate = detail.initialEvaluate;
                    vm.ruleForm.reexamineEvaluate = detail.reexamineEvaluate;
                }
            });
        },
        update(formName) {
            var self = this;
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
                            // professionalIds:vm.professionalCoursesName,
                            eduBackgroundId: eduName,
                            specializedName: vm.ruleForm.specializedName,
                            rank: vm.ruleForm.rank,
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
            if (ids == "") {
                this.$message({
                    message: '请选择老师',
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
                                vm.dialogFormVisible2 = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'wanring',
                                    duration: 1000
                                });
                                vm.dialogFormVisible2 = false;
                                vm.getTableData();
                            }
                        }
                    });
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
        view_small(row, index) {
            vm.ruleForm.domains = row.teacSmallSnitchsExt;
            row.teacSmallSnitchsExt.map(function (item, index) {
                vm.ruleForm.domains[index].snType = "" + item.snType + "";
            })
            vm.view_model = true;
        },
    }
});