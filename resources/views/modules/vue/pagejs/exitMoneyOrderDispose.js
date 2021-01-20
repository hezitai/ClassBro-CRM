var vm = new Vue({
    el: '#app',
    data() {
        return {
            courides: '',
            currencyed: '',
            selectedIDs: '',
            currencycreat: '',
            creatmodel1: false,
            creatst1: false,
            creatbtn1: "确 定",
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            dialogFormVisible: false,
            idss: [],
            operaterOrderStatusedArr: null,
            spoTypeArr: null,
            sooTypeedArr: null,
            sooStatusedArr: null,
            selects: '',
            countryId: '',
            country: '',
            key: '',
            id: '',
            val: 1,
            limit: 15,
            courses: '',
            page: "",
            name: '',
            course: '',
            ruleForm: {
                course: '',
            },
            // ------------------
            tableDataEndRules: {

            },
            reason: '',
            checkDialog: false,
            itemInfo: {
                reasonShow: {
                    reason: "",
                    file: {},
                },
                // result:'1',
            },
            dutyPersonArray: [{
                value: '8',
                label: '讲师责任'
            }, {
                value: '4',
                label: '师资责任'
            }, {
                value: '2',
                label: '销售责任'
            }, {
                value: '1',
                label: '无责任'
            }],
            refundArray: [{
                value: '1',
                label: '余额'
            }],
            showResultContent: true,
            deductLectNum: '',
            deductTeacNum: '',
            deductSellerNum: '',
            isDeductLect: true,
            isDeductTeac: true,
            isDeductSeller: true,
            reasonDesc: '',
            isSellerDisabled: false,
            isTeacDisabled: false,
            isLectDisabled: false,
            deTeacG: 0,
            deTeacOTG: 0,
            dutyPerson: '',
            refund: '',
        }
    },

    mounted() {
        this.getTableData();
    },
    methods: {
        isDeductSellerEvent: function (val) {
            this.isSellerDisabled = !val;
        },
        isDeductTeacEvent: function (val) {
            this.isTeacDisabled = !val;
        },
        isDeductLectEvent: function (val) {
            this.isLectDisabled = !val;
        },
        // 处理结果change事件
        changeResult: function (val) {
            if (val == 0) {
                this.showResultContent = true;
            } else if (val == 1) {
                this.showResultContent = false;
            }
        },
        // 选择退款渠道
        refundEvent: function (val) {},
        // 选择责任人
        dutyPersonEvent: function (val) {},
        // 下载理由文件
        downFile: function (url) {
            window.open(url);
        },
        submitCheckDialog: function () {
            var _this = this;
            var data;
            if (this.showResultContent) {
                if (this.dutyPerson === '' || this.dutyPerson == null || this.dutyPerson == undefined) {
                    vm.$message({
                        type: 'error',
                        message: '请选择责任人'
                    });
                    return;
                };
                if (this.itemInfo.typeed == 4) {

                } else if (this.refund === '' || this.refund == null || this.refund == undefined) {
                    vm.$message({
                        type: 'error',
                        message: '请选择退款渠道'
                    });
                    return;
                };

                if (this.isDeductSeller == true) {
                    if (this.deductSellerNum === '' || this.deductSellerNum == null || this
                        .deductSellerNum == undefined) {
                        vm.$message({
                            type: 'error',
                            message: '请输入扣除销售业绩'
                        });
                        return;
                    }
                }
                if (this.isDeductTeac == true) {
                    if (this.deductTeacNum === '' || this.deductTeacNum == null || this.deductTeacNum ==
                        undefined) {
                        vm.$message({
                            type: 'error',
                            message: '请输入扣除师资业绩'
                        });
                        return;
                    }
                }
                if (this.isDeductLect == true) {
                    if (this.deTeacG === '' || this.deTeacG == null || this.deTeacG == undefined || this
                        .deTeacOTG === '' || this.deTeacOTG == null || this.deTeacOTG == undefined) {
                        vm.$message({
                            type: 'error',
                            message: '请输入扣除讲师G币和OTG币'
                        });
                        return;
                    }
                }
                if (this.reasonDesc === '' || this.reasonDesc == null || this.reasonDesc == undefined) {
                    vm.$message({
                        type: 'error',
                        message: '请输入备注'
                    });
                    return;
                };
                data = {
                    refundId: this.itemInfo.id,
                    statused: 1,
                    desc: this.reasonDesc,
                    responsibleId: this.dutyPerson, //责任人 （1-无责任 2-销售责任 4-师资责任 8-讲师责任）
                    redundChannel: this.refund, // 退款渠道 （1：退到余额 2.退款到学期卡）
                    deSellerPerf: this.deductSellerNum, // 扣除的销售业绩
                    deTeasChannelPerf: this.deductTeacNum, // 扣除的师资业绩
                    deTeacG: this.deTeacG, //扣除的讲师G币
                    deTeacOTG: this.deTeacOTG, // 扣除的讲师OTG币
                }
                if (this.isDeductSeller == false) {
                    data.deSellerPerf = '';
                }
                if (this.isDeductTeac == false) {
                    data.deTeasChannelPerf = '';
                }
                if (this.isDeductLect == false) {
                    data.deTeacG = '';
                    data.deTeacOTG = '';
                }
            } else {
                if (this.reasonDesc == '' || this.reasonDesc == null || this.reasonDesc == undefined) {
                    vm.$message({
                        type: 'error',
                        message: '请输入理由'
                    });
                    return;
                };
                data = {
                    refundId: this.itemInfo.id,
                    statused: 2,
                    desc: this.reasonDesc
                }
            };
            vm.$confirm('已结束订单存在订单余额退回，请确认申请提交金额是否正确', '提示', {
                confirmButtonText: '提交',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(data);
                $.ajax({
                    url: baseURL + 'sys/oper/reviewRefund',
                    type: 'POST',
                    headers: {
                        token: token,
                    },
                    data: data,
                    success: function (r) {
                        if (r.status == 200) {
                            vm.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                            setInterval(function () {
                                window.location.reload();
                            }, 1000)
                        } else {
                            vm.$message({
                                type: 'warning',
                                message: r.body.msg
                            });
                        }
                    },
                    error: function (er) {
                        vm.$message({
                            type: 'warning',
                            message: '提交失败'
                        });
                    }
                })
            }).catch(() => {

            });

        },
        checkEvent: function (row, index) {
            this.itemInfo = JSON.parse(JSON.stringify(row)); // 对象复制
            console.log(this.itemInfo);
            this.refundArray = [{
                value: '1',
                label: '余额'
            }];
            if (this.itemInfo.cardId != null) {
                this.refundArray.push({
                    value: '2',
                    label: '学期卡'
                });
            };
            this.itemInfo.result = 1; // 设置默认同意
            this.itemInfo.reasonShow = this.itemInfo.reasonJson[this.itemInfo.reasonJson.length -
                1] // 获取显示最后一条理由
            console.log(this.itemInfo.reasonShow)
            this.checkDialog = true; // 显示弹窗
            // refundAmount
            if (this.itemInfo.totalReaMonetary * 1 > this.itemInfo.refundAmount * 1) {
                this.deductSellerNum = this.itemInfo.refundAmount;
                this.deductTeacNum = this.itemInfo.refundAmount;
            } else {
                this.deductSellerNum = this.itemInfo.totalReaMonetary;
                this.deductTeacNum = this.itemInfo.totalReaMonetary;
            }

        },
        // 审核弹窗 关闭事件
        checkDialogCloseEvent: function () {
            this.checkDialog = false;
            this.itemInfo = {
                reasonShow: {
                    reason: "",
                    file: {},
                },
            };
            this.showResultContent = true;
            this.deductLectNum = '';
            this.deductTeacNum = '';
            this.deductSellerNum = '';
            this.isDeductLect = true;
            this.isDeductTeac = true;
            this.isDeductSeller = true;
            this.reasonDesc = '';
            this.dutyPerson = '';
            this.refund = '';
            this.deTeacG = '';
            this.deTeacOTG = '';
        },
        // 获取列表
        getTableData: function () {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            var _this = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": this.limit,
                    "statused": 1,
                    "order": 'sro.create_at desc'
                },
                url: "" + baseURL + "sys/oper/listRefundOrder",
                success: function (json) {
                    _this.tableDataEnd = json.body.list;
                    for (var i in _this.tableDataEnd) {
                        _this.tableDataEnd[i].reasonShow = _this.tableDataEnd[i].reasonJson[
                            _this.tableDataEnd[i].reasonJson.length - 1].reason
                    };
                    _this.total = json.body.totalCount;
                    _this.pageSize = json.body.totalCount;
                    _this.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        seedetail(row, index) {
            if (row.type == 64) {
                window.open("bigClassOrderInfo.html?id=" + row.courseId + "");
                // window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.courseId + "&wyid=" + row.offCourseName +
                    '&iswy=true');
            } else {
                //   window.open("seller_detail.html?id=" + row.courseId + "");
                window.open("seller_detail.html?id=" + row.courseId + "");
            }
        },
        search: function () {
            vm.val = 1;
            vm.getTableData();
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData;
            this.handleCurrentChange(this.currentPage);
        },

        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            let ids = [];
            let currencyed = [];
            let courids = [];
            this.multipleSelection.map((item) => {
                var id = item.id;
                ids.push("" + id + "");
                var currency = item.currency;
                currencyed.push("" + currency + "");
                var abb = item.courseId;
                courids.push("" + abb + "");
            });
            this.courides = courids;
            this.selectedIDs = ids;
            console.log('多选', ids);
            this.idss = this.selectedIDs;
            this.currencyed = currencyed;
        },
        creat() {
            var id = vm.courides
            var ids = id.join()
            vm.selid = ids
            if (id.length === 0 || id.length > 1) {
                return;
            }
            vm.ruleForm.payMoney = ""
            vm.currencycreat = vm.currencyed.join();
            vm.creatmodel1 = true;
        },
        creatsave(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.creatst1 = true;
                    vm.creatbtn1 = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: this.selid,
                            payMoney: this.ruleForm.payMoney,
                        },
                        url: "" + baseURL + "/sys/seller/order/createSupportPaymentDemand",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.creatmodel1 = false;
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.creatst1 = false;
                                vm.creatbtn1 = "确 定";
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.creatst1 = false;
                                vm.creatbtn1 = "确 定";
                            }
                        }
                    });
                }
            });
        },
    }
});