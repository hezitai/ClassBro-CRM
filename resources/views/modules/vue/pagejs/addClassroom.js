var vm = new Vue({
    el: '#app',
    data() {
        return {
            lessionModel: false,
            pickerOptionsStart: {
                disabledDate: (time) => {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                    let beginDateVal = this.startTime;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime()
                        );
                    }
                }
            },
            number: 1,
            btnval: "添加课堂",
            btnstatus: false,
            endTime: '',
            startTime: '',
            ruleForm: {
                name: '',
                decimalRoomCost: null,
                startTime: null,
                endTime: null,
                description: null,
                roomType: "1",

            },
            current: null,
            rules: {
                name: [{
                    required: true,
                    message: '请填写课堂名称',
                    trigger: 'blur'
                }],
                decimalRoomCost: [{
                    required: true,
                    message: '请填写课堂单价',
                    trigger: 'blur'
                }],
                startTime: [{
                    required: true,
                    message: '请选择开始时间',
                    trigger: 'change'
                }],
                endTime: [{
                    required: true,
                    message: '请选择结束时间',
                    trigger: 'change'
                }],
                description: [{
                    required: true,
                    message: '请填写课堂描述',
                    trigger: 'blur'
                }],
            },
            isIframe: false,
        }
    },

    mounted() {
        this.getUrlStr()
        this.getCurrent()

    },
    methods: {
        getUniversity(val) {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "countryId": val
                },
                url: "" + baseURL + "sys/basedata/university/list",
                success: function (json) {

                    vm.universitys = json.body.list;
                }
            });
        },
        change_startTime(val) {
            this.startTime = val;
        },
        back() {
            window.history.back(-1);
        },
        getCurrent() {
            this.current = getUrlStr('currny')
        },
        getUrlStr() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var isIframe = getUrlStr("isIframe");
            if (isIframe == true) {
                this.isIframe = false;
            } else {
                this.isIframe = true;
            }
        },

        saveClass(formName) {

            var id = getUrlStr("id");

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/classcourse/appendClassroom",
                        contentType: "application/json",
                        data: JSON.stringify({
                            cdId: id,
                            decimalRoomCost: this.ruleForm.decimalRoomCost,
                            name: this.ruleForm.name,
                            startTime: this.ruleForm.startTime,
                            endTime: this.ruleForm.endTime,
                            description: this.ruleForm.description,
                            roomType: this.ruleForm.roomType,
                        }),
                        success: function (r) {

                            if (r.status == 200) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'success',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "添加课堂";
                                setTimeout(function () {
                                    window.top.location.reload();
                                }, 1500);
                            }
                            if (r.status == 400) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'warning',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "添加课堂";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // addLession(item) {
        //   this.ruleForm.domains.push({
        //   });
        // },
        // removeDomain(item) {
        //   var index = this.ruleForm.domains.indexOf(item)
        //   if (index !== -1) {
        //     this.ruleForm.domains.splice(index, 1)
        //   }
        // },
    },
});