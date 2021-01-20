var vm = new Vue({
    el: '#app',
    data() {
        return {
            timeFrom: '',
            timeTo: '',
            value4: true,
            val: "0",
            data: '',
            dataname: [],
            datas: [],
            datatime: [],
            value: ["", ""],
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
        }
    },
    mounted() {
        // this.sss();
        this.getechartdata();
        this.Time();
    },
    methods: {
        getechartdata() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                data: {
                    "timeFrom": this.timeFrom,
                    "timeTo": this.timeTo,
                    "byYear": this.val,
                },
                url: "" + baseURL + "sys/seller/order/getMyDeptPerformance",
                success: function (json) {
                    if (json.status == 200) {
                        let datas = [];
                        let times = [];
                        json.body.map((item) => {
                            var name = item.money;
                            datas.push("" + name + "");
                            var time = item.time;
                            var sellerName = item.sellerName;
                            times.push("" + time + "");
                        });
                        vm.dataname = datas;
                        vm.datatime = times;
                        vm.echartdata();
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
        //本周第一天；
        showWeekFirstDay() {
            let Nowdate = new Date();
            let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            let M = Number(WeekFirstDay.getMonth()) + 1;
            if (M < 10) {
                M = "0" + M;
            }
            let D = WeekFirstDay.getDate();
            if (D < 10) {
                D = "0" + D;
            }
            return WeekFirstDay.getFullYear() + "-" + M + "-" + D;
        },
        //本周最后一天
        showWeekLastDay() {
            let Nowdate = new Date();
            let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
            let M = Number(WeekLastDay.getMonth()) + 1;
            if (M < 10) {
                M = "0" + M;
            }
            let D = WeekLastDay.getDate();
            if (D < 10) {
                D = "0" + D;
            }
            return WeekLastDay.getFullYear() + "-" + M + "-" + D;
        },
        //获得某月的天数：
        getMonthDays(myMonth) {
            let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
            let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
            let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },
        sss() {
            this.timeFrom = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
            this.timeTo = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), this
                .getMonthDays(new Date().getMonth())));
        },
        changevalue(val) {
            if (val == false) {
                this.val = 0;
                this.timeFrom = "2018-01-01";
                this.timeTo = "2018-12-31"
                this.getechartdata();
            } else {
                this.val = 1;
                this.sss();
                this.getechartdata();
            }
        },
        choosedata(value) {
            this.value = value;
            this.timeFrom = value[0];
            this.timeTo = value[1];
            vm.getechartdata();
        },
        regetdata() {
            vm.timeFrom = "2018-01-01";
            vm.timeTo = "2018-12-31";
            vm.val = "0";
            vm.data = "";
            vm.getechartdata();
        },
        echartdata() {
            var myChart = echarts.init(document.getElementById('main'));
            option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: this.datatime

                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '业绩查询',
                    type: 'line',
                    barWidth: '60%',
                    data: this.dataname
                }]
            };
            myChart.setOption(option);
            myChart.on('click', function (param) {
                vm.val = "1";
                var name = param.name;
                if (name == "2018-01") {
                    vm.timeFrom = "2018-01-01";
                    vm.timeTo = "2018-01-31";
                    vm.getechartdata();
                } else if (name == "2018-02") {
                    vm.timeFrom = "2018-02-01";
                    vm.timeTo = "2018-02-28";
                    vm.getechartdata();
                } else if (name == "2018-03") {
                    vm.timeFrom = "2018-03-01";
                    vm.timeTo = "2018-03-31";
                    vm.getechartdata();
                } else if (name == "2018-04") {
                    vm.timeFrom = "2018-04-01";
                    vm.timeTo = "2018-04-30";
                    vm.getechartdata();
                } else if (name == "2018-05") {
                    vm.timeFrom = "2018-05-01";
                    vm.timeTo = "2018-05-31";
                    vm.getechartdata();
                } else if (name == "2018-06") {
                    vm.timeFrom = "2018-06-01";
                    vm.timeTo = "2018-06-30";
                    vm.getechartdata();
                } else if (name == "2018-07") {
                    vm.timeFrom = "2018-07-01";
                    vm.timeTo = "2018-07-31";
                    vm.getechartdata();
                } else if (name == "2018-08") {
                    vm.timeFrom = "2018-08-01";
                    vm.timeTo = "2018-08-31";
                    vm.getechartdata();
                } else if (name == "2018-09") {
                    vm.timeFrom = "2018-09-01";
                    vm.timeTo = "2018-09-30";
                    vm.getechartdata();
                } else if (name == "2018-10") {
                    vm.timeFrom = "2018-10-01";
                    vm.timeTo = "2018-10-31";
                    vm.getechartdata();
                } else if (name == "2018-11") {
                    vm.timeFrom = "2018-11-01";
                    vm.timeTo = "2018-11-30";
                    vm.getechartdata();
                } else if (name == "2018-12") {
                    vm.timeFrom = "2018-12-01";
                    vm.timeTo = "2018-12-31";
                    vm.getechartdata();
                }
            });
        },
    }

})