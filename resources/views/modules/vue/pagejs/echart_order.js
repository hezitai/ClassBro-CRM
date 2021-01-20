var vm = new Vue({
    el: '#app',
    data() {
        return {
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
                    "timeFrom": this.value[0],
                    "timeTo": this.value[1],
                },
                url: "" + baseURL + "sys/seller/order/selectOrderTypeRate",
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
                title: {
                    text: '订单分类占比',
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