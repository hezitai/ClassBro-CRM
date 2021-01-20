var vm = new Vue({
    el: '#app',
    data() {
        return {
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            table: [],
            applymodel: false,
            signUpNumber: '',
            haveOrderNumber: '',
            appdates: [],
            tableDataBegin: [],
            tableDataEnd: [],
            currentPage: 0,
            total: 0,
            val: 1,
            limit: 15,
            currentPage1: 0,
            total1: 0,
            val1: 1,
            limit1: 10,
            idss: [],
            data: null,
            finishTimeFrom: null,
            value: '',
            teachers: '',
            teacherid: '',
            tableDataName: "",
            finishTimeTo: null,
            ruleForm: {
                teacher: '',
            },
            rules: {}
        }
    },
    mounted() {
        this.Time();
        this.getMonthDays();
        this.getMonthDay();
        this.getTableData();
    },
    methods: {
        search: function () {
            vm.val = 1;
            this.getTableData();
        },
        seedetail(row, index) {
            window.open("teacherInfo.html?id=" + row.userId + "");
        },
        dialogVisible() {
            vm.applymodel = false;
        },
        seedetail(row, index) {
            vm.idStr = (row.signUps).join(",")
            if (row.signUp == 0) {
                return
            } else {
                var self = this;
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        "token": token,
                        "page": this.val1,
                        "limit": this.limit1,
                        "idStr": vm.idStr,
                    },
                    url: "" + baseURL + "/sys/teacherchannel/teacList",
                    success: function (json) {
                        vm.appdates = json.body.list;
                        vm.applymodel = true;
                        self.total1 = json.body.totalCount;
                        self.limit1 = json.body.pageSize;
                        self.currentPage1 = json.body.currPage;
                    }
                });
            }
        },
        seedetail1(row, index) {
            vm.idStr = (row.firstExams).join(",")
            if (row.firstExam == 0) {
                return
            } else {
                vm.getchannldate();
            }
        },
        seedetail2(row, index) {
            vm.idStr = (row.secondExams).join(",")
            if (row.secondExam == 0) {
                return
            } else {
                vm.getchannldate();
            }
        },
        seedetail3(row, index) {
            vm.idStr = (row.finashExams).join(",")
            if (row.finashExam == 0) {
                return
            } else {
                vm.getchannldate();
            }
        },
        seedetail4(row, index) {
            vm.idStr = (row.haveOrders).join(",")
            if (row.haveOrder == 0) {
                return
            } else {
                vm.getchannldate();
            }
        },
        seedetail5(row, index) {
            if (row.levelOne.length > 0) {
                vm.idStr = (row.levelOne).join(",")
            } else {
                vm.idStr = row.levelOne
            }
            if (row.levelOne == 0) {
                return
            } else {
                vm.getchannldate();
            }
        },
        seedetail6(row, index) {
            if (row.levelTwo.length > 0) {
                vm.idStr = (row.levelTwo).join(",")
            } else {
                vm.idStr = row.levelTwo
            }
            if (row.levelTwo == 0) {
                return
            } else {
                vm.getchannldate();
            }
        },
        seedetail7(row, index) {
            if (row.levelThree.length > 0) {
                vm.idStr = (row.levelThree).join(",")
            } else {
                vm.idStr = row.levelThree
            }
            if (row.levelThree == 0) {
                return
            } else {
                vm.getchannldate();
            }
        },
        getchannldate() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val1,
                    "limit": this.limit1,
                    "idStr": vm.idStr,
                },
                url: "" + baseURL + "/sys/teacherchannel/teacList",
                success: function (json) {
                    vm.appdates = json.body.list;
                    vm.applymodel = true;
                    self.total1 = json.body.totalCount;
                    self.limit1 = json.body.pageSize;
                    self.currentPage1 = json.body.currPage;
                }
            });
        },
        choosedata: function (value) {
            this.finishTimeFrom = value[0] + " 00:00:00";
            this.finishTimeTo = value[1] + " 23:59:59";
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
                    "startTime": this.finishTimeFrom,
                    "endTime": this.finishTimeTo,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "/sys/teacherchannel/queryPerformance",
                success: function (json) {
                    if (json.status === 200) {
                        var table = []
                        var objs = {}
                        objs.signUpNumber = json.body.signUpNumber;
                        objs.haveOrderNumber = json.body.haveOrderNumber;
                        table.push(objs)
                        vm.table = table
                        var tableDataEnd = [];
                        vm.signUpNumber = json.body.signUpNumber;
                        vm.haveOrderNumber = json.body.haveOrderNumber;
                        json.body.teacherChannels.forEach(element => {
                            var obj = {};
                            obj.signUp = element.signUp.length;
                            obj.finashExam = element.finashExam.length;
                            obj.firstExam = element.firstExam.length;
                            obj.haveOrder = element.haveOrder.length;
                            obj.secondExam = element.secondExam.length;
                            obj.levelOne = element.levelOne.length;
                            obj.levelOnes = element.levelOne;
                            obj.levelTwo = element.levelTwo.length;
                            obj.levelTwos = element.levelTwo;
                            obj.levelThree = element.levelThree.length;
                            obj.levelThrees = element.levelThree;
                            obj.signUp = element.signUp.length;
                            obj.signUps = element.signUp;
                            obj.finashExams = element.finashExam;
                            obj.firstExams = element.firstExam;
                            obj.haveOrders = element.haveOrder;
                            obj.secondExams = element.secondExam;
                            obj.userName = element.userName;
                            obj.exchange = ((element.firstExam.length / element
                                .signUp.length) * 100).toFixed(2) + "%";
                            obj.exchange1 = ((element.secondExam.length / element
                                .signUp.length) * 100).toFixed(2) + "%";
                            obj.exchange2 = ((element.finashExam.length / element
                                .signUp.length) * 100).toFixed(2) + "%";
                            obj.exchange3 = ((element.haveOrder.length / element
                                .signUp.length) * 100).toFixed(2) + "%";
                            if (element.firstExam.length == 0) {
                                obj.exchange = "0.00%"
                            }
                            if (element.secondExam.length == 0) {
                                obj.exchange1 = "0.00%"
                            }
                            if (element.finashExam.length == 0) {
                                obj.exchange2 = "0.00%"
                            }
                            if (element.haveOrder.length == 0) {
                                obj.exchange3 = "0.00%"
                            }
                            tableDataEnd.push(obj);
                        });
                        vm.tableDataEnd = tableDataEnd;
                        self.total = json.body.totalCount;
                        self.limit = json.body.pageSize;
                        self.currentPage = json.body.currPage;
                        loading.close();
                    }
                }
            });
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
            this.data = [this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1)), this.Time(
                new Date(new Date().getFullYear(), new Date().getMonth(), this.getMonthDays(
                    new Date().getMonth())))]
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
        },

        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },
        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.limit1 = val;
            this.getchannldate();
        },

        handleCurrentChange1(val) {
            vm.val1 = val;
            this.getchannldate();
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