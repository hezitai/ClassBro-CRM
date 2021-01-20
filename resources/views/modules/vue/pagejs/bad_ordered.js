var vm = new Vue({
    el: '#app',
    data() {
        return {
            // --------------------
            rightAwayPayType2Doc: '', //转账支付备注
            payDialogInfo: {},
            warningPaymentMoney: false,
            stillNeedPaymentMoney: 0,
            stillNeedPay: 0,
            paymentAmount: 0,
            showTypePayment: {
                studCardBag: null,
                studAccountList: [],
            },
            currencyList: [],
            showTypePaymentOnoff: false,
            exchangeArray: [],
            exchangeArrays: [],
            publicAmount: '',
            publicAmounts: '',
            residuePayMoney: '', // 剩余支付金额
            newRresiduePayMoney: '',
            payId: 0,
            balanceEnough: false,
            newPaymentMethod: [],
            paymentMethod: [],
            checkList: [],
            paymentReadyArray: [],
            newChiocePaymentMethodArray: [],
            chiocePaymentMethodArray: [],
            checkedStudAccountList: [],
            rightAwayPayLoading: false,
            formDate: new FormData(), // 创建一个上传图片用的new formDate
            myHeaders2: {
                token: token
            },
            url2: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            data2: {
                amount: '',
                studId: '',
            },
            imgs2: [],
            fileList2: [],
            nomarlCurrency: '',
            choiceDropBoxArray: [],
            rightAwayPay: false, // 立即支付 弹窗Boolean值
            // ----------------------
            searchKey: '',
            searching: '',
            radshow: true,
            fileList: [],
            allfileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            data: {
                amount: '',
                current: '',
                studId: '',
            },
            allpaymodel: false,
            dj: false,
            disab: false,
            paytypemodel: false,
            radio: '1',
            max: 0,
            min: 0,
            mm1: false,
            mm2: false,
            badMoney: '',
            type: '',
            red: '',
            btnstatus: false,
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
            statusedArr: 1,
            filterTableDataEnd: [],
            dialogFormVisible2: false,
            idss: [],
            ids: [],
            orderNos: [],
            nickNames: [],
            currents: [],
            studIds: [],
            amounts: [],
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
                type: '',
                current: '',
                amount: '',
                studId: '',
                id: '',
                needMoney: '',
                amount1: '',
                courseId: '',
            },
            ruleForm1: {
                ordermoney: '',
                paytype: '',
                current: '',
                amount1: '',
                amount: 0,
                studname: '',
                studId: '',
            },
            rules: {},
            rules1: {
                paytype: [{
                    required: true,
                    message: '请选择支付类型类型',
                    trigger: 'change'
                }],
            },
            switchValue: false,
            payToOrderArray: [],
            // isPayToOrder:false,
            multipleSelection: '',
            selectedIDs: '',
            idss: '',
            templateRadio: '',
            allRow: '',
        }
    },
    mounted() {
        this.getTableData();
        this.hasPermission();
        this.ExchangeMoney();
        this.getcurreny();
        this.getExchange();
    },
    filters: {
        rounding(value) {
            return value.toFixed(2)
        }
    },
    methods: {
        payToOrderEvent: function(val) {
            console.log(val);
        },
        rightAwayPayType22Submit: function(row) {
            this.rightAwayPayLoading = true;
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/seller/order/offsetPaymentDemand',
                type: 'POST',
                data: {
                    studId: row.userId,
                    currency: row.studPurchaseOrder.currency,
                    payMoney: this.payDialogInfo.badMoney,
                    sysPaymentDemandId: this.payDialogInfo.id,
                    fromCourseId: row.id,
                    fromCard: false,
                },
                headers: {
                    token: token
                },
                success: function(r) {
                    console.log(r);
                    if (r.body.needMoney == 0) {
                        vm.$message({
                            type: 'success',
                            message: '支付成功'
                        });
                        setInterval(function() {
                            window.location.reload();
                        }, 1200)
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        });

                        vm.rightAwayPayLoading = false;
                    }
                },
                error: function(er) {
                    vm.rightAwayPayLoading = false;
                }
            })
        },
        payToOrderArraySelectionChange: function(val) {
            console.log(val);
            val.checked = true;
            this.allRow = val;
            this.payToOrderArray.forEach(item => {
                if (item.id !== val.id) {
                    item.checked = false
                }
            })
        },
        searchingEvent: function() {
            this.getTableData();
        },
        getTableData: function() {
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
                    "statusedArr": this.statusedArr,
                    "key": this.searchKey,
                },
                url: "" + baseURL + "/sys/seller/order/superPaymentDemandsList",
                success: function(json) {
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
        allpay() {
            if (vm.ids == "") {
                vm.$message({
                    message: '请选择订单',
                    type: 'warning'
                });
                return
            }
            vm.allpaymodel = true
        },
        seedetail(row, index) {
            if (row.sopType == 64) {
                window.open("bigClassOrderInfo.html?id=" + row.courseId + "");
                // window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
            } else {
                // window.open("seller_detail.html?id=" + row.courseId + "&parentId=" + row.parentId + "");
                window.open("seller_detail.html?id=" + row.courseId + "&parentId=" + row.parentId + "");
            }
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        seebill(row, index) {
            window.open("bill.html?id=" + row.id + "&courseId=" + row.courseId + "&billType=" + row
                .billType + "&statused=" + row.statused + "");
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
        },
        changes(val) {
            vm.page = 1;
            vm.statusedArr = val;
            vm.getTableData();
        },
        typebtn(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (vm.ruleForm1.paytype == 3) {
                        vm.btnstatus = true;
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            data: {
                                "token": token,
                                "studId": vm.studId,
                                "currency": vm.ruleForm1.current,
                                "payMoney": vm.ruleForm1.amount,
                                "sysPaymentDemandId": vm.id,
                                "fromCard": true
                            },
                            url: "" + baseURL + "/sys/seller/order/offsetPaymentDemand",
                            success: function(json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: "支付成功",
                                        type: 'success'
                                    });
                                    setTimeout(function() {
                                        location.reload();
                                    }, 1000);
                                }
                                if (json.status == 400) {
                                    vm.btnstatus = false;
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
                                    });
                                }
                            }
                        });
                    } else {
                        window.location.href = "pay.html?id=" + vm.ruleForm.id + "&paytype=" + vm
                            .ruleForm1.paytype + "&studId=" + vm.ruleForm.studId + "&money=" + vm
                            .ruleForm1.amount + "&current=" + vm.ruleForm1.current + "&courseId=" +
                            vm.ruleForm.courseId + "";
                    }
                } else {
                    return false;
                }
            });
        },

        // 转账支付窗口 上传事件↓
        handlePreview2(file) {},
        success2(response, file, fileList) {},
        onerror2(response, file, fileList) {},
        change2(file, fileList) {
            vm.imgs = fileList;
            vm.span = 24 / (fileList.length);
            console.log(vm.imgs)
            vm.fileListnum = fileList.length;
        },
        uploadFile2(file, fileList) {
            this.formDate.append('file' + this.uploadImgTimes, file.file);
            this.uploadImgTimes++;
            // for (i = 0; i < vm.fileListnum; i++) {
            //     this.formDate.append('file' + i, file.file);
            // }
        },
        handleRemove2(file, fileList) {
            vm.span = 24 / (fileList.length);
        },
        // 转账支付窗口 上传事件↑
        // 获取汇率
        getExchange: function() {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/basedata/exchangeRate/list',
                type: 'GET',
                dataType: 'json',
                headers: {},
                data: {
                    token: token,
                    page: 1,
                    limit: 100,
                    statused: '1;2',
                    type: 3
                },
                success: function(r) {
                    _this.exchangeArray = r.body.list;
                    _this.exchangeArrays = r.body.list;
                }
            });
        },
        // 汇率模块
        ExchangeMoney: function(amounts, beforeCu, afterCu) {
            var publicExchange = '';
            if (beforeCu == afterCu) {
                this.publicAmount = amounts;
                return;
            }
            for (var j in this.exchangeArray) {
                if (beforeCu == this.exchangeArray[j].tagerCurrency) {
                    publicExchange = this.exchangeArray[j].exchange
                }
            }
            for (var i in this.exchangeArray) {
                if (afterCu == this.exchangeArray[i].tagerCurrency) {
                    this.publicAmount = ((amounts * publicExchange) / this.exchangeArray[i].exchange)
                        .toFixed(2);
                }
            };
            return this.publicAmount;
        },
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
                success: function(r) {
                    console.log(r.body.list);
                    _this.currencyList = r.body.list;
                },
                error: function(er) {

                }
            })
        },
        ExchangeMoneyOrder: function(amounts, beforeCu, afterCu) {
            var publicExchange = '';
            if (beforeCu == afterCu) {
                this.publicAmounts = amounts;
                return;
            }
            for (var j in this.exchangeArrays) {
                if (beforeCu == this.exchangeArrays[j].tagerCurrency) {
                    publicExchange = this.exchangeArrays[j].exchange
                }
            }
            for (var i in this.exchangeArrays) {
                if (afterCu == this.exchangeArrays[i].tagerCurrency) {
                    this.publicAmounts = ((amounts * publicExchange) / this.exchangeArrays[i].exchange)
                        .toFixed(2);
                }
            };
            return this.publicAmounts;
        },
        // CheckBox change事件
        changePaymentEvent: function(val) {
            // 是否显示"余额不足需要充值"的文字
            var paymentMoney = 0;
            for (var j in this.chiocePaymentMethodArray) {
                paymentMoney += this.chiocePaymentMethodArray[j].exchangeMoney * 1;
            }
            if ((this.payDialogInfo.badMoney * 1 - paymentMoney) > 0) {
                this.warningPaymentMoney = true;
                this.stillNeedPay = this.payDialogInfo.badMoney * 1 - paymentMoney;

            } else {
                this.warningPaymentMoney = false;
                this.stillNeedPay = this.payDialogInfo.badMoney * 1 - paymentMoney;
            }
            // 如果都不选  的变化事件
            if (this.chiocePaymentMethodArray.length == 0) {
                this.balanceEnough = false;
                this.warningPaymentMoney = false;
            };
            this.ExchangeMoney(this.stillNeedPay, this.payDialogInfo.current, this.nomarlCurrency);
            this.stillNeedPaymentMoney = this.publicAmount;
        },
        // 还需支付金额 input blur事件
        changeResiduePayMoneyEvent: function() {
            if (this.nomarlCurrency != '') {
                this.ExchangeMoney(this.stillNeedPay, this.payDialogInfo.current, this
                    .nomarlCurrency);
                this.stillNeedPaymentMoney = this.publicAmount;
            }
        },
        // 还需支付金额 币种change事件
        changeCurrency: function(val) {
            this.ExchangeMoneyOrder(this.stillNeedPay, this.payDialogInfo.current, val);
            this.stillNeedPaymentMoney = this.publicAmounts;
        },
        // 支付按钮
        payDemandsByMoreMethod: function() {
            var _this = this;
            var data = {
                payId: this.payId,
                paymentMethodEntity: [],
            };
            for (var i in this.chiocePaymentMethodArray) {
                var arrObj = {
                    type: this.chiocePaymentMethodArray[i].type,
                    current: this.chiocePaymentMethodArray[i].current,
                }
                data.paymentMethodEntity.push(arrObj);
            };
            if (this.stillNeedPay > 0) {
                var obj = {
                    type: 2,
                    current: this.nomarlCurrency,
                }
                data.paymentMethodEntity.push(obj);
            }

            $.ajax({
                url: baseURL + 'sys/seller/order/payDemandsByMoreMethod',
                type: 'POST',
                contentType: 'application/json',
                headers: {
                    'token': token,
                },
                dataType: 'json',
                data: JSON.stringify(data),
                success: function(r) {
                    if (r.body.needMoney == 0) {
                        vm.$message({
                            message: '支付成功',
                            type: 'success'
                        });
                        setInterval(function() {
                            window.location.reload();
                        }, 1500)
                    } else {
                        vm.$message({
                            message: '支付失败, 请重新计算汇率',
                            type: 'warning'
                        });

                    }
                },
                error: function(er) {

                }
            })
        },
        // 关闭多币种支付弹窗事件
        rightAwayPayHandleClose: function() {
            this.residuePayMoney = '';
            this.paymentMethod = [];
            this.newPaymentMethod = [];
            this.chiocePaymentMethodArray = [];
            this.imgs = [];
            this.rightAwayPayType2Doc = '';
            this.nomarlCurrency = '';
            this.rightAwayPay = false;
            this.switchValue = false;
            this.payToOrderArray = [];
        },

        // 转账支付创口 转账支付接口
        rightAwayPayType2Submit: function() {
            var _this = this;
            for (var i in this.chiocePaymentMethodArray) {
                this.paymentAmount += this.chiocePaymentMethodArray[i].exchangeMoney * 1;
            }
            if (this.stillNeedPay <= 0) {
                this.payDemandsByMoreMethod();
            } else {
                this.formDate = new FormData();
                this.$refs.upload.submit();
                this.formDate.append('current', vm.nomarlCurrency);
                this.formDate.append('studId', vm.payDialogInfo.studId);
                this.formDate.append('amount', vm.residuePayMoney);
                this.formDate.append('remark', vm.rightAwayPayType2Doc);
                if (vm.payDialogInfo.courseId != null) {
                    this.formDate.append('courseId', vm.payDialogInfo.courseId);
                } else if (vm.payDialogInfo.courseId === null) {
                    this.formDate.append('courseId', '');
                }
                let config = {
                    headers: {
                        processData: false,
                        contentType: false,
                        mimeType: "multipart/form-data",
                        token: token,
                    }
                }
                axios.post("" + baseURL + "sys/seller/order/evidenceThumbSave", this.formDate, config)
                    .then(
                        res => {
                            if (res.data.status == 200) {
                                // if (_this.showTypePaymentOnoff == true) {
                                // vm.$message({
                                // message: '账单支付成功',
                                // type: 'success'
                                // });
                                // setInterval(function () {
                                // window.location.reload();
                                // }, 1500)
                                // } else if (_this.showTypePaymentOnoff == false) {
                                _this.payDemandsByMoreMethod();
                                // }
                            } else {
                                vm.$message({
                                    message: res.data.body.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch(res => {

                    })
            }

        },

        apply(row, index) {
            vm.studId = row.studId;
            vm.payDialogInfo = row;
            console.log(row)
            vm.residuePayMoney = vm.payDialogInfo.badMoney;
            this.stillNeedPay = vm.payDialogInfo.badMoney;
            // 获取支付方式
            this.rightAwayPayLoading = true;
            this.payId = row.id;
            var _this = this;
            this.rightAwayPay = true;
            // 获取多币种支付账户
            $.ajax({
                url: baseURL + 'sys/seller/order/queryStudPaymentMethod?payId=' + row.id,
                type: 'GET',
                headers: {
                    token: token
                },
                success: function(r) {
                    console.log(r);
                    _this.nomarlCurrency = _this.payDialogInfo.current;
                    _this.showTypePayment = r.body;
                    _this.ExchangeMoneyOrder(_this.payDialogInfo.badMoney, _this.payDialogInfo
                        .current, _this.payDialogInfo.current);
                    _this.stillNeedPaymentMoney = _this.publicAmounts;
                    if (_this.showTypePayment.studCardBag == null && _this.showTypePayment
                        .studAccountList.length >= 1) {
                        _this.showTypePaymentOnoff = true; // 无学期卡一种余额
                    } else {
                        _this.showTypePaymentOnoff = false; // 有学期卡多种充余额
                    }
                    if (r.body.studCardBag != null) {
                        var obj1 = {
                            hasCard: true,
                            lastTime: r.body.studCardBag.lastTime,
                            money: r.body.studCardBag.lastMoney * 1,
                            current: r.body.studCardBag.currency,
                            type: 1,
                            id: 0,
                            exchangeMoney: r.body.studCardBag.lastMoneyByPayId,
                            disabled: false,
                            plusMoney: 0,
                            checked: false,
                            pulsMoneyExchange: 0,
                            choose: false,
                        };
                        _this.paymentMethod.push(obj1);
                    }
                    for (var i in r.body.studAccountList) {
                        var obj = {
                            hasCard: false,
                            money: r.body.studAccountList[i].money,
                            current: r.body.studAccountList[i].current,
                            type: 2,
                            id: i * 1 + 1,
                            exchangeMoney: r.body.studAccountList[i].moneyByPayId,
                            disabled: false,
                            plusMoney: 0,
                            checked: false,
                            pulsMoneyExchange: 0,
                            choose: false,
                        };
                        _this.paymentMethod.push(obj);
                    }
                    _this.rightAwayPayLoading = false;
                    _this.newPaymentMethod = JSON.parse(JSON.stringify(_this.paymentMethod));
                }
            })

            console.log(row);
            $.ajax({
                url: baseURL + 'sys/seller/order/getUndoneCustomList',
                type: 'GET',
                data: {
                    userId: row.studId,
                    notIncludeId: row.courseId,
                },
                headers: {
                    token: token
                },
                success: function(r) {
                    vm.payToOrderArray = r.body;
                    for (var i in vm.payToOrderArray) {
                        vm.payToOrderArray[i].checked = false;
                    }
                },
                error: function(er) {

                }
            });
            vm.id = row.id
            if (row.type == 1) {
                vm.max = Number(row.badMoney);
                vm.min = Number(row.minMoney);
                vm.ruleForm1.amount1 = row.minMoney;
                vm.ruleForm1.amount = row.minMoney;
                vm.disab = false;
                vm.dj = true;
            }
            if (row.type == 2) {
                vm.max = 100000;
                vm.min = Number(row.badMoney);
                vm.ruleForm1.amount1 = row.badMoney;
                vm.ruleForm1.amount = row.minMoney;
                vm.disab = false;
                vm.dj = true;
            }
            if (row.type == 16 || row.type == 4 || row.type == 8) {
                vm.max = Number(row.badMoney);
                vm.min = Number(row.badMoney);
                vm.ruleForm1.amount1 = row.minMoney;
                vm.ruleForm1.amount = row.minMoney;
                vm.disab = true;
                vm.dj = false;
            }
            vm.ruleForm.type = row.type;
            vm.ruleForm.studId = row.studId;
            vm.ruleForm.courseId = row.courseId;
            vm.ruleForm1.studname = row.nickName;
            vm.ruleForm1.ordermoney = row.badMoney;
            vm.ruleForm1.current = row.current;
            vm.ruleForm.id = row.id;
            // vm.paytypemodel = true;
        },
        oninput() {

        },
        submitUpload() {
            if (vm.ruleForm.remark == undefined) {
                vm.ruleForm.remark = " "
            }
            this.formDate = new FormData();
            this.formDate.append('current', vm.ruleForm.current);
            this.formDate.append('studId', vm.ruleForm.studId);
            this.formDate.append('amount', vm.ruleForm.amount);
            this.formDate.append('remark', vm.ruleForm.remark);
            this.formDate.append('courseId', vm.ruleForm.courseId);
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
                        vm.save1();
                        vm.$message({
                            message: '账单支付成功',
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
        payMethod() {
            vm.mm2 = true;
        },
        save1(formName) {
            var self = this;
            if (vm.radio == "1") {
                vm.isFromOrder = true
            } else {
                vm.isFromOrder = false
            }
            vm.b1 = true;
            vm.b2 = "加载中";
            $.ajax({
                type: "post",
                dataType: "json",
                headers: {
                    "token": token
                },
                data: {
                    "token": token,
                    "studId": vm.ruleForm.studId,
                    "currency": vm.ruleForm.current,
                    "payMoney": vm.ruleForm1.amount,
                    "sysPaymentDemandId": vm.ruleForm.id,
                    "isFromOrder": vm.isFromOrder,
                },
                url: "" + baseURL + "/sys/seller/order/offsetPaymentDemand",
                success: function(json) {
                    if (json.status == 200) {
                        vm.creatmodel1 = false;
                        vm.b1 = false;
                        vm.b2 = "确 定";
                        if (json.body.needMoney == 0) {
                            self.$message({
                                message: "账单支付成功",
                                type: 'success',
                            });
                            vm.getTableData();
                            vm.mm1 = false;
                        } else {
                            vm.mm1 = false;
                            vm.ruleForm.amount = json.body.needMoney
                            vm.ruleForm.amount1 = vm.ruleForm1.amount
                            vm.ruleForm.studname = vm.ruleForm1.studname
                            vm.mm2 = true;
                            vm.mm = true;
                        }
                    }
                    if (json.status == 400) {
                        vm.b1 = false;
                        vm.b2 = "确 定";
                        vm.$message({
                            message: json.body.msg,
                            type: 'warning'
                        });
                    }
                }
            });
        },
        save2() {
            vm.mm2 = false;
        },
        save(formName) {
            var badMoney = Number(vm.badMoney)
            var amount = Number(vm.ruleForm.amount)
            if (vm.type == 1) {
                if (amount > badMoney) {
                    vm.red = "课程预付 可以少不可以多";
                    return
                }
            }
            if (vm.type == 2) {
                if (amount < badMoney) {
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
            if (vm.ruleForm.amount != vm.ruleForm.reamount) {
                vm.$message({
                    message: "请保持两次数值一样",
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
            console.log(val)
            this.multipleSelection = val;
            let ids = [];
            let nickNames = [];
            let orderNos = [];
            let amounts = [];
            let currents = [];
            let studIds = [];
            this.multipleSelection.map((item) => {
                var id = item.id;
                var badMoney = Number(item.badMoney)
                ids.push("" + id + "");
                nickNames.push("" + item.nickName + "");
                orderNos.push("" + item.orderNo + "");
                amounts.push("" + badMoney + "");
                currents.push("" + item.current + "");
                studIds.push("" + item.studId + "");
            });
            this.ids = ids;
            this.nickNames = nickNames;
            this.orderNos = orderNos[0];
            this.nickNames = nickNames;
            this.amounts = amounts[0];
            this.currents = currents[0];
            this.studIds = studIds;
            console.log('多选', orderNos);
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        suredel(row, index) {
            this.$confirm('是否要强制删除账单?', '提示', {
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
                        "sys/seller/order/superDeletePaymentDemand?sysPaymentDemandId=" +
                        row.id + "",
                    success: function(json) {
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
                        }
                    }
                });
            }).catch(() => {});
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
                    success: function(json) {
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
                        }
                    }
                });
            }).catch(() => {});
        },
        allchange(file, fileList) {
            vm.fileListnum = fileList.length
        },
        alluploadFile(file) {
            this.formDate = new FormData();
            for (i = 0; i < vm.fileListnum; i++) {
                this.formDate.append('file' + i, file.file);
            }
        },
        allhandleRemove(file, fileList) {
            vm.fileListnum = fileList.length
        },
        allsubmitUpload() {

        },
        allsave() {
            if (vm.ruleForm.remark == undefined) {
                vm.ruleForm.remark = '';
            }
            vm.b1 = true;
            vm.b2 = "加载中";
            this.formDate = new FormData();
            this.$refs.upload.submit();
            var payIds = vm.ids.join(';')
            var studIds = vm.studIds.join(';')
            this.formDate.append('current', vm.currents);
            this.formDate.append('studIds', studIds);
            this.formDate.append('amount', vm.amounts);
            this.formDate.append('remark', vm.ruleForm.remark);
            this.formDate.append('payIds', payIds);
            let config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    token: token,
                }
            }
            axios.post("" + baseURL + "sys/seller/order/evidenceThumbSaveBatch", this.formDate, config)
                .then(res => {
                    if (res.data.status == "200") {
                        vm.$message({
                            message: '账单支付成功',
                            type: 'success'
                        });
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
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

                })
        },
    }
});