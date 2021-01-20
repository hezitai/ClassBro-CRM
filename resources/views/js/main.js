var vm = new Vue({
    el: '#app',
    data() {
        return {
            addBacklogtextarea: '',
            addBacklog: false,
            backlogData: [],
            backlogLoading: false,
            isLevel3: true,
            getPreListArray: [],
            showThisMonthList: false, // 销售业绩排行弹窗 开关
            showThisMonthListP2: false, // 第二排圈圈业绩排行弹窗 开关
            putIframeSrc: '',
            showCheckBox: false, // 组多选开关
            level: 0, // 全局level
            chooseMonth: '', // 月份绑定
            chooseMonthObj: {}, // 月份 change事件存储当前选中的数据
            chooseMonthToAjaxTo: '', // 传入ajax的时间
            chooseMonthToAjaxFrom: '', // 传入ajax的时间
            monthArray: [], // 月份select 遍历的数组
            defaultPresentMonthObj: {}, // 当前月存储的对象
            defaultPresentBeforeMonthObj: {}, // 当前月的前一月存储的对象
            defaultPresentBeforeBeforeMonthObj: {}, // 当前月的前两月存储的对象
            firstCircleData: {}, // 第一排圈圈数据
            firstCircleXSData: {}, // 第一排圈圈销售业绩××××××××××××××××××××××××××××××××××××
            firstCircleXHData: {}, // 第一排圈圈消耗业绩××××××××××××××××××××××××××××××××××××
            secondCircleData: {}, // 第二排圈圈数据
            thirdRowData: {}, // 第三排 框框 数据
            fourthRowData: { // 第四排数据
                xiaozu: {},
                xiaoshou: {},
            },
            SecondEchartsUpdata: {}, // 第二排 编辑数据 存储对象
            dataname: [],
            datas: [],
            dataname7: [],
            datas7: [],
            ByYear: 0,
            updataUseMoney: false, // 第一排编辑按钮 开关
            updataUseMoneyNum: 0, // 弹窗 编辑业绩目标绑定数据
            isSaveYeji: true, // 是否 纳入业绩考核 switch
            updataUseMoneyNum2: 0,
            updataUseMoney2: false,
            isSaveYeji2: true,
            fiveEchartsLineTime: { // 第五排折线图时间
                from: '',
                to: '',
            },
            checkBoxChoiceDept: [],
            ChoiceDeptArray: [],
            chooseYearObj: {},
            chooseMonthLineObj: {},
            chooseLineYearData: {},
            chooseLineMonthData: 0,
            // choiceYear: false, // 第五排 选择年开关
            defaultPresentYearObj: {}, // 当前年存储的对象
            defaultPresentBeforeYearObj: {}, // 当前年的前一年存储的对象
            defaultPresentBeforeBeforeYearObj: {}, // 当前年的前两年存储的对象
            LineYearArray: [], // 选择年  数组
            LineMonthArray: [{
                value: 0,
                label: '全部'
            }, {
                value: 1,
                label: '1月'
            }, {
                value: 2,
                label: '2月'
            }, {
                value: 3,
                label: '3月'
            }, {
                value: 4,
                label: '4月'
            }, {
                value: 5,
                label: '5月'
            }, {
                value: 6,
                label: '6月'
            }, {
                value: 7,
                label: '7月'
            }, {
                value: 8,
                label: '8月'
            }, {
                value: 9,
                label: '9月'
            }, {
                value: 10,
                label: '10月'
            }, {
                value: 11,
                label: '11月'
            }, {
                value: 12,
                label: '12月'
            }, ],
            backlogDataVal: 1,
            backlogDataLimit: 5,
            backlogDataCurrentPage: 0,
            backlogDataPageSize: 0,
            backlogDataTotal: 0,
            val: 1,
            limit: 5,
        }
    },
    mounted() {
        this.getBacklog(); //待办事项
        this.selectMonth(); // 展示 select月份的 数组
        this.getSellerPerformanceTotal(); // 第一排圈圈 获取数据
        this.getDeptItem(); // 获取组
        this.changeFiveEchartDate(); // 第五排折线图  默认获取前两年
        this.querySellerPerformanceListByUser(); // 获取第二排圈圈数据
        this.querySellerPerformanceOther(); // 获取第三排框框数据
        this.queryDeptPerformanceRank(); // 获取第四排排行
        this.sixthGetechartdata(); // 获取第六行大饼 数据
        this.seventhGetechartdata(); // 获取第七行大饼数据
    },
    methods: {
        tableRowClassName: function ({
            row,
            rowIndex
        }) {
            if (row.checked == true) {
                return 'warning-row';
            } else {
                return '';
            }

        },
        backlogDataSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.backlogDataLimit = val;
            this.getBacklog();
            this.backlogDataCurrentChange(this.backlogDataCurrentPage);
        },
        backlogDataCurrentChange(val) {
            vm.backlogDataVal = val;
            this.getBacklog();
        },
        getBacklog: function () {
            var _this = this;
            this.backlogLoading = true;
            $.ajax({
                url: baseURL + 'sys/todo/mylist',
                data: {
                    page: this.backlogDataVal,
                    limit: this.backlogDataLimit,
                    order:'statused,level desc,create_at desc',
                },
                headers: {
                    token
                },
                type: 'GET',
                success: function (r) {
                    _this.backlogLoading = false;
                    _this.backlogData = r.body.list;
                    _this.backlogDataTotal = r.body.totalCount;
                    _this.backlogDataPageSize = r.body.totalCount;
                    _this.backlogDataCurrentPage = r.body.currPage;
                    for (var i in _this.backlogData) {
                        if (_this.backlogData[i].statused == 1) {
                            _this.backlogData[i].checked = false
                        } else {
                            _this.backlogData[i].checked = true
                        }
                    }
                },
                error: function (er) {
                    _this.backlogLoading = false;
                }
            })
        },
        changeCheckbox: function (row) {
            console.log(row);
            var _this = this;
            this.backlogLoading = true;
            $.ajax({
                url: baseURL + 'sys/todo/update',
                data: {
                    ids: row.id,
                },
                headers: {
                    token
                },
                type: 'GET',
                success: function (r) {
                    _this.backlogLoading = false;
                    _this.getBacklog();
                },
                error: function (er) {
                    _this.backlogLoading = false;
                }
            })
        },
        addBacklogClose: function () {
            this.addBacklog = false;
            this.addBacklogtextarea = '';
        },
        addBacklogSubmit: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/todo/add',
                data: {
                    details: this.addBacklogtextarea,
                    level: 0,
                },
                headers: {
                    token
                },
                type: 'POST',
                success: function (r) {
                    console.log(r);
                    if (r.status == 200) {
                        vm.$message({
                            type: 'success',
                            message: '添加成功'
                        })
                        _this.addBacklogClose();
                        _this.getBacklog();
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        });
                    }
                },
                error: function (er) {
                    _this.backlogLoading = false;
                }
            });
        },
        showCheckBoxEvent: function () {
            if (this.showCheckBox == false) {
                this.showCheckBox = true
            } else {
                this.showCheckBox = false;
            }
        },
        // 展示 select月份的 数组
        selectMonth: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var beforeMonth = Number(month) - 1;
            // days: this.getMonthDays(year, month), // 获取这个月的天数
            if (beforeMonth == 0) {
                beforeMonth == 12
            };
            var beforeBeforeMonth = beforeMonth - 1;
            // 当前月
            this.defaultPresentMonthObj = {
                label: month + '月',
                value: month,
                year: year,
                days: this.getMonthDays(year, month), // 获取这个月的天数
            };
            // 当前月的前一月
            this.defaultPresentBeforeMonthObj = {
                label: beforeMonth + '月',
                value: beforeMonth,
                year: year,
                days: this.getMonthDays(year, beforeMonth), // 获取这个月的天数
            }
            // 当前月的前两月
            this.defaultPresentBeforeBeforeMonthObj = {
                label: beforeBeforeMonth + '月',
                value: beforeBeforeMonth,
                year: year,
                days: this.getMonthDays(year, beforeBeforeMonth), // 获取这个月的天数

            }
            // select 遍历的数组 
            this.monthArray.push(this.defaultPresentMonthObj, this.defaultPresentBeforeMonthObj, this
                .defaultPresentBeforeBeforeMonthObj);
            // 赋 select 的默认值
            this.chooseMonth = this.defaultPresentMonthObj.value;
            this.chooseMonthToAjaxFrom = this.defaultPresentMonthObj.year + '-' + this
                .defaultPresentMonthObj.value + '-1 00:00:00';
            this.chooseMonthToAjaxTo = this.defaultPresentMonthObj.year + '-' + this
                .defaultPresentMonthObj.value + '-' + this.defaultPresentMonthObj.days + ' 23:59:59';
        },
        // 获取月份的天数
        getMonthDays: function (years, months) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var d = new Date(years, months, 0);
            return d.getDate();
        },
        // 选择月份的change事件
        chooseMonthEvent: function (val) {
            let obj = {};
            obj = this.monthArray.find((item) => {
                return item.value === val;
            });
            this.chooseMonthObj = obj;
            this.chooseMonthToAjaxFrom = this.chooseMonthObj.year + '-' + this.chooseMonthObj.value +
                '-1 00:00:00';
            this.chooseMonthToAjaxTo = this.chooseMonthObj.year + '-' + this.chooseMonthObj.value +
                '-' + this.chooseMonthObj.days + ' 23:59:59';
            this.getSellerPerformanceTotal();
            this.querySellerPerformanceListByUser();
        },
        // 第一排圈圈 获取数据
        getSellerPerformanceTotal: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/seller/performance/getSellerPerformanceTotal',
                headers: {
                    token: token,
                },
                data: {
                    timeFrom: _this.chooseMonthToAjaxFrom + '',
                    timeTo: _this.chooseMonthToAjaxTo + ''
                },
                type: 'GET',
                dataType: 'json',
                success: function (r) {
                    _this.firstCircleData = r.body;
                    _this.level = r.body.level;
                    _this.FirstCircleEchartEvent(_this.firstCircleData);
                },
                error: function (er) {}
            });
        },
        // 第一排圈圈 渲染
        FirstCircleEchartEvent(row) {
            function color() {
                var col;
                if (row.info.money < row.info.salesTarget) {
                    col = '#f60';
                } else {
                    col = '#409EFF';
                }
                return col;
            };
            var myChart = echarts.init(document.getElementById('firstCircleEcharts'));
            var titleName;
            if (row.level == 3) {
                titleName = '我的';
            } else {
                titleName = row.deptName;
            }
            option = {
                title: {
                    text: titleName + '业绩指标完成度',
                    subtext: 'AUD ' + row.info.money + '/' + row.info.salesTarget,
                    x: 'center',
                    y: 'top',
                    itemGap: 10,
                    subtextStyle: {
                        color: color(),
                    }
                },
                color: ['#3398DB', '#ccc'],
                animationDuration: function () {
                    return row.info.money * 1 == 0 ? 1 : 2000;
                },
                series: [{
                    name: '消耗业绩',
                    type: 'pie',
                    radius: ['55%', '65%'],
                    center: ['50%', '60%'],
                    animation: true,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: row.info.money * 1 == 0 ? null : row.info.money,
                        itemStyle: {
                            color: '#409EFF'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: function () {
                                    var text;
                                    if (row.info.salesTarget == 0) {
                                        text = '失去梦想的咸鱼\n \n消耗业绩 \n' + row.info
                                            .useMoney;
                                    } else {
                                        text = (row.info.money / row.info
                                                .salesTarget * 100).toFixed(2) +
                                            "%" + '\n\n' + '消耗业绩 \n' + row.info
                                            .useMoney;
                                    }
                                    return text;
                                },
                                textStyle: {
                                    fontSize: 15,
                                    color: '#39CCCC'
                                }
                            },
                            emphasis: {
                                show: true,
                            }
                        },
                    }, {
                        value: row.info.money * 1 > row.info.salesTarget * 1 ? 0 : row
                            .info.salesTarget * 1 - row.info.money * 1,
                        itemStyle: {
                            color: '#666666',
                        },
                    }],
                }]
            };
            myChart.setOption(option);
        },
        // 获取第二排圈圈数据
        querySellerPerformanceListByUser: function () {
            var _this = this;
            var secondCircleElement = $('#secondCircleContent');
            secondCircleElement.empty();
            $.ajax({
                url: baseURL + 'sys/seller/performance/querySellerPerformanceListByUser',
                type: 'GET',
                dataType: 'json',
                data: {
                    timeFrom: _this.chooseMonthToAjaxFrom + '',
                    timeTo: _this.chooseMonthToAjaxTo + ''
                },
                headers: {
                    token: token,
                },
                success: function (r) {
                    _this.secondCircleData = r.body;
                    if (r.body.level == 1) {
                        _this.isLevel3 = true;
                    } else {
                        _this.isLevel3 = false;
                    }
                    for (var i in _this.secondCircleData.list) {
                        // debugger;
                        if (r.body.level != 3) {
                            var html = document.createElement('div');
                            var btn = document.createElement('button');
                            btn.innerHTML = '编 辑';
                            btn.setAttribute('class', 'updateBtn');
                            (function (k) {
                                btn.onclick = function () {
                                    _this.updateBtnEvent(_this.secondCircleData
                                        .list[k], k);
                                }
                            })(i)
                            html.setAttribute('class', 'secondCircleEcharts');
                            secondCircleElement.append(html);
                            var myChart = echarts.init(html);
                            myChart.setOption(_this.SecondCircleEchartEvent(_this
                                .secondCircleData.list[i], _this.secondCircleData
                                .level
                            ));

                            html.append(btn);
                        } else {
                            // var html = document.createElement('div');
                            // html.setAttribute('class', 'secondCircleEcharts');
                            // secondCircleElement.append(html);
                            // var myChart = echarts.init(html);
                            // myChart.setOption(_this.SecondCircleEchartEvent(_this
                            //     .secondCircleData.list[i], _this.secondCircleData
                            //     .level
                            // ));
                        };
                        if (r.body.level == 1) {
                            (function (k) {
                                myChart.on('click', function () {
                                    console.log(k);
                                    _this.showThisMonthListP2 = true;
                                    _this.putIframeSrc =
                                        'modules/vue/monitor.html?deptId=' +
                                        _this.secondCircleData.list[k].deptId;
                                });
                            })(i)
                        }

                    }
                },
                error: function (er) {

                }
            });

        },

        // 第二排 编辑按钮
        updateBtnEvent: function (row, id) {
            this.SecondEchartsUpdata = row;
            this.updataUseMoneyNum2 = this.SecondEchartsUpdata.salesTarget;
            this.updataUseMoney2 = true;
        },

        // 第二排 编辑Dialog Submit按钮
        updataUseMoneySubmit2: function () {
            var _this = this;
            if (this.level == 1) {
                $.ajax({
                    url: baseURL + 'sys/dept/update',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        salesTarget: _this.updataUseMoneyNum2,
                        deptId: _this.SecondEchartsUpdata.deptId,
                    }),
                    contentType: 'application/json',
                    headers: {
                        "token": token,
                    },
                    success: function (r) {
                        if (r.status == 200) {
                            vm.$message({
                                message: '设置成功',
                                type: 'success',
                                duration: 1000
                            });
                            _this.querySellerPerformanceListByUser();
                            _this.updataUseMoney2 = false;
                        } else {
                            vm.$message({
                                message: r.body.msg,
                                type: 'warning',
                                duration: 1000
                            });
                        }
                    },
                    error: function (r) {

                    }
                })
            } else if (this.level == 2) {
                $.ajax({
                    url: baseURL + 'sys/user/update',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        salesTarget: _this.updataUseMoneyNum2,
                        userId: _this.SecondEchartsUpdata.sellerId,
                    }),
                    contentType: 'application/json',
                    headers: {
                        "token": token,
                    },
                    success: function (r) {
                        if (r.status == 200) {
                            vm.$message({
                                message: '设置成功',
                                type: 'success',
                                duration: 1000
                            });
                            _this.querySellerPerformanceListByUser();
                            _this.updataUseMoney2 = false;
                        } else {
                            vm.$message({
                                message: r.body.msg,
                                type: 'warning',
                                duration: 1000
                            });
                        }
                    },
                    error: function (r) {

                    }
                })
            }

        },

        // 第二排圈圈 渲染
        SecondCircleEchartEvent: function (row, le) {
            function color() {
                var col;
                if (row.money < row.salesTarget) {
                    col = '#f60';
                } else {
                    col = '#409EFF';
                }
                return col;
            };
            var titleName;
            if (le == 2) {
                titleName = row.sellerName;
            } else {
                titleName = row.deptName;
            }
            var option = {
                title: {
                    text: titleName + '业绩指标完成度',
                    subtext: 'AUD ' + row.money + '/' + row.salesTarget,
                    x: 'center',
                    y: 'top',
                    itemGap: 10,
                    textStyle: {
                        fontSize: 14
                    },
                    subtextStyle: {
                        color: color(),
                    }
                },
                color: ['#3398DB', '#ccc'],
                animationDuration: function () {
                    return row.money * 1 == 0 ? 1 : 2000;
                },
                series: [{
                    color: ['#409EFF'],
                    name: '消耗业绩',
                    type: 'pie',
                    radius: ['65%', '75%'],
                    center: ['50%', '55%'],
                    animation: true,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: row.salesTarget,
                        name: '销售业绩'
                    }],
                    data: [{
                        value: row.money * 1 == 0 ? null : row.money,
                        itemStyle: {
                            color: '#409EFF'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: function () {
                                    var text;
                                    if (row.salesTarget == 0) {
                                        text = '失去梦想的咸鱼\n \n消耗业绩 \n' + row
                                            .useMoney;
                                    } else {
                                        text = (row.money / row.salesTarget *
                                                100).toFixed(2) + "%" + '\n\n' +
                                            '消耗业绩 \n' + row.useMoney;
                                    }
                                    return text;
                                },
                                textStyle: {
                                    fontSize: 15,
                                    color: '#39CCCC'
                                }
                            },
                            emphasis: {
                                show: true,
                            }
                        },
                    }, {
                        value: row.money >= row.salesTarget ? 0 : row.salesTarget -
                            row.money,
                        itemStyle: {
                            color: '#666666',
                        },
                    }],
                }]
            };
            return option;
        },

        // 获取第三排框框数据
        querySellerPerformanceOther: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/seller/performance/querySellerPerformanceOther',
                type: 'GET',
                dataType: 'json',
                // data:{},
                headers: {
                    token: token,
                },
                success: function (r) {
                    _this.thirdRowData = r.body;
                },
                error: function (er) {

                }
            })
        },

        // 获取第四排排行
        queryDeptPerformanceRank: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/seller/performance/queryDeptPerformanceRank',
                type: 'GET',
                data: {
                    timeFrom: _this.chooseMonthToAjaxFrom + '',
                    timeTo: _this.chooseMonthToAjaxTo + '',
                    page: 1,
                    limit: 1111,
                },
                headers: {
                    token: token,
                },
                dataType: 'json',
                success: function (r) {
                    _this.fourthRowData.xiaozu = r.body
                },
                error: function (er) {

                }
            });
            $.ajax({
                url: baseURL + 'sys/seller/order/getPerformanceRankList',
                type: 'GET',
                data: {
                    timeFrom: _this.chooseMonthToAjaxFrom + '',
                    timeTo: _this.chooseMonthToAjaxTo + '',
                    page: 1,
                    limit: 5,
                    perType: 1,
                },
                headers: {
                    token: token,
                },
                dataType: 'json',
                success: function (r) {
                    _this.fourthRowData.xiaoshou = r.body.list;
                },
                error: function (er) {

                }
            })
        },

        // 获取第六行大饼 数据
        sixthGetechartdata() {
            var _this = this;
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token,
                },
                data: {
                    "timeFrom": this.chooseMonthToAjaxFrom,
                    "timeTo": this.chooseMonthToAjaxTo,
                },
                url: "" + baseURL + "sys/seller/order/getUniversityRate",
                success: function (json) {
                    if (json.status == 200) {
                        let datas = [];
                        json.body.map((item) => {
                            var name = item.name;
                            datas.push("" + name + "");
                        });
                        _this.dataname = datas;
                        _this.datas = json.body,
                            _this.sixthEchartdataEvent();
                    }
                }
            });
        },
        // 第六行大饼渲染
        sixthEchartdataEvent() {
            var myChart = echarts.init(document.getElementById('sixthCircleEcharts'));
            option = {
                title: {
                    text: '当月' + '学校订单分类占比',
                    subtext: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    left: 'left',
                    data: this.dataname,
                },
                series: [{
                    name: '学校',
                    type: 'pie',
                    radius: '55%',
                    center: ['70%', '60%'],
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

        // 获取第七行大饼数据
        seventhGetechartdata() {
            var _this = this;
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                data: {
                    "timeFrom": this.chooseMonthToAjaxFrom,
                    "timeTo": this.chooseMonthToAjaxTo,
                },
                url: "" + baseURL + "sys/seller/order/getCountryRate",
                success: function (json) {
                    if (json.status == 200) {
                        let datas = [];
                        json.body.map((item) => {
                            var name = item.name;
                            datas.push("" + name + "");
                        });
                        _this.dataname7 = datas;
                        _this.datas7 = json.body,
                            _this.seventhEchartdataEvent();
                    }
                }
            });
        },
        // 第七行大饼渲染
        seventhEchartdataEvent() {
            var myChart = echarts.init(document.getElementById('seventhCircleEcharts'));
            option = {
                title: {
                    text: '当月国家订单分类占比',
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
                    data: this.dataname7,
                },
                series: [{
                    name: '国家',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: this.datas7,
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

        // 获取第五排折线图
        queryPerformanceByYear() {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/seller/performance/queryPerformanceByYear',
                type: 'GET',
                dataType: 'json',
                data: {
                    "timeFrom": this.fiveEchartsLineTime.from,
                    "timeTo": this.fiveEchartsLineTime.to,
                    byYear: this.ByYear,
                },
                headers: {
                    "token": token,
                },
                success: function (r) {
                    _this.fivthLineEchartsEvent(r.body);
                },
                error: function (r) {

                }
            })
        },
        // 第五排折线图渲染
        fivthLineEchartsEvent: function (row) {
            var myChart = echarts.init(document.getElementById('fivthLineEcharts'));

            function getX() {
                var timeArray = [];
                for (var i in row) {
                    timeArray.push(row[i].time);
                }
                return timeArray;
            }

            function getData() {
                var dataArray = [];
                for (var i in row) {
                    dataArray.push(row[i].money);
                }
                return dataArray;
            }

            function getUseMoney() {
                var useArray = [];
                for (var i in row) {
                    useArray.push(row[i].useMoney);
                }
                return useArray;
            }
            option = {
                title: {
                    text: '销售/消耗业绩趋势',
                    subtext: '',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: getX(),
                    axisLabel: {
                        rotate: 30,
                        interval: 0,
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '销售业绩',
                    data: getData(),
                    type: 'line'
                }, {
                    // yAxisIndex: 1,
                    name: '消耗业绩',
                    data: getUseMoney(),
                    type: 'line'
                }]
            };
            myChart.setOption(option);
        },
        // 第五排折线图选择 年change事件
        chooseLineYeaEvent: function (val) {
            this.chooseLineMonthData = 0;
            let obj = {};
            obj = this.LineYearArray.find((item) => {
                return item.value === val;
            });
            this.chooseYearObj = obj;
            this.fiveEchartsLineTime.from = this.chooseYearObj.value + '-1-1 00:00:00';
            this.fiveEchartsLineTime.to = this.chooseYearObj.value + '-12-31 23:59:59';
            this.ByYear = 1;
            this.queryPerformanceByYear();
        },
        // 第五排折线图 选择月 change事件
        chooseLineMonthEvent: function (val) {
            let obj = {};
            obj = this.LineMonthArray.find((item) => {
                return item.value === val;
            });
            this.chooseMonthLineObj = obj;
            if (val == 0) {
                this.fiveEchartsLineTime.from = this.chooseYearObj.value + '-1-1 00:00:00';
                this.fiveEchartsLineTime.to = this.chooseYearObj.value + '-12-31 23:59:59';
                this.ByYear = 1;
                this.queryPerformanceByYear();
            } else {
                this.fiveEchartsLineTime.from = this.chooseYearObj.value + '-' + this.chooseMonthLineObj
                    .value + '-1 00:00:00';
                this.fiveEchartsLineTime.to = this.chooseYearObj.value + '-' + this.chooseMonthLineObj
                    .value + '-' + this.getMonthDays(this.chooseYearObj.value, this.chooseMonthLineObj
                        .value) + ' 23:59:59';
                this.ByYear = 0;
                this.queryPerformanceByYear();
            }

        },
        // 第五排折线图  默认获取前两年
        changeFiveEchartDate: function () {
            var _this = this;
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var beforeYear = year - 1;
            var beforeBeforeYear = beforeYear - 1;

            this.defaultPresentYearObj = {
                label: year + '年',
                value: year,
            };
            this.defaultPresentBeforeYearObj = {
                label: beforeYear + '年',
                value: beforeYear,
            };
            this.defaultPresentBeforeBeforeYearObj = {
                label: beforeBeforeYear + '年',
                value: beforeBeforeYear,
            };

            this.chooseLineYearData = this.defaultPresentYearObj.value;
            this.chooseYearObj = this.defaultPresentYearObj;
            this.LineYearArray.push(this.defaultPresentYearObj, this.defaultPresentBeforeYearObj, this
                .defaultPresentBeforeBeforeYearObj);
            this.fiveEchartsLineTime.from = year + '-1-1 00:00:00';
            this.fiveEchartsLineTime.to = year + '-12-31 23:59:59';
            this.ByYear = 1;
            this.queryPerformanceByYear();
        },
        // chooseLineMonth: function () {
        //     var _this = this;
        //     var date = new Date();
        //     var year = date.getFullYear();
        //     var month = date.getMonth();
        //     this.fiveEchartsLineTime.from = year + '-' + month + '-' + '1 00:00:00';
        //     this.fiveEchartsLineTime.to = year + '-' + month + '-' + this.getMonthDays(year, month) +
        //         ' 23:59:59';
        //     this.ByYear = 0;
        //     this.queryPerformanceByYear();
        //     this.chooseLineYearData = '';
        // },

        // 第一排编辑 
        updataFirstRow: function () {
            var _this = this;
            this.updataUseMoney = true;
            this.updataUseMoneyNum = this.firstCircleData.info.salesTarget
        },

        // 第一排编辑 弹窗确认按钮
        updataUseMoneySubmit: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/dept/update',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    // assessed: false,
                    salesTarget: _this.updataUseMoneyNum,
                    deptId: _this.firstCircleData.deptId,
                }),
                contentType: 'application/json',
                headers: {
                    "token": token,
                },
                success: function (r) {
                    if (r.status == 200) {
                        vm.$message({
                            message: '设置成功',
                            type: 'success',
                            duration: 1000
                        });
                        _this.getSellerPerformanceTotal();
                        _this.updataUseMoney = false;
                    } else {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning',
                            duration: 1000
                        });
                    }
                },
                error: function (r) {

                }
            })
        },

        href2() {
            // parent.createStudAccount()
            window.location.href = 'modules/vue/createconfirmCard.html'
        },

        // 获取组
        getDeptItem: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/dept/list',
                type: 'GET',
                dataType: 'json',
                data: {
                    parentId: 7,
                },
                headers: {
                    token: token,
                },
                success: function (r) {
                    console.log(r);
                    _this.checkBoxChoiceDept = r;
                },
                error: function (er) {

                }
            });
        },

        // 多选组的 change事件
        choiceDeptChange: function (row) {
            console.log(row);
            var _this = this;
            var onOff = true;
            if (row.assessed == false) {
                onOff = true;
            } else {
                onOff = false;
            }
            $.ajax({
                url: baseURL + 'sys/dept/update',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    assessed: onOff,
                    // salesTarget: _this.updataUseMoneyNum,
                    deptId: row.deptId,
                }),
                contentType: 'application/json',
                headers: {
                    "token": token,
                },
                success: function (r) {
                    if (r.status == 200) {
                        _this.getDeptItem(); // 获取组
                        _this.getSellerPerformanceTotal(); // 第一排圈圈 获取数据
                        _this.querySellerPerformanceListByUser(); // 获取第二排圈圈数据
                        _this.querySellerPerformanceOther(); // 获取第三排框框数据
                    } else {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning',
                            duration: 1000
                        });
                    }
                },
                error: function (r) {

                }
            })
        },
        showAllPreListEvent: function () {
            // getThisMonthPerformanceRankList showThisMonthList = true
            this.showThisMonthList = true
        },
    }
});