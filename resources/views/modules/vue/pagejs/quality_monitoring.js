var vm = new Vue({
    el: '#app',
    data() {
        return {
            history: '',
            dialogVisible:false,
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
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
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
            if (row.spoType == 64) {
                // window.open("bigClassOrderInfo.html?id=" + row.cdId + "");
                if (row.parentId == null) {
                    window.open("bigClassroomInfo1.html?id=" + row.cdId + "&teacherId=" + row.teacherId);
                } else {
                    window.open("bigClassOrderInfo.html?id=" + row.cdId);
                }
                // window.open("bigClassroomInfo1.html?id=" + row.cdId + "");
            } else {
                // window.open( "seller_detail.html?id="+row.cdId+"&parentId="+row.parentId+"");
                window.open("seller_detail.html?id=" + row.cdId + "&parentId=" + row.parentId + "");
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
                    "key": this.tableDataName,
                    "status": this.status,
                },
                url: "" + baseURL + "sys/seller/quality/classroomList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
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

        revise(row, index) {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/seller/order/getClassroomConversation",
                dataType: "json",
                data: {
                    "token": token,
                    "classroomId": row.id,
                },
                success: function (r) {
                    vm.history = [];
                    if (r.status == 400) {
                        alert("暂无记录")
                    } else {
                        vm.dialogVisible = true;
                        function timestampToTime(timestamp) {
                            var date = new Date(timestamp);
                            var Y = date.getFullYear() + '-';
                            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) :
                                date.getMonth() + 1) + '-';
                            var D = date.getDate() + ' ';
                            var h = date.getHours() + ':';
                            var m = date.getMinutes() + ':';
                            var s = date.getSeconds();
                            return Y + M + D + h + m + s;
                        }
                        var ess = [];
                        for (i = 0; i < r.body.list.length; i++) {
                            var es = [];
                            var joinTime = timestampToTime(r.body.list[i].joinTime);
                            var leaveTime = timestampToTime(r.body.list[i].leaveTime);
                            var userroleid = r.body.list[i].userroleid;
                            var suerrole = '';
                            if (userroleid == "0") {
                                suerrole = "讲师"
                            } else if (userroleid == "1") {
                                suerrole = "助教"
                            } else if (userroleid == 2) {
                                suerrole = "学员"
                            } else if (userroleid == "3") {
                                suerrole = "直播用户"
                            } else {
                                suerrole = "巡检员"
                            }
                            var m = r.body.list[i].duration;
                            var duration = m / 60;
                            durations = duration.toFixed(2);
                            es.nickname = r.body.list[i].nickname;
                            es.joinTime = joinTime;
                            es.suerrole = suerrole;
                            es.duration = durations;
                            es.leaveTime = leaveTime;
                            ess.push(es);
                        }
                        vm.history = ess;
                        console.log(vm.history)
                    }
                }
            });
        },

    }
});