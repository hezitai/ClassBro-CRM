var vm = new Vue({
    el: '#app',
    data() {
        return {
            modal: false,
            btnstatus: false,
            btnval: "确 定",
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            val: 1,
            teacId: '',
            ruleForm: {
                description: '',
                isCross: true,
            },
            rules: {
                description: [{
                    required: true,
                    message: '请填写面试理由',
                    trigger: 'blur'
                }],
                isCross: [{
                    required: true,
                    message: '请选择面试结果',
                    trigger: 'change'
                }]
            }
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
                    "tudStatused": 4,
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
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        submitForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                var viewStartTime = vm.ruleForm.viewStartTime + " " + vm.startTime + ":00";
                var viewEndTime = vm.ruleForm.viewEndTime + " " + vm.endTime + ":00";
                if (valid) {
                    if (vm.startTime == "" || vm.endTime == "") {
                        return;
                    } else {
                        vm.btnstatus = true;
                        vm.btnval = "加载中";
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            headers: {
                                "token": token
                            },
                            data: {
                                isCross: vm.ruleForm.isCross,
                                teacId: vm.teacId,
                                description: vm.ruleForm.description,
                            },
                            url: "" + baseURL + "/sys/teacherchannel/saveFirstInterview",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                    vm.modal = false;
                                }
                                if (json.status == 400) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                }
                            }
                        });
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        recommendTeacher(row, index) {
            vm.teacId = row.id;
            vm.modal = true;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
        },

        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        search() {
            vm.val = 1;
            vm.getTableData();
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