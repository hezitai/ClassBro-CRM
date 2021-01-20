var vm = new Vue({
    el: '#app',
    data() {
        return {
            dis: false,
            urls: [],
            billdata: [],
            id: '',
            classroomdata: [],
            studCoursewareList: [],
            filelist: [],
            page: 1,
            limit: 15,
            ruleForm: {
                createAt: '',
                offCourseName: '',
                badMoney: '',
                statused: '',
                type: '',
                billType: '',
                current: '',
            },
        }
    },
    mounted() {
        this.getclassroomdata();
        this.getBill();
    },
    methods: {
        getclassroomdata: function () {
            var self = this;
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var billType = getUrlStr("billType");
            var statused = getUrlStr("statused");
            if (billType == 2 && statused == 1) {
                this.dis = false;
            } else {
                this.dis = true;
            }
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "sys/seller/order/getPaymentDemandObject?id=" + id + "",
                success: function (json) {
                    if (json.status === 200) {
                        vm.ruleForm.createAt = json.body.createAt;
                        vm.ruleForm.offCourseName = json.body.offCourseName;
                        vm.ruleForm.badMoney = json.body.badMoney;
                        vm.ruleForm.current = json.body.current;
                        if (json.body.billType == 1) {
                            vm.ruleForm.billType = "系统生成"
                        }
                        if (json.body.billType == 2) {
                            vm.ruleForm.billType = "销售创建"
                        }
                        if (json.body.type == 1) {
                            vm.ruleForm.type = "课程预付"
                        }
                        if (json.body.type == 2) {
                            vm.ruleForm.type = "欠费账单"
                        }
                        if (json.body.type == 4) {
                            vm.ruleForm.type = "课程尾款"
                        }
                        if (json.body.type == 8) {
                            vm.ruleForm.type = "课程追付"
                        }
                        if (json.body.type == 16) {
                            vm.ruleForm.type = "补款账单"
                        }
                        if (json.body.statused == 1) {
                            vm.ruleForm.statused = "待处理"
                        }
                        if (json.body.statused == 2) {
                            vm.ruleForm.statused = "学生已处理"
                        }
                        if (json.body.statused == 4) {
                            vm.ruleForm.statused = "销售已处理"
                        }
                        if (json.body.statused == 8) {
                            vm.ruleForm.statused = "已结束"
                        }
                    }
                }
            });
        },
        getBill() {
            var self = this;
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var courseId = getUrlStr("courseId");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.page,
                    "limit": this.limit,
                    "courseId": courseId
                },
                url: "" + baseURL + "/sys/seller/order/superPaymentDemandsList",
                success: function (json) {
                    if (json.status == 200) {
                        vm.billdata = json.body.list
                    }
                }
            });
        },
        update() {
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
                    "sysPaymentDemandId": id,
                    "money": vm.ruleForm.badMoney
                },
                url: "" + baseURL + "/sys/seller/order/updatePaymentDemand?",
                success: function (json) {
                    if (json.status == 200) {
                        vm.$message({
                            message: json.body.msg,
                            type: 'success'
                        });
                        vm.getBill();
                    }
                    if (json.status == 400) {
                        vm.$message({
                            message: json.body.msg,
                            type: 'warning'
                        });
                    }
                }
            });
        },
    }
});