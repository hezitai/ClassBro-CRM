var vm = new Vue({
    el: '#app',
    data() {
        return {
            timemodel: false,
            timebtnstatus: false,
            timebtnval: "确 定",
            btnstatus: false,
            btnval: "抢单",
            btnval1: "接单",
            searchkey: '',
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
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
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            ruleForm: {
                time: '',
                description: '',
                type: '0',
            },
            rules: {
                time: [{
                    required: true,
                    message: '请填写赠送时长',
                    trigger: 'blur'
                }],
                description: [{
                    required: true,
                    message: '请填写赠送理由',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请选择类型',
                    trigger: 'change'
                }],
            },

            operaterOrderStatusedArr: '0;1;2;5;7;8',
            spoTypeArr: null,
            sooTypeedArr: null,
            sooStatusedArr: "",
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.hasPermission();
    },
    methods: {
        search() {
            vm.val = 1;
            vm.getTableData();
        },
        change_sooStatusedArr(val) {
            if (val == '0;1;2;5;7;8') {
                vm.operaterOrderStatusedArr = '0;1;2;5;7;8'
                vm.sooStatusedArr = ''
            }
            if (val == '0') {
                vm.operaterOrderStatusedArr = '0'
                vm.sooStatusedArr = ''
            }
            if (val == '1') {
                vm.operaterOrderStatusedArr = '1'
                vm.sooStatusedArr = ''
            }
            if (val == '128') {
                vm.sooStatusedArr = '128'
                vm.operaterOrderStatusedArr = ''
            }
            if (val == '256') {
                vm.sooStatusedArr = '256'
                vm.operaterOrderStatusedArr = ''
            }
            if (val == '512') {
                vm.sooStatusedArr = '512'
                vm.operaterOrderStatusedArr = ''
            }
            // this.getTableData();
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
                    // "operaterOrderStatusedArr": this.operaterOrderStatusedArr,
                    // "spoTypeArr": this.spoTypeArr,
                    // "sooTypeedArr": this.sooTypeedArr,
                    // "sooStatusedArr": this.sooStatusedArr,
                },
                url: "" + baseURL + "/sys/seller/order/superOrderList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
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
        },
        salesPresenterTime(row, index) {
            vm.timemodel = true;
            vm.ruleForm.studId = row.id;
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var self = this;
                    vm.timebtnstatus = true;
                    vm.timebtnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            "token": token,
                            "courseId": vm.ruleForm.studId,
                            "time": vm.ruleForm.time,
                            "description": vm.ruleForm.description,
                            "type": vm.ruleForm.type,
                        },
                        url: "" + baseURL + "/sys/seller/order/salesPresenterTime",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.timemodel = false;
                                vm.timebtnstatus = false;
                                vm.timebtnval = "确 定";
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.timebtnstatus = false;
                                vm.timebtnval = "确 定";
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                        }
                    });
                } else {
                    return;
                }
            });

        },
        search() {
            vm.getTableData();
        },
        handleCurrentChange(val) {
            this.val = val;
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
        openorder(row, index) {
            // if(row.typeed == 4){
            //   window.open("detail.html?id=" + row.id + "");
            // }
            if (row.spoType == 64) {
                if (row.parentId == null) {
                    window.open("bigClassroomInfo1.html?id=" + row.id + "&teacherId=" + row.teacherId);
                } else {
                    window.open("bigClassOrderInfo.html?id=" + row.id);
                }
                // window.open("bigClassOrderInfo.html?id=" + row.id + "");
                // window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.id + "&wyid=" + row.offCourseName +
                    "&iswy=true");
            } else {
                //   window.open("seller_detail.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.id + "");
            }
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
        lock_order(row, index) {
            vm.$confirm("是否锁定该订单?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "" + baseURL + "/sys/seller/order/lockOrder",
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
        unlock_order(row, index) {
            vm.$confirm("是否解锁该订单?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "" + baseURL + "/sys/seller/order/unLockOrder",
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
        rowClass({
            row
        }) {
            if (row.deleteFlag === true) {
                return 'color1'
            }
        },
    }
});