var vm = new Vue({
    el: '#app',
    data() {
        return {
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            userType: '',
            data: '',
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            filterTableDataEnd: [],
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            key: '',
            courseId: '',
            val: 1,
            limit: 15,
            page: "",
            name: '',
            superId: '',
            label: '',
            finishTimeFrom: '',
            finishTimeTo: '',
            dialogStatus: "",
            ruleForm: {
                usertype: '',
            },
            rules: {}
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.hasPermission();
    },
    methods: {
        search: function () {
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
        choosedata: function (value) {
            vm.finishTimeFrom = value[0];
            vm.finishTimeTo = value[1];
        },
        view(row, index) {
            window.open("view_img.html?id=" + row + "");
        },
        changetype(val) {
            vm.userType = val;
            vm.val = 1;
            vm.getTableData();
        },
        getTableData: function () {
            var statused = "1;2"
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
                    "timeFrom": this.finishTimeFrom,
                    "timeTo": this.finishTimeTo,
                    "userType": this.userType,
                    "key": this.tableDataName
                },
                url: "" + baseURL + "sys/finance/audit/queryAllAccountLog",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        formatSex: function (row, column) {
            return row.userType == 'S' ? "学生" : row.userType == 'T' ? "老师" : "";
        },
        sees(row, index) {
            // window.open("seller_detail2.html?id=" + row.courseId + "");
            window.open("seller_detail.html?id=" + row.courseId + "");
        },

        down() {
            var data = vm.value;
            var userType = vm.userType;
            if (data == null) {
                var timeFrom = "";
                var timeTo = "";
                window.open("" + baseURL + "sys/finance/audit/downloadAllAccountLog?token=" + token +
                    "&timeFrom=" + timeFrom + "&timeTo=" + timeTo + "&userType=" + userType + "");
            } else {
                var timeFrom = data[0];
                var timeTo = data[1];
                window.open("" + baseURL + "sys/finance/audit/downloadAllAccountLog?token=" + token +
                    "&timeFrom=" + timeFrom + "&timeTo=" + timeTo + "&userType=" + userType + "");
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        yes(row, index) {
            var self = this;
            self.$confirm('是否通过审核?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    var token = localStorage.getItem("token");
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": token,
                            "logId": row.id,
                            "status": 1
                        },
                        url: "" + baseURL + "sys/finance/audit/auditStud",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: "审批失败",
                                    type: 'warning'
                                });
                                vm.getTableData();
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: "审批成功",
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                        }
                    });
                })
                .catch(() => {});
        },
        no(row, index) {
            var self = this;
            self.$confirm('是否通过审核?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    var token = localStorage.getItem("token");
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": token,
                            "logId": row.id,
                            "status": 2
                        },
                        url: "" + baseURL + "sys/finance/audit/auditStud",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: "审批失败",
                                    type: 'warning'
                                });
                                vm.getTableData();
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: "审批成功",
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                        }
                    });
                })
                .catch(() => {});
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