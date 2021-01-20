$(".url").click(function () {
    alert(this.attr("data-url"))
})
var vm = new Vue({
    el: '#app',
    data() {
        return {
            dataNum: 0,
            showCheckAllOnoff: false,
            checkAllRadios: '',
            checkAlldoc: '',
            btnstatus: false,
            btnval: "确定",
            mm: false,
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            pageLimit:0,
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
            limit: 15,
            page: "",
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            ruleForm: {},
            rules: {
                description: [{
                    required: true,
                    message: '请填写通过/不通过理由',
                    trigger: 'blue'
                }],
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.hasPermission();
    },
    methods: {
        getOut:function(){
            console.log(this.idss.length);
            var logids ;
            if(this.idss.length == 0){
                logids = '';
            } else {
                logids = this.idss.join(',');
            }
            console.log(logids);
            // debugger;
            window.open(baseURL + 'sys/finance/audit/downloadStudAccountLog?token=' + token + '&statused=0&type=10&postWay=4&key=' + this.tableDataName + '&logIds=' + logids);
            // $.ajax({
            //     url: baseURL + 'sys/finance/audit/downloadStudAccountLog',
            //     type: 'POST',
            //     dataType: "json",
            //     // contentType: 'application/json',
            //     data: {
            //         "token": token,
            //         // "page": this.val,
            //         // "limit": this.limit,
            //         "statused": 0,
            //         "type": 10,
            //         "postWay": 4,
            //         "key": this.tableDataName,
            //         // "logIds":logids
            //     },
            //     success: function (r) {
            //         console.log(r);
            //         if (r.status == 200) {
            //             vm.$message({
            //                 message: r.body.msg,
            //                 type: 'success'
            //             });
            //             // _this.getTableData();
            //         } else {
            //             vm.$message({
            //                 message: r.body.msg,
            //                 type: 'warning'
            //             });
            //         }
            //     },
            //     error: function (er) {

            //     }
            // });
        },
        submitCheckAll: function () {
            var _this = this;
            console.log(this.checkAllRadios, this.checkAlldoc);
            $.ajax({
                url: baseURL + 'sys/finance/audit/auditStudBatch',
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
                        _this.dataNum = 0;
                        _this.checkAlldoc = '';
                        if(parseInt(_this.pageSize / _this.pageLimit) >= _this.currentPage){
                            _this.val = _this.currentPage
                        } else {
                            _this.val = _this.currentPage - 1;
                            if(_this.val == 0){
                                _this.val = 1;
                            }
                        }
                        _this.getTableData();
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
        checkAll: function () {
            console.log(this.idss);
            this.dataNum = this.idss.length;
            this.showCheckAllOnoff = true;
        },
        search: function () {
            vm.val = 1;
            vm.getTableData();
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        view(row, index) {
            window.open("" + row + "");
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
                    "statused": 0,
                    "type": 10,
                    "postWay": 4,
                    "key": this.tableDataName
                },
                url: "" + baseURL + "sys/finance/audit/queryStudAccountLog",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    self.pageLimit = json.body.pageSize;
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
        seedetail(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.courseId + "");
                window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
            } else if (row.typeed == 4) {
                window.open("detail.html?id=" + row.courseId + "&wyid=" + row.offCourseName + "&iswy=true");
            } else {
                // window.open("seller_detail2.html?id=" + row.courseId + "");
                window.open("seller_detail.html?id=" + row.courseId + "");
            }
        },
        yes(row, index) {
            var self = this;
            self.$confirm('是否通过审核?', '提示', {
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
                            "logId": row.id,
                            "status": 1
                        },
                        url: "" + baseURL + "sys/finance/audit/auditStud",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.getTableData();
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
                .catch(() => {});
        },
        no(row, index) {
            var self = this;
            vm.mm = true;
            vm.ruleForm.description = "";
            vm.s1 = row.id;
            //   self.$confirm('是否通过审核?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            //   })
            // .then(_ => {
            //   var token = localStorage.getItem("token");
            //     $.ajax({  
            //       type : "POST",  
            //       dataType: "json", 
            //       data:{
            //         "token": token,
            //         "logId": row.id,
            //         "status": 2
            //       } ,
            //       url : ""+baseURL+"sys/finance/audit/auditStud",  
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
        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        save(formName) {
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
                            description: this.$refs.ruleForm.model.description,
                            logId: vm.s1,
                            status: 2
                        },
                        url: "" + baseURL + "sys/finance/audit/auditStud",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.mm = false;
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnval = "确定";
                                vm.btnstatus = false;
                                vm.mm = false;
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                            }
                        }
                    });
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
            this.selectedIDs = ids;
            // console.log('多选', ids);
            this.idss = this.selectedIDs;
            console.log(this.idss);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
});