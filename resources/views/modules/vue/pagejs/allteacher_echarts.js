var vm = new Vue({
    el: '#app',
    data() {
        return {
            value4: true,
            val: "0",
            data: '',
            dataname: [],
            dataname1: [],
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
                    "timeFrom": this.value[0],
                    "timeTo": this.value[1],
                    "page": 1,
                    "byYear": 1,
                    "limit": 50,
                },
                url: "" + baseURL + "sys/oper/getTeacherPerformance",
                success: function (json) {
                    if (json.status == 200) {
                        let datas = [];
                        let datas1 = [];
                        let times = [];
                        json.body.map((item) => {
                            var name = item.money;
                            datas.push("" + name + "");
                            var name1 = item.otherMoney;
                            datas1.push("" + name1 + "");
                            var time = item.teacherName;
                            times.push("" + time + "");
                        });
                        vm.dataname = datas;
                        vm.datatime1 = datas1;
                        vm.datatime = times;
                        vm.echartdata();
                    }
                }
            });
        },
        changevalue(val) {
            if (val == false) {
                this.val = 1;
                this.getechartdata();
            } else {
                this.val = 0;
                this.getechartdata();
            }
        },
        choosedata(value) {
            this.value = value;
            vm.getechartdata();
        },
        regetdata() {
            this.value = "";
            vm.data = "";
            vm.getechartdata();
        },
        echartdata() {
            var myChart = echarts.init(document.getElementById('main'));
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['G币', 'OTG币']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: this.datatime
                },
                series: [{
                        name: 'G币',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: this.dataname
                    },
                    {
                        name: 'OTG币',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: this.datatime1
                    }
                ]
            };
            myChart.setOption(option);
        },
    }

})