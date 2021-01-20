var vm = new Vue({
    el: '#app',
    data() {
        return {
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            allocations: false,
            allocations1: false,
            currentPage: 0,
            selects: '',
            pageSize: 0,
            total: 0,
            limit: 15,
            idss: [],
            courseId: '',
            id: '',
            val: 1,
            data: '',
            value: '',
            ruleForm: {},
            rules: {
                country: [{
                    required: true,
                    message: '请选择更换客服',
                    trigger: 'change'
                }],
                reason: [{
                    required: true,
                    message: '请输入坏单原因',
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
                    "statused": 1,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "sys/seller/order/queryDelayOrderList",
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

        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        handleChange(val) {
            let obj = {};
            obj = this.selects.find((item) => {
                return item.userId === val;
            });
            vm.userId = obj.userId;
            vm.username = obj.username;
        },
        allocation(row, index) {
            this.allocations = true;
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
                },
                error: function (json) {

                }
            });
        },
        apply(row, index) {
            vm.id = row.id;
            this.allocations1 = true;
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
        submitForm2(formName) {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            let _this = this;
            console.log(this.$refs.ruleForm.model.title);
            var datas = _this.ruleForm;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var token = localStorage.getItem("token");
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
                                vm.allocations = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.allocations = false;
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
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": token,
                            "id": vm.id,
                            "description": this.$refs.ruleForm.model.reason
                        },
                        url: "" + baseURL + "sys/seller/order/applyBadOrder",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.allocations1 = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.allocations1 = false;
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
});