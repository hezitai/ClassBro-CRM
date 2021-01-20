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
            gbs: '',
            table: [],
            tableDataBegin: [],
            tableDataEnd: [],
            currentPage: 0,
            total: 0,
            val: 1,
            limit: 15,
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
        this.getGB();
    },
    methods: {
        search: function () {
            vm.val = 1;
            this.getTableData();
        },
        seedetail(row, index) {
            window.open("teacherInfo.html?id=" + row.userId + "");
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
                    "teacherType": 1,
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