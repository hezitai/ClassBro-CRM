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
            gbs: '',
            tableDataBegin: [],
            tableDataEnd: [],
            currentPage: 0,
            total: 0,
            val: 1,
            limit: 10,
            idss: [],
            data: null,
            datas: null,
            finishTimeFrom: null,
            value: '',
            teachers: '',
            teacherid: '',
            tableDataName: "",
            finishTimeTo: null,
            finishTimeFromEcharts: '2019-01-01 00:00:00',
            finishTimeToEcharts: '',
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
        this.getGB();
        this.getEcharts()
    },
    methods: {
        search: function () {
            vm.val = 1;
            this.getTableData();
            this.getGB()
        },
        seedetail(row, index) {
            window.open("teacherInfo.html?id=" + row.userId + "");
        },

        choosedata: function (value) {
            this.finishTimeFrom = value[0] + " 00:00:00";
            this.finishTimeTo = value[1] + " 23:59:59";
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
                    "timeFrom": this.finishTimeFrom,
                    "timeTo": this.finishTimeTo,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "sys/oper/queryPluralisticIncome",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.limit = json.body.pageSize;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        choosedataecharts(value) {
            this.datas = value
            this.finishTimeFromEcharts = value[0] + " 00:00:00"
            this.finishTimeToEcharts = value[1] + " 23:59:59"
            this.getEcharts()
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
            this.finishTimeToEcharts = finishTimeTo;
            this.data = [this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1)), this.Time(
                new Date(new Date().getFullYear(), new Date().getMonth(), this.getMonthDays(
                    new Date().getMonth())))]
        },
        getEcharts() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "timeFrom": this.finishTimeFromEcharts,
                    "timeTo": this.finishTimeToEcharts,
                },
                url: "" + baseURL + "sys/oper/queryPartTeacherECharts",
                success: function (json) {
                    if (json.status === 200) {
                        data = json.body.dateStrList
                        var allMoneyList = allMoneyList
                        var moneyList = json.body.moneyList
                        var otherMoneyList = json.body.otherMoneyList
                        var averageList = json.body.averageList
                        var finishTimeFromEcharts = vm.finishTimeFromEcharts.substring(0, 10)
                        var finishTimeToEcharts = vm.finishTimeToEcharts.substring(0, 10)
                        var myChart = echarts.init(document.getElementById('main'));
                        option = {
                            title: {
                                text: finishTimeFromEcharts + " 到 " + finishTimeToEcharts +
                                    " 的兼职业绩"
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    },
                                    dataView: {
                                        readOnly: false
                                    },
                                    magicType: {
                                        type: ['line', 'bar']
                                    },
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            legend: {
                                data: ['G币', '平均']
                            },
                            xAxis: [{
                                type: 'category',
                                data: data,
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }],
                            yAxis: [{
                                    type: 'value',
                                    interval: 500,
                                    axisLabel: {
                                        formatter: '{value}'
                                    }
                                },
                                {
                                    type: 'value',
                                    interval: 100,
                                    axisLabel: {
                                        formatter: '{value} 个'
                                    }
                                }
                            ],
                            series: [{
                                    name: 'G币',
                                    type: 'bar',
                                    data: moneyList
                                },
                                {
                                    name: '平均',
                                    type: 'line',
                                    //yAxisIndex: 1,
                                    data: averageList
                                }
                            ]
                        };
                        myChart.setOption(option);
                    }
                }
            });
        },
        getGB() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "timeFrom": this.finishTimeFrom,
                    "timeTo": this.finishTimeTo,
                    "key": this.tableDataName,
                    "teacherType": 2,
                },
                url: "" + baseURL + "sys/oper/queryPartTeacherGbTotal",
                success: function (json) {
                    if (json.status === 200) {
                        var table = []
                        var obj = {}
                        obj.gbs = Number(json.body.money)
                        table.push(obj)
                        vm.table = table
                    }
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            // this.handleCurrentChange(this.currentPage);
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