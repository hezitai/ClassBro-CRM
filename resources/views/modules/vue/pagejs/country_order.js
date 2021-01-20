var vm = new Vue({
    el: '#app',
    data() {
        return {
            timeFrom: '',
            timeTo: '',
            value4: true,
            val: "1",
            data: '',
            dataname: [],
            datas: [],
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
        this.getechartdata();
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
                url: "" + baseURL + "sys/seller/order/getCountryRate",
                success: function (json) {
                    if (json.status == 200) {
                        let datas = [];
                        json.body.map((item) => {
                            var name = item.name;
                            datas.push("" + name + "");
                        });
                        vm.dataname = datas;
                        vm.datas = json.body,
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
        choosedata(value) {
            this.value = value;
            this.timeFrom = value[0];
            this.timeTo = value[1];
            vm.getechartdata();
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
        regetdata() {
            this.value = "";
            vm.data = "";
            vm.getechartdata();
        },
        echartdata() {
            var myChart = echarts.init(document.getElementById('main'));
            option = {
                title: {
                    text: '国家订单分类占比',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.dataname,
                },
                series: [{
                    name: '订单分类',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: this.datas,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            myChart.setOption(option);
        },
    }

})