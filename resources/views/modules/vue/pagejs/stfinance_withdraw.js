var vm = new Vue({
    el: '#app',
    data() {
        return {
            dataNum: 0,
            showCheckAllOnoff: false,
            multipleSelection: [],
            checkAllRadios: '',
            checkAlldoc: '',
            idss: [],
            btnstatus: false,
            btnval: "确定",
            description: '',
            rowid: '',
            disabled: false,
            modal: false,
            logIds: '',
            carddata: [],
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            currentPages: 0,
            pageSizes: 0,
            totals: 0,
            filterTableDataEnd: [],
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            key: '',
            courseId: '',
            val: 1,
            limit: 15,
            vals: 1,
            page: "",
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            ruleForm: {},
            statushhh: 0,
            rules: {
                description: [{
                    required: true,
                    message: '请输入拒绝理由',
                    trigger: 'blur'
                }]
            },
            hhhh: [{
                value: 0,
                label: '待审核'
            }, {
                value: 1,
                label: '已审核  '
            }, {
                value: 2,
                label: '已拒绝'
            }],
            hhh: 0,
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
    },
    methods: {
        search: function () {
            vm.val = 1;
            vm.getTableData();
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
                    "statused": this.statushhh,
                    "type": 1,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "sys/finance/audit/queryTeacAccountLog",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        seemodel(row, index) {
            vm.modal = true;
            if (row.withdrawedIds == "") {
                vm.logIds = null;
            } else {
                vm.logIds = row.withdrawedIds;
            }
            this.getcardlist();
        },
        getcardlist() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.vals,
                    "limit": 5,
                    "logIds": vm.logIds,
                    "withdrawed": 1
                },
                url: "" + baseURL + "/sys/finance/audit/getIncomeList",
                success: function (json) {
                    vm.carddata = json.body.list;
                    vm.cards = json.body.list;
                    vm.totals = json.body.totalCount;
                    vm.pageSizes = json.body.totalCount;
                    vm.currentPages = json.body.currPage;
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        yes(row, index) {
            var self = this;
            self.$confirm('你确定要通过审核吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    var token = localStorage.getItem("token");
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": token,
                            "logId": row.id,
                            "status": 1
                        },
                        url: "" + baseURL + "sys/finance/audit/auditTeac",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: "审批失败",
                                    type: 'warning'
                                });
                                vm.getTableData();
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: "审批成功",
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                        }
                    });
                })
                .catch(() => {});
        },
        no(row, index) {
            vm.disabled = true;
            vm.rowid = row.id;
            vm.ruleForm.description = '';
            //   var self = this;  
            //   self.$confirm('你确定要回执审核吗?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            //   })
            // .then(_ => {
            //     $.ajax({  
            //       type : "POST",  
            //       dataType: "json", 
            //       data:{
            //         "token": token,
            //         "logId": row.id,
            //         "status": 2
            //       } ,
            //       url : ""+baseURL+"sys/finance/audit/auditTeac",  
            //       success : function(json) {  
            //       if(json.status == "400"){
            //         vm.$message({
            //         message: "审批失败",
            //         type: 'warning'
            //         });
            //         vm.getTableData(); 
            //         }
            //       if(json.status == "200"){
            //         vm.$message({
            //         message: "审批成功",
            //         type: 'success'
            //       });
            //       vm.getTableData(); 
            //       }
            //       }
            //   }); 
            // })
            // .catch(() => {  });
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
                        cache: false,
                        headers: {
                            "token": token
                        },
                        data: {
                            "description": this.$refs.ruleForm.model.description,
                            "logId": vm.rowid,
                            "status": 2
                        },
                        url: "" + baseURL + "sys/finance/audit/auditTeac",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.disabled = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.disabled = false;
                                vm.getTableData();
                            }
                        }
                    });
                }
            });
        },
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },
        handleCurrentChange1(val) {
            vm.vals = val;
            this.getcardlist();
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
        rowClass({
            row
        }) {
            if (row.allLog === 1) {
                return 'color1'
            }
        },
        checkboxInit(row) {
            if (row.allLog === 1)
                return 0; //不可勾选
            else
                return 1; //可勾选
        },
        exportEx: function () {
            var _this = this;
            // $.ajax({
            //     url: baseURL + 'sys/finance/audit/downloadTeacAccountLog',
            //     type: 'GET',
            //     dataType: 'json',
            //     data: {
            //         "token": token,
            //         "page": this.val,
            //         "limit": this.limit,
            //         "statused": this.statushhh,
            //         "type": 1,
            //         "key": this.tableDataName,
            //     },
            //     headers: {
            //         token:token,
            //     },
            //     success: function (r) {
            //         // console.error(r);
            //         window.open(r);
            //     },
            //     error: function (er) {

            //     }
            // })
            if (this.idss.length == 0) {
                logids = '';
            } else {
                logids = this.idss.join(',');
            }
            console.log(logids);
            // debugger;
            window.open(baseURL + 'sys/finance/audit/downloadTeacAccountLog?token=' + token +
                '&statused=' + this.statushhh + '&type=1&key=' + this.tableDataName);
            //  + '&logIds=' + logids
        },
        piliangshenhe: function () {
            var _this = this;
            if (this.dataNum == 0) {
                vm.$message({
                    message: '请至少选择一条数据',
                    type: 'warning'
                });
            } else {
                _this.showCheckAllOnoff = true;
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
            // console.log('多选', ids);
            this.idss = this.selectedIDs;
            this.dataNum = this.idss.length;
            console.log(this.idss);
        },
        chooseStatus: function (val) {
            console.error(val);
            this.statushhh = val;

            this.val = 1;
            this.limit = 15;
            this.getTableData();
        },
        submitCheckAll: function () {
            var _this = this;
            console.log(this.checkAllRadios, this.checkAlldoc);
            $.ajax({
                url: baseURL + 'sys/finance/audit/auditTeacBatch',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    "logIds": _this.idss,
                    "status": _this.checkAllRadios,
                    "description": _this.checkAlldoc
                }),
                success: function (r) {
                    console.log(r);
                    if (r.status == 200) {
                        vm.$message({
                            message: r.body.msg,
                            type: 'success'
                        });
                        _this.showCheckAllOnoff = false;
                        _this.getTableData();
                        // _this.dataNum = 0;
                        // _this.checkAlldoc = '';
                        // if(parseInt(_this.pageSize / _this.pageLimit) >= _this.currentPage){
                        //     _this.val = _this.currentPage
                        // } else {
                        //     _this.val = _this.currentPage - 1;
                        //     if(_this.val == 0){
                        //         _this.val = 1;
                        //     }
                        // }
                        // _this.getTableData();
                    } else {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning'
                        });
                    }
                },
                error: function (er) {

                }

            })
        },
    }
});