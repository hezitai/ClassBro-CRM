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
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            idss: [],
            data: '',
            value: ["", ""],
            page: 1,
            limit: 15,
            ruleForm: {},
            rules: {}
        }
    },
    multipleSelection: [],
    mounted() {
        this.Time();
        this.getMonthDays();
        this.getMonthDay();
        this.getTableData();
    },
    methods: {
        search: function () {
            this.getTableData();
        },
        choosedata: function (value) {
            this.value = value;
            this.finishTimeFrom = value[0] + " 00:00:00"
            this.finishTimeTo = value[1] + " 23:59:59"
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
                    "page": this.page,
                    "perType": 1,
                    "limit": this.limit,
                    "timeFrom": this.finishTimeFrom,
                    "timeTo": this.finishTimeTo
                },
                url: "" + baseURL + "sys/seller/order/getPerformanceRankList",
                success: function (json) {
                    var tableDataEnd = []
                    json.body.list.forEach((element, ids) => {
                        var obj = {}
                        obj.sellerName = element.sellerName
                        obj.deptName = element.deptName
                        obj.money = element.money
                        obj.index = ids
                        obj.page = json.body.currPage
                        tableDataEnd.push(obj)
                    });
                    self.tableDataEnd = tableDataEnd
                    self.total = json.body.totalCount
                    self.pageSize = json.body.totalCount
                    self.currentPage = json.body.currPage
                    loading.close()
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
            var finishTimeFrom = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
            var finishTimeTo = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), this
                .getMonthDays(new Date().getMonth())))
            this.finishTimeFrom = finishTimeFrom + " 00:00:00";
            this.finishTimeTo = finishTimeTo + " 23:59:59";
            this.data = [finishTimeFrom, finishTimeTo]
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.handleCurrentChange(this.currentPage);
            this.getTableData();
        },

        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
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