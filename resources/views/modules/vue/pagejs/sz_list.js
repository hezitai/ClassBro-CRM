var vm = new Vue({
    el: '#app',
    data() {
        return {
            greadshow: true,
            showList: true,
            showa: false,
            showb: true,
            activeName: 'first',
            show: true,
            show1: true,
            show2: true,
            show3: true,
            purchaseOrderId: '',
            courseId: '',
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            idss: [],
            id: '',
            options: [],
            selectedOptions: [],
            name: '',
            label: '',
            dialogStatus: "",
            ruleForm: {
                courseId: ''
            },
            rules: {
                username: [{
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                }, ],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, ],
                type: [{
                    required: true,
                    message: '请选择老师类型',
                    trigger: 'change'
                }, ],
                gread: [{
                    required: true,
                    message: '请选择老师级别',
                    trigger: 'change'
                }, ],
                coachingSkills: [{
                    required: true,
                    message: '请选择老师辅导技巧',
                    trigger: 'change'
                }, ],
                proKnowledge: [{
                    required: true,
                    message: '请选择老师专业知识',
                    trigger: 'change'
                }, ],
                workingAttitude: [{
                    required: true,
                    message: '请选择老师工作态度',
                    trigger: 'change'
                }, ],
                jobSpecification: [{
                    required: true,
                    message: '请选择老师工作规范',
                    trigger: 'change'
                }, ],
                ali_account: [{
                    required: true,
                    message: '请输入支付宝账号',
                    trigger: 'blur'
                }, ],
                hourly_wage: [{
                    required: true,
                    message: '请输入教师时薪',
                    trigger: 'blur'
                }, ]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        if (this.totalItems > this.pageSize) {
            for (let index = 0; index < this.pageSize; index++) {
                this.tableDataEnd.push(this.tableDataBegin[index]);
            }
        } else {
            this.tableDataEnd = this.tableDataBegin;
        }
    },
    methods: {
        getTableData: function () {
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 6
                },
                url: "" + baseURL + "sys/oper/teacList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                },
                error: function (json) {

                }
            });
        },

        seetext: function (row, index) {
            vm.showList = false;
            vm.show1 = false;
            vm.show3 = false;
            var token = localStorage.getItem("token");
            vm.id = row.id;
            $.ajax({
                type: "get",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "sys/train/teacInfo/" + vm.id + "",
                dataType: "json",
                data: {},
                success: function (r) {
                    if (r.status == 200) {
                        vm.ruleForm = r.body;
                        var coachingSkills = r.body.teacRate.coachingSkills
                        vm.ruleForm.jobSpecification = "" + r.body.teacRate
                            .jobSpecification + "";
                        vm.ruleForm.workingAttitude = "" + r.body.teacRate.workingAttitude +
                            "";
                        vm.ruleForm.proKnowledge = "" + r.body.teacRate.proKnowledge + "";
                        vm.ruleForm.coachingSkills = "" + coachingSkills + "";
                        vm.ruleForm.type = "" + r.body.type + "";
                    }
                }
            });
        },

        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        handleClick(tab, first) {
            var val = tab.index;
            console.log(val);
            if (val == 0) {
                vm.showa = false;
                vm.showb = true;
            } else {
                vm.showa = true;
                vm.showb = false;
            }
        },

        // 更新
        update(formName) {
            var self = this;
            var token = localStorage.getItem("token");
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.$refs.ruleForm.model);
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/order/updatePurchaseOrder",
                        contentType: "application/json",
                        data: JSON.stringify(this.$refs.ruleForm.model),
                        success: function (r) {
                            if (r.status == 200) {
                                self.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
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
        // 返回
        back: function () {
            window.location.reload();
        },
        // 保存      
        save(formName) {
            var self = this;
            var token = localStorage.getItem("token");
            var rate = JSON.parse(this.$refs.ruleForm.model.coachingSkills);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.$refs.ruleForm.model);
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "/sys/train/saveTeac",
                        contentType: "application/json",
                        data: JSON.stringify({
                            username: this.$refs.ruleForm.model.username,
                            mobile: this.$refs.ruleForm.model.mobile,
                            password: this.$refs.ruleForm.model.password,
                            nickName: this.$refs.ruleForm.model.nickName,
                            type: this.$refs.ruleForm.model.type,
                            gread: this.$refs.ruleForm.model.gread,
                            aliAccount: this.$refs.ruleForm.model.ali_account,
                            hourlyWage: this.$refs.ruleForm.model.hourly_wage,
                            wxAccount: this.$refs.ruleForm.model.wxAccount,
                            sex: this.$refs.ruleForm.model.sex,
                            birthday: this.$refs.ruleForm.model.birthday,
                            email: this.$refs.ruleForm.model.email,
                            universityName: this.$refs.ruleForm.model
                                .universityName,
                            teacRate: {
                                coachingSkills: JSON.parse(this.$refs.ruleForm.model
                                    .coachingSkills),
                                proKnowledge: JSON.parse(this.$refs.ruleForm.model
                                    .proKnowledge),
                                workingAttitude: JSON.parse(this.$refs.ruleForm
                                    .model.workingAttitude),
                                jobSpecification: JSON.parse(this.$refs.ruleForm
                                    .model.jobSpecification),
                            }
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                self.$message({
                                    message: '创建成功',
                                    type: 'success'
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
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.page = this.currentPage;
            console.log(this.page);
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": val,
                    "limit": 6,
                    "typeed": 0
                },
                url: "" + baseURL + "sys/seller/order/list",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                },
                error: function (json) {

                }
            });
        },

        changeval(value) {
            if (value == 2) {
                vm.greadshow = false;
            } else {
                vm.greadshow = true;
            }
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
        handleDelete() {
            var ids = this.idss;
            console.log(JSON.parse(JSON.stringify(ids)));
            var a = JSON.parse(JSON.stringify(ids));
            if (ids == "") {
                vm.$message({
                    message: '请选择一条或多条数据',
                    type: 'warning',
                    duration: '1000'
                });
                return;
            }
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    var token = localStorage.getItem("token");
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify(ids),
                        url: "" + baseURL + "sys/channel/channelactivity/delete",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: '删除信息成功',
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                        },
                        error: function (json) {}
                    });
                })
                .catch(_ => {});

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
});