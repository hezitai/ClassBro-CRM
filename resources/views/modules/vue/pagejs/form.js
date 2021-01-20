var vm = new Vue({
    el: '#app',
    data() {
        return {
            show1: false,
            show2: true,
            activeName: 'first',
            demands: '',
            levels: '',
            universitys: '',
            ruleForm: {},
            rules: {
                courseName: [{
                    required: true,
                    message: '请输入课程名称',
                    trigger: 'blur'
                }, ],
                code: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                scheduledTime: [{
                    required: true,
                    message: '请输入预计课时',
                    trigger: 'blur'
                }, ],
                buySchooltime: [{
                    required: true,
                    message: '请输入实际课时',
                    trigger: 'blur'
                }, ],
                price: [{
                    required: true,
                    message: '请输入课时单价',
                    trigger: 'blur'
                }, ],
                currencyId: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                currency: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'change'
                }, ],
                studentName: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                universityId: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                levelId: [{
                    required: true,
                    message: '请选择学术级别',
                    trigger: 'change'
                }, ],
                schoolYear: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                examTime: [{
                    required: true,
                    message: '请输入Official Deadline',
                    trigger: 'blur'
                }, ],
                endCourseTime: [{
                    required: true,
                    message: 'Deal Deadline',
                    trigger: 'blur'
                }, ],
                expectationNum: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                courseFamiliarityId: [{
                    required: true,
                    message: '请输入课程熟悉度',
                    trigger: 'blur'
                }, ],
                demandTypeId: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                schoolAccount: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                schoolPws: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                type: [{
                    required: true,
                    message: '请选择时间',
                    trigger: 'change'
                }],
                resource: [{
                    required: true,
                    message: '请选择活动资源',
                    trigger: 'change'
                }],
                desc: [{
                    required: true,
                    message: '请填写活动形式',
                    trigger: 'blur'
                }]
            }
        };
    },
    mounted() {
        this.level();
        this.demand();
    },
    methods: {
        submitForm(formName) {
            var self = this;
            var token = localStorage.getItem("token");
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.$refs.ruleForm.model);
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/order/savePurchaseOrder",
                        contentType: "application/json",
                        data: JSON.stringify(this.$refs.ruleForm.model),
                        success: function (r) {
                            if (r.status == 200) {
                                self.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        level() {
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/level/list",
                success: function (json) {
                    vm.levels = json.body;
                }
            });
        },
        demand() {
            var token = localStorage.getItem("token");
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/demandyype/list",
                success: function (json) {
                    vm.demands = json.body;
                }
            });
        },
        handleClick(tab, first) {
            var val = tab.index;
            console.log(val);
            if (val == 0) {
                vm.show1 = false;
                vm.show2 = true;
            } else {
                vm.show1 = true;
                vm.show2 = false;
            }
        }
    }
});