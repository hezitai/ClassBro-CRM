var vm = new Vue({
    el: '#app',
    data() {
        return {
            file1s: [],
            files: [],
            fileList1: [],
            myHeaders1: {
                token: token
            },
            url1: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            datas1: {
                amount: '',
                current: '',
                studId: '',
            },
            b11: false,
            b21: "确 定",
            updatamodel: false,
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            data: {
                amount: '',
                current: '',
                studId: '',
            },
            // display:true, 
            b1: false,
            b2: "确 定",
            person: false,
            countrys: '',
            mm: false,
            error: '',
            description: '',
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            filterTableDataEnd: [],
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            key: '',
            courseId: '',
            val: 1,
            page: "",
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            ruleForm: {
                current: '',
                description: '',
                amount: '',
                files: [],
                remark: '',
            },
            rules: {
                amount: [{
                    required: true,
                    message: '请填写金额',
                    trigger: 'blue'
                }],
                current: [{
                    required: true,
                    message: '请填写货币类型',
                    trigger: 'blue'
                }],
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.getcountrys();
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
                    "limit": 15,
                    "type": 10,
                    "postWay": 4,
                    "key": this.tableDataName
                },
                url: "" + baseURL + "/sys/seller/order/queryStudAccountLog",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        search: function () {
            vm.val = 1
            vm.getTableData()
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        getcountrys() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/country/list",
                success: function (json) {
                    vm.countrys = json.body.list;
                }
            });
        },
        view(row, index) {
            window.open(row + "");
        },
        searchname() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "absoluteMobile": vm.$refs.ruleForm.model.name,
                    "page": 1,
                    "limit": 100000,
                },
                url: "" + baseURL + "/sys/seller/order/checkMobile",
                success: function (json) {
                    if (json.status == 200) {
                        if (json.body.studUserRVO == null) {
                            vm.error = ""
                        } else {
                            vm.$refs.ruleForm.model.studname = json.body.studUserRVO.nickName;
                            vm.error = "该学生已注册";
                            vm.userId = json.body.studUserRVO.userId;
                            vm.person = true;
                            vm.submitUpload();
                        }
                        if (json.body.teacUserRVO != null) {
                            vm.error = "该账号已经被老师注册，请更换手机号";
                        }
                        if (json.body.sysUserEntity != null) {
                            vm.error = "该账号已经在CRM注册，请更换手机号";
                        }
                        if (json.body.studUserRVO == null && json.body.sysUserEntity == null &&
                            json.body.teacUserRVO == null) {
                            vm.mobile_show = true;
                            vm.error = "该账号未被注册"
                        }
                    }
                    if (json.status == 400) {
                        vm.error = json.body.msg;
                        vm.ruleForm.nickName = "";
                    }

                }
            });
        },
        updateimg(row, index) {
            vm.userId = row.id;
            vm.ruleForm.name = row.mobile;
            vm.ruleForm.studname = row.nickName;
            vm.ruleForm.remark = row.description;
            vm.updatamodel = true;
        },
        submitUpload1() {
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('logId', vm.userId);
            this.formDate.append('remark', vm.ruleForm.remark);
            let config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    token: token,
                }
            }
            axios.post("" + baseURL + "/sys/finance/audit/addEvidenceThumb", this.formDate, config).then(
                res => {
                    if (res.data.status == 200) {
                        vm.$message({
                            message: res.data.body.msg,
                            type: 'success'
                        });
                        vm.updatamodel = false;
                        vm.getTableData();
                        vm.fileList1 = [];
                        vm.$refs.ruleForm.model.remark = "";
                        vm.$refs.ruleForm.model.studname = "";
                        vm.$refs.ruleForm.model.name = "";
                        vm.b11 = false;
                        vm.b21 = "确 定";
                    }
                    if (res.data.status == 400) {
                        vm.$message({
                            message: res.data.body.msg,
                            type: 'warning'
                        });
                        vm.b11 = false;
                        vm.b21 = "确 定";
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
                    vm.b11 = true;
                    vm.b21 = "加载中";
                    vm.submitUpload1();
                } else {
                    vm.$message({
                        message: "请完善信息",
                        type: 'warning'
                    });
                }
            });
        },
        handlePreview1(file) {
            console.log(file);
        },
        success1(response, file, fileList) {
            console.log(response);
        },
        onerror1(response, file, fileList) {
            vm.$message({
                message: response.body.msg,
                type: 'warning'
            });
        },
        change1(file, fileList) {
            vm.file1s = fileList
        },
        uploadFile1(file) {
            var files = vm.file1s
            this.formDate = new FormData();
            for (i = 0; i < files.length; i++) {
                this.formDate.append('file' + i, files[i].raw);
            }
        },
        handleRemove1(file, fileList) {
            vm.fileListnum = fileList.length
            console.log(vm.fileListnum)
            if (fileList.length == 1) {
                // vm.display = false;
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
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
        ////////////121212
        submitUpload() {
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('current', vm.$refs.ruleForm.model.current);
            this.formDate.append('studId', vm.userId);
            this.formDate.append('amount', vm.$refs.ruleForm.model.amount);
            this.formDate.append('remark', vm.ruleForm.remark);
            let config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    token: token,
                }
            }
            axios.post("" + baseURL + "sys/seller/order/evidenceThumbSave", this.formDate, config).then(
                res => {
                    if (res.data.status == 200) {
                        vm.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        vm.mm = false;
                        vm.getTableData();
                        vm.fileList = [];
                        vm.$refs.ruleForm.model.current = "";
                        vm.$refs.ruleForm.model.amount = "";
                        vm.$refs.ruleForm.model.studname = "";
                        vm.$refs.ruleForm.model.name = "";
                        vm.b1 = false;
                        vm.b2 = "确 定";
                    }
                    if (res.data.status == 400) {
                        if (vm.$refs.ruleForm.model.amount != "") {
                            vm.$message({
                                message: res.data.body.msg,
                                type: 'warning'
                            });
                        }
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
        searchs() {
            vm.mm = true;
        },
        save(formName) {
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
    }
});