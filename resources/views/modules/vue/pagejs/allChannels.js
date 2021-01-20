var vm = new Vue({
    el: '#app',
    data() {
        return {
            toOperIds: '',
            toOperId: '',
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            data: {
                teacId: '',
            },
            teacId: '',
            file1model: false,
            file1model1: false,
            btnstatus: false,
            btnval: "确 定",
            btnstatus1: false,
            btnval1: "更 新",
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            val: 1,
            tudStatuseds: [{
                    label: "全部",
                    value: "",
                },
                {
                    label: "无合作方式",
                    value: "0",
                },
                {
                    label: "院校合作",
                    value: "1",
                },
                {
                    label: "企业合作",
                    value: "2",
                },
                {
                    label: "资源合作",
                    value: "3",
                },
                {
                    label: "校园代理",
                    value: "4",
                }
            ],
            ruleForm: {
                tudStatused: '',
            },
            rules: {

            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.hasPermission();
        this.getSysUserNames();
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
                    "channelType": this.ruleForm.tudStatused,
                    "sysUserId": this.toOperId,
                    // "teacType":2,
                },
                url: "" + baseURL + "/sys/TeacChannel/channel/list",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
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
        getSysUserNames() {
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
        change_spoTypeArr(val) {
            vm.val = 1;
            vm.getTableData();
        },
        change_sysUserName(val) {
            vm.val = 1;
            console.log(vm.toOperId)
            vm.getTableData();
        },
        creatChanne() {
            window.location.href = 'creatChanne.html';
        },
        view_detail(row, index) {
            window.location.href = "creatChanne.html?iscreat=false&id=" + row.id + "";
        },
        downfile1(row, index) {
            window.open(row.report);
        },
        downfile2(row, index) {
            window.open(row.resume);
        },
        recommendTeacher(row, index) {
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
                    url: "" + baseURL + "/sys/teacherchannel/recommendTeacher?teacId=" + row.id + "",
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
        submitUpload() {
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('teacId', vm.teacId);
            let config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    token: token,
                }
            }
            axios.post("" + baseURL + "/sys/teacherchannel/uploadReport", this.formDate, config).then(res => {
                if (res.data.status == 200) {
                    vm.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    vm.file1model = false;
                    vm.getTableData();
                    vm.fileList = [];
                    vm.b1 = false;
                    vm.b2 = "确 定";
                }
                if (res.data.status == 400) {
                    vm.b1 = false;
                    vm.b2 = "确 定";
                    vm.$message({
                        message: res.data.body.msg,
                        type: 'warning'
                    });
                }
            }).catch(res => {
                vm.$message({
                    message: res.data.body.msg,
                    type: 'warning'
                });
            })
        },
        save1(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.b1 = true;
                    vm.b2 = "加载中";
                    vm.submitUpload();
                } else {
                    vm.$message({
                        message: "请完善信息",
                        type: 'warning'
                    });
                }
            });
        },
        upfile1(row, index) {
            vm.teacId = row.id;
            vm.file1model = true;
        },
        upfile2(row, index) {
            vm.teacId = row.id;
            vm.file1model1 = true;
        },
        handlePreview(file) {
            console.log(file);
        },
        success(response, file, fileList) {
            console.log(response);
        },
        onerror(response, file, fileList) {
            vm.$message({
                message: response.body.msg,
                type: 'warning'
            });
        },
        change(file, fileList) {
            vm.files = fileList
        },
        uploadFile(file) {
            var files = vm.files
            this.formDate = new FormData();
            for (i = 0; i < files.length; i++) {
                this.formDate.append('file' + i, files[i].raw);
            }
            console.log(files)
        },
        handleRemove(file, fileList) {
            vm.fileListnum = fileList.length
            console.log(vm.fileListnum)
            if (fileList.length == 1) {
                // vm.display = false;
            }
        },
        submitUpload1() {
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('teacId', vm.teacId);
            let config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    token: token,
                }
            }
            axios.post("" + baseURL + "/sys/teacherchannel/uploadResume", this.formDate, config).then(res => {
                if (res.data.status == 200) {
                    vm.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    vm.file1model1 = false;
                    vm.getTableData();
                    vm.fileList = [];
                    vm.b1 = false;
                    vm.b2 = "确 定";
                }
                if (res.data.status == 400) {
                    vm.b1 = false;
                    vm.b2 = "确 定";
                    vm.$message({
                        message: res.data.body.msg,
                        type: 'warning'
                    });
                }
            }).catch(res => {
                vm.$message({
                    message: res.data.body.msg,
                    type: 'warning'
                });
            })
        },
        save2(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.b1 = true;
                    vm.b2 = "加载中";
                    vm.submitUpload1();
                } else {
                    vm.$message({
                        message: "请完善信息",
                        type: 'warning'
                    });
                }
            });
        },
    }
});