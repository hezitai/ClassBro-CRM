var vm = new Vue({
    el: '#app',
    data() {
        return {
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            filterTableDataEnd: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            idss: [],
            options: [],
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
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            showList: true,
            ruleForm: {
                // title: '',
                // activityNo: '',
                // participantUser: '',
                // actualCost:''
            },
            rules: {
                country: [{
                    required: true,
                    message: '请选择委派的运营',
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
        search: function () {
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 6,
                    "id": vm.tableDataName
                },
                url: "http://192.168.191.1:8088/sys/seller/order/getOrderPool/info",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                },
                error: function (json) {

                }
            });
        },
        see: function () {
            vm.showList = false;
        },
        formatSex: function (row, column, cellValue) {
            if (cellValue === "FEMALE") {
                return '女';
            } else if (cellValue === "MALE") {
                return '男';
            }
        },
        getTableData: function () {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 6
                },
                url: "http://192.168.191.1:8088/sys/oper/teacList",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                },
                error: function (json) {

                }
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

        handleChange(item) {},

        // dialogVisible(row,_index){
        //   this.listIndex=_index;
        //   this.editObj=row;
        //   let index=this.listIndex
        //   var item = this.tableDataEnd[index];
        //   this.dialogFormVisible=true;
        //   this.ruleForm = {
        //     title: item.title,
        //     activityNo: item.activityNo,
        //     participantUser: item.participantUser,
        //     actualCost:item.actualCost,
        //     partNumber:item.partNumber,
        //     channelName:item.channelName,
        //     actualCost:item.actualCost,
        //     name:item.name
        //   };
        //   var token = localStorage.getItem("token");
        //   $.ajax({  
        //     type : "get",  
        //     dataType: "json", 
        //     data:{
        //       "token": token,
        //       "page": 1,
        //       "limit": 10 
        //     } ,
        //     url : "http://192.168.191.1:8088/sys/basedata/country/list",  
        //     success : function(json) {  
        //       vm.selects = json.body.list; 
        //     }
        // });
        // },
        // add(){
        //   var ids = this.idss;
        //   console.log(ids);
        //   if(ids == ""){
        //     this.$message({
        //         message: '请选择老师',
        //         type: 'warning'
        //       });
        //   }else{
        //     var token = localStorage.getItem("token");
        //   $.ajax({  
        //     type : "get",  
        //     dataType: "json", 
        //     data:{
        //       "token": token,
        //       "page": 1,
        //       "limit": 100 
        //     } ,
        //     url : "http://192.168.191.1:8088/sys/user/operationsList",  
        //     success : function(json) {  
        //       vm.selects = json.body.list; 
        //     }
        // });
        //   this.dialogFormVisible2=true;
        //   }
        // },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.page = this.currentPage;
            console.log(this.page);
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            var self = this;
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": val,
                    "limit": 6
                },
                url: "http://192.168.191.1:8088/sys/seller/order/getOrderPool",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
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
            this.tableDataEnd = [];
            for (; from < to; from++) {
                if (list[from]) {
                    this.tableDataEnd.push(list[from]);
                }
            }
        },

        submitForm2(formName) {
            let _this = this;
            var datas = _this.ruleForm;
            var areaId = this.ruleForm.value3;
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
                            "operId": this.ruleForm.country,
                            "teacIds": vm.idss
                        }),
                        url: "http://192.168.191.1:8088/sys/oper/assignedTeac",
                        success: function (json) {
                            if (json.status == "200") {
                                vm.$message({
                                    message: '分配老师成功',
                                    type: 'success'
                                });
                                vm.dialogFormVisible2 = false;
                                vm.getTableData();
                            }
                            if (json.status == "400") {
                                vm.$message({
                                    message: '分配老师失败',
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
                        url: "http://192.168.191.1:8088/sys/channel/channelactivity/delete",
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