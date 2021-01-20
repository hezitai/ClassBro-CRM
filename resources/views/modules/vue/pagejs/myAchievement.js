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
            finishTimeTo: '',
            finishTimeFrom: '',
            finishTimeFromEcharts: '2019-01-01 00:00:00',
            finishTimeToEcharts: '',
            gbs: '',
            tableDataBegin: [],
            tableDataEnd: [],
            currentPage: 0,
            total: 0,
            val: 1,
            limit: 15,
            idss: [],
            data: null,
            datas: null,
            value: '',
            teachers: '',
            teacherid: '',
            tableDataName: "",
            sysOperEntityList: '',
            dateStrList: '',
            allmoney: '',
            allorderNumber: '',
            wyallorderNumber: '',
            allOrderMoney: '',
            series: [{
                    name: '1',
                    type: 'line',
                    data: ['9', '2']
                },
                {
                    name: '2',
                    type: 'line',
                    data: ['6', '2']
                }
            ],
            ruleForm: {
                teacher: '',
            },
            rules: {},
            showToYYT: false,
        }
    },
    mounted() {
        this.Time();
        this.getMonthDays();
        this.getMonthDay();
        this.getTableData();
        this.getEcharts();
    },
    filters: {
        rounding(value) {
            return value.toFixed(2)
        }
    },
    methods: {
        search: function () {
            vm.val = 1;
            this.getTableData();
        },
        seedetail(row, index) {
            window.open("myAchievementInfo.html?id=" + row.customerServicesId + "");
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
            this.finishTimeToEcharts = finishTimeTo;
            this.finishTimeFrom = finishTimeFrom;
        },
        choosedata: function (value) {
            this.data = value
            this.finishTimeFrom = value[0] + " 00:00:00"
            this.finishTimeTo = value[1] + " 23:59:59"
        },
        choosedataecharts(value) {
            this.datas = value
            this.finishTimeFromEcharts = value[0] + " 00:00:00"
            this.finishTimeToEcharts = value[1] + " 23:59:59"
            this.getEcharts()
        },

        getTableData() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token,
                    // "token": 'a0e48a53db7a7c26a9251b3a473f3ae0',
                },
                data: {
                    "page": this.val,
                    "limit": this.limit,
                    "timeFrom": this.finishTimeFrom,
                    "timeTo": this.finishTimeTo,
                    "key": this.tableDataName,
                    "perType": 2
                },
                url: "" + baseURL + "/sys/oper/queryOperUsePerformance",
                // url: "http://192.168.1.170:8088/sys/oper/queryOperUsePerformance",
                success: function (json) {
                    console.log(json);
                    vm.showToYYT = json.body.showAllTable;
                    var allmoney = 0
                    var allorderNumber = 0
                    var wyallorderNumber = 0;
                    var allOrderMoney = 0;
                    json.body.data.forEach(item => {
                        allmoney += Number(item.money * 1 + item.wyardMoney * 1) // 1
                        allorderNumber += Number(item.orderNumber); // 4
                        wyallorderNumber += Number(item.wyardMoney); // 3
                        allOrderMoney += Number(item.money); //2
                    }, 0);
                    vm.allmoney = allmoney
                    vm.allorderNumber = allorderNumber
                    vm.wyallorderNumber = wyallorderNumber;
                    vm.allOrderMoney = allOrderMoney;
                    var table = []
                    var obj = {}
                    obj.allmoney = allmoney
                    obj.allorderNumber = allorderNumber
                    table.push(obj)
                    vm.table = table
                    self.tableDataEnd = json.body.data
                    self.total = json.body.totalCount
                    self.limit = json.body.pageSize
                    self.currentPage = json.body.currPage
                    loading.close()
                }
            });
        },
        getEcharts() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "timeFrom": this.finishTimeFromEcharts,
                    "timeTo": this.finishTimeTo
                },
                url: "" + baseURL + "sys/oper/queryOperPerformanceECharts",
                success: function (json) {
                    if (json.status === 200) {
                        data = json.body.dateStrList
                        var sysOperEntityList = []
                        json.body.sysOperEntityList.forEach(element => {
                            var obj = {}
                            obj.name = element.operName
                            obj.type = "line"
                            obj.data = element.moneyList
                            sysOperEntityList.push(obj)
                        });
                        var series = sysOperEntityList
                        var finishTimeFromEcharts = vm.finishTimeFromEcharts.substring(0, 10)
                        var finishTimeToEcharts = vm.finishTimeToEcharts.substring(0, 10)
                        var myChart = echarts.init(document.getElementById('main'));
                        option = {
                            title: {
                                text: finishTimeFromEcharts + " 到 " + finishTimeToEcharts +
                                    " 师资业绩"
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {

                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    saveAsImage: {}
                                }
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: data
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    formatter: '{value} AUD'
                                }
                            },
                            series: series
                        };
                        myChart.setOption(option);
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