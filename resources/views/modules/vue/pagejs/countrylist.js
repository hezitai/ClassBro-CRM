var vm = new Vue({
    el: '#app',
    data() {
        return {
            id: '',
            updatemodel: false,
            btnstatus: false,
            btnval: "确 定",
            countrymodel: false,
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            val: 1,
            ids: [],
            data: '',
            value: '',
            ruleForm: {
                name: '',
                code: '',
                currency: '',
            },
            ruleForms: {
                name: '',
                code: '',
                currency: '',
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入国家名称',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    message: '请输入国家code',
                    trigger: 'blur'
                }],
                currency: [{
                    required: true,
                    message: '请输入国家货币',
                    trigger: 'blur'
                }]
            },
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
    },
    methods: {
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
                },
                url: "" + baseURL + "sys/basedata/country/list",
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
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },
        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        search() {
            vm.val = 1;
            vm.getTableData();
        },
        addmodel() {
            vm.countrymodel = true;
        },
        change(row, index) {
            vm.id = row.id;
            vm.ruleForms = row;
            vm.updatemodel = true;
        },
        delone(row, index) {
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    cache: false,
                    contentType: "application/json",
                    headers: {
                        "token": token
                    },
                    data: JSON.stringify([row.id]),
                    url: "" + baseURL + "/sys/basedata/country/delete",
                    success: function (json) {
                        if (json.status == "200") {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            vm.getTableData();
                        }
                        if (json.status == "400") {
                            vm.$message({
                                message: json.body.msg,
                                type: 'warning'
                            });
                        }
                    }
                });
            }).catch(() => {});
        },
        del() {
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    cache: false,
                    contentType: "application/json",
                    headers: {
                        "token": token
                    },
                    data: JSON.stringify(vm.ids),
                    url: "" + baseURL + "/sys/basedata/country/delete",
                    success: function (json) {
                        if (json.status == "200") {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            vm.getTableData();
                        }
                        if (json.status == "400") {
                            vm.$message({
                                message: json.body.msg,
                                type: 'warning'
                            });
                        }
                    }
                });
            }).catch(() => {});
        },
        save(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            "name": vm.ruleForm.name,
                            "code": vm.ruleForm.code,
                            "currency": vm.ruleForm.currency,
                        }),
                        url: "" + baseURL + "sys/basedata/country/save",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.ruleForm.name = "";
                                vm.ruleForm.code = "";
                                vm.ruleForm.currency = "";
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.countrymodel = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
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
        update(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            "id": vm.id,
                            "name": vm.ruleForm.name,
                            "code": vm.ruleForm.code,
                            "currency": vm.ruleForm.currency,
                        }),
                        url: "" + baseURL + "sys/basedata/university/update",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.ruleForms.name = "";
                                vm.ruleForms.code = "";
                                vm.ruleForms.currency = "";
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.updatemodel = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
            let ids = [];
            this.multipleSelection.map((item) => {
                var id = item.id;
                ids.push("" + id + "");
            });
            this.ids = ids;
            console.log('多选', ids);
        },
    }
});