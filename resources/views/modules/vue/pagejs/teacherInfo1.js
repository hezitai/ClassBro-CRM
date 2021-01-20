var vm = new Vue({
    el: '#app',
    data() {
        return {
            sss: true,
            cards: '',
            num: '',
            carddata: [],
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            txmodal: false,
            modal: false,
            cardmodal: false,
            modal_time: false,
            total: 0,
            limit: 15,
            idss: [],
            courseId: '',
            val: 1,
            disabledInput: true,
            page: "",
            ruleForm: {
                price1: '',
                price2: '',
                card: '',
            },
            rules: {
                bankName: [{
                    required: true,
                    message: '请输入课程标题',
                    trigger: 'blur'
                }],
                bankOfDeposit: [{
                    required: true,
                    message: '请输入课程时间',
                    trigger: 'blur'
                }],
                userName: [{
                    required: true,
                    message: '请输入课程描述',
                    trigger: 'blur'
                }],
                accountNumber: [{
                    required: true,
                    message: '请输入课程描述',
                    trigger: 'blur'
                }],
                card: [{
                    required: true,
                    message: '请选择银行卡',
                    trigger: 'change'
                }]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        // this.getcardlist();
        // this.getUser();
        // this.getgb();
        // this.teacinfo();
    },
    methods: {
        jx() {
            $.ajax({
                type: "get",
                url: baseURL + "/api/teacher/account/withdrawConfirm",
                dataType: "json",
                headers: {
                    "token": token
                },
                data: {
                    "gb": vm.ruleForm.price1,
                    "otgb": vm.ruleForm.price2,
                },
                success: function (r) {
                    if (r.status == 200) {
                        vm.$refs.ruleForm.model.prices = r.body,
                            vm.$message({
                                message: r.body.msg,
                                type: 'success'
                            });
                        vm.getcardlist();
                    }
                    if (r.status == 400) {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning'
                        });
                        vm.getcardlist();
                    }
                }
            })
        },
        teacinfo() {
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "api/teacher/user/getMyInfo",
                success: function (json) {
                    var detail = json.body;
                    if (detail.type == 2) {
                        vm.sss = false
                    } else {
                        vm.sss = true
                    }
                }
            });
        },
        getTableData: function () {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var userId = getUrlStr("id");
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
                    "userId": userId,
                    "key": this.tableDataName
                },
                url: "" + baseURL + "/sys/oper/getIncomeList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        getUser() {
            $.ajax({
                type: "get",
                url: baseURL + "api/teacher/user/getMyInfo",
                dataType: "json",
                headers: {
                    "token": token
                },
                success: function (r) {
                    vm.user = r.body;
                    var type = r.body.type;
                    if (type == 1) {
                        vm.disabledInput = true;
                    } else {
                        vm.disabledInput = false;
                    }
                }
            })
        },
        getgb() {
            $.ajax({
                type: "get",
                url: baseURL + "api/teacher/account/findAccountInfo",
                dataType: "json",
                headers: {
                    "token": token
                },
                success: function (r) {
                    vm.num = r.body;
                    vm.ruleForm.price1 = r.body.money;
                    vm.ruleForm.price2 = r.body.otherMoney;
                }
            })
        },
        tx() {
            vm.txmodal = true;
            vm.jx();
        },
        apply(row, index) {
            vm.modal = true;
        },
        add() {
            vm.cardmodal = true;
        },
        getcardlist() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "api/teacher/bankcard/list",
                success: function (json) {
                    vm.carddata = json.body.list;
                    vm.cards = json.body.list;
                },
                error: function (json) {}
            });
        },
        remove(row, index) {
            let cardid = [];
            cardid.push("" + row.id + "");
            this.$confirm('是否解绑?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "post",
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify(
                            cardid
                        ),
                        url: "" + baseURL + "api/teacher/bankcard/delete",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: '解绑成功',
                                    type: 'success'
                                });
                                vm.getcardlist();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: '解绑失败',
                                    type: 'warning'
                                });
                                vm.getcardlist();
                            }
                        }
                    });
                })
                .catch(_ => {});
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
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
        submitForm1(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        // contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: {
                            "gb": this.$refs.ruleForm.model.price1,
                            "otgb": this.$refs.ruleForm.model.price2,
                            "cardId": this.$refs.ruleForm.model.card,
                        },
                        url: "" + baseURL + "/api/teacher/account/withdrawToBank",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.txmodal = false;
                                vm.getcardlist();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                            }
                        }
                    });
                }
            });
        },
        submitForm(formName) {
            let _this = this;
            var datas = _this.ruleForm;
            var course_data = datas.course_data;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            "teacId": vm.teacId,
                            "userName": this.$refs.ruleForm.model.userName,
                            "bankOfDeposit": this.$refs.ruleForm.model
                                .bankOfDeposit,
                            "accountNumber": this.$refs.ruleForm.model
                                .accountNumber,
                            "bankName": this.$refs.ruleForm.model.bankName,
                        }),
                        url: "" + baseURL + "api/teacher/bankcard/save",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: '添加银行卡成功',
                                    type: 'success'
                                });
                                vm.cardmodal = false;
                                vm.getcardlist();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                            }
                        }
                    });
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