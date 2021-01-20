var vm = new Vue({
    el: '#app',
    data() {
        return {
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
                {
                    label: "待复试",
                    value: "2",
                },
                // {
                //   label: "初试被拒",
                //   value: "3",
                // },
                // {
                //   label: "待培训1",
                //   value: "4",
                // },
                {
                    label: "复试被拒",
                    value: "5",
                },
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
                tudStatused: "2",
                viewStartTime: '',
                viewEndTime: '',
                toOperId: '',
                description: '',
                isCross: '',
                roomUrl: '',
                roomId: '',
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
        shenheshimingrenzheng: function (row) {
            console.log(row);
            $.ajax({
                url: baseURL + 'sys/oper/teacRealName/' + row.id,
                type: 'GET',
                headers: {
                    token: token
                },
                success: function (r) {
                    console.log(r);
                },  
                error: function (r) {

                }

            })
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
                    "order": 'reexamineTime'
                },
                url: "" + baseURL + "/sys/oper/teacList",
                success: function (json) {
                    self.tableDataEnd = json.body.list
                    self.total = json.body.totalCount
                    self.pageSize = json.body.totalCount
                    self.currentPage = json.body.currPage
                    loading.close()
                }
            });
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
                url: "" + baseURL + "/sys/user/queryUserByRoleId?roleId=14",
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
        change(val) {
            if (val == true) {
                vm.btnval = "创建账号"
            } else {
                vm.btnval = "确认淘汰"
            }
        },
        secondCalendar() {
            // window.location.href = 'secondCalendar.html';
            window.location.href = 'interviewSecond.html';
        },
        changeTime(date) {
            this.ruleForm.viewEndTime = "";
            this.pciker2 = {
                disabledDate(time) { //开始时间-结束时间   
                    return (time.getTime() < new Date(date).getTime() - 8.64e7);
                }
            }
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
                                roomId: vm.ruleForm.roomId,
                                roomUrl: vm.ruleForm.roomUrl,
                            },
                            url: "" + baseURL +
                                "/sys/teacherchannel/arrangeSecondInterview",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                    vm.modal = false;
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
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        changeTeac(val) {
            let obj = {};
            obj = this.toOperIds.find((item) => {
                return item.userId === val;
            });
            vm.ruleForm.roomId = obj.roomId;
            vm.ruleForm.roomUrl = obj.roomUrl;
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
                                roomId: vm.ruleForm.roomId,
                                roomUrl: vm.ruleForm.roomUrl,
                            },
                            url: "" + baseURL +
                                "/sys/teacherchannel/updateSecondInterview  ",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                    vm.modal = false;
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
                        url: "" + baseURL + "/sys/teacherchannel/saveSecondInterview",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.resultmodal = false;
                                vm.ruleForm.isCross = "";
                                vm.ruleForm.description = "";
                                vm.ruleForm.rank = "";
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
            vm.modal = true;
            vm.btnval = "更 新";
            vm.ruleForm.toOperId = row.reexamineInterviewer;
            vm.ruleForm.roomId = row.reexamineRoomNum;
            vm.ruleForm.roomUrl = row.reexamineJoinUrl;
            vm.ruleForm.viewStartTime = row.reexamineTime.substring(0, 10);
            vm.startTime = row.reexamineTime.substring(11, 16);
            vm.ruleForm.viewEndTime = row.reexamineEndTime.substring(0, 10);
            vm.endTime = row.reexamineEndTime.substring(11, 16);
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