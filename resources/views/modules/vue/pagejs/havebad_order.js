var vm = new Vue({
    el: '#app',
    data() {
        return {
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
            badMoney: '',
            type: '',
            red: '',
            mm: false,
            b1: false,
            b2: "确 定",
            s1: true,
            s2: true,
            fileListnum: '',
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            limit: 15,
            total: 0,
            page: 1,
            limit: 15,
            filterTableDataEnd: [],
            dialogFormVisible2: false,
            idss: [],
            options: [],
            selectedOptions: [],
            selects: '',
            countryId: '',
            country: '',
            key: '',
            id: '',
            name: '',
            superId: '',
            label: '',
            dialogStatus: "",
            ruleForm: {
                current: '',
                amount: '',
                studId: '',
            },
            rules: {

            }
        }
    },

    mounted() {
        this.getTableData();
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
                    "page": this.page,
                    "limit": this.limit,
                    "statusedArr": "2,4"
                },
                url: "" + baseURL + "/sys/seller/order/paymentDemandsList",
                success: function (json) {
                    if (json.status == 200) {
                        self.tableDataEnd = json.body.list;
                        self.total = json.body.totalCount;
                        self.limit = json.body.pageSize;
                        self.currentPage = json.body.currPage;
                        loading.close();
                    }
                }
            });
        },
        seedetail(row, index) {
            // window.open("seller_detail.html?id=" + row.courseId + "&sopType=" + row.sopType + "");
            window.open("seller_detail.html?id=" + row.courseId + "&sopType=" + row.sopType + "");
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
        },
        apply(row, index) {
            vm.type = row.type;
            vm.badMoney = row.badMoney;
            vm.ruleForm.studId = row.studId;
            vm.ruleForm.current = row.current;
            vm.amount = row.badMoney;
            var self = this;
            $.ajax({
                type: "post",
                dataType: "json",
                data: {
                    "token": token,
                    "studId": row.studId,
                    "currency": row.current,
                    "payMoney": row.badMoney,
                    "sysPaymentDemandId": row.id
                },
                url: "" + baseURL + "/sys/seller/order/offsetPaymentDemand",
                success: function (json) {
                    if (json.status == 200) {
                        if (row.type == 1) {
                            vm.s1 = false;
                            vm.s2 = true;
                            if (json.body.needMoney == 0) {
                                self.$message({
                                    message: "账单支付成功",
                                    type: 'success',
                                });
                            } else {
                                vm.ruleForm.studname = row.nickName
                                vm.mm = true;
                            }
                        } else if (row.type == 2) {
                            vm.s1 = false;
                            vm.s2 = true;
                            if (json.body.needMoney == 0) {
                                self.$message({
                                    message: "账单支付成功",
                                    type: 'success',
                                });
                            } else {
                                vm.ruleForm.studname = row.nickName
                                vm.mm = true;
                            }
                        } else {
                            vm.s2 = false;
                            vm.s1 = true;
                            if (json.body.needMoney == 0) {
                                self.$message({
                                    message: "账单支付成功",
                                    type: 'success',
                                });
                            } else {
                                vm.ruleForm.amount = "" + row.badMoney + "" + "" + row.current +
                                    ""
                                vm.ruleForm.studname = row.nickName
                                vm.mm = true;
                            }
                        }
                    }
                }
            });
        },
        oninput() {

        },
        submitUpload() {
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('current', vm.ruleForm.current);
            this.formDate.append('studId', vm.ruleForm.studId);
            this.formDate.append('amount', vm.amount);
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
                        vm.ruleForm.remark = "";
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
        save(formName) {
            if (vm.type == 1) {
                if (vm.ruleForm.amount <= 0 && vm.ruleForm.amount > vm.ruleForm.badMoney) {
                    vm.red = "课程预付 可以少不可以多";
                    return
                }
            }
            if (vm.type == 2) {
                if (vm.ruleForm.amount < vm.ruleForm.badMoney) {
                    vm.red = "欠费账单 可以多不可以少";
                    return
                }
            }
            if (vm.fileListnum == 0) {
                vm.$message({
                    message: "请选择图片",
                    type: 'warning'
                });
                return;
            }
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
            vm.fileListnum = fileList.length;
            console.log(vm.fileListnum)
            if (fileList.length == 1) {

            }
        },
        uploadFile(file) {
            this.formDate = new FormData();
            for (i = 0; i < vm.fileListnum; i++) {
                this.formDate.append('file' + i, file.file);
            }
        },
        handleRemove(file, fileList) {
            vm.fileListnum = fileList.length
            console.log(vm.fileListnum)
            if (fileList.length == 1) {

            }
        },
        handleCurrentChange(val) {
            vm.page = val;
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

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        seebill(row, index) {
            window.open("bill.html?id=" + row.id + "&courseId=" + row.courseId + "&billType=" + row
                .billType + "&statused=" + row.statused + "");
        },
        del(row, index) {
            this.$confirm('是否要删除账单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "token": token
                    },
                    url: "" + baseURL +
                        "sys/seller/order/deletePaymentDemand?sysPaymentDemandId=" + row
                        .id + "",
                    success: function (json) {
                        if (json.status == 200) {
                            vm.$message({
                                type: 'success',
                                message: json.body.msg
                            });
                            vm.getTableData();
                        }
                        if (json.status == 400) {
                            vm.$message({
                                type: 'warning',
                                message: json.body.msg
                            });
                            vm.getTableData();
                        }
                    }
                });
            }).catch(() => {});
        },
    }
});