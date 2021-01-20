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
            timeFrom: '',
            timeTo: '',
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
        this.compile();
        this.getTableData();
    },
    methods: {
        search: function () {
            this.getTableData();
        },
        choosedata: function (value) {
            this.value = value;
            this.timeFrom = value[0] + " " + "00:00:00",
                this.timeTo = value[1] + " " + "23:59:59";
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
                    "order": "asc",
                    "limit": this.limit,
                    "timeFrom": this.timeFrom,
                    "timeTo": this.timeTo,
                },
                url: "" + baseURL + "/sys/seller/order/myDeptPerformanceList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        compile(code) {
            var code = "bae3d1ad-d126-4c0a-ad29-52117b296b57";
            var c = String.fromCharCode(code.charCodeAt(0) + code.length);
            for (var i = 1; i < code.length; i++) {
                c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
            }
            console.log(escape(c));
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