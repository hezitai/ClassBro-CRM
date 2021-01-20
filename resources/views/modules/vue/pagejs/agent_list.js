var vm = new Vue({
    el: '#app',
    data() {
        return {
            disabled: false,
            id: '',
            ag: true,
            statu: '',
            selects: '',
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "/sys/agency/save",
            url1: "" + baseURL + "/sys/agency/update",
            agentPics: '',
            agnetLogos: '',
            agnetIcons: '',
            ruleForm: {
                agentName: "",
                deptId: "",
                agentDomain: "",
                agnetLogo: '',
                agentPic: '',
                agnetIcon: '',
            },
            table: true,
            upload: false,
            btnstatus: false,
            btnval: "确 定",
            names: '',
            nameshow: true,
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            val: 1,
            idss: [],
            data: '',
            id: '',
            value: '',
            rules: {}
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.getDeptId();
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
                },
                url: "" + baseURL + "sys/agency/list",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        back() {
            location.reload();
        },
        upDate(row, index) {
            // vm.ag = false;
            vm.disabled = true;
            vm.id = row.id;
            vm.statu = "up";
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "sys/agency/info/" + row.id + "",
                success: function (json) {
                    if (json.status === 200) {
                        vm.ruleForm.agentDomain = json.body.agentDomain;
                        vm.ruleForm.agentName = json.body.agentName;
                        vm.ruleForm.deptId = json.body.id;
                        vm.agentPics = json.body.agentPic;
                        vm.agnetIcons = json.body.agnetIcon;
                        vm.agnetLogos = json.body.agnetLogo;
                    }
                }
            });
            vm.table = false;
            vm.upload = true;
        },
        getDeptId() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/dept/queryDeptByType?deptType=1",
                success: function (json) {
                    vm.selects = json.body;
                }
            });
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        submitForm(formName) {
            if (vm.statu == "add") {
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.submitUpload();
                        vm.btnstatus = true;
                        vm.btnval = "加载中";
                    }
                });
            } else {
                this.$refs.upload.submit();
                this.formDate = new FormData();
                this.$refs.upload.submit();
                this.formDate.append('id', vm.id);
                this.formDate.append('agentName', vm.ruleForm.agentName);
                this.formDate.append('deptId', "" + vm.ruleForm.deptId + "");
                this.formDate.append('agnetLogo', vm.ruleForm.agnetLogo);
                this.formDate.append('agentPic', vm.ruleForm.agentPic);
                this.formDate.append('agnetIcon', vm.ruleForm.agnetIcon);
                let config = {
                    headers: {
                        processData: false,
                        contentType: false,
                        mimeType: "multipart/form-data",
                        token: token,
                    }
                }
                axios.post(vm.url1, this.formDate, config).then(res => {
                    if (res.data.status === 200) {
                        location.reload();
                    }
                }).catch(res => {
                    if (res.data.status === 400) {}
                })
            }
        },

        addInfo() {
            vm.getDeptId();
            vm.table = false;
            vm.upload = true;
            vm.statu = "add";
            vm.ag = true;
        },
        del(row, _index) {
            var self = this;
            this.$confirm('是否要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify([row.id]),
                        url: "" + baseURL + "sys/agency/delete",
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
                                vm.getTableData();
                            }
                        }
                    });
                })
                .catch(_ => {

                });
        },
        success(response, file, fileList) {
            if (response.status == 200) {
                vm.$message({
                    message: '上传文件成功',
                    type: 'success'
                });
                window.setTimeout(location.reload(), 1000);
            }
            if (response.status == 400) {
                vm.$message({
                    message: response.body.msg,
                    type: 'warning'
                });
                vm.btnval = "确定";
                vm.btnstatus = false;
            }
        },
        onerror(response, file, fileList) {
            vm.$message({
                message: response.body.msg,
                type: 'warning'
            });
        },
        change1(file, fileList) {
            vm.imglength = fileList.length;
            vm.ruleForm.agnetIcon = file.raw;
        },
        change2(file, fileList) {
            vm.imglength = fileList.length;
            vm.ruleForm.agnetLogo = file.raw;
        },
        change3(file, fileList) {
            vm.imglength = fileList.length;
            vm.ruleForm.agentPic = file.raw;
        },
        handleRemove(file, fileList) {
            vm.imglength = fileList.length;
        },
        handlePreview(file) {
            console.log(file)
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
        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        search() {
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