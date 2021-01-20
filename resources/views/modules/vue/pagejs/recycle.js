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
                url: "" + baseURL + "/sys/oper/deletedTeacList",
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
        recovery(row, index) {
            this.$confirm('是否要恢复该讲师账号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": token,
                            "teacId": row.id,
                        },
                        url: "" + baseURL + "/sys/oper/recoverTeacher",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                        }
                    });
                })
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