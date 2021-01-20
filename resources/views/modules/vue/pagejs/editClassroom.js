var vm = new Vue({
    el: '#app',
    data() {
        return {
            pickerOptionsStart: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pickerOptionsEnd: {
                disabledDate: (time) => {
                    let beginDateVal = this.startTime;
                    if (beginDateVal) {
                        return (
                            time.getTime() < new Date(beginDateVal).getTime()
                        );
                    } else {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            },
            dis: false,
            update: false,
            save: false,
            upbtn: false,
            sabtn: false,
            id: '',
            preferentialDate: [],
            tableDataEnd: [],
            studCurrency: null,
            pModel: false,
            lessionModel: false,
            number: 1,
            btnval: "保存",
            btnstatus: false,
            name: null,
            courseCode: null,
            ruleForm: {
                name: null,
                decimalRoomCost: null,
                startTime: null,
                endTime: null,
                description: null,
                decimalPreferential: null,
                roomType: "1",
            },
            rules: {
                name: [{
                    required: true,
                    message: '请填写课堂名称',
                    trigger: 'blur'
                }],
                decimalRoomCost: [{
                    required: true,
                    message: '请填写课堂单价',
                    trigger: 'blur'
                }],
                description: [{
                    required: true,
                    message: '请填写课堂描述',
                    trigger: 'blur'
                }],
                startTime: [{
                    required: true,
                    message: '请选择开始时间',
                    trigger: 'change'
                }],
                endTime: [{
                    required: true,
                    message: '请选择结束时间',
                    trigger: 'change'
                }],
                decimalPreferential: [{
                    required: true,
                    message: '请填写优惠信息',
                    trigger: 'blur'
                }],
                roomType: [{
                    required: true,
                    message: '请填选择课堂类型',
                    trigger: 'change'
                }],
            },
            isIframe:false,
        }
    },

    mounted() {
        this.getClassroomInfo();
    },
    methods: {
        getClassroomInfo() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var isIframe = getUrlStr("isIframe");
            if(isIframe == true){
                this.isIframe = false;
            } else {
                this.isIframe = true;
            }

            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "isBig": true,
                },
                url: "" + baseURL + "sys/seller/classcourse/getCourseObject?id=" + id + "",
                success: function (json) {

                    if (json.status == 200) {
                        vm.name = json.body.studPurchaseOrder.courseName;
                        vm.courseCode = json.body.studPurchaseOrder.courseCode;
                        vm.studCurrency = json.body.studPurchaseOrder.currency
                        vm.tableDataEnd = json.body.classroomList;
                        vm.preferentialDate = json.body.studPreferentialPolicies;
                    }
                }
            });
        },
        saveLession(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/classcourse/updateClassroom",
                        contentType: "application/json",
                        data: JSON.stringify({
                            id: vm.id,
                            decimalRoomCost: this.ruleForm.decimalRoomCost,
                            name: this.ruleForm.name,
                            startTime: this.ruleForm.startTime,
                            endTime: this.ruleForm.endTime,
                            description: this.ruleForm.description,
                            roomType: this.ruleForm.roomType,
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'success',
                                });
                                vm.lessionModel = false;
                                vm.btnstatus = false;
                                vm.btnval = "保存";
                                vm.getClassroomInfo();
                            }
                            if (r.status == 400) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'warning',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "保存";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editLession(row, index) {
            vm.update = true;
            vm.save = false;
            vm.ruleForm.name = row.name;
            vm.ruleForm.courseCode = row.courseCode;
            vm.ruleForm.decimalRoomCost = row.roomCost;
            vm.ruleForm.startTime = row.startTime;
            vm.ruleForm.endTime = row.endTime;
            vm.ruleForm.description = row.description;
            vm.ruleForm.roomType = "" + row.roomType + "";
            vm.id = row.id,
                vm.lessionModel = true;
            vm.dis = true;
        },
        delLession(row, index) {
            var self = this;
            self.$confirm('是否删除该课堂?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": token,
                            "id": row.id,
                        },
                        url: "" + baseURL + "sys/seller/classcourse/deleteClassroom",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getClassroomInfo();
                            }
                        }
                    });
                })
                .catch(() => {});
        },
        getUniversity(val) {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "countryId": val
                },
                url: "" + baseURL + "sys/basedata/university/list",
                success: function (json) {
                    vm.universitys = json.body.list;
                }
            });
        },
        change_startTime(val) {
            this.startTime = val;
            this.ruleForm.endTime = "";
            this.pciker2 = {
                disabledDate(time) { //开始时间-结束时间   
                    return (time.getTime() < new Date(date).getTime() - 8.64e7);
                }
            }
        },
        back() {
            window.history.back(-1);
        },
        saveClass(formName) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/classcourse/appendClassroom",
                        contentType: "application/json",
                        data: JSON.stringify({
                            cdId: id,
                            decimalRoomCost: this.ruleForm.decimalRoomCost,
                            name: this.ruleForm.name,
                            startTime: this.ruleForm.startTime,
                            endTime: this.ruleForm.endTime,
                            description: this.ruleForm.description,
                            roomType: this.ruleForm.roomType,
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'success',
                                });
                                window.top.location.reload()
                            }
                            if (r.status == 400) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'warning',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "保存";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addClass() {
            vm.update = false;
            vm.save = true;
            vm.lessionModel = true;
            vm.dis = false;
        },
        addPreferential() {
            vm.upbtn = false;
            vm.sabtn = true;
            vm.pModel = true;
        },
        editP(row, index) {
            vm.ruleForm.decimalPreferential = row.preferential;
            vm.upbtn = true;
            vm.sabtn = false;
            vm.pModel = true;
        },
        delP(row, index) {
            var self = this;
            self.$confirm('是否删除该优惠?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": token,
                        },
                        url: "" + baseURL + "sys/seller/classcourse/deletePrefer?preferId=" +
                            row.id + "",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getClassroomInfo();
                            }
                        }
                    });
                })
                .catch(() => {});
        },
        up(formName) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/classcourse/updatePrefer",
                        contentType: "application/json",
                        data: JSON.stringify({
                            courseId: id,
                            decimalPreferential: Number(this.ruleForm
                                .decimalPreferential),
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'success',
                                });
                                window.top.location.reload()
                            }
                            if (r.status == 400) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'warning',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "保存";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        sa(formName) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/classcourse/addPrefer",
                        contentType: "application/json",
                        data: JSON.stringify({
                            courseId: id,
                            decimalPreferential: Number(this.ruleForm
                                .decimalPreferential),
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'success',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "保存";
                                vm.pModel = false;
                                vm.getClassroomInfo();
                            }
                            if (r.status == 400) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'warning',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "保存";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
});