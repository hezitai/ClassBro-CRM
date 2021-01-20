var vm = new Vue({
    el: '#app',
    data() {
        return {
            btnstatus: false,
            btnval: "确 定",
            gg: true,
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            val: 1,
            limit: 15,
            filterTableDataEnd: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            selectsCopy: '',
            countryId: '',
            country: '',
            key: '',
            id: '',
            page: "",
            name: '',
            ruleForm: {},
            rules: {
                country: [{
                    required: true,
                    message: '请选择讲师姓名',
                    trigger: 'change'
                }]
            }
        }
    },
    mounted() {
        this.getTableData();
        this.getOperTeacList();
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
        see(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.id + "");
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.id + "&wyid=" + row.offCourseName +
                    '&iswy=true');
            } else {
                //   window.open( "seller_detail2.html?id="+row.id+"");
                window.open("seller_detail.html?id=" + row.id + "");
            }
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
                url: "" + baseURL + "/sys/oper/getOrderPool",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },

        handleChange(item) {
            console.log(item);

            // 
        },
        dialogVisible(row, _index) {
            this.ruleForm = {}
            if (row.spoType == 0 || row.spoType == 1) {
                vm.gg = false;
            } else if (row.spoType == 64) {
                vm.gg = false;
            } else {
                vm.gg = true;
            }
            vm.id = row.id;
            this.dialogFormVisible2 = true;
            vm.ruleForm.price = Number(row.teacFixedPrice);
        },
        getOperTeacList: function () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    // "statused": 0,
                    "tudStatused": 10
                },
                url: "" + baseURL + "/sys/oper/teacList",
                success: function (json) {
                    vm.selects = json.body.list;
                    vm.selectsCopy = vm.selects;
                }
            });
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.val = val;
            vm.getTableData();
        },

        submitForm2(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var token = localStorage.getItem("token");
                    vm.btnstatus = true,
                        vm.btnval = "加载中",
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            headers: {
                                "token": token
                            },
                            data: {
                                teacId: this.ruleForm.country,
                                courseId: vm.id,
                                price: this.ruleForm.price
                            },
                            url: "" + baseURL + "/sys/oper/assignedOrder",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: '分配订单成功',
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定"
                                    vm.dialogFormVisible2 = false;

                                    vm.getTableData();
                                }
                                if (json.status == 400) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
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
        teacFilter(val) {
            vm.selects = [];
            if (val != null && val != '') {
                $.each(vm.selectsCopy, function (index, value) {
                    if (value.username.indexOf(val) > -1 || value.username.toUpperCase().indexOf(val.toUpperCase()) > -1 || value.nickName.indexOf(val) > -1 || value.nickName.toUpperCase().indexOf(val.toUpperCase()) > -1) {
                        vm.selects.push(value);
                    }
                });
            } else {
                vm.selects = vm.selectsCopy;
            }

        },
        closeTeacDialog() {
            vm.selects = vm.selectsCopy;
        }
    }
});