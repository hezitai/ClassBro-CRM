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
            // pickerOptionsEnd: {
            //   disabledDate: time => {
            //     let beginDateVal = this.startTime;
            //     if (beginDateVal) {
            //       return (
            //         time.getTime() <
            //         new Date(beginDateVal).getTime()-1
            //       );
            //     }
            //   }
            // },
            currency: '',
            number: 1,
            btnval: "创建班课",
            btnstatus: false,
            endTime: '',
            startTime: '',
            radio: '1',
            universitys: '',
            countrys: '',
            ruleForm: {
                classCourseCountryId: '',
                classCourseUniversityId: '',
                classCourseName: '',
                classCourseCode: '',
                remark: '',
                explained: '',
                deadline: '',
                domains: [{
                    name: null,
                    startTime: null,
                    endTime: null,
                    description: null,
                    decimalRoomCost: null,
                    roomType: "1",
                    cdId: 0
                }],
                Favourables: [{
                    decimalPreferential: null,
                }],
            },
            rules: {
                classCourseName: [{
                    required: true,
                    message: '请填写班课名称',
                    trigger: 'blur'
                }],
                classCourseCode: [{
                    required: true,
                    message: '请填写课程代码',
                    trigger: 'blur'
                }],
                classCourseCountryId: [{
                    required: true,
                    message: '请选择班课国家',
                    trigger: 'change'
                }],
                classCourseUniversityId: [{
                    required: true,
                    message: '请选择班课学校',
                    trigger: 'change'
                }],
                explained: [{
                    required: true,
                    message: '请填写班课辅导需求',
                    trigger: 'blur'
                }],
                decimalScheduledTime: [{
                    required: true,
                    message: '请填写班课总课时',
                    trigger: 'blur'
                }],
                deadline: [{
                    required: true,
                    message: '请选择deadline',
                    trigger: 'change'
                }],
            }
        }
    },

    mounted() {
        this.getcountrys();
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
        changeEndtime(val) {
            if (val.endTime < val.startTime) {
                alert("结束时间不能小于开始时间");
                val.endTime = null;
                return;
            }
        },
        change_country(val) {
            this.getUniversity(val);
            this.ruleForm.classCourseUniversityId = null;
            let obj = {};
            obj = this.countrys.find((item) => {
                return item.id === val;
            });
            vm.currency = obj.currency;
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
        change_startTime(val) {
            this.startTime = val;
        },
        saveClass(formName) {
            var num = vm.ruleForm.Favourables.length;
            for (i = 0; i < num; i++) {
                if (vm.ruleForm.Favourables[i].decimalPreferential == undefined) {
                    alert("请选择优惠券")
                    return;
                }
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // var num = vm.ruleForm.Favourables.length;
                    // for(i=0; i<num; i++){
                    //   if(vm.ruleForm.Favourables[i].preferential == 0 ){
                    //     vm.ruleForm.Favourables[i].preferential == "" 
                    //   }
                    //   console.log(vm.ruleForm.Favourables)
                    //   // vm.ruleForm.Favourables[i].preferential = (vm.ruleForm.Favourables[i].preferential)*10;
                    // }
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/classcourse/createClassCourse",
                        contentType: "application/json",
                        data: JSON.stringify({
                            preferentialPolicys: this.ruleForm.Favourables,
                            classrooms: this.ruleForm.domains,
                            userId: 0,
                            classCourseName: this.ruleForm.classCourseName,
                            classCourseCode: this.ruleForm.classCourseCode,
                            classCourseCountryId: this.ruleForm
                                .classCourseCountryId,
                            classCourseUniversityId: this.ruleForm
                                .classCourseUniversityId,
                            explained: this.ruleForm.explained,
                            decimalScheduledTime: Number(this.ruleForm
                                .decimalScheduledTime),
                            remark: this.ruleForm.remark,
                            examTime: this.ruleForm.deadline
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'success',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "创建班课";
                                setTimeout(function () {
                                    window.history.back(-1);
                                }, 1500);
                            }
                            if (r.status == 400) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'warning',
                                });
                                vm.btnstatus = false;
                                vm.btnval = "创建班课";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addLession(item) {
            this.ruleForm.domains.push({
                cdId: 0,
            });
        },
        back() {
            window.history.back(-1);
        },
        addFavourable(item) {
            this.ruleForm.Favourables.push({});
        },
        removeDomain(item) {
            var index = this.ruleForm.domains.indexOf(item)
            if (index !== -1) {
                this.ruleForm.domains.splice(index, 1)
            }
        },
        removeFavourable(item) {
            var index = this.ruleForm.Favourables.indexOf(item)
            if (index !== -1) {
                this.ruleForm.Favourables.splice(index, 1)
            }
        },
    },
});
$("#del").click();