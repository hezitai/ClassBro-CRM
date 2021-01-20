var vm = new Vue({
    el: '#app',
    data() {
        return {
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            val: 1,
            page: "",
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
    },
    methods: {
        getTableData: function () {
            var urlinfo = window.location.href; //获取url 
            if (urlinfo.indexOf('=') >= 0) { //判断输入框中是否输入了a
                var userName = urlinfo.split("?")[1].split("=")[1]; //拆分url得到”=”后面的参数 
                var key = decodeURI(userName);
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": 20,
                    "key": key
                },
                url: "" + baseURL + "/sys/seller/order/superList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        handleCurrentChange(val) {
            console.log(val)
            vm.val = val;
            vm.getTableData();
        },
        openorder(row, index) {
            // window.open( "modules/vue/seller_detail.html?id="+row.id+"");
            window.open("modules/vue/seller_detail.html?id=" + row.id + "");
        },
    }
});