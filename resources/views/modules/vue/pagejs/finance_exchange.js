var vm = new Vue({
    el: '#app',
    data() {
        return {
            btnstatus: false,
            btnval: "确 定",
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            idss: [],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            val: 1,
            ruleForm: {
                currency: '',
                exchange: '',
            },
            rules: {
                currency: [{
                    required: true,
                    message: '请选择货币类型',
                    trigger: 'change'
                }],
                exchange: [{
                    required: true,
                    message: '请填写汇率',
                    trigger: 'blur'
                }]
            },
            rules1: {
                exchange: [{
                    required: true,
                    message: '请填写汇率',
                    trigger: 'blur'
                }]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.hasPermission();
    },
    methods: {
        getTableData: function () {
            var statused = "1;2"
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": 6,
                    "statused": statused,
                    "type": 3
                },
                url: "" + baseURL + "sys/basedata/exchangeRate/list",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        add() {
            vm.dialogFormVisible = true;
            this.ruleForm.exchange = "";
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        revise(row, index) {
            vm.id = row.id;
            var item = row;
            vm.ruleForm = {
                    exchange: item.exchange
                },
                vm.dialogFormVisible1 = true;
        },
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        headers: {
                            "token": token
                        },
                        data: {
                            "tagerCurrency": this.ruleForm.currency,
                            "exchange": this.ruleForm.exchange
                        },
                        url: "" + baseURL + "/sys/basedata/exchangeRate/save",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: '添加汇率成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: '添加汇率失败',
                                    type: 'warning',
                                    duration: 1000
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible = false;
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
        submitForm1(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        headers: {
                            "token": token
                        },
                        data: {
                            "id": vm.id,
                            "exchange": this.ruleForm.exchange
                        },
                        url: "" + baseURL + "/sys/basedata/exchangeRate/update",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: '修改汇率成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible1 = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: '修改汇率失败',
                                    type: 'warning',
                                    duration: 1000
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible1 = false;
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },

        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
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
    }
});