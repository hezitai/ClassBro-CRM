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
                status: 7,
            }],
            status: 4,
            ruleForm: {},
            rules: {}
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.hasPermission();
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
        enterteacs(row, index) {
            // window.open( row.tourJoinUrl );
            var code = token;
            var c = String.fromCharCode(code.charCodeAt(0) + code.length);
            for (var i = 1; i < code.length; i++) {
                c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
            }
            var tk = escape(c);
            window.open("" + url + "static-resource/tkcloud/giveLessons.html?classroomId=" + row.id +
                "&iden=steac&tk=" + tk + "");
        },
        sees(row, index) {
            if (window.parent.permissions.indexOf("sys:seller:myOrder:xiugai") > -1) {
                if (row.spoType == 64) {
                    // window.open("bigClassOrderInfo.html?id=" + row.cdId + "");
                    if (row.parentId == null) {
                        window.open("bigClassroomInfo1.html?id=" + row.cdId + "&teacherId=" + row.teacherId);
                    } else {
                        window.open("bigClassOrderInfo.html?id=" + row.cdId);
                    }
                    // window.open("bigClassroomInfo1.html?id=" + row.cdId + "");
                } else {
                    // window.open("seller_detail.html?id=" + row.cdId + "&parentId=" + row.parentId + "");
                    window.open("seller_detail.html?id=" + row.cdId + "&parentId=" + row.parentId + "");
                }
            } else {
                return;
            }
        },
        positiveClassroom(row, index) {
            var self = this;
            this.$confirm('是否要执行此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        data: {
                            "token": token,
                            "classroomId": row.id,
                        },
                        url: "" + baseURL + "/sys/seller/order/positiveClassroom",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success',
                                    duration: 1000
                                });
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'wanring',
                                    duration: 1000
                                });
                            }
                        }
                    });
                })
                .catch(_ => {

                });
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
                    "key": this.tableDataName,
                    "status": this.status,
                },
                url: "" + baseURL + "sys/seller/quality/myClassroomList",
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
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.getTableData();
        },
    }
});