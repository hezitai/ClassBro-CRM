var vm = new Vue({
    el: '#app',
    data() {
        return {
            btnstatus: false,
            btnval: "抢单",
            btnval1: "接单",
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            filterTableDataEnd: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            key: '',
            page: "",
            val: 1,
            limit: 15,
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            ruleForm: {},
            rules: {}
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
    },
    methods: {
        search: function () {
            vm.val = 1;
            vm.getTableData();
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
                },
                url: "" + baseURL + "sys/seller/order/getOrderPool",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        apply(row, index) {
            var self = this;
            this.$confirm('是否要接单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    vm.btnstatus = true;
                    vm.btnval1 = "加载中";
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": localStorage.getItem("token"),
                            "courseId": row.id,
                            "groupNo": row.groupNo
                        },
                        url: "" + baseURL + "/sys/seller/order/acceptingOrder",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval1 = "接单";
                                vm.getTableData();
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval1 = "接单";
                                vm.getTableData();
                            }
                        }
                    });
                })
                .catch(_ => {});
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },

        dialogVisible(row, _index) {
            var self = this;
            this.$confirm('是否要抢单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": localStorage.getItem("token"),
                            "courseId": row.id,
                            "groupNo": row.groupNo
                        },
                        url: "" + baseURL + "sys/seller/order/lootOrder",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "抢单";
                                vm.getTableData();
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "抢单";
                                vm.getTableData();
                            }
                        }
                    });
                })
                .catch(_ => {
                    vm.btnstatus = false;
                    vm.btnval = "抢单";
                });
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
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
});