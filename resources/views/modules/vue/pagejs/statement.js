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
            data: '',
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            idss: [],
            options: [],
            val: 1,
            limit: 15,
            page: "",
            timeFrom: '',
            timeTo: '',
            ruleForm: {},
            rules: {}
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
    },
    methods: {
        search() {
            vm.getTableData();
        },
        sees(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.courseDemandId + "");
                window.open("bigClassroomInfo1.html?id=" + row.courseDemandId + "");
            } else if (row.typeed == 4) {
                window.open("detail.html?id=" + row.offCourseName + "");
            } else {
                //   window.open("seller_detail2.html?id=" + row.courseDemandId + "");
                window.open("seller_detail.html?id=" + row.courseDemandId + "");
            }
        },
        choosedata: function (value) {
            this.value = value;
            this.timeFrom = value[0];
            this.timeTo = value[1];
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
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": this.limit,
                    "timeFrom": this.timeFrom,
                    "timeTo": this.timeTo,
                    "key": this.tableDataName
                },
                url: "" + baseURL + "sys/finance/audit/queryConsumeList",
                success: function (json) {
                    if (json.status == 200) {
                        self.tableDataEnd = json.body.list;
                        self.total = json.body.totalCount;
                        self.pageSize = json.body.totalCount;
                        self.currentPage = json.body.currPage;
                        loading.close();
                    }
                }
            });
        },
        formatSex: function (row, column) {
            return row.userType == 'S' ? "学生" : row.userType == 'T' ? "老师" : "";
        },
        down() {
            var page = this.val;
            var limit = this.limit;
            var timeFrom = this.timeFrom;
            var timeTo = this.timeTo;
            window.open("" + baseURL + "sys/finance/audit/exportConsumeList?token=" + token + "&timeFrom=" +
                timeFrom + "&timeTo=" + timeTo + "&page=" + page + "&limit=" + limit + "");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": this.limit,
                    "timeFrom": this.timeFrom,
                    "timeTo": this.timeTo,
                },
                url: "" + baseURL + "sys/finance/audit/exportConsumeList",
                success: function (json) {
                    if (json.status == 200) {

                    }
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
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
            console.log(this.idss);
        },

    }
});