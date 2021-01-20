var vm = new Vue({
    el: '#app',
    data() {
        return {
            unitWorth: '',
            lastTime: '',
            cardNo: '',
            xueqikadanjia: 0,
            cardtimes: '',
            isCard: false,
            cardtime: false,
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            data: {},
            coursewareId: '',
            second: false,
            first: true,
            activeName: 'first',
            studId: null,
            index: '',
            classrooms: [],
            currency: '',
            number: 1,
            btnval: "创建订单",
            btnstatus: false,
            btnvallession: "添加课堂",
            btnstatusession: false,
            universitys: '',
            countrys: '',
            usernamedisabled: false,
            disabled: false,
            university: false,
            showcountry: false,
            tip: '',
            error: false,
            success: false,
            color: '',
            studPreferentialPolicies: '',
            universityId: '',
            countryName: '',
            countryId: '',
            saledPay: 0, // 优惠后价格
            roomTypes: [{
                    id: 1,
                    roomTypename: "普通课堂"
                },
                {
                    id: 4,
                    roomTypename: "引流课堂"
                }
            ],
            quanjubizhong: '', // 存储全局币种
            ruleForm: {
                isFromCard: true,
                num: '',
                mobile: '',
                username: '',
                classCourseCountryId: '',
                classCourseUniversityId: '',
                preferentialPolicId: '',
                name: null,
                domains: [{
                    checked: false,
                    preferentialPolicId: null,
                    preferentialPolicRemark: null,
                    entered: null,
                    price: null,
                    preferential: null,
                    roomType: null,
                }],
            },
            rules: {
                mobile: [{
                    required: true,
                    message: '请填写手机号',
                    trigger: 'blur'
                }],
                username: [{
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
                descriptions: [{
                    required: true,
                    message: '请填写课堂描述',
                    trigger: 'blur'
                }],
            },
            isIframe:false,
        }
    },

    mounted() {
        this.getcountrys();
        this.getUniversity();
        this.getLession();
        this.getstudPreferentialPolicies();
        // this.hasPermission();
    },
    methods: {
        // hasPermission(permission) {
        //     if (window.parent.permissions.indexOf(permission) > -1) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
        handleClick(tab, event) {
            console.log(tab.index);
            if (tab.index == 0) {
                vm.first = true
                vm.second = false
            } else {
                vm.first = false
                vm.second = true
            }
        },
        getLession() {
            var _this = this;
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
            var id = getUrlStr("id");
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "courseId": id,
                    "page": 1,
                    "limit": 1000,
                    "status": 63,
                    "studId": this.studId,
                },
                url: "" + baseURL + "/sys/seller/classcourse/queryClassroomList",
                success: function (json) {
                    vm.ruleForm.domains = json.body
                    if (json.body.length == 0) {
                        _this.quanjubizhong = '';
                    } else {
                        _this.quanjubizhong = json.body[0].currency;
                        for (var i in vm.ruleForm.domains) {
                            vm.ruleForm.domains[i].saledPay = vm.ruleForm.domains[i].roomCost;
                            vm.ruleForm.domains[i].checked = false;
                        }
                    }
                }
            });
        },
        result() {
            vm.iftrue();
        },
        change_card(val) {
            if (val == true) {
                vm.cardtime = true
            } else {
                vm.cardtime = false
            }
        },
        changePrice(item) {
            vm.studPreferentialPolicies.forEach(function (items, index) {
                if (items.id == item.preferentialPolicId) {
                    var as = items.preferential.split("折")
                    console.log(item);
                    // item.preferentials = (Number(as[0]) / 10 * Number(item.roomCost)).toFixed(2) +
                    // item.currency
                    item.saledPay = (Number(as[0]) / 10 * Number(item.roomCost)).toFixed(2)
                    // this.saledPay = item.preferentials;
                }
            })
        },
        saveClass(formName) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var data = [];
            this.ruleForm.domains.forEach(function (item, index) {
                var obj = {};
                if (item.checked == true) {
                    obj.classroomId = item.id;
                    if (item.preferentialPolicId == undefined) {
                        item.preferentialPolicId = null
                    }
                    if (item.preferentialPolicRemark == undefined) {
                        item.preferentialPolicRemark = null
                    }
                    obj.decimalPreferRoomCost = item.saledPay * 1;
                    obj.preferentialPolicId = item.preferentialPolicId;
                    obj.preferentialPolicRemark = item.preferentialPolicRemark;
                    data.push(obj)
                }
            });
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (data == "") {
                        vm.$confirm('你还没有选择任何课堂，确定要这样操作吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            vm.btnstatus = true;
                            vm.btnval = "加载中";
                            $.ajax({
                                type: "POST",
                                headers: {
                                    "token": token
                                },
                                url: "" + baseURL + "sys/seller/classcourse/createStudOrder",
                                contentType: "application/json",
                                data: JSON.stringify({
                                    flag: 1,
                                    mobile: this.ruleForm.mobile,
                                    countryId: this.ruleForm.classCourseCountryId,
                                    nickName: this.ruleForm.username,
                                    parentId: Number(id),
                                    universityId: this.ruleForm.classCourseUniversityId,
                                    classrooms: data,
                                }),
                                success: function (r) {
                                    if (r.status == 200) {
                                        vm.$message({
                                            message: r.body.msg,
                                            type: 'success',
                                        });
                                        vm.addModel = false;
                                        vm.btnstatus = false;
                                        vm.btnval = "创建订单";
                                        vm.getLession();
                                        setTimeout(function () {
                                            window.top.reload();
                                        }, 1500);
                                    }
                                    if (r.status == 400) {
                                        vm.$message({
                                            message: r.body.msg,
                                            type: 'warning',
                                        });
                                        vm.btnstatus = false;
                                        vm.btnval = "创建订单";
                                    }
                                }
                            });
                        }).catch(() => {

                        });
                    } else {
                        vm.btnstatus = true;
                        vm.btnval = "加载中";
                        $.ajax({
                            type: "POST",
                            headers: {
                                "token": token
                            },
                            url: "" + baseURL + "sys/seller/classcourse/createStudOrder",
                            contentType: "application/json",
                            data: JSON.stringify({
                                flag: 1,
                                mobile: this.ruleForm.mobile,
                                countryId: this.ruleForm.classCourseCountryId,
                                nickName: this.ruleForm.username,
                                parentId: Number(id),
                                universityId: this.ruleForm.classCourseUniversityId,
                                classrooms: data,
                            }),
                            success: function (r) {
                                if (r.status == 200) {
                                    vm.$message({
                                        message: r.body.msg,
                                        type: 'success',
                                    });
                                    vm.addModel = false;
                                    vm.btnstatus = false;
                                    vm.btnval = "创建订单";
                                    vm.getLession();
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
                                    vm.btnval = "创建订单";
                                }
                            }
                        });
                    }
                    // debugger


                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        other(formName) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            var data = [];
            this.ruleForm.domains.forEach(function (item, index) {
                var obj = {};
                if (item.checked == true) {
                    obj.classroomId = item.id;
                    if (item.preferentialPolicId == undefined) {
                        item.preferentialPolicId = null
                    }
                    if (item.preferentialPolicRemark == undefined) {
                        item.preferentialPolicRemark = null
                    }
                    obj.preferentialPolicId = item.preferentialPolicId;
                    obj.preferentialPolicRemark = item.preferentialPolicRemark;
                    data.push(obj)
                }
            });
            if (data == "") {
                vm.$message({
                    message: '请选择课堂',
                    type: 'warning',
                });
                return
            }
            vm.btnstatus = true;
            vm.btnval = "加载中";
            $.ajax({
                type: "POST",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "sys/seller/classcourse/createStudOrderBatch",
                contentType: "application/json",
                data: JSON.stringify({
                    coursewareId: this.coursewareId,
                    parentId: Number(id),
                    classrooms: data,
                    fromCard: vm.ruleForm.isFromCard
                }),
                success: function (r) {
                    if (r.status == 200) {
                        vm.$message({
                            message: r.body.msg,
                            type: 'success',
                        });
                        vm.addModel = false;
                        vm.btnstatus = false;
                        vm.btnval = "创建订单";
                        vm.getLession();
                        setTimeout(function () {
                            window.history.back(-1);
                        }, 1500);
                    }
                    if (r.status == 400) {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning',
                        });
                        vm.fileList = [];
                        // vm.ruleForm.domains.forEach(function (item, index) {
                        //   item.checked = false
                        // });
                        vm.btnstatus = false;
                        vm.btnval = "创建订单";
                    }
                }
            });
        },
        othersaveClass(formName) {
            if (vm.files == undefined) {
                return
            } else {
                this.formDate = new FormData();
                for (i = 0; i < vm.files.length; i++) {
                    this.formDate.append('file' + i, vm.files[i].raw);
                }
                this.formDate.append('cdId', 0);
                this.formDate.append('groupId', 1);
                let config = {
                    headers: {
                        processData: false,
                        contentType: false,
                        mimeType: "multipart/form-data",
                        token: token,
                    }
                }
                axios.post("" + baseURL + "sys/seller/courseware/save", this.formDate, config).then(res => {
                    if (res.data.status == 200) {
                        this.coursewareId = res.data.body[0];
                        vm.b1 = false;
                        vm.b2 = "确 定";
                        vm.other();
                    }
                    if (res.data.status == 400) {
                        vm.$message({
                            message: res.data.body.msg,
                            type: 'warning'
                        });
                    }
                    vm.b1 = false;
                    vm.b2 = "确 定";
                })
            }
        },
        checkSelectable(row, index) {
            return row.name !== "测试课堂"
        },
        handleSelectionChange(val) {

        },
        back() {
            window.history.back(-1);
        },
        iftrue() {
            if (vm.ruleForm.mobile == "") {
                return
            }
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "absoluteMobile": vm.ruleForm.mobile,
                    "page": 1,
                    "limit": 100000,
                },
                url: "" + baseURL + "/sys/seller/order/checkMobile",
                success: function (json) {
                    if (json.status == 200) {
                        console.log(vm.countryId)
                        if (json.body.studUserRVO == null) {
                            vm.error = "";
                            vm.success = false;
                            vm.error = false;
                        } else {
                            vm.ruleForm.num = '+' + json.body.studUserRVO.mobileCode;
                            vm.ruleForm.classCourseUniversityId = json.body.studUserRVO
                                .universityId;
                            if (json.body.studUserRVO.nickName == "") {
                                vm.usernamedisabled = false;
                            } else {
                                vm.usernamedisabled = true;
                            }
                            vm.ruleForm.username = json.body.studUserRVO.nickName;
                            vm.ruleForm.classCourseCountryId = json.body.studUserRVO.countryId;
                            vm.success = true;
                            vm.error = false;
                            vm.tip = "该学生已注册，你现在可以直接给TA下单啦";
                            vm.color = 'green';
                            if (json.body.studCardBagRVO != null) {
                                vm.cardNo = json.body.studCardBagRVO.cardNo
                                vm.xueqikadanjia = json.body.studCardBagRVO.unitWorth
                                vm.lastTime = json.body.studCardBagRVO.lastTime
                                vm.ruleForm.isFromCard = true;
                                vm.isCard = true
                                vm.cardtime = true
                                vm.unitWorth = json.body.studCardBagRVO.unitWorth
                            } else {
                                vm.ruleForm.isFromCard = false;
                                vm.isCard = false
                                vm.cardtime = false
                            }
                            if (json.body.studUserRVO.universityId == null) {
                                vm.university = false;
                            } else {
                                vm.university = true;
                            }
                            if (json.body.studUserRVO.countryId == null) {
                                vm.showcountry = false;
                            } else {
                                vm.showcountry = true;
                            }
                            vm.studId = json.body.userId;
                            vm.disabled = true;
                            //vm.getLession();
                            vm.studId = json.body.studCardBagRVO.studId;
                            vm.getLession();

                        }
                        if (json.body.teacUserRVO != null) {
                            vm.success = false;
                            vm.error = true;
                            vm.color = 'red';
                            vm.tip = "该账号已经被老师注册，请更换手机号";
                            vm.disabled = true;
                            vm.usernamedisabled = true;
                            vm.university = true;
                        }
                        if (json.body.sysUserEntity != null) {
                            vm.success = false;
                            vm.error = true;
                            vm.color = 'red';
                            vm.tip = "该账号已经在CRM注册，请更换手机号";
                            vm.disabled = true;
                            vm.usernamedisabled = true;
                            vm.university = true;
                        }
                        if (json.body.studUserRVO == null && json.body.sysUserEntity == null &&
                            json.body.teacUserRVO == null) {
                            vm.ruleForm.username = null;
                            vm.ruleForm.classCourseUniversityId = null
                            vm.ruleForm.classCourseCountryId = null
                            vm.success = false;
                            vm.error = true;
                            vm.showcountry = false;
                            vm.tip = "该账号未被注册";
                            vm.color = 'green';
                            vm.disabled = true;
                            vm.university = false;
                            vm.usernamedisabled = false;
                            vm.studId = null;
                            vm.getLession();
                            //vm.getLession();
                        }
                    }
                    if (json.status == 400) {
                        vm.$message({
                            type: 'warning',
                            message: json.body.msg
                        });
                    }
                }
            });
        },
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
        getstudPreferentialPolicies() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            $.ajax({
                type: "get",
                dataType: "json",
                url: "" + baseURL + "/sys/seller/classcourse/getCourseObject?id=" + id + "",
                data: {
                    "isBig": true
                },
                success: function (json) {
                    vm.studPreferentialPolicies = json.body.studPreferentialPolicies;
                    vm.countryId = json.body.countryId;
                    vm.universityId = json.body.studPurchaseOrder.universityId;
                    if (json.body.studPreferentialPolicies != "") {
                        json.body.studPreferentialPolicies.map(function (item) {
                            item.preferential = item.preferential + "折"
                        });
                    }
                }
            });
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
        removeDomain(item) {
            var roomCosts = []
            vm.ruleForm.domains.map((items) => {
                var roomCost = Number(items.roomCost)
                if (items.checked == true) {
                    roomCosts.push(roomCost)
                }
            });
            var s = 0
            roomCosts.forEach(function (val, idx, arr) {
                s += val
            }, 0)
            vm.cardtimes = s / Number(vm.unitWorth)
            console.log(roomCosts)
        },
        change(file, fileList) {
            vm.fileListnum = fileList.length;
            vm.files = fileList
        },
        uploadFile(file) {
            // this.formDate = new FormData();
            // for (i = 0; i < vm.fileListnum; i++) {
            //   this.formDate.append('file' + i, file.file);
            // }
        },
        handleRemove(file, fileList) {
            vm.fileListnum = fileList.length
        },
        submitUpload() {
            if (vm.files == undefined) {
                return
            } else {
                this.formDate = new FormData();
                for (i = 0; i < vm.files.length; i++) {
                    this.formDate.append('file' + i, vm.files[i].raw);
                }
                this.formDate.append('cdId', 1);
                this.formDate.append('groupId', 1);
                let config = {
                    headers: {
                        processData: false,
                        contentType: false,
                        mimeType: "multipart/form-data",
                        token: token,
                    }
                }
                axios.post("" + baseURL + "sys/seller/courseware/save", this.formDate, config).then(res => {
                    if (res.data.status == 200) {
                        vm.$message({
                            message: "操作成功",
                            type: 'success'
                        });
                        this.coursewareId = res.data.body[0];
                        vm.b1 = false;
                        vm.b2 = "确 定";
                    }
                    if (res.data.status == 400) {
                        vm.$message({
                            message: res.data.body.msg,
                            type: 'warning'
                        });
                    }
                    vm.b1 = false;
                    vm.b2 = "确 定";
                })
            }
        },
    },
});