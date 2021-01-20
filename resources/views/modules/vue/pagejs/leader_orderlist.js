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
            limit: 15,
            inputDataName: '',
            filterTableDataEnd: [],
            dialogFormVisible: false,
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            key: '',
            courseId: '',
            val: 1,
            page: "",
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            ruleForm: {},
            rules: {
                title: [{
                    required: true,
                    message: '请选择销售',
                    trigger: 'change'
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
                    "key": this.inputDataName,
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
        search() {
            vm.val = 1;
            vm.getTableData();
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },
        see(row, index) {
            // window.open("seller_detail.html?id=" + row.id + "");
            window.open("seller_detail.html?id=" + row.id + "");
        },
        dialogVisible(row, _index) {
            vm.dialogFormVisible = true;
            vm.courseId = row.id;
            vm.groupNo = row.groupNo;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/user/getMyDeptUserList",
                success: function (json) {
                    vm.selects = json.body.list;
                }
            });
        },
        handleChangearea(val) {
            let obj = {};
            obj = this.selects.find((item) => {
                return item.userId === val;
            });
            vm.userId = obj.userId;
            vm.username = obj.username;
        },
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },

        submitForm(formName) {
            let _this = this;
            var datas = _this.ruleForm;
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
                            "courseId": vm.courseId,
                            "groupNo": vm.groupNo,
                            "sellerId": vm.userId,
                            "sellerName": vm.username
                        },
                        url: "" + baseURL + "sys/seller/order/assigOrder",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible = false;
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
        },
        blank_out(row, index) {
            vm.$confirm("是否作废该订单?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "" + baseURL + "/sys/seller/order/invalidOrder",
                    data: {
                        "token": token,
                        "courseId": row.id,
                    },
                    success: function (json) {
                        if (json.status == 400) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'warning'
                            });
                        }
                        if (json.status == 200) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            vm.getTableData();
                        }
                    }
                });
            }).catch(() => {

            });
        },
    }
});