var vm = new Vue({
    el: '#app',
    data() {
        return {
            toOperIds: {},
            updatemodal: false,
            save: false,
            update: false,
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
            tudStatuseds: [
                {
                  label: "全部",
                  value: "",
                },
                // {
                //   label: "待推荐",
                //   value: "0",
                // },
                {
                    label: "待初试",
                    value: "1",
                },
                // {
                //   label: "待复试",
                //   value: "2",
                // },
                {
                    label: "初试被拒",
                    value: "3",
                },
                // {
                //   label: "待培训1",
                //   value: "4",
                // },
                // {
                //   label: "复试被拒",
                //   value: "5",
                // },
                // {
                //   label: "培训1合格",
                //   value: "6",
                // },
                // {
                //   label: "培训1不合格",
                //   value: "7",
                // },
                // {
                //   label: "培训2合格",
                //   value: "8",
                // },
                // {
                //   label: "培训2不合格",
                //   value: "9",
                // },
                // {
                //   label: "工作中",
                //   value: "10",
                // }
            ],
            ruleForm: {
                tudStatused: "1",
                viewStartTime: '',
                viewEndTime: '',
                toOperId: '',
                description: '',
                isCross: '',

                id: '',
                specializedName: '',
                sex: '',
                birthday: '',
                wxAccount: '',
                email: '',
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
                    message: '请填写面试理由',
                    trigger: 'blur'
                }],
                isCross: [{
                    required: true,
                    message: '请选择面试结果',
                    trigger: 'change'
                }],
                specializedName: [{
                    required: true,
                    message: '请输入擅长学科',
                    trigger: 'blur'
                }],
                birthday: [{
                    required: true,
                    message: '请选择上日',
                    trigger: 'change'
                }],
                wxAccount: [{
                    required: true,
                    message: '请输入微信号',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                }],
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.getopers();
        this.hasPermission();
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
                    "limit": this.limit,
                    "key": this.tableDataName,
                    "tudStatused": this.ruleForm.tudStatused,
                    "order": 'initialIinterviewTime'
                },
                url: "" + baseURL + "/sys/oper/teacList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        change(val) {
            if (val == true) {
                vm.btnval = "下一步"
            } else {
                vm.btnval = "确认淘汰"
            }
        },
        handleClose() {
            return;
        },
        downfile1(row, index) {
            window.open(row.report);
        },
        view_detail(row, index) {
            window.location.href = "updateteacInfo.html?id=" + row.id + "";
        },
        change_spoTypeArr(val) {
            vm.val = 1;
            vm.getTableData();
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
                url: "" + baseURL + "/sys/user/queryUserByRoleId?roleId=22",
                success: function (json) {
                    vm.toOperIds = json.body;
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
        firstCalendar() {
            // window.location.href = 'firstCalendar.html';
            window.location.href = 'interviewFirst.html';
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
                                teacId: vm.teacId,
                                toOperId: vm.ruleForm.toOperId,
                            },
                            url: "" + baseURL + "/sys/teacherchannel/updateFirstInterview ",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                    vm.modal = false;
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 500);
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
        submitForm(formName) {
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
                                teacId: vm.teacId,
                                toOperId: vm.ruleForm.toOperId,
                            },
                            url: "" + baseURL + "/sys/teacherchannel/arrangeFirstInterview",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                    vm.modal = false;
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 500);
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
                        },
                        url: "" + baseURL + "/sys/teacherchannel/saveFirstInterview",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.resultmodal = false;
                                // vm.getTableData();
                                if (vm.ruleForm.isCross == true) {
                                    vm.btnval = "完善信息";
                                    vm.updatemodal = true;
                                } else {
                                    vm.updatemodal = false;
                                }
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
        updateInfo(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            id: this.teacId,
                            specializedName: this.ruleForm.specializedName,
                            // sex:this.ruleForm.sex,
                            birthday: this.ruleForm.birthday,
                            wxAccount: this.ruleForm.wxAccount,
                            email: this.ruleForm.email,
                        }),
                        url: "" + baseURL + "/sys/train/updateTeacher",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.updatemodal = false;
                                setTimeout(function () {
                                    window.location.reload();
                                }, 500);
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
        recommendTeacher(row, index) {
            vm.save = true;
            vm.update = false;
            vm.teacId = row.id;
            vm.modal = true;
            vm.btnval = "确 定"
        },
        updateTeacher(row, index) {
            vm.save = false;
            vm.update = true;
            vm.teacId = row.id;
            console.log(row.initialInterviewTime)
            vm.modal = true;
            vm.btnval = "更 新";
            vm.ruleForm.toOperId = row.interviewer;
            vm.ruleForm.viewStartTime = row.initialInterviewTime.substring(0, 10);
            vm.startTime = row.initialInterviewTime.substring(11, 16);
            vm.ruleForm.viewEndTime = row.initialInterviewEndTime.substring(0, 10);
            vm.endTime = row.initialInterviewEndTime.substring(11, 16);
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