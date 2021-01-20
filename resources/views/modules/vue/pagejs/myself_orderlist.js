var vm = new Vue({
    el: '#app',
    data() {
        return {
            btnstatus: false,
            btnval: "查询销售业绩",
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
            val: 1,
            limit: 15,
            idss: [],
            data: '',
            value: '',
            ruleForm: {},
            rules: {}
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
    },
    methods: {
        search: function () {
            vm.val = 1;
            var data = vm.value;
            if (data == null) {

            } else {
                var finishTimeFrom = data[0];
                var finishTimeTo = data[1];
                var self = this;
                var token = localStorage.getItem("token");
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        "token": token,
                        "page": this.val,
                        "limit": this.limit,
                        "finishTimeFrom": finishTimeFrom,
                        "finishTimeTo": finishTimeTo
                    },
                    url: "" + baseURL + "sys/report/sellerPerformance/myOrderPerformanceList",
                    success: function (json) {
                        self.tableDataEnd = json.body.list;
                        self.total = json.body.totalCount;
                        self.pageSize = json.body.totalCount;
                        self.currentPage = json.body.currPage;
                    }
                });
            }

        },
        choosedata: function (value) {
            this.value = value;
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
                },
                url: "" + baseURL + "sys/report/sellerPerformance/myOrderPerformanceList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },
        all() {
            vm.btnstatus = true;
            vm.btnval = "加载中";
            var data = vm.value;
            var finishTimeFrom = data[0];
            var finishTimeTo = data[1];
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "finishTimeFrom": finishTimeFrom,
                    "finishTimeTo": finishTimeTo
                },
                url: "" + baseURL + "sys/report/sellerPerformance/myOrderPerformance",
                success: function (json) {
                    $("#performance").html(json.performance + " " + "AUD");
                    vm.btnstatus = false;
                    vm.btnval = "查询销售业绩"
                }
            });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.val = val;
            this.getTableData();
        },


        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
});