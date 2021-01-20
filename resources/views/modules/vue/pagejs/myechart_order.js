var vm = new Vue({
    el: '#app',
    data() {
        return {
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
                },
                url: "" + baseURL + "sys/seller/order/getMyPerformance",
                success: function (json) {
                    if (json.status == 200) {
                        let datas = [];
                        let times = [];
                        json.body.map((item) => {
                            var name = item.money;
                            datas.push("" + name + "");
                            var time = item.time;
                            times.push("" + time + "");
                        });
                        vm.dataname = datas;
                        vm.datatime = times;
                        vm.echartdata();
                    }
                }
            });
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
                    name: '销售业绩',
                    type: 'line',
                    barWidth: '60%',
                    data: this.dataname
                }]
            };
            myChart.setOption(option);
        },
    }

})