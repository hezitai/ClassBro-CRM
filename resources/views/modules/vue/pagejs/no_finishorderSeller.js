var vm = new Vue({
    el: '#app',
    data() {
        return {
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            idss: [],
            selects: '',
            key: '',
            id: '',
            val: 1,
            page: "",
            name: '',
            rules: {}
        }
    },

    mounted() {
        this.getTableData();
    },
    methods: {
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
                    "limit": 15,
                    "statused": 358144,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "/sys/oper/getOperatorOrder",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        search() {
            this.getTableData();
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        seedetail(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.id + "");
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else {
                //   window.open("seller_detail.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.id + "");
            }
        },
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
});