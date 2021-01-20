var vm = new Vue({
    el: '#app',
    data() {
        return {
            classbtn: false,
            courses: '',
            mm: false,
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "/sys/seller/courseware/save",
            data: {
                cdId: "",
                groupId: ""
            },
            selects: [],
            masterModel: false,
            btnstatus: false,
            btnval: "确 定",
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            val: 1,
            idss: [],
            id: '',
            value: '',
            ruleForm: {
                course: '',
                title: '',
            },
            rules: {
                type: [{
                    required: true,
                    message: '请选择坏单类型',
                    trigger: 'change'
                }],
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.coursedata();
        this.getUser();
        this.getMaster();
        this.hasPermission();
    },
    methods: {
        activateClasseoom(row, index) {
            this.$confirm('此操作是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        "token": token
                    },
                    url: "" + baseURL +
                        "sys/seller/classcourse/activeClassCourse?courseId=" + row.id + "",
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
                    "isCrm": true,
                    "statused": 328703,
                },
                url: "" + baseURL + "/sys/seller/classcourse/queryClassCourses",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        seedetail(row, index) {
            if (row.parentId == null) {
                window.open("bigClassroomInfo1.html?id=" + row.id + "&teacherId=" + row.teacherId);
            } else {
                window.open("bigClassOrderInfo.html?id=" + row.id);
            }
        },
        coursedata() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/seller/courseware/groupList",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                success: function (r) {
                    vm.courses = r.body.list;
                }
            });
        },
        change_course(courseid) {
            vm.data.groupId = courseid;
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        closeClassroom(row, index) {
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
                    url: "" + baseURL +
                        "/sys/seller/classcourse/compelFinishedClassCourse?courseId=" + row
                        .id + "",
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
        deleteClasseoom(row, index) {
            this.$confirm('此操作将结束该班课, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        "token": token
                    },
                    url: "" + baseURL +
                        "/sys/seller/classcourse/finishedClassCourse?courseId=" + row.id +
                        "",
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
        upFile(row, index) {
            vm.mm = true;
            vm.data.cdId = row.id;
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },
        getUser() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                },
                url: "" + baseURL + "sys/user/info",
                success: function (json) {
                    var roleIdList = json.user.roleIdList;
                    roleIdList.forEach(v => {
                        if (v === 16 || v === 11 || v === 6) {
                            vm.classbtn = true;
                        }
                    })
                }
            });
        },
        addClasseoom(row, index) {
            window.location.href = "addClassroom.html?id=" + row.id + "";
        },
        seebill(row, index) {
            window.location.href = "editClassroom.html?id=" + row.id + "";
        },
        creatOrder(row, index) {
            window.location.href = "creatClassroomOrder.html?id=" + row.id + "";
        },
        creatBadClassroom() {
            window.location.href = "creatBigClassroom.html";
        },
        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        search() {
            vm.val = 1;
            vm.getTableData();
        },
        change_teacher(row, index) {
            this.$confirm('是否要申请更换老师?', '提示', {
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
                            "courseId": row.id,
                        },
                        url: "" + baseURL + "sys/seller/order/applyAccidentOrder",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                        }
                    });
                })
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
        submitUpload() {
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('id', vm.bigid);
            let config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    token: token,
                }
            }
            axios.post("" + baseURL + "/sys/seller/courseware/save", this.formDate, config).then(res => {
                if (res.data.status == 200) {
                    vm.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    vm.mm = false;
                    vm.getTableData();
                    vm.fileList = [];
                    vm.b1 = false;
                    vm.b2 = "确 定";
                }
                if (res.data.status == 400) {
                    vm.b1 = false;
                    vm.b2 = "确 定";
                }
            }).catch(res => {
                vm.$message({
                    message: res.data.body.msg,
                    type: 'warning'
                });
            })
        },
        success(response, file, fileList) {
            if (response.status == 200) {
                vm.$message({
                    message: '上传文件成功',
                    type: 'success'
                });
                vm.fileList = [];
                vm.mm = false;
            }
            if (response.status == 400) {
                vm.$message({
                    message: response.body.msg,
                    type: 'warning'
                });
                vm.fileList = [];
            }
        },
        onerror(response, file, fileList) {
            vm.$message({
                message: response.body.msg,
                type: 'warning'
            });
        },
        change(file, fileList) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
        },
        handleRemove(file, fileList) {},
        uploadFile(file) {
            this.formDate = new FormData();
            this.formDate.append('file', file.file);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handlePreview(file) {
            console.log(file);
        },
        change_Master(row, _index) {
            vm.masterModel = true;
            vm.courseId = row.id;
        },
        getMaster() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "isMaster": true,
                },
                url: "" + baseURL + "sys/user/getMyDeptUserList",
                success: function (json) {
                    vm.selects = json.body.list;
                }
            });
        },
        submitForm(formName) {
            let _this = this;
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
                            "courseId": vm.courseId,
                            "toUserId": vm.ruleForm.title,
                        },
                        url: "" + baseURL + "sys/seller/classcourse/changeMaster",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.masterModel = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.masterModel = false;
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },


    }
});