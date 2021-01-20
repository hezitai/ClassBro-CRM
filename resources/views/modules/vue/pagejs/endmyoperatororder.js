var vm = new Vue({
    el: '#app',
    data() {
        return {
            evaluate: false,
            evaluates: '',
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
            glod: '',
            glod1: '',
            key: '',
            id: '',
            val: 1,
            limit: 15,
            page: "",
            name: '',
            ruleForm: {},
            rules: {
                glod: [{
                    required: true,
                    message: '请输入gb',
                    trigger: 'blur'
                }],
                glod1: [{
                    required: true,
                    message: '请输入otgb',
                    trigger: 'blur'
                }]
            }
        }
    },

    mounted() {
        this.getTableData();
        // this.getdata();
    },
    methods: {
        seedetail(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.id + "");
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.id + "&wyid=" + row.offCourseName + '&iswy=true');
            } else {
                // window.open("seller_detail2.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.id + "");
            }
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
        search: function () {
            vm.val = 1;
            this.getTableData();
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
                    "operaterOrderStatusedArr": "3;4;6",
                    "sooStatusedArr": this.sooStatusedArr,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "/sys/oper/getMyOperatorOrder",
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
            vm.id = row.id;
            this.dialogFormVisible2 = true;
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
                            gb: this.ruleForm.glod,
                            otgb: this.ruleForm.glod1,
                            courseId: vm.id
                        },
                        url: "" + baseURL + "sys/oper/order/handselGbToTeacher",
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