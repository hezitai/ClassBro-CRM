var vm = new Vue({
    el: '#app',
    data() {
        return {
            btnstatus: false,
            btnval: "抢单",
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            limit: 6,
            total: 0,
            page: 1,
            limit: 15,
            filterTableDataEnd: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            country: '',
            key: '',
            id: '',
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            ruleForm: {

            },
            rules: {
                country: [{
                    required: true,
                    message: '请选择委派教师',
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
            this.getTableData();
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
                    "page": this.page,
                    "limit": this.limit,
                    "isOperator": true,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "/sys/oper/getMyOrderPool",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.limit = json.body.pageSize;
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
                window.open("seller_detail.html?id=" + row.id + "");
                // window.open( "seller_detail2.html?id="+row.id+"");
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
        },
        apply(row, index) {
            var self = this;
            var token = localStorage.getItem("token");
            self.$confirm('是否要接单?', '提示', {
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
                        },
                        url: "" + baseURL + "sys/oper/grabOrder",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "接单";
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "接单";
                                vm.getTableData();
                            }
                        }
                    });
                })
                .catch(_ => {});
        },
        handleChange(item) {},

        // dialogVisible(row,_index){
        //   vm.id = row.courseId;
        //   this.dialogFormVisible2=true;
        //   var token = localStorage.getItem("token");
        //   $.ajax({  
        //     type : "get",  
        //     dataType: "json", 
        //     data:{
        //       "token": token,
        //       "page": 1,
        //       "limit": 10 
        //     } ,
        //     url : ""+baseURL+"sys/oper/queryUserTeacList",  
        //     success : function(json) {  
        //       vm.selects = json.body.list; 
        //     }
        // });

        // },

        handleCurrentChange(val) {
            vm.page = val;
            this.getTableData();
        },

        submitForm2(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm.country)
                    var token = localStorage.getItem("token");
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            teacId: this.ruleForm.country,
                            courseId: vm.id
                        },
                        url: "" + baseURL + "sys/oper/assignedOrder",
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
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
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