var vm = new Vue({
    el: '#app',
    data() {
        return {
            Wagesmodel: false,
            evaluate: false,
            evaluates: '',
            otg: false,
            btnstatus: false,
            btnval: "确 定",
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            dialogFormVisible: false,
            dialogFormVisible2: false,
            idss: [],
            operaterOrderStatusedArr: "3;4",
            spoTypeArr: null,
            sooTypeedArr: null,
            sooStatusedArr: null,
            selects: '',
            countryId: '',
            glod: false,
            glod1: false,
            key: '',
            id: '',
            val: 1,
            limit: 15,
            page: "",
            name: '',
            ruleForm: {
                glod: "",
                glod1: "",
                otgb1: '',
                gb1: '',
            },
            rules: {
                glod: [{
                    required: true,
                    message: '请输入gb',
                    trigger: 'blur'
                }]
            }
        }
    },

    mounted() {
        this.getTableData();
        // this.getdata();
        //this.hasPermission();
    },
    methods: {
        seedetail(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.id + "");
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.id + "&wyid=" + row.offCourseName +
                    "&iswy=true");
            } else {
                //   window.open("seller_detail2.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.id + "");
            }
        },
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
        imchat(row, index) {
            window.open("chathistory.html?tid=" + row.groupNo + "&&sellerId=" + row.sellerRepresenId + "");
        },
        reduceWages(row, index) {
            vm.courseId = row.id;
            // vm.teacherId = row.id;
            vm.Wagesmodel = true;
            if (row.teacType == 1) {
                vm.otg = true;
            } else {
                vm.otg = false;
            }
        },
        WagesSave(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.courseId,
                            description: this.ruleForm.description,
                            gb: this.ruleForm.gb1,
                            otgb: this.ruleForm.otgb1,
                        },
                        url: "" + baseURL + "/sys/oper/discountTeacIncome",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.Wagesmodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
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
                    "spoTypeArr": this.spoTypeArr,
                    "sooTypeedArr": this.sooTypeedArr,
                    "sooStatusedArr": this.sooStatusedArr,
                    "operaterOrderStatusedArr": "3;4;6",
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "/sys/oper/getOperatorOrder",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.pageSize;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
        },
        handleCurrentChange(val) {
            this.val = val;
            this.getTableData();
        },
        dialogVisible(row, _index) {
            if (row.teacType == 2) {
                vm.glod = true;
                vm.glod1 = false;
            } else {
                vm.glod1 = true;
                vm.glod = true;
            }
            vm.id = row.id;
            this.dialogFormVisible2 = true;
        },
        exit() {
            vm.evaluate = false;
        },
        see_evaluate(row, index) {
            vm.evaluate = true;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 10
                },
                url: "" + baseURL + "sys/oper/getCourseEvaluation?courseId=" + row.id + "",
                success: function (json) {
                    if (json.body == null) {
                        vm.evaluates = "";
                    } else {
                        vm.evaluates = json.body;
                    }

                }
            });
        },
        submitForm2(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            gb: this.ruleForm.glod,
                            otgb: this.ruleForm.glod1,
                            courseId: vm.id
                        },
                        url: "" + baseURL + "sys/oper/handselGbToTeacher",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible2 = false;
                                vm.ruleForm.glod = "";
                                vm.ruleForm.glod1 = "";
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
            console.log(this.idss);
        },

    }
});