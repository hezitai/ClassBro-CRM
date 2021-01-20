var vm = new Vue({
    el: '#app',
    data() {
        return {
            show: true,
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
            view: '',
            options: [],
            selectedOptions: [],
            selects: '',
            suggest: '',
            countryId: '',
            descriptions: '',
            key: '',
            id: '',
            page: "",
            name: '',
            ruleForm: {},
            rules: {
                suggest: [{
                    required: true,
                    message: '请选择处理意见',
                    trigger: 'change'
                }]
            }
        }
    },

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
                    "operaterOrderStatusedArr": 5,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "/sys/oper/getOperatorOrder",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        seedetail(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.id + "");
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.id + "&wyid=" + row.offCourseName +
                    "&iswy=true");
            } else {
                // window.open( "seller_detail2.html?id="+row.id+"");
                window.open("seller_detail.html?id=" + row.id + "");
            }
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
            vm.item = item;
        },
        change_suggest(view) {
            vm.view = view;
            if (view == 1) {
                vm.show = true;
            }
            if (view == 2) {
                vm.show = false;
            }
        },
        dialogVisible(row, _index) {
            vm.private = row.sooId;
            vm.id = row.id;
            this.dialogFormVisible2 = true;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 100
                },
                url: "" + baseURL + "/sys/oper/teacList",
                success: function (json) {
                    vm.selects = json.body.list;
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
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            processType: this.ruleForm.suggest,
                            description: this.ruleForm.descriptions,
                            orderId: vm.private,
                        },
                        url: "" + baseURL + "/sys/oper/processExceptionOrder",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.dialogFormVisible2 = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
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
        },

    }
});