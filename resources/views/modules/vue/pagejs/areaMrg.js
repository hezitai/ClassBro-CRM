var vm = new Vue({
    el: '#app',
    data() {
        return {
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            tableDataEnds: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            filterTableDataEnd: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            idss: [],
            options: [],
            county: '',
            county2: '',
            radio: '1',
            selectedOptions: [],
            selects: '',
            selects1: '',
            selects2: '',
            selects3: '',
            countryId: '',
            key: '',
            page: "",
            value1: '',
            value2: '',
            value3: '',
            province1: '',
            province2: '',
            province3: '',
            superId: '',
            label: '',
            dialogStatus: "",
            country: '',
            ruleForm: {
                // title: '',
                // activityNo: '',
                // participantUser: '',
                // actualCost:''
            },
            rules: {
                province1: [{
                    required: true,
                    message: '请输入省份',
                    trigger: 'blur'
                }],
                province2: [{
                    required: true,
                    message: '请输入市份',
                    trigger: 'blur'
                }],
                province3: [{
                    required: true,
                    message: '请输入区份',
                    trigger: 'blur'
                }],
                activityNo: [{
                    required: true,
                    message: '请选择国家',
                    trigger: 'change'
                }],
                zipcode: [{
                    required: true,
                    message: '请选择国家',
                    trigger: 'change'
                }]
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        if (this.totalItems > this.pageSize) {
            for (let index = 0; index < this.pageSize; index++) {
                this.tableDataEnd.push(this.tableDataBegin[index]);
            }
        } else {
            this.tableDataEnd = this.tableDataBegin;
        }
    },
    methods: {
        getTableData: function () {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 8,
                    "orderId": 1,
                    "countryId": 19
                },
                url: "http://192.168.155.1:8088/sys/basedata/area/list",
                success: function (json) {
                    self.tableDataEnds = json.body;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                },
                error: function (json) {

                }
            });
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 8
                },
                url: "http://192.168.155.1:8088/sys/basedata/country/list",
                success: function (json) {
                    self.country = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                },
                error: function (json) {

                }
            });
        },
        change_country: function (id) {
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 8,
                    "countryId": id,
                    "superId": 1
                },
                url: "http://192.168.155.1:8088/sys/basedata/area/list",
                success: function (json) {
                    self.tableDataEnds = json.body;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                },
                error: function (json) {}
            });
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        handleChange(item) {
            vm.countryId = item;
            this.ruleForm.value1 = null;
            this.ruleForm.value2 = null;
            this.ruleForm.value3 = null;
            vm.selects1 = '';
            vm.selects2 = '';
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "countryId": item,
                    "superId": 0,
                },
                url: "http://192.168.155.1:8088/sys/basedata/area/list",
                success: function (json) {
                    vm.selects1 = json.body;
                }
            });
        },

        handleChangeareas(item) {
            this.ruleForm.value2 = null;
            this.ruleForm.value3 = null;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "superId": item,
                },
                url: "http://192.168.155.1:8088/sys/basedata/area/list",
                success: function (json) {
                    vm.selects2 = json.body;

                }
            });
        },
        handleChangearea(item) {
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "superId": item
                },
                url: "http://192.168.155.1:8088/sys/basedata/area/list",
                success: function (json) {
                    vm.selects2 = json.body;
                }
            });
        },
        dialogVisible(row, _index) {
            this.listIndex = _index;
            this.editObj = row;
            let index = this.listIndex
            var item = this.tableDataEnds[index];
            this.dialogFormVisible = true;
            this.ruleForm = {
                name: item.name,
                zipcode: item.zipcode

            };
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 10
                },
                url: "http://192.168.155.1:8088/sys/basedata/country/list",
                success: function (json) {
                    vm.selects = json.body.list;
                }
            });
        },
        add() {
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 10
                },
                url: "http://192.168.155.1:8088/sys/basedata/country/list",
                success: function (json) {
                    vm.selects = json.body.list;
                    vm.getTableData();
                }
            });
            this.dialogFormVisible2 = true;
            this.ruleForm = {};
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.page = this.currentPage;
            console.log(this.page);
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": val,
                    "limit": 8
                },
                url: "http://192.168.155.1:8088/sys/channel/channelactivity/list",
                success: function (json) {
                    self.tableDataEnds = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                },
                error: function (json) {

                }
            });
        },

        currentChangePage(list) {
            this.list = list;
            let from = (this.currentPage - 1) * this.pageSize;
            let to = this.currentPage * this.pageSize;
            this.tableDataEnds = [];
            for (; from < to; from++) {
                if (list[from]) {
                    this.tableDataEnds.push(list[from]);
                }
            }
        },
        submitForm(formName) {
            let _this = this;
            var datas = _this.ruleForm;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var token = localStorage.getItem("token");
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            "title": datas.title,
                            "name": datas.name,
                            "participantUser": datas.participantUser,
                            "actualCost": datas.actualCost,
                            "activityNo": datas.activityNo
                        }),
                        url: "http://192.168.155.1:8088/sys/channel/channelactivity/update",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: '信息添加成功',
                                    type: 'success'
                                });
                                vm.dialogFormVisible = false;
                                vm.getTableData();
                            }
                        },
                        error: function (json) {

                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm2(formName) {
            let _this = this;
            var datas = _this.ruleForm;
            var countryId = this.ruleForm.activityNo;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var token = localStorage.getItem("token");
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            "countryId": countryId,
                            "name": datas.name,
                            "zipcode": datas.zipcode,
                            "superId": 1
                        }),
                        url: "http://192.168.155.1:8088/sys/basedata/area/save",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: '信息添加成功',
                                    type: 'success'
                                });
                                vm.dialogFormVisible2 = false;
                                vm.getTableData();
                            }
                        },
                        error: function (json) {

                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
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
        handleDelete() {
            var ids = this.idss;
            console.log(JSON.parse(JSON.stringify(ids)));
            var a = JSON.parse(JSON.stringify(ids));
            if (ids == "") {
                vm.$message({
                    message: '请选择一条或多条数据',
                    type: 'warning',
                    duration: '1500'
                });
                return;
            }
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    var token = localStorage.getItem("token");
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        cache: false,
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify(ids),
                        url: "http://192.168.155.1:8088/sys/channel/channelactivity/delete",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: '删除信息成功',
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                        },
                        error: function (json) {}
                    });
                })
                .catch(_ => {});

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
});