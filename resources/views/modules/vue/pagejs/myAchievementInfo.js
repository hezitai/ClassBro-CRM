var vm = new Vue({
    el: '#app',
    data() {
        return {
            data: null,
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
            finishTimeTo: '',
            finishTimeFrom: '',
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
        this.Time();
        this.getMonthDays();
        this.getMonthDay();
        this.getTableData();
        // this.getcardlist();
        // this.getUser();
        // this.getgb();
        // this.teacinfo();
    },
    methods: {
        choosedata: function (value) {
            this.data = value
            this.finishTimeFrom = value[0] + " 00:00:00"
            this.finishTimeTo = value[1] + " 23:59:59"
        },
        seedetail(row, index, offCourseName) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.courseId + "");
                window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
            } else if (row.courseTypeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.courseId + "&wyid=" + row.offCourseName +
                    "&iswy=true");
            } else {
                // window.open("seller_detail2.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.courseId + "");
            }
        },
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
        Time(now) {
            let year = new Date(now).getFullYear();
            let month = new Date(now).getMonth() + 1;
            let date = new Date(now).getDate();
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            return year + "-" + month + "-" + date;
        },
        getMonthDays(myMonth) {
            let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
            let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
            let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },
        getMonthDay(myMonth) {
            var finishTimeFrom = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1)) +
                " 00:00:00";
            var finishTimeTo = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), this
                .getMonthDays(new Date().getMonth()))) + " 23:59:59";
            this.finishTimeTo = finishTimeTo;
            this.finishTimeFrom = finishTimeFrom;
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
            var operId = getUrlStr("id");
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
                    // "token": token,
                    "page": this.val,
                    "limit": this.limit,
                    "operId": operId,
                    "timeFrom": this.finishTimeFrom,
                    "timeTo": this.finishTimeTo,
                    "key": this.tableDataName,
                    "perType": 2,
                },
                headers: {
                    "token": token,
                    // "token": 'a0e48a53db7a7c26a9251b3a473f3ae0',
                },
                url: "" + baseURL + "/sys/seller/order/performanceList",
                // url: "http://192.168.1.170:8088/sys/seller/order/performanceList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        search: function () {
            vm.val = 1;
            this.getTableData();
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