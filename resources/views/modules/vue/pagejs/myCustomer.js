var vm = new Vue({
    el: '#app',
    data() {
        return {
            currentPage3: '',
            currencyList: [],
            nomarlCurrency: '',
            createCardCurrentList: [],
            currentList: [],
            currentDialog: false,
            customerCardDialog: false,
            customerCardSrc: '',
            url: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            mm: false,
            studCZ: false,
            studCZData: {},
            countrys: '',
            studCZUpdata: {},
            formDateCZ: '',
            fileListCZ: [],
            fileListnumCZ: '',
            filesCZ: '',
            cardmodal: false,
            detilmodal: false,
            modal: false,
            btnstatus: false,
            btnval: "确定",
            btnval1: "接单",
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            tableDataEnd1: [],
            currentPage1: 0,
            pageSize1: 0,
            total1: 0,
            total3: 3,
            filterTableDataEnd: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            key: '',
            page: "",
            val: 1,
            limit: 15,
            limit3: 10,
            val1: 1,
            val3: 1,
            limit1: 8,
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            startTime: '',
            endTime: '',
            studId: '',
            userId: '',
            sid: '',
            mm: false,
            fileListnum: '',
            fileList: [],
            b1: false,
            b2: "确 定",
            files: '',
            chooseLookMoney: 0,
            rules: {
                paytype: [{
                    required: true,
                    message: '请选择支付方式',
                    trigger: 'change'
                }],
                totalPrice: [{
                    required: true,
                    message: '请填写学期卡金额',
                    trigger: 'blur'
                }],
                currencyType: [{
                    required: true,
                    message: '请选择学期卡币种',
                    trigger: 'blur'
                }],
            },
            pciker1: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pciker2: {
                disabledDate: (time) => {
                    let beginDateVal = this.ruleForm.viewStartTime;
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal;
                    }
                }
            },
            currency: '',
            cardruleForm: {
                totalPrice: null,
                time: null,
                sendTime: null,
                currency: null,
            },
            ruleForm: {
                viewStartTime: '',
                viewEndTime: '',
                name: '',
                description: '',
            }
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
    },
    methods: {
        getcurreny() { // 获取币种
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/basedata/exchangeRate/list',
                data: {
                    page: 1,
                    limit: 1000,
                    token: token
                },
                type: 'GET',
                dataType: 'json',
                success: function (r) {
                    console.log(r.body.list);
                    _this.currencyList = r.body.list;
                },
                error: function (er) {

                }
            })
        },
        changeCurrency: function (val) {
            // vm.currency
            var result = null;
            for (var i in this.currencyList) {
                if (val == this.currencyList[i].id) {
                    result = this.currencyList[i];
                }
            };
            console.log(result);
            vm.cardruleForm.currency = result.tagerCurrency;
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

        search: function () {
            vm.val = 1;
            vm.getTableData();
        },
        studCZEvent: function (row) {
            console.log(row)
            this.studCZ = true;
            this.studCZData = row;
            console.log(this.studCZData);
            this.getcountrys();
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
                },
                url: "" + baseURL + "/sys/seller/order/myCustomer",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    // self.studAccounts = json.body.list
                    loading.close();
                }
            });
        },
        creatOrder(row, index) {
            parent.creatqrh();
            window.location.href = "creat_qrh.html?mobile=" + row.mobile + ""
        },
        myCustomer() {
            parent.chargeMoney();
            window.location.href = "charge_money.html"
        },
        addCard(row, index) {
            this.getcurreny();
            if (row.studAccounts.length == 0) {
                vm.$message({
                    message: '该客户没有账户信息，请先完善客户留学国家后再试！',
                    type: 'warning'
                });
                return
            } else {
                this.cardmodal = true
                console.log(row);
                // this.createCardCurrentList = row.studAccounts;
                this.studId = row.userId;
                this.currency = row.studAccounts[0].current;
            }
        },
        CloseaddCard() {
            this.cardmodal = false
        },
        setStudScreen(row, index) {
            var self = this;
            self.$confirm('是否要执行此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": localStorage.getItem("token"),
                            "studId": row.userId,
                        },
                        url: "" + baseURL +
                            "/sys/seller/order/setStudScreenRecordedInvalidation",
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
        },
        updatephone(row, index) {
            var self = this;
            self.$confirm('是否要执行此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": localStorage.getItem("token"),
                            "courseId": row.id,
                        },
                        url: "" + baseURL + "/sys/seller/order/refreshOrderDevice",
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
        },
        view_detail(row, index) {
            vm.userId = row.userId;
            vm.detilmodal = true;
            vm.sid = row.userId;
            vm.getTableData1();
        },
        openNew: function (row, index) {
            console.log(row)
            if (row.studPurchaseOrder.type == 64) {
                if (row.parentId == null) {
                    window.open("bigClassroomInfo1.html?id=" + row.id + "&teacherId=" + row.teacherId);
                } else {
                    window.open("bigClassOrderInfo.html?id=" + row.id);
                }

                // window.open("bigClassOrderInfo.html?id=" + row.courseId + "");
                // window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.id + "&wyid=" + row
                    .offCourseName + "&iswy=true");
            } else {
                window.open("seller_detail.html?id=" + row.id + "");
            }
        },
        view_card(row, index) {
            parent.customerCard();
            this.customerCardDialog = true;
            this.customerCardSrc = "customerCard.html?studId=" + row.userId + "";
            // location.href = "customerCard.html?studId=" + row.userId + "";
        },
        view_current: function (row, index) {
            // console.log(row);
            // console.log(row.userId);
            // this.currentList = row;
            this.chooseLookMoney = row[0].userId;
            console.log(row);
            this.getQueryStudAccountLogForMyCustomer();

        },
        getQueryStudAccountLogForMyCustomer: function () {
            var _this = this;
            this.currentDialog = true;
            $.ajax({
                url: baseURL + 'sys/seller/order/queryStudAccountLogForMyCustomer',
                type: 'GET',
                data: {
                    type: 87,
                    page: this.val3,
                    limit: this.limit3,
                    studId: this.chooseLookMoney,
                },
                headers: {
                    token: token,
                },
                success: function (r) {
                    console.log(r);
                    _this.currentList = r.body;
                    _this.total3 = r.body.totalCount;
                    _this.pageSize3 = r.body.totalCount;
                    _this.currentPage3 = r.body.currPage;
                }
            })
        },
        getTableData1() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val1,
                    "limit": this.limit1,
                    "userId": vm.sid,
                },
                url: "" + baseURL + "/sys/seller/order/getListByStudId",
                success: function (json) {
                    // self.chooseLookMoney = json.body.list.userId;
                    self.tableDataEnd1 = json.body.list;
                    self.total1 = json.body.totalCount;
                    self.pageSize1 = json.body.totalCount;
                    self.currentPage1 = json.body.currPage;
                }
            });
        },
        creatTestclassroom(row, index) {
            vm.modal = true;
            vm.studId = row.userId;
            vm.currency = row.currency;
        },
        changeTime(date) {
            this.ruleForm.viewEndTime = "";
            this.pciker2 = {
                disabledDate(time) { //开始时间-结束时间   
                    return (time.getTime() < new Date(date).getTime() - 8.64e7);
                }
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },
        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData1();
        },
        handleSizeChange3(val) {
            console.log(`每页 ${val} 条`);
            this.limit3 = val;
            this.getQueryStudAccountLogForMyCustomer();
        },
        createStudAccount() {
            parent.createStudAccount();
            window.location.href = "createStudAccount.html?mobile=";
        },
        updateStudinfo(row, index) {
            window.location.href = "createStudAccount.html?mobile=" + row.mobile + "";
        },
        typebtn(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (vm.cardruleForm.paytype == 1) {
                        vm.btnstatus = true;
                        vm.btnval = "加载中";
                        $.ajax({
                            type: "post",
                            //contentType: "application/json",
                            dataType: "json",
                            headers: {
                                "token": token
                            },
                            data: {
                                studId: this.studId,
                                totalPrice: this.cardruleForm.totalPrice,
                                sendTime: this.cardruleForm.sendTime,
                                time: this.cardruleForm.time,
                                currency: this.cardruleForm.currency

                            },
                            url: "" + baseURL + "/sys/seller/order/studCradBagAddValue",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                    vm.cardmodal = false;
                                    window.location.replace;
                                    vm.cardruleForm = {
                                        totalPrice: '',
                                        time: '',
                                        sendTime: '',
                                        currency: '',
                                    };
                                    vm.nomarlCurrency = '';
                                } else {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                }
                            }
                        });
                    }
                    if (vm.cardruleForm.paytype == 2) {
                        vm.mm = true
                    }
                } else {
                    console.log('error submit!!');
                    return false;
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
        handlePreviewCZ(file) {
            console.log(file);
        },
        successCZ(response, file, fileList) {
            console.log(response);
        },
        onerrorCZ(response, file, fileList) {
            vm.$message({
                message: response.body.msg,
                type: 'warning'
            });
        },
        changeCZ(file, fileList) {
            vm.filesCZ = fileList
        },
        uploadFileCZ(file) {
            var files = vm.filesCZ
            // this.formDateCZ = new FormData();
            for (i = 0; i < files.length; i++) {
                this.formDateCZ.append('file' + i, files[i].raw);
            }
        },
        updataCZ() {
            console.log();
            var self = this;
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         vm.b1 = true;
            //         vm.b2 = "加载中";
            //         vm.submitUpDataCZ();
            //     } else {
            //         vm.$message({
            //             message: "请完善信息",
            //             type: 'warning'
            //         });
            //     }
            // });
            // vm.b1 = true;
            // vm.b2 = "加载中";
            vm.submitUpDataCZ();
        },
        submitUpDataCZ() {
            this.formDateCZ = new FormData();
            this.$refs.upload.submit();
            this.formDateCZ.append('current', vm.studCZData.current);
            this.formDateCZ.append('studId', vm.studCZData.userId);
            // if(typeof vm.studCZUpdata.amount != 'number'){
            //     vm.$message({
            //         message: '请输入正确的金额',
            //         type: 'warning'
            //     });
            // }
            this.formDateCZ.append('amount', vm.studCZUpdata.amount);
            this.formDateCZ.append('remark', vm.studCZUpdata.remark);

            console.log(this.formDateCZ);
            let config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    token: token,
                }
            }
            axios.post("" + baseURL + "sys/seller/order/evidenceThumbSave", this.formDateCZ, config).then(
                res => {
                    if (res.data.status == 200) {
                        vm.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        vm.mm = false;
                        vm.getTableData();
                        vm.fileListCZ = [];
                        // vm.studCZData.current = "";
                        // vm.studCZData.userId = "";
                        vm.studCZUpdata.amount = "";
                        vm.studCZUpdata.remark = "";
                        vm.b1 = false;
                        vm.b2 = "确 定";
                        vm.studCZ = false;
                    }
                    if (res.data.status == 400) {
                        if (vm.studCZUpdata.amount != "") {
                            vm.$message({
                                message: res.data.body.msg,
                                type: 'warning'
                            });
                        }
                        vm.b1 = false;
                        vm.b2 = "确 定";
                    }
                }).catch(res => {
                console.log(res);
                vm.$message({
                    message: res.body.msg,
                    type: 'warning'
                });
            })
        },



        submitUpload() {
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('current', vm.currency);
            this.formDate.append('studId', vm.studId);
            this.formDate.append('amount', vm.cardruleForm.totalPrice);
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
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            headers: {
                                "token": token
                            },
                            data: {
                                studId: this.studId,
                                totalPrice: this.cardruleForm.totalPrice,
                                sendTime: this.cardruleForm.sendTime,
                                time: this.cardruleForm.time,
                                currency: this.currency
                            },
                            url: "" + baseURL + "/sys/seller/order/studCradBagAddValue",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 1000);
                                }
                                if (json.status == 400) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
                                    });
                                    vm.b1 = false;
                                    vm.b2 = "确 定";
                                }
                            }
                        });
                    }
                    if (res.data.status == 400) {

                    }
                }).catch(res => {})
        },
        submitForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                var viewStartTime = vm.ruleForm.viewStartTime + " " + vm.startTime + ":00";
                var viewEndTime = vm.ruleForm.viewEndTime + " " + vm.endTime + ":00";
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        contentType: "application/json",
                        headers: {
                            "token": token
                        },
                        data: JSON.stringify({
                            startTime: viewStartTime,
                            endTime: viewEndTime,
                            studId: vm.studId,
                            description: vm.ruleForm.description,
                            name: vm.ruleForm.name,
                        }),
                        url: "" + baseURL + "/sys/seller/order/putClassroom",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.modal = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
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
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },
        handleClose(done) {
            vm.val1 = 1;
            vm.detilmodal = false;
        },
        handleCurrentChange1(val) {
            vm.val1 = val;
            this.getTableData1();
        },
        handleCurrentChange3(val) {
            vm.val3 = val;
            this.getQueryStudAccountLogForMyCustomer();
        },
        handleRemove(file, fileList) {
            vm.fileListnum = fileList.length
        },
        handleRemoveCZ(file, fileList) {
            vm.fileListnumCZ = fileList.length
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
});