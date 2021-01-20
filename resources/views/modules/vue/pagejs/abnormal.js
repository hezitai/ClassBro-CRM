var vm = new Vue({
    el: '#app',
    data() {
        return {
            btnstatus: false,
            btnval: "确 定",
            names: '',
            nameshow: true,
            dialogFormVisible2: false,
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            val: 1,
            idss: [],
            data: '',
            id: '',
            value: '',
            ruleForm: {},
            rules: {
                type: [{
                    required: true,
                    message: '请选择坏单类型',
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
        seedetail(row, index) {
            if (row.studCourse.spoType == 64) {
                if (row.studCourse.parentId == null) {
                    window.open("bigClassroomInfo1.html?id=" + row.studCourse.id + "&teacherId=" + row.studCourse.teacherId);
                } else {
                    window.open("bigClassOrderInfo.html?id=" + row.studCourse.id);
                }
                // window.open("bigClassOrderInfo.html?id=" + row.id + "");
                // window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else {
                //   window.open("seller_detail.html?id=" + row.courseId + "&parentId=" + row.parentId + "");
                window.open("seller_detail.html?id=" + row.courseId + "&parentId=" + row.parentId + "");
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
                    "exceptionType": "",
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "sys/seller/order/abnormalList",
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
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },
        changetype(val) {
            vm.val = val;
            if (val == 4) {
                vm.nameshow = false;
            } else {
                vm.nameshow = true;
            }
        },
        getnames(row, _index) {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "notIncludeUserId": vm.sellerId
                },
                url: "" + baseURL + "/sys/user/getMyDeptUserList",
                success: function (json) {
                    vm.names = json.body.list;
                }
            });
        },
        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        search() {
            vm.val = 1;
            vm.getTableData();
        },
        save(formName) {
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
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            "ids": [vm.id],
                            "flag": Number(vm.val),
                            "newSellerId": this.$refs.ruleForm.model.name,
                        }),
                        url: "" + baseURL + "sys/seller/order/reviewBadOrder",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible2 = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible2 = false;
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        dialogVisible(row, index) {
            vm.dialogFormVisible2 = true;
            vm.id = row.id;
            vm.sellerId = row.sellerId;
            vm.getnames();
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