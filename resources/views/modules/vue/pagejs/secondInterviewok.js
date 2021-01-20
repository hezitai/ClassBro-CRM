var vm = new Vue({
    el: '#app',
    data() {
        return {
            yesmodal: false,
            modal: false,
            resultmodal: false,
            btnstatus: false,
            btnval: "确 定",
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            val: 1,
            teacId: '',
            endTime: '',
            startTime: '',
            toOperIds: [],
            tudStatuseds: [{
                    label: "全部",
                    value: "",
                },
                // {
                //   label: "待推荐",
                //   value: "0",
                // },
                // {
                //   label: "待初试",
                //   value: "1",
                // },
                // {
                //   label: "待复试",
                //   value: "2",
                // },
                // {
                //   label: "初试被拒",
                //   value: "3",
                // },
                {
                    label: "待培训1",
                    value: "4",
                },
                // {
                //   label: "复试被拒",
                //   value: "5",
                // },
                {
                    label: "待培训2",
                    value: "6",
                },
                {
                    label: "培训1被拒",
                    value: "7",
                },
                // {
                //   label: "培训2合格",
                //   value: "8",
                // },
                {
                    label: "培训2被拒",
                    value: "9",
                },
                {
                    label: "工作中",
                    value: "10",
                }
            ],
            ruleForm: {
                tudStatused: "",
                description: '',
                viewStartTime: '',
                viewEndTime: '',
                toOperId: '',
                description: '',
                isCross: true,
                roomUrl: '',
                roomId: '',
                rank: '',
            },
            pciker1: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pciker2: {
                disabledDate: (time) => {
                    let beginDateVal = this.ruleForm.viewStartTime;
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal;
                    }
                }
            },
            rules: {
                viewStartTime: [{
                    required: true,
                    message: '请选择开始时间',
                    trigger: 'change'
                }],
                viewEndTime: [{
                    required: true,
                    message: '请选择结束时间',
                    trigger: 'change'
                }],
                toOperId: [{
                    required: true,
                    message: '请选择师资',
                    trigger: 'change'
                }],
                description: [{
                    required: true,
                    message: '请填写内容',
                    trigger: 'blur'
                }],
                isCross: [{
                    required: true,
                    message: '请选择面试结果',
                    trigger: 'change'
                }],
                roomUrl: [{
                    required: true,
                    message: '请填写复试房间地址',
                    trigger: 'blur'
                }],
                roomId: [{
                    required: true,
                    message: '请填写复试房间地ID',
                    trigger: 'blur'
                }],
                rank: [{
                    required: true,
                    message: '请选择教师级别',
                    trigger: 'change'
                }],
            },

            xianshishenfen: false,
            xianshiInfo: {},
            thisTeacId: '',
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.getopers();
        this.hasPermission();
    },
    methods: {
        shenheshimingrenzheng: function (row) {
            console.log(row);
            vm.thisTeacId = row.id;
            $.ajax({
                url: baseURL + 'sys/oper/teacRealName/' + row.id,
                type: 'GET',
                headers: {
                    token: token
                },
                success: function (r) {
                    console.log(r);
                    if (r.status == 200) {
                        vm.xianshiInfo = r.body;
                        vm.xianshishenfen = true;
                    } else {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning'
                        });
                    }
                },
                error: function (r) {

                }

            })
        },
        xianshishenfenSubmit: function (num) {
            console.log(num);
            var _this = this;
            var bool;
            if (num == 0) {
                bool = false;
            } else if (num == 1) {
                bool = true;
            }
            $.ajax({
                url: baseURL + 'sys/oper/aduitTeacRealNameAuth?teacherId=' + vm.thisTeacId + '&pass=' + bool,
                headers: {
                    token: token,
                },
                type: "POST",
                success: function (r) {
                    if (r.status == 200) {
                        vm.$message({
                            message: r.body.msg,
                            type: 'success'
                        });
                        setInterval(function () {
                            window.location.reload();
                        }, 1200)
                    } else {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning'
                        });
                    }
                },
                error: function (er) {

                }
            })
        },
        xianshishenfenClose: function () {
            this.xianshishenfen = false;
            vm.thisTeacId = '';
        },
        lookImg: function (url) {
            window.open(url);
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
                    "key": this.tableDataName,
                    "tudStatused": this.ruleForm.tudStatused,
                },
                url: "" + baseURL + "sys/oper/teacList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        watermelon() {
            vm.modal = true;
        },
        change_spoTypeArr(val) {
            vm.val = 1;
            vm.getTableData();
        },
        downfile1(row, index) {
            window.open(row.report);
        },
        view_detail(row, index) {
            window.location.href = "updateteacInfo.html?id=" + row.id + "&update=true";
        },
        getopers() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": 1000,
                },
                url: "" + baseURL + "/sys/user/operationsList",
                success: function (json) {
                    vm.toOperIds = json.body.list;
                }
            });
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },

        updateTeacher(row, index) {
            vm.resultmodal = true;
            vm.teacId = row.id;
        },
        secondCalendar() {
            window.location.href = 'secondCalendar.html';
        },
        changeTime(date) {
            this.ruleForm.viewEndTime = "";
            this.pciker2 = {
                disabledDate(time) { //开始时间-结束时间   
                    return (time.getTime() < new Date(date).getTime() - 8.64e7);
                }
            }
        },
        updateForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                var viewStartTime = vm.ruleForm.viewStartTime + " " + vm.startTime + ":00";
                var viewEndTime = vm.ruleForm.viewEndTime + " " + vm.endTime + ":00";
                if (valid) {
                    if (vm.startTime == "" || vm.endTime == "") {
                        return;
                    } else {
                        vm.btnstatus = true;
                        vm.btnval = "加载中";
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            headers: {
                                "token": token
                            },
                            data: {
                                viewStartTime: viewStartTime,
                                viewEndTime: viewEndTime,
                                toOperId: vm.ruleForm.toOperId,
                            },
                            url: "" + baseURL + "/sys/teacherchannel/watermelonIsBusy",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                    vm.modal = false;
                                }
                                if (json.status == 400) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                }
                            }
                        });
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        submitForm1(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            isCross: vm.ruleForm.isCross,
                            teacId: vm.teacId,
                            description: vm.ruleForm.description,
                            rank: vm.ruleForm.rank,
                        },
                        url: "" + baseURL + "/sys/teacherchannel/saveCounsellingSkills",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.resultmodal = false;
                                location.reload();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                            }
                        }
                    });

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        yes(row, index) {
            vm.yesmodal = true;
            vm.teacId = row.id;
        },
        yes1(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            isCross: vm.ruleForm.isCross,
                            teacId: vm.teacId,
                            rank: vm.ruleForm.rank,
                            description: vm.ruleForm.description
                        },
                        url: "" + baseURL + "/sys/teacherchannel/saveJobSpecification",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.yesmodal = false;
                                location.reload();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        no1(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            isCross: vm.ruleForm.isCross,
                            teacId: vm.teacId,
                            rank: vm.ruleForm.rank,
                        },
                        url: "" + baseURL + "/sys/teacherchannel/saveJobSpecification",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.resultmodal = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                            }
                        }
                    });

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        no(row, index) {
            this.$confirm('是否要执行此操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "token": token
                    },
                    url: "" + baseURL + "/sys/teacherchannel/saveJobSpecification?teacId=" +
                        row.id + "&isCross=false",
                    success: function (json) {
                        if (json.status == 200) {
                            vm.$message({
                                type: 'success',
                                message: json.body.msg
                            });
                            vm.getTableData();
                        }
                        if (json.status == 400) {
                            vm.$message({
                                type: 'warning',
                                message: json.body.msg
                            });
                        }
                    }
                });
            }).catch(() => {});
        },
        recommendResult(row, index) {
            vm.teacId = row.id;
            vm.resultmodal = true;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
        },

        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        search() {
            vm.val = 1;
            vm.getTableData();
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