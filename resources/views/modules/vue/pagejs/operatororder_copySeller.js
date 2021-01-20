var vm = new Vue({
    el: '#app',
    data() {
        return {
            teacherInformation: '',
            qiangzhigenghuankechengId: '',
            qiangzhigenghuanyunyingInfo: '',
            qiangzhigenghuanyunyingArray: [],
            genghuanyunyingDialog: false,
            remarkmodel: false,
            Wagesmodel: false,
            shigumodel: false,
            spoType: '',
            teacType: '',
            hourlyWagewww: '',
            hourlyWagemodel: false,
            sss: true,
            sub4: false,
            sub3: false,
            sub5: false,
            sub6: false,
            btnstatus: false,
            btnval: "确 定",
            evaluate: false,
            evaluates: '',
            otg: true,
            kou: false,
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            gg: true,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            dialogFormVisible4: false,
            dialogFormVisible5: false,
            idss: [],
            operaterOrderStatusedArr: '0;1;2;5;7;8',
            spoTypeArr: null,
            sooTypeedArr: null,
            sooStatusedArr: "",
            selects: '',
            selectsCopy: '',
            users: '',
            userId: '',
            countryId: '',
            country: '',
            key: '',
            id: '',
            val: 1,
            limit: 15,
            page: "",
            name: '',
            ruleForm: {
                sooStatusedArr: '全部',
                country: '',
                description: '',
                doSomething: '',
                prce: '',
                one: '',
                GB: '',
                OTGB: '',
                gb: '',
                otgb1: '',
                gb1: '',
                sendGb: '',
                remark: '',
            },
            rules: {
                country: [{
                    required: true,
                    message: '请选择委派讲师',
                    trigger: 'change'
                }],
                doSomething: [{
                    required: true,
                    message: '请选择原因',
                    trigger: 'change'
                }],
                prce: [{
                    required: true,
                    message: '请输入奖励G币',
                    trigger: 'blue'
                }],
                gb: [{
                    required: true,
                    message: '请输入G币',
                    trigger: 'blue'
                }],
                descriptions: [{
                    required: true,
                    message: '请输入理由',
                    trigger: 'blue'
                }],
                remark: [{
                    required: true,
                    message: '请输入理由',
                    trigger: 'blue'
                }],
            },
            // 生成外链 全局变量------------------------
            createOutUrlDialogLoading: false,
            shareOutUrl: '',
            erweimaPic: '',
            createOutUrlDialog: false,
            createOutUrlActiveName: 'first',
            createOutUrlActive1: true,
            levels: [{
                    label: "全部",
                    value: "0,1,2,3",
                },
                {
                    label: "S级别",
                    value: "0",
                },
                {
                    label: "A级别",
                    value: "1",
                },
                {
                    label: "B级别",
                    value: "2",
                },
                {
                    label: "C级别",
                    value: "3",
                }
            ],
            level: '',
            createOutUrlSearchResult: [],
            searchKey: '',
            createOutUrlVal: 1,
            createOutUrlLimit: 10,
            createOutUrlCurrentPage: 0,
            createOutUrlPageSize: 0,
            createOutUrlTotal: 0,
            shareToTeacher: false,
            shareDesc: '',
            chooseTeacherArray: [],
            createOutUrlCourseId: '',
        }
    },

    mounted() {
        this.getTableData();
        this.gets();
        //this.hasPermission();
        this.getteacList();
    },
    methods: {
        // 下载二维码图片
        downErweimaPic: function (url) {
            window.open(url);
        },
        // 复制分享链接
        copyShareOutUrl: function (url) {
            var inp = $('#input_url');
            inp.select();
            document.execCommand("Copy");
            vm.$message({
                type: 'success',
                message: '复制成功！',
            })
        },
        // 打开分享 链接
        openOutUrl: function (url) {
            window.open(url);
        },
        // 点击生成外链 按钮
        createOutUrl: function (val) {
            var _this = this;
            this.createOutUrlCourseId = val.id;
            this.createOutUrlDialogLoading = true;
            $.ajax({
                url: baseURL + 'sys/oper/generateShareLink',
                data: {
                    courseId: val.id
                },
                headers: {
                    token: token
                },
                success: function (r) {
                    _this.createOutUrlDialogLoading = false;
                    if (r.status == 200) {
                        _this.createOutUrlDialog = true;
                        _this.shareOutUrl = r.body.url;
                        _this.erweimaPic = baseURL + 'sys/oper/generateQRCode?courseId=' +
                            val.id + '&token=' + token;
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        });
                    }
                },
                error: function (er) {
                    _this.createOutUrlDialogLoading = false;
                },
            });
        },
        // 生成外链弹窗 关闭事件
        createOutUrlDialogClose: function () {
            this.createOutUrlDialog = false;
            this.createOutUrlActiveName = 'first';
            this.createOutUrlActive1 = true;
            this.level = '';
            this.createOutUrlDialog = false;
            this.searchKey = '';
            this.createOutUrlVal = 1;
            this.createOutUrlLimit = 10;
            this.createOutUrlCurrentPage = 0;
            this.createOutUrlPageSize = 0;
            this.createOutUrlTotal = 0;
            this.createOutUrlSearchResult = [];
        },
        // tab标签 事件
        createOutUrlHandleClick: function (tab, event) {
            console.log(tab.index);
            if (tab.index == 1) {
                this.createOutUrlActive1 = false;
                this.getTeacherList();
            } else {
                this.createOutUrlActive1 = true
            }
        },
        // 讲师级别 change事件
        changecreateOutUrlLevel: function () {},
        // 搜索讲师
        createOutUrlSearchTeacher: function () {
            this.createOutUrlVal = 1;
            this.createOutUrlLimit = 15;
            this.createOutUrlCurrentPage = 0;
            this.createOutUrlPageSize = 0;
            this.createOutUrlTotal = 0;
            this.createOutUrlSearchResult = [];
            this.getTeacherList();
        },
        // 表格选中事件
        createOutUrlSearchSelectionChange: function (val) {
            console.log(val);
            this.chooseTeacherArray = val;
        },
        // 选中讲师 分享
        shareTeacEvent: function () {
            if (this.chooseTeacherArray.length == 0) {
                vm.$message({
                    type: 'warning',
                    message: '请至少选择一名讲师'
                })
            } else {
                this.shareToTeacher = true;
            }
        },
        // 关闭给讲师留言弹窗
        shareToTeacherDialogClose: function () {
            this.shareToTeacher = false;
            this.shareDesc = '';
        },
        // 获取讲师列表
        getTeacherList: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/oper/teacList',
                data: {
                    page: this.createOutUrlVal,
                    limit: this.createOutUrlLimit,
                    key: this.searchKey,
                    tudStatused: 10,
                    rank: this.level,
                    teacType: 3,
                },
                headers: {
                    token: token,
                },
                success: function (r) {
                    console.log(r);
                    _this.createOutUrlSearchResult = r.body.list;
                    // totalPage 10--总页数
                    // totalCount 98--总数
                    // pageSize 10--当前页数量
                    // currPage 1--当前页
                    _this.createOutUrlTotal = r.body.totalCount;
                    _this.createOutUrlPageSize = r.body.totalCount;
                    _this.createOutUrlCurrentPage = r.body.currPage;
                },
                error: function (er) {

                }
            })
        },
        // 确认分享
        shareSubmit: function () {
            var _this = this;
            var arr = [];
            var upArr;
            for (var i in this.chooseTeacherArray) {
                arr.push(this.chooseTeacherArray[i].id);
            };
            upArr = arr.join(',');
            $.ajax({
                url: baseURL + 'sys/oper/shareLink',
                data: {
                    teacIds: upArr,
                    courseId: this.createOutUrlCourseId,
                    desc: this.shareDesc,
                },
                headers: {
                    token: token
                },
                success: function (r) {
                    if (r.status == 200) {
                        vm.$message({
                            type: 'success',
                            message: '分享成功',
                        });
                        _this.createOutUrlDialogClose();
                        _this.shareToTeacherDialogClose();
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        })
                    }
                },
                error: function (r) {

                }
            })
        },
        // 分页事件
        createOutUrlHandleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.createOutUrlLimit = val;
            this.getTeacherList();
            this.createOutUrlHandleCurrentChange(this.createOutUrlCurrentPage);
        },
        createOutUrlHandleCurrentChange(val) {
            vm.createOutUrlVal = val;
            this.getTeacherList();
        },
        // --------------------------------------
        qiangzhigenghuanyunyingSub: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/oper/updateOrderOper?courseId=' + _this
                    .qiangzhigenghuankechengId + '&toOperId=' + _this
                    .qiangzhigenghuanyunyingInfo,
                type: 'POST',
                dataType: 'json',
                headers: {
                    token: token
                },
                success: function (r) {
                    console.log(r);
                    if (r.status == 200) {
                        _this.qiangzhigenghuankechengId = '';
                        _this.qiangzhigenghuanyunyingInfo = '';
                        // _this.qiangzhigenghuanyunyingArray = [];
                        _this.genghuanyunyingDialog = false;
                        _this.getTableData();
                    } else {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning'
                        });
                    }

                },
                error: function (er) {

                }
            });
        },
        qingzhigenghuanyunying: function (row, id) {
            console.log(row, id);
            this.genghuanyunyingDialog = true;
            this.qiangzhigenghuankechengId = row.id;
        },
        chiocegenghuanyunying: function (val) {
            console.log(this.qiangzhigenghuanyunyingInfo);
        },
        change_hourlyWage(row, index) {
            $.ajax({
                type: "get",
                dataType: "json",
                headers: {
                    "token": token
                },
                url: "" + baseURL + "sys/train/teacInfo/" + row.teacherId + "",
                success: function (json) {
                    // vm.hourlyWagewww = json.body.hourlyWage;
                }
            });
            vm.courseId = row.id;
            vm.hourlyWagewww = row.hourlyWage;
            vm.ruleForm.hourlyWage = row.hourlyWage;
            vm.hourlyWagemodel = true;
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        reduceWages(row, index) {
            vm.courseId = row.id;
            // vm.teacherId = row.id;
            vm.Wagesmodel = true;
            if (row.teacType == 1) {
                vm.otg = true;
            } else {
                vm.otg = false;
            }
        },
        submitFormhour(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var ot = this.ruleForm.otgb;
                    if (ot == undefined) {
                        ot = 0;
                    }
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.courseId,
                            hourlyWage: vm.ruleForm.hourlyWage
                        },
                        url: "" + baseURL + "/sys/seller/order/putTeacHourlyWage",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.hourlyWagemodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.hourlyWagemodel = false;
                                vm.getTableData();
                            }
                        }
                    });
                }
            });
        },
        seedetail(row, index, offCourseName) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.id + "");
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.id + "&wyid=" + row.offCourseName +
                    "&iswy=true");
            } else {
                // window.open("seller_detail2.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.id + "");
            }
        },
        enterstud(row, index) {
            //window.open( row.assistantJoinUrl );
            var code = token;
            var c = String.fromCharCode(code.charCodeAt(0) + code.length);
            for (var i = 1; i < code.length; i++) {
                c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
            }
            var tk = escape(c);
            window.open("" + url + "static-resource/tkcloud/giveLessons.html?classroomId=" + row.id +
                "&iden=assi&tk=" + tk + "");
        },
        enterteac(row, index) {
            // window.open( row.tourJoinUrl );
            var code = token;
            var c = String.fromCharCode(code.charCodeAt(0) + code.length);
            for (var i = 1; i < code.length; i++) {
                c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
            }
            var tk = escape(c);
            window.open("" + url + "static-resource/tkcloud/giveLessons.html?classroomId=" + row.id +
                "&iden=tour&tk=" + tk + "");
        },
        imchat(row, index) {
            window.open("chathistory.html?tid=" + row.groupNo + "&&sellerId=" + row.sellerRepresenId + "");
        },
        sure_end(row, index) {
            vm.teacherInformation = row;
            vm.ruleForm.doSomething = "";
            vm.sub3 = false;
            vm.sub4 = false;
            vm.sub5 = false;
            vm.spoType = row.spoType;
            vm.teacType = row.teacType;
            if (row.spoType == 2 || row.spoType == 4 || row.spoType == 32) {
                vm.ruleForm.gb1 = row.teacFixedPrice;
                if (row.teacType == 1) {
                    vm.sub3 = true;
                    vm.sub5 = true;
                } else {
                    vm.sub3 = true;
                    vm.sub5 = false;
                }
            } else {
                if (row.teacType == 1) {
                    vm.sub3 = false;
                    vm.sub5 = false;
                    vm.ruleForm.gb1 = 0;
                    vm.ruleForm.otgb1 = 0;
                } else {
                    vm.sub3 = false;
                    vm.sub5 = false;
                    vm.ruleForm.gb1 = 0;
                    vm.ruleForm.otgb1 = 0;
                }
            }
            vm.ids = row.id;
            vm.dialogFormVisible3 = true;
        },
        change_spoTypeArr(val) {
            vm.spoTypeArr = val;
            this.getTableData();
        },
        gets() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 100
                },
                url: "" + baseURL + "sys/user/getMyDeptUserList",
                success: function (json) {
                    vm.users = json.body.list;
                    vm.qiangzhigenghuanyunyingArray = json.body.list
                }
            });
        },
        change_sooTypeedArr(val) {
            vm.sooTypeedArr = val;
            this.getTableData();
        },
        change_sooStatusedArr(val) {
            if (val == '0;1;2;5;7;8') {
                vm.operaterOrderStatusedArr = '0;1;2;5;7;8'
                vm.sooStatusedArr = ''
            }
            if (val == '0') {
                vm.operaterOrderStatusedArr = '0'
                vm.sooStatusedArr = ''
            }
            if (val == '1') {
                vm.operaterOrderStatusedArr = '1'
                vm.sooStatusedArr = ''
            }
            if (val == '128') {
                vm.sooStatusedArr = '128'
                vm.operaterOrderStatusedArr = ''
            }
            if (val == '256') {
                vm.sooStatusedArr = '256'
                vm.operaterOrderStatusedArr = ''
            }
            if (val == '512') {
                vm.sooStatusedArr = '512'
                vm.operaterOrderStatusedArr = ''
            }
            this.getTableData();
        },
        handleuser(val) {
            vm.userId = val;
            this.getTableData();
        },
        give(row, index) {
            vm.courseId = row.id;
            vm.teacherId = row.id;
            vm.dialogFormVisible1 = true;
            if (row.teacType == 1) {
                vm.otg = true;
            } else {
                vm.otg = false;
            }
        },
        give1(row, index) {
            this.ruleForm.otgb1 = "";
            this.ruleForm.gb1 = "";
            vm.courseId = row.id;
            vm.teacherId = row.id;
            vm.dialogFormVisible5 = true;
            if (row.teacType == 1) {
                vm.otg = true;
            } else {
                vm.otg = false;
            }
        },
        exit() {
            vm.evaluate = false;
        },
        see_evaluate(row, index) {
            vm.evaluate = true;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 10
                },
                url: "" + baseURL + "sys/oper/getCourseEvaluation?courseId=" + row.id + "",
                success: function (json) {
                    if (json.body == null) {
                        vm.evaluates = "";
                    } else {
                        vm.evaluates = json.body;
                    }

                }
            });
        },
        search: function () {
            vm.val = 1;
            vm.getTableData();
        },
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
                    "page": this.val,
                    "limit": this.limit,
                    "operaterOrderStatusedArr": this.operaterOrderStatusedArr,
                    "spoTypeArr": this.spoTypeArr,
                    "sooTypeedArr": this.sooTypeedArr,
                    "sooStatusedArr": this.sooStatusedArr,
                    "key": this.tableDataName,
                    "operId": this.userId
                },
                url: "" + baseURL + "/sys/oper/getOperatorOrder",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },
        give2(row, _index) {
            //  if(row.spoType == 64){
            //   vm.gg = false;
            //  }
            if (row.spoType == 0 || row.spoType == 1) {
                vm.gg = false;
            } else if (row.spoType == 64) {
                vm.gg = false;
            } else {
                vm.gg = true;
                vm.ruleForm.price = row.teacFixedPrice;
            }
            vm.courid = row.id;
            this.dialogFormVisible4 = true;
            // $.ajax({
            //     type: "get",
            //     dataType: "json",
            //     data: {
            //         "token": token,
            //         "page": 1,
            //         "limit": 1000
            //     },
            //     url: "" + baseURL + "sys/oper/teacList",
            //     success: function (json) {
            //         vm.selects = json.body.list;
            //     }
            // });
        },
        getteacList() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    tudStatused: 10,
                },
                url: "" + baseURL + "sys/oper/teacList",
                success: function (json) {
                    vm.selects = json.body.list;
                    vm.selectsCopy = vm.selects;
                }
            });
        },
        addRemark(row, index) {
            vm.courseId = row.id;
            vm.remarkmodel = true;
        },
        remarkForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.courseId,
                            remark: vm.ruleForm.remark,
                        },
                        url: "" + baseURL + "/sys/oper/addRemark",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.remarkmodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                            }
                        }
                    });
                }
            });
        },
        submitForm4(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            teacId: this.ruleForm.country,
                            courseId: vm.courid,
                            price: this.ruleForm.price,
                        },
                        url: "" + baseURL + "sys/oper/assignedOrder",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.dialogFormVisible4 = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                            }
                        }
                    });
                }
            });
        },
        handleChange(item) {
            if (item == 1) {
                vm.sub6 = true;
                if (vm.spoType == 2 || vm.spoType == 4 || vm.spoType == 32) {
                    if (vm.teacType == 1) {
                        vm.sub3 = true;
                        vm.sub5 = true;
                        vm.sub4 = false;
                    } else {
                        vm.sub3 = true;
                        vm.sub5 = false;
                        vm.sub4 = false;
                    }
                } else {
                    if (vm.teacType == 1) {
                        vm.sub3 = false;
                        vm.sub5 = false;
                        vm.sub4 = false;
                    } else {
                        vm.sub3 = false;
                        vm.sub5 = false;
                        vm.sub4 = false;
                    }
                }
            } else {
                vm.sub6 = false;
                if (vm.spoType == 2 || vm.spoType == 4 || vm.spoType == 32) {
                    if (vm.teacType == 1) {
                        vm.sub3 = false;
                        vm.sub5 = false;
                        vm.sub4 = true;
                    } else {
                        vm.sub3 = false;
                        vm.sub5 = false;
                        vm.sub4 = true;
                    }
                } else {
                    if (vm.teacType == 1) {
                        vm.sub3 = false;
                        vm.sub5 = false;
                        vm.sub4 = true;
                    } else {
                        vm.sub3 = false;
                        vm.sub5 = false;
                        vm.sub4 = true;
                    }
                }
            }
        },

        dialogVisible(row, _index) {
            if (row.spoType == 0 || row.spoType == 1) {
                vm.sss = false;
                vm.ruleForm.one = null;
                this.dialogFormVisible2 = true;
                vm.id = row.id;
                vm.tecid = row.teacherId;
                this.dialogFormVisible2 = true;
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        "token": token,
                        "page": 1,
                        "limit": 10,
                        "notIncludedTeacId": vm.tecid,
                        tudStatused: 10,
                    },
                    url: "" + baseURL + "/sys/oper/teacList",
                    success: function (json) {
                        vm.selects = json.body.list;
                        vm.selectsCopy = vm.selects;
                    }
                });
            } else {
                vm.sss = true;
                vm.id = row.id;
                vm.tecid = row.teacherId;
                this.dialogFormVisible2 = true;
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        "token": token,
                        "page": 1,
                        "limit": 10,
                        "notIncludedTeacId": vm.tecid,
                        tudStatused: 10,
                    },
                    url: "" + baseURL + "/sys/oper/teacList",
                    success: function (json) {
                        vm.selects = json.body.list;
                        vm.selectsCopy = vm.selects;
                    }
                });
            }

        },

        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },
        submitForm1(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var ot = this.ruleForm.otgb;
                    if (ot == undefined) {
                        ot = 0;
                    }
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.courseId,
                            gb: Number(this.ruleForm.gb),
                        },
                        url: "" + baseURL + "sys/oper/handselGbToTeacher",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible1 = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                            }
                        }
                    });
                }
            });
        },
        submitForm2(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('当前讲师已经上过课，如果你要强制更换老师，请确认已经给原来的老师预付过GB?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        vm.btnstatus = true;
                        vm.btnval = "加载中";
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            headers: {
                                "token": token
                            },
                            data: {
                                newTeacId: this.ruleForm.country,
                                courseId: vm.id,
                                teacFixedPrice: vm.ruleForm.one,
                            },
                            url: "" + baseURL + "sys/oper/compellentChangeTeac",
                            success: function (json) {
                                if (json.status == 200) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'success'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                    vm.dialogFormVisible2 = false;
                                    vm.getTableData();
                                }
                                if (json.status == 400) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
                                    });
                                    vm.btnstatus = false;
                                    vm.btnval = "确 定";
                                }
                            }
                        });
                    }).catch(() => {});
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm3(formName) {
            var self = this;
            // debugger;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            doSomething: Number(this.ruleForm.doSomething),
                            courseId: vm.ids,
                            description: this.ruleForm.description,
                            gb: this.ruleForm.gb1,
                            otgb: this.ruleForm.otgb1,
                            sendGb: this.ruleForm.sendGb,
                        },
                        url: "" + baseURL + "/sys/oper/positiveFinishCourse",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible3 = false;
                                vm.ruleForm.doSomething = '';
                                vm.ruleForm.description = ''
                                vm.ruleForm.sendGb = ''
                                vm.ruleForm.gb1 = ''
                                vm.ruleForm.otgb1 = ''
                                vm.getTableData();

                            } else {
                                vm.btnstatus = false;
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                        }
                    });
                }
            });
        },
        submitForm5(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var ot1 = this.ruleForm.otgb1;
                    if (ot1 == undefined) {
                        ot1 = 0;
                    }
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.courseId,
                            gb: Number(this.ruleForm.gb1),
                            otgb: ot1,
                        },
                        url: "" + baseURL + "/sys/oper/advanceGbToTeacher",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible5 = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                            }
                        }
                    });
                }
            });
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
        cancel(row, index) {
            this.$confirm('是否取消委派?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    headers: {
                        "token": token
                    },
                    data: {
                        courseId: row.id,
                        teacId: row.teacherId,
                    },
                    url: "" + baseURL + "/sys/oper/returnedOrder",
                    success: function (json) {
                        if (json.status == 200) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            vm.getTableData();
                        }
                        if (json.status == 400) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'warning'
                            });
                        }
                    }
                });
            }).catch(() => {

            });
        },
        apply_Accident(row, index) {
            vm.id = row.id;
            vm.shigumodel = true;
        },
        submitForms(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.id,
                            description: this.ruleForm.descriptions,
                        },
                        url: "" + baseURL + "/sys/oper/applyAccidentOrder",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.shigumodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.shigumodel = false;
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        WagesSave(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.courseId,
                            description: this.ruleForm.description,
                            gb: this.ruleForm.gb1,
                            otgb: this.ruleForm.otgb1,
                        },
                        url: "" + baseURL + "/sys/oper/discountTeacIncome",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.Wagesmodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        teacFilter(val) {
            vm.selects = [];
            if (val != null && val != '') {
                $.each(vm.selectsCopy, function (index, value) {
                    if (value.username.indexOf(val) > -1 || value.username.toUpperCase().indexOf(val.toUpperCase()) > -1 || value.nickName.indexOf(val) > -1 || value.nickName.toUpperCase().indexOf(val.toUpperCase()) > -1) {
                        vm.selects.push(value);
                    }
                });
            } else {
                vm.selects = vm.selectsCopy;
            }

        }
    }
});