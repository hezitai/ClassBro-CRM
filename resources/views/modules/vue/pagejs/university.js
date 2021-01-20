var vm = new Vue({
    el: '#app',
    data() {
        return {
            countryIds: '',
            id: '',
            updatemodel: false,
            btnstatus: false,
            btnval: "确 定",
            countrymodel: false,
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 15,
            val: 1,
            ids: [],
            data: '',
            value: '',
            tudStatuseds: [{
                    label: "英国g5",
                    value: "1",
                },
                {
                    label: "澳洲四大",
                    value: "2",
                },
                {
                    label: "美国常青藤",
                    value: "4",
                },
                {
                    label: "其他",
                    value: "8",
                }
            ],
            ruleForm: {
                name: '',
                code: '',
                currency: '',
                countryId: '',
                type: '',
                ranking: '',
            },
            ruleForms: {
                name: '',
                code: '',
                currency: '',
                countryId: '',
                type: '',
                ranking: '',
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入国家名称',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    message: '请输入国家code',
                    trigger: 'blur'
                }],
                currency: [{
                    required: true,
                    message: '请输入国家货币',
                    trigger: 'blur'
                }],
                countryId: [{
                    required: true,
                    message: '请选择国家货币',
                    trigger: 'change'
                }],
                type: [{
                    required: true,
                    message: '请选择type',
                    trigger: 'change'
                }],
                ranking: [{
                    required: true,
                    message: '请选择ranking',
                    trigger: 'blur'
                }],
            },
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.getcountryId();
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
                url: "" + baseURL + "sys/basedata/university/list",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },
        getcountryId() {
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
                    vm.countryIds = json.body.list;
                }
            });
        },
        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        search() {
            vm.val = 1;
            vm.getTableData();
        },
        addmodel() {
            vm.countrymodel = true;
        },
        change(row, index) {
            vm.id = row.id;
            vm.ruleForms = row;
            vm.updatemodel = true;
        },
        delone(row, index) {
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    cache: false,
                    contentType: "application/json",
                    headers: {
                        "token": token
                    },
                    data: JSON.stringify([row.id]),
                    url: "" + baseURL + "/sys/basedata/university/delete",
                    success: function (json) {
                        if (json.status == "200") {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            vm.getTableData();
                        }
                        if (json.status == "400") {
                            vm.$message({
                                message: json.body.msg,
                                type: 'warning'
                            });
                        }
                    }
                });
            }).catch(() => {});
        },
        del() {
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    cache: false,
                    contentType: "application/json",
                    headers: {
                        "token": token
                    },
                    data: JSON.stringify(vm.ids),
                    url: "" + baseURL + "/sys/basedata/university/delete",
                    success: function (json) {
                        if (json.status == "200") {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            vm.getTableData();
                        }
                        if (json.status == "400") {
                            vm.$message({
                                message: json.body.msg,
                                type: 'warning'
                            });
                        }
                    }
                });
            }).catch(() => {});
        },
        save(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            "countryId": vm.ruleForm.countryId,
                            "areaId": 0,
                            "name": vm.ruleForm.name,
                            "code": vm.ruleForm.code,
                            "currency": vm.ruleForm.currency,
                            "type": Number(vm.ruleForm.type),
                            "ranking": vm.ruleForm.ranking,
                        }),
                        url: "" + baseURL + "sys/basedata/university/save",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.ruleForm.name = "";
                                vm.ruleForm.code = "";
                                vm.ruleForm.currency = "";
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.countrymodel = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
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
        update(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            "id": vm.id,
                            "name": vm.ruleForms.name,
                            "code": vm.ruleForms.code,
                            "currency": vm.ruleForms.currency,
                            "type": Number(vm.ruleForms.type),
                            "ranking": vm.ruleForms.ranking,
                        }),
                        url: "" + baseURL + "sys/basedata/country/update",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.ruleForms.name = "";
                                vm.ruleForms.code = "";
                                vm.ruleForms.currency = "";
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.updatemodel = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
            let ids = [];
            this.multipleSelection.map((item) => {
                var id = item.id;
                ids.push("" + id + "");
            });
            this.ids = ids;
            console.log('多选', ids);
        },
    }
});