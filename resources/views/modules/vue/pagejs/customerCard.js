var vm = new Vue({
    el: '#app',
    data() {
        return {
            disabled: true,
            applymodel: false,
            url: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            cards: false,
            tablemodal: false,
            card: true,
            withdrawCardmodel: false,
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
            val1: 1,
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
            currency: '',
            unitWorth: null,
            allTime: null,
            buyTime: null,
            sendTime: null,
            lastTime: null,
            realWorth: null,
            currency: '',
            createAt: '',
            statused: null,
            cardNo: '',
            mm: false,
            fileListnum: '',
            fileList: [],
            b1: false,
            b2: "确 定",
            files: '',
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
            },
            cardruleForm: {
                totalTime: '',
                totalPrice: null,
                unitWorth: null,
                allTime: null,
                buyTime: null,
                sendTime: null,
                lastTime: null
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
        getTableData: function () {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var studId = getUrlStr("studId");
            this.studId = studId
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "studId": studId,
                    // "page":'',
                    // "limit":'',
                },
                url: "" + baseURL + "/sys/seller/order/queryStudCardBag",
                success: function (json) {
                    if (json.status === 200) {
                        if (json.body !== null) {
                            vm.cardruleForm.allTime = json.body.allTime
                            vm.cardruleForm.buyTime = json.body.buyTime
                            vm.cardruleForm.sendTime = json.body.sendTime
                            vm.cardruleForm.lastTime = json.body.lastTime
                            vm.sendTime = json.body.sendTime
                            vm.cardNo = json.body.cardNo
                            vm.statused = json.body.statused
                            vm.createAt = json.body.createAt
                            vm.cardruleForm.unitWorth = Number(json.body.unitWorth)
                            vm.unitWorth = Number(json.body.unitWorth)
                            vm.currency = json.body.currency
                            vm.card = true
                            vm.studId = json.body.studId
                            vm.realWorth = json.body.realWorth
                            vm.cardruleForm.totalTime = Number(json.body.buyTime) + Number(
                                json.body.sendTime)
                            if (json.body.lastTime == 0) {
                                vm.disabled = false
                                vm.cardruleForm.unitWorth = null
                                vm.cardruleForm.sendTime = null
                            } else {
                                vm.disabled = true
                            }
                        } else {
                            vm.card = false
                            vm.cards = true
                        }
                    } else {}
                }
            });
        },
        inputFunc() {
            vm.buyTime = Number(vm.cardruleForm.totalPrice) / Number(vm.cardruleForm.unitWorth)
            if (vm.buyTime == Infinity) {
                vm.buyTime = null
            }
        },
        withdrawCard() {
            vm.withdrawCardmodel = true
        },
        creatOrder(row, index) {
            window.location.href = "creat_qrh.html?mobile=" + row.mobile + "";
        },
        applydetil() {
            vm.applymodel = true
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "studId": vm.studId,
                    "page": this.val,
                    "limit": 15,
                },
                url: "" + baseURL + "/sys/seller/order/queryStudCardBagLogAdd",
                success: function (json) {
                    if (json.status == "400") {}
                    if (json.status == "200") {
                        vm.tableDataEnd = json.body.list;
                        vm.total = json.body.totalCount;
                        vm.pageSize = json.body.totalCount;
                        vm.currentPage = json.body.currPage;
                    }
                }
            });
        },
        viewCard() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "studId": vm.studId,
                    "page": this.val,
                    "limit": 15,
                },
                url: "" + baseURL + "/sys/seller/order/queryStudCardBagLogConsume",
                success: function (json) {
                    if (json.status == "400") {}
                    if (json.status == "200") {
                        vm.tableDataEnd = json.body.list;
                        vm.total = json.body.totalCount;
                        vm.pageSize = json.body.totalCount;
                        vm.currentPage = json.body.currPage;
                    }
                }
            });
            vm.tablemodal = true
        },
        addCard() {
            if (this.currency === null) {
                vm.$message({
                    message: '该客户没有账户信息，请先完善客户留学国家后再试！',
                    type: 'warning'
                });
                return
            } else {
                this.cardmodal = true
            }
        },
        CloseaddCard() {
            this.cardmodal = false
            this.tablemodal = false
            this.withdrawCardmodel = false
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.viewCard();
            this.handleCurrentChange(this.currentPage);
        },
        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData1();
        },
        applyCard(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
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
                            currency: this.currency,
                            description: this.cardruleForm.description
                        },
                        url: "" + baseURL + "/sys/seller/order/applyReturnValue",
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
        typebtn(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (vm.cardruleForm.paytype == 1) {
                        vm.btnstatus = true;
                        vm.btnval = "加载中";
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
                                time: this.buyTime,
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
                                time: this.buyTime,
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

        handleCurrentChange(val) {
            vm.val = val;
            this.viewCard();
        },
        handleClose(done) {
            vm.val1 = 1;
            vm.detilmodal = false;
        },
        handleCurrentChange1(val) {
            vm.val1 = val;
            this.getTableData1();
        },
        handleRemove(file, fileList) {
            vm.fileListnum = fileList.length
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