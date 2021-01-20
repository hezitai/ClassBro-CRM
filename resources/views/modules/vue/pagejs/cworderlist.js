var vm = new Vue({
    el: '#app',
    data() {
        return {
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            files: [],
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            datas: {
                amount: '',
                current: '',
                studId: '',
            },
            b1: false,
            b2: "确 定",
            updatamodel: false,
            data: '',
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            idss: [],
            options: [],
            val: 1,
            limit: 15,
            page: "",
            timeFrom: '',
            timeTo: '',
            ruleForm: {},
            rules: {}
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
    },
    methods: {
        search() {
            vm.getTableData();
        },
        sees(row, index) {
            // window.open( "seller_detail2.html?id="+row.id+"");
        },
        view(row, index) {
            window.open("" + row + "");
        },
        choosedata: function (value) {
            this.value = value;
            this.timeFrom = value[0];
            this.timeTo = value[1];
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
                    "page": this.val,
                    "limit": this.limit,
                    "timeFrom": this.timeFrom,
                    "timeTo": this.timeTo,
                    "key": this.tableDataName
                },
                url: "" + baseURL + "/sys/finance/audit/getStudAccountRecharge",
                success: function (json) {
                    if (json.status == 200) {
                        self.tableDataEnd = json.body.list;
                        self.total = json.body.totalCount;
                        self.pageSize = json.body.totalCount;
                        self.currentPage = json.body.currPage;
                        loading.close();
                    }
                }
            });
        },
        formatSex: function (row, column) {
            return row.userType == 'S' ? "学生" : row.userType == 'T' ? "老师" : "";
        },
        down() {
            var page = this.val;
            var limit = this.limit;
            var timeFrom = this.timeFrom;
            var timeTo = this.timeTo;
            window.open("" + baseURL + "sys/finance/audit/exportConsumeList?token=" + token + "&timeFrom=" +
                timeFrom + "&timeTo=" + timeTo + "&page=" + page + "&limit=" + limit + "");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": this.limit,
                    "timeFrom": this.timeFrom,
                    "timeTo": this.timeTo,
                },
                url: "" + baseURL + "sys/finance/audit/exportConsumeList",
                success: function (json) {
                    if (json.status == 200) {

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
            console.log(this.idss);
        },
        submitUpload() {
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
                        vm.fileList = [];
                        vm.$refs.ruleForm.model.remark = "";
                        vm.$refs.ruleForm.model.studname = "";
                        vm.$refs.ruleForm.model.name = "";
                        vm.b1 = false;
                        vm.b2 = "确 定";
                    }
                    if (res.data.status == 400) {
                        vm.$message({
                            message: res.data.body.msg,
                            type: 'warning'
                        });
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