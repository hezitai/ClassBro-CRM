var vm = new Vue({
    el: '#app',
    data() {
        return {
            imgs: [],
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            data: {
                amount: '',
                studId: '',
            },
            id: '',
            span: 24,
            orderNo: '',
            model1: false,
            model2: false,
            model3: false,
            fromCourseId: '',
            current: false,
            deliverys: [],
            btnstatus: false,
            btnval: "确定",
            balancemodel2: false,
            balancemodel: false,
            ordermodel: false,
            transfermodel: false,
            ruleForm: {
                current: '',
                minMoney: '',
                badMoney: '',
                studname: '',
                studId: '',
                courseId: '',
                money: '',
                banalce: '',
                needMoney: '',
                orderMoney: '',
                deleteFlag: '',
            },
            rules: {},
        }
    },
    mounted() {
        this.getnum();
        this.getinfo();
        this.getorder();
        this.hasPermission();
    },
    methods: {
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        getnum() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var paytype = getUrlStr("paytype");
            var studId = getUrlStr("studId");
            var money = getUrlStr("money");
        },
        getinfo() {
            this.getnum();
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var paytype = getUrlStr("paytype");
            var studId = getUrlStr("studId");
            var money = getUrlStr("money");
            var current = getUrlStr("current");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "/sys/seller/order/getPaymentDemandObject?id=" + id + "",
                success: function (json) {
                    if (json.status == 200) {
                        vm.ruleForm.studname = json.body.nickName;
                        vm.ruleForm.minMoney = json.body.minMoney;
                        vm.ruleForm.badMoney = money;
                        vm.ruleForm.paytype = paytype;
                        vm.ruleForm.current = json.body.current;
                        vm.ruleForm.studId = json.body.studId;
                        vm.ruleForm.courseId = json.body.id;
                        if (paytype == 0) {
                            vm.ordermodel = true;
                        }
                        if (paytype == 1) {
                            $.ajax({
                                type: "get",
                                dataType: "json",
                                data: {
                                    "token": token,
                                },
                                url: "" + baseURL +
                                    "/sys/seller/order/getStudentAmountById?studId=" +
                                    studId + "&currency=" + current + "",
                                success: function (json) {
                                    if (json.status == 200) {
                                        vm.ruleForm.money = json.body;
                                        vm.ruleForm.banalce = vm.ruleForm.money;
                                        if (vm.ruleForm.money >= vm.ruleForm
                                            .badMoney) {
                                            vm.balancemodel = true;
                                            vm.ruleForm.minMoney = 0;
                                        } else {
                                            vm.balancemodel2 = true;
                                            vm.ruleForm.needMoney = (Number(vm
                                                    .ruleForm.badMoney) -
                                                Number(vm
                                                    .ruleForm.money)).toFixed(2);
                                        }
                                    }
                                }
                            });
                        }
                        if (paytype == 2) {
                            vm.transfermodel = true;
                        }
                    }
                }
            });
        },
        changeOrder(val) {
            vm.current = true;
            vm.fromCourseId = val;
            let obj = {};
            obj = this.deliverys.find((item) => {
                return item.id === val;
            });
            vm.orderNo = obj.orderNo;
            vm.deliverys.forEach(function (element) {
                if (val == element.id) {
                    vm.ruleForm.orderMoney = ((element.studPurchaseOrder.prepayment * 100) - (
                        element.studPurchaseOrder.reaMonetary * 100)) / 100;
                    if (element.deleteFlag == "锁定订单") {
                        vm.ruleForm.deleteFlag = "您选择的订单是一个已锁定的订单";
                    } else {
                        vm.ruleForm.deleteFlag = "";
                    }
                }
            });
        },
        getorder() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };

            var studId = getUrlStr("studId");
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "userId": studId,
                },
                url: "" + baseURL + "/sys/seller/order/getUndoneCustomList",
                success: function (json) {
                    if (json.status == 200) {
                        // vm.deliverys = json.body;
                        loading.close();
                        json.body.map(function (element) {
                            if (element.deleteFlag == true) {
                                element.deleteFlag = "锁定订单";
                            } else {
                                element.deleteFlag = "";
                            }
                            vm.deliverys = json.body;
                        })
                    }
                }
            });
        },
        save() {
            if (Number(vm.ruleForm.badMoney) > Number(vm.ruleForm.orderMoney)) {
                vm.$message({
                    message: "该订单余额不够,请选择其他订单或其他支付方式！",
                    type: 'warning'
                });
                return;
            }
            vm.model1 = true;
        },
        yes1() {
            vm.btnstatus = true;
            vm.btnval = "加载中";
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            $.ajax({
                type: "post",
                dataType: "json",
                data: {
                    "token": token,
                    "studId": vm.ruleForm.studId,
                    "currency": vm.ruleForm.current,
                    "payMoney": vm.ruleForm.badMoney,
                    "sysPaymentDemandId": id,
                    "fromCourseId": vm.fromCourseId,
                },
                url: "" + baseURL + "/sys/seller/order/offsetPaymentDemand",
                success: function (json) {
                    if (json.status == 200) {
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                        vm.$message({
                            message: json.body.msg,
                            type: 'success'
                        });
                        setTimeout(function () {
                            window.history.back(-1);
                        }, 1000);
                    }
                    if (json.status == 400) {
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                        vm.$message({
                            message: json.body.msg,
                            type: 'warning'
                        });
                    }
                }
            });
        },
        save2() {
            vm.btnstatus = true;
            vm.btnval = "加载中";
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            $.ajax({
                type: "post",
                dataType: "json",
                data: {
                    "token": token,
                    "studId": vm.ruleForm.studId,
                    "currency": vm.ruleForm.current,
                    "payMoney": vm.ruleForm.badMoney,
                    "sysPaymentDemandId": id,
                },
                url: "" + baseURL + "/sys/seller/order/offsetPaymentDemand",
                success: function (json) {
                    if (json.status == 200) {
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                        vm.$message({
                            message: "操作成功",
                            type: 'success'
                        });
                        setTimeout(function () {
                            window.history.back(-1);
                        }, 1000);
                    }
                    if (json.status == 400) {
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                        vm.$message({
                            message: json.body.msg,
                            type: 'warning'
                        });
                    }
                }
            });
        },
        save1() {
            vm.model2 = true;
            return;
        },
        yes2() {
            vm.submitUpload1();
        },
        submitUpload1() {
            if (vm.ruleForm.remark == undefined) {
                vm.ruleForm.remark = '';
            }
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var courseId = getUrlStr("courseId");
            // return
            vm.btnstatus = true;
            vm.btnval = "加载中";
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('current', vm.ruleForm.current);
            this.formDate.append('studId', vm.ruleForm.studId);
            this.formDate.append('amount', vm.ruleForm.needMoney);
            this.formDate.append('remark', vm.ruleForm.remark);
            /* 
             *
             *lisa 修改courseId为null的情况
             *
             */
            if (courseId != "null") {
                this.formDate.append('courseId', courseId);
            }
            this.formDate.append('payId', id);
            this.formDate.append('payMoney', vm.ruleForm.badMoney);
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

                    if (res.data.status == "200") {
                        vm.$message({
                            message: res.data.body.msg,
                            type: 'success'
                        });
                        vm.fileList = [];
                        vm.ruleForm.remark = "";
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                        setTimeout(function () {
                            window.history.back(-1);
                        }, 1000);
                    }
                    if (res.data.status == 400) {
                        vm.$message({
                            message: res.data.body.msg,
                            type: 'warning'
                        });
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                    }
                }).catch(res => {

            })
        },
        save3() {
            vm.model3 = true;
        },
        yes3() {
            vm.submitUpload();
        },
        submitUpload() {
            if (vm.ruleForm.remark == undefined) {
                vm.ruleForm.remark = '';
            }
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var courseId = getUrlStr("courseId");
            vm.btnstatus = true;
            vm.btnval = "加载中";
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('current', vm.ruleForm.current);
            this.formDate.append('studId', vm.ruleForm.studId);
            this.formDate.append('amount', vm.ruleForm.badMoney);
            this.formDate.append('remark', vm.ruleForm.remark);
            if (courseId != "null") {
                this.formDate.append('courseId', courseId);
            }
            this.formDate.append('payId', id);
            this.formDate.append('payMoney', vm.ruleForm.badMoney);
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
                    if (res.data.status == "200") {
                        vm.$message({
                            message: '账单支付成功',
                            type: 'success'
                        });
                        vm.fileList = [];
                        vm.ruleForm.remark = "";
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                        setTimeout(function () {
                            window.history.back(-1);
                        }, 1000);
                    }
                    if (res.data.status == 400) {
                        vm.$message({
                            message: res.data.body.msg,
                            type: 'warning'
                        });
                        vm.btnstatus = false;
                        vm.btnval = "确 定";
                    }
                }).catch(res => {

            })
        },
        handlePreview(file) {},
        success(response, file, fileList) {},
        onerror(response, file, fileList) {},
        change(file, fileList) {
            vm.imgs = fileList;
            vm.span = 24 / (fileList.length);
            console.log(vm.imgs)
            vm.fileListnum = fileList.length;
        },
        uploadFile(file) {
            this.formDate = new FormData();
            for (i = 0; i < vm.fileListnum; i++) {
                this.formDate.append('file' + i, file.file);
            }
        },
        handleRemove(file, fileList) {
            vm.span = 24 / (fileList.length);
        },
        back() {
            window.history.back(-1);
        },
        no1() {
            vm.model1 = false;
        },
        no2() {
            vm.model2 = false;
        },
        no3() {
            vm.model3 = false;
        },
    }
});