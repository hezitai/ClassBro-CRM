var vm = new Vue({
    el: '#app',
    data() {
        return {
            countrys: '',
            ruleForm: {
                countryId: '',
            },
            rules: {
                // username: [
                //   { required: true, message: '请输入学生昵称', trigger: 'blur' },
                // ],
                mobile: [{
                    required: true,
                    message: '请输入学生账号',
                    trigger: 'blur'
                }, ],
                password: [{
                    required: true,
                    message: '请输入学生密码',
                    trigger: 'blur'
                }, ],
                countryId: [{
                    required: true,
                    message: '请输入国家id',
                    trigger: 'change'
                }, ],
                universityId: [{
                    required: true,
                    message: '请输入大学id',
                    trigger: 'blur'
                }, ],
                // wxAccount: [
                //   { required: true, message: '请输入微信号', trigger: 'blur' },
                // ]
            }
        };
    },
    mounted() {
        this.getcountrys();
        this.list = this.states.map(item => {
            return {
                value: item,
                label: item
            };
        });
    },
    methods: {
        change(val) {
            console.log(val)
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options4 = this.list.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.options4 = [];
            }
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
        submitForm(formName) {
            var self = this;
            console.log(this.$refs.ruleForm.model.countryId);
            var token = localStorage.getItem("token");
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.$refs.ruleForm.model);
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "/sys/seller/order/createStudAccount",
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
    }
});