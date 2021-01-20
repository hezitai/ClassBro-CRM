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
            page: 1,
            limit: 15,
            statuses: [{
                label: "待确认",
                status: 1,
            }, {
                label: "进行中",
                status: 4,
            }, {
                label: "已确认",
                status: 2,
            }, {
                label: "全部课堂",
                status: 6,
            }],
            status: 4,
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
            this.page = 1;
            this.getTableData();
        },
        changes() {
            this.search()
        },
        enterstud(row, index) {
            //window.open( row.assistantJoinUrl );
            var code = token;
            var c = String.fromCharCode(code.charCodeAt(0) + code.length);
            for (var i = 1; i < code.length; i++) {
                c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
            }
            var tk = escape(c);
            window.open("" + url + "static-resource/tkcloud/giveLessons.html?classroomId=" + row.id +
                "&iden=assi&tk=" + tk + "");
        },
        enterteac(row, index) {
            // window.open( row.tourJoinUrl );
            var code = token;
            var c = String.fromCharCode(code.charCodeAt(0) + code.length);
            for (var i = 1; i < code.length; i++) {
                c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
            }
            var tk = escape(c);
            window.open("" + url + "static-resource/tkcloud/giveLessons.html?classroomId=" + row.id +
                "&iden=tour&tk=" + tk + "");
        },
        sees(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.cdId + "");
                window.open("bigClassroomInfo1.html?id=" + row.cdId + "");
            } else if (row.typeed == 4) {
                window.open("detail.html?id=" + row.offCourseName + "");
            } else {
                window.open("seller_detail.html?id=" + row.cdId + "");
                // window.open( "seller_detail2.html?id="+row.cdId+"");
            }
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
                    "page": this.page,
                    "limit": this.limit,
                    "spoTypeArr": "0;1;2;4;32",
                    "key": this.tableDataName,
                    "status": this.status,
                },
                url: "" + baseURL + "sys/oper/quality/myClassroomList",
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
            this.limit = val;
            this.handleCurrentChange(this.currentPage);
            this.getTableData();
        },

        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.getTableData();
        },
    }
});