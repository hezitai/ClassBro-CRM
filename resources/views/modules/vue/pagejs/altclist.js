var vm = new Vue({
    el: '#app',
    data() {
        return {
            teacherInformation: '',
            remarkmodel: false,
            shigumodel: false,
            btnstatusre: false,
            btnstatus: false,
            btnvalre: "确 定",
            btnval: "确 定",
            sss: true,
            sub4: false,
            sub3: false,
            sub5: false,
            sub6: false,
            evaluate: false,
            liyou: false,
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            gg: true,
            applymodel: false,
            rewardmodel: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            gbmodel: false,
            idss: [],
            operaterOrderStatusedArr: '0;1;2;5;7;8',
            spoTypeArr: null,
            sooTypeedArr: null,
            sooStatusedArr: '',
            selects: '',
            selectsCopy: '',
            countryId: '',
            courseId: '',
            courid: '',
            country: '',
            key: '',
            id: '',
            val: 1,
            limit: 15,
            page: "",
            teacherId: '',
            name: '',
            evaluates: '',
            ruleForm: {
                doSomething: '',
                sooStatusedArr: '全部',
                description: '',
                one: '',
                gbre: '',
                sendGb: '',
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
                gb: [{
                    required: true,
                    message: '请输入G币',
                    trigger: 'blue'
                }],
                gbre: [{
                    required: true,
                    message: '请输入G币',
                    trigger: 'blue'
                }],
                otgb: [{
                    required: true,
                    message: '请输入OTG币',
                    trigger: 'blue'
                }],
                one: [{
                    required: true,
                    message: '请输入一口价',
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
            shigumodelLoading: false,
            uploadFilesArray: [],
            uploader: null,
            chooseOrder: [],
            updataFiles: false,
            dynamicTags: [{
                    name: '标签一',
                    type: 'primary'
                },
                {
                    name: '标签二',
                    type: 'success'
                },
                {
                    name: '标签三',
                    type: 'info'
                },
                {
                    name: '标签四',
                    type: 'warning'
                },
                {
                    name: '标签五',
                    type: 'danger'
                }
            ],
            chooseColor:[{
                type:'success',
                name:'Green'
            },{
                type:'danger',
                name:'Red'
            },{
                type:'info',
                name:'Gray'
            },{
                type:'warning',
                name:'Yellow'
            },{
                type:'primary',
                name:'Blue'
            },],
            inputVisible: false,
            inputValue: '',
            chooseTagArray:[],
        }
    },

    mounted() {
        this.getTableData();
        this.hasPermission();
        this.getOperTeacList();
    },
    methods: {
        chooseedColor(row){
            let inputValue = this.inputValue;
            if (inputValue) {
                var aaa = {
                    name:inputValue,
                    type:row.type,
                }
                this.dynamicTags.push(aaa);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        chooseTag(tag){
            this.chooseTagArray.push(tag)
        },
        handleClose(tag) {
            this.chooseTagArray.splice(this.chooseTagArray.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                var aaa = {
                    name:inputValue,
                    type:'',
                }
                this.dynamicTags.push(aaa);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
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
                    // vm.selects = json.body.list;
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
        search: function () {
            vm.val = 1;
            this.getTableData();
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
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

        see(row, index) {
            console.log(row)
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.id + "");
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else if (row.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.id + "&wyid=" + row.offCourseName +
                    '&iswy=true');
            } else {
                // window.open("seller_detail2.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.id + "");
            }
        },
        apply(row, index) {
            vm.applymodel = true;
            vm.private = row.sooId;
        },
        givegb(row, index) {
            vm.courseId = row.id;
            vm.teacherId = row.teacherId;
            vm.gbmodel = true;
        },
        give(row, _index) {
            if (row.spoType == 0 || row.spoType == 1) {
                vm.gg = false;
            } else if (row.spoType == 64) {
                vm.gg = false;
            } else {
                vm.gg = true;
                vm.ruleForm.price = row.teacFixedPrice;
            }

            vm.courid = row.id;
            this.dialogFormVisible1 = true;

        },
        getOperTeacList: function () {
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
        change_spoTypeArr(val) {
            vm.spoTypeArr = val;
            this.getTableData();
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
                    "sooTypeedArr": this.sooTypeedArr,
                    "sooStatusedArr": this.sooStatusedArr,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "/sys/oper/getMyOperatorOrder",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        reward(row, index) {
            vm.courseId = row.id;
            vm.teacherId = row.id;
            vm.rewardmodel = true;
        },
        rewardsave(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var ot = this.ruleForm.otgb;
                    if (ot == undefined) {
                        ot = 0;
                    }
                    vm.btnstatusre = true;
                    vm.btnvalre = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.courseId,
                            gb: Number(this.ruleForm.gbre),
                        },
                        url: "" + baseURL + "sys/oper/handselGbToTeacher",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatusre = false;
                                vm.btnvalre = "确 定";
                                vm.rewardmodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatusre = false;
                                vm.btnvalre = "确 定";
                                vm.rewardmodel = false;
                                vm.getTableData();
                            }
                        }
                    });
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData();
            this.handleCurrentChange(this.currentPage);
        },

        handleChange(item) {

        },
        handleChange1(val) {
            if (val == 1) {
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
            vm.id = row.id;
            vm.tecid = row.teacherId;
            this.dialogFormVisible2 = true;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 100,
                    "notIncludedTeacId": vm.tecid,
                    tudStatused: 10,
                },
                url: "" + baseURL + "/sys/oper/queryUserTeacList",
                success: function (json) {
                    vm.selects = json.body.list;
                    vm.selectsCopy = vm.selects;
                }
            });

        },
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },
        applysure(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnvalre = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            exceptionType: this.ruleForm.types,
                            description: this.ruleForm.descriptions,
                            orderId: vm.private,
                        },
                        url: "" + baseURL + "sys/oper/applyExceptionOrder",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnvalre = "确定";
                                vm.applymodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnvalre = "确定";
                                vm.applymodel = false;
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
                                    vm.dialogFormVisible2 = false;
                                    vm.getTableData();
                                }
                                if (json.status == 400) {
                                    vm.$message({
                                        message: json.body.msg,
                                        type: 'warning'
                                    });
                                    vm.dialogFormVisible2 = false;
                                }
                            }
                        });
                    }).catch(() => {

                    });
                }
            });
        },
        submitForm1(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnvalre = "加载中";
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
                                vm.btnvalre = "确定";
                                vm.dialogFormVisible1 = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnvalre = "确定";
                            }
                        }
                    });
                }
            });
        },
        submitForm3(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnvalre = "加载中";
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
                                vm.btnvalre = "确定";
                                vm.dialogFormVisible3 = false;
                                vm.ruleForm.doSomething = '',
                                    vm.ruleForm.sendGb = '',
                                    vm.ruleForm.description = '',
                                    vm.ruleForm.gb1 = '',
                                    vm.ruleForm.otgb1 = '',
                                    vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnvalre = "确定";
                                vm.dialogFormVisible3 = false;
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
                    vm.btnvalre = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            presentedId: vm.teacherId,
                            courseId: vm.courseId,
                            gb: Number(this.ruleForm.gb),
                            otgb: Number(this.ruleForm.otgb),
                        },
                        url: "" + baseURL + "sys/oper/advanceGbToTeacher",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnvalre = "确定";
                                vm.gbmodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnvalre = "确定";
                                vm.gbmodel = false;
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
            console.log('多选', this.ids);
            this.idss = this.selectedIDs;
        },
        shigumodelClose: function () {
            vm.updataFiles = false;
            vm.uploader.destroy();
            vm.shigumodel = false;
            vm.uploadFilesLength = [];
            vm.ruleForm.descriptions = '';
            vm.ruleForm.shigutype = '';
            vm.uploadFilesArray = [];
        },
        shigumodelSubmit: function () {
            var _this = this;
            if (vm.ruleForm.descriptions === null || vm.ruleForm.descriptions === undefined || vm.ruleForm.descriptions === '') {
                vm.$message({
                    type: 'warning',
                    message: '请选择事故类别'
                })
                return
            }
            if (vm.ruleForm.shigutype === null || vm.ruleForm.shigutype === undefined || vm.ruleForm.shigutype === '') {
                vm.$message({
                    type: 'warning',
                    message: '请选择事故类别'
                })
                return
            }
            $.ajax({
                url: baseURL + "sys/oper/applyAccidentOrder",
                type: 'post',
                dataType: 'json',
                headers: {
                    token: token,
                },
                contentType: 'application/json',
                data: JSON.stringify({
                    courseId: vm.id,
                    description: vm.ruleForm.descriptions,
                    type: vm.ruleForm.shigutype,
                    ossUrls: vm.uploadFilesArray
                }),
                success: function (r) {
                    if (r.status === 200) {
                        vm.$message({
                            type: 'success',
                            message: '申请成功'
                        })
                        window.setInterval(function () {
                            window.location.reload()
                        }, 1200)
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        })
                    }
                },
                error: function (er) {

                }
            })
        },
        apply_Accident(row, index) {
            vm.id = row.id;
            // vm.shigumodel = true;
            vm.shigumodel = true;
            // vm.courseId = row.courseId;
            // vm.shigumodel = true;
            function GUID() {
                this.date = new Date(); /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
                if (typeof this.newGUID != 'function') {
                    /* 生成GUID码 */
                    GUID.prototype.newGUID = function () {
                        this.date = new Date();
                        var guidStr = '';
                        sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
                        sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
                        for (var i = 0; i < 9; i++) {
                            guidStr += Math.floor(Math.random() * 16).toString(16);
                        }
                        guidStr += sexadecimalDate;
                        guidStr += sexadecimalTime;
                        while (guidStr.length < 32) {
                            guidStr += Math.floor(Math.random() * 16).toString(16);
                        }
                        return this.formatGUID(guidStr);
                    }
                    /* * 功能：获取当前日期的GUID格式，即8位数的日期：19700101 * 返回值：返回GUID日期格式的字条串 */
                    GUID.prototype.getGUIDDate = function () {
                        return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date
                            .getDay());
                    }
                    /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
                    GUID.prototype.getGUIDTime = function () {
                        return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(
                            this
                            .date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
                    }
                    /* * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现 * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串 * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串 */
                    GUID.prototype.addZero = function (num) {
                        if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
                            return '0' + Math.floor(num);
                        } else {
                            return num.toString();
                        }
                    }
                    /*  * 功能：将y进制的数值，转换为x进制的数值 * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10 * 返回值：返回转换后的字符串 */
                    GUID.prototype.hexadecimal = function (num, x, y) {
                        if (y != undefined) {
                            return parseInt(num.toString(), y).toString(x);
                        } else {
                            return parseInt(num.toString()).toString(x);
                        }
                    }
                    /* * 功能：格式化32位的字符串为GUID模式的字符串 * 参数：第1个参数表示32位的字符串 * 返回值：标准GUID格式的字符串 */
                    GUID.prototype.formatGUID = function (guidStr) {
                        var str1 = guidStr.slice(0, 8) + '-',
                            str2 = guidStr.slice(8, 12) + '-',
                            str3 = guidStr.slice(12, 16) + '-',
                            str4 = guidStr.slice(16, 20) + '-',
                            str5 = guidStr.slice(20);
                        return str1 + str2 + str3 + str4 + str5;
                    }
                }
            }
            var accessid, host, policyBase64, signature, g_dirname, uploadFileName, url, guid, uploadFilesTimes;
            guid = new GUID();

            $.ajax({
                url: url = baseURL + 'api/oss/getAliOSSUploadSign?dir=' + 'afterSale/' + guid.newGUID() + '/',
                headers: {
                    token: token,
                },
                success: function (r) {
                    if (r.status == 200) {
                        accessid = r.body.accessid;
                        host = r.body.host;
                        policyBase64 = r.body.policy;
                        signature = r.body.signature;
                        g_dirname = r.body.dir;

                        function formatFileName(up, filename) {
                            uploadFileName = encodeURIComponent(filename);
                            set_upload_param(up, filename, false);
                        }

                        function set_upload_param(up, filename, ret) {
                            if (ret) {
                                formatFileName(up, filename);
                            }
                            new_multipart_params = {
                                'key': g_dirname + filename,
                                'policy': policyBase64,
                                'OSSAccessKeyId': accessid,
                                'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                                'signature': signature,
                            };

                            up.setOption({
                                'url': host,
                                'multipart_params': new_multipart_params
                            });

                            up.start();
                        }

                        vm.uploader = new plupload.Uploader({
                            runtimes: 'html5,flash,silverlight,html4',
                            browse_button: 'selectfiles',
                            flash_swf_url: 'js/Moxie.swf',
                            silverlight_xap_url: 'js/Moxie.xap',
                            url: 'http://oss.aliyuncs.com',
                            init: {
                                PostInit: function () {
                                    document.getElementById('ossfile').innerHTML = '';
                                    // document.getElementById('postfiles').onclick = function () {

                                    // };
                                    // return false;
                                },
                                FilesAdded: function (up, files) {
                                    console.log(files);
                                    // for (var i in files) {
                                    //     vm.uploadFilesLength.push(files);
                                    // }
                                    // console.log(vm.uploadFilesLength.length);
                                    // uploadFilesNo = files.length;
                                    plupload.each(files, function (file) {
                                        document.getElementById('ossfile').innerHTML += '<div id="' + file.id +
                                            '" style="padding: 10px 0;">' + file.name + ' (' + plupload.formatSize(file
                                                .size).split(' ')[0] + plupload.formatSize(file.size).split(' ')[1]
                                            .toUpperCase() + ')<b></b>' +
                                            '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>';
                                    });
                                    vm.shigumodelLoading = true;
                                    set_upload_param(vm.uploader, '', false);

                                },

                                BeforeUpload: function (up, file) {
                                    set_upload_param(up, file.name, true);
                                },

                                UploadProgress: function (up, file) {
                                    vm.updataFiles = true;
                                    var d = document.getElementById(file.id);
                                    d.getElementsByClassName('progress')[0].style.display = 'block';
                                    d.getElementsByTagName('b')[0].innerHTML =
                                        '<span style="display:inline-block;padding-left:10px;">' + file.percent +
                                        "%</span>";
                                    var prog = d.getElementsByTagName('div')[0];
                                    var progBar = prog.getElementsByTagName('div')[0]
                                    progBar.style.width = file.percent + '%';
                                    progBar.setAttribute('aria-valuenow', file.percent);
                                },
                                FileUploaded: function (up, file, info) {
                                    if (info.status == 200) {
                                        // uploadFilesTimes++;
                                        // vm.uploadFilesArray = [];

                                        vm.uploadFilesArray.push(host + '/' + g_dirname + uploadFileName);
                                        console.log(vm.uploadFilesArray);
                                        vm.updataFiles = false;
                                        vm.shigumodelLoading = false;
                                    } else {
                                        document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info
                                            .response;
                                    }
                                },
                                Error: function (up, err) {
                                    vm.$message({
                                        type: 'error',
                                        message: '文件上传失败， 请刷新重试'
                                    });
                                    vm.updataFiles = false;
                                    vm.uploader = destroy();
                                    vm.shigumodel = false;
                                    vm.uploadFilesLength = [];
                                }
                            }
                        });
                        vm.uploader.init();
                    }

                },
                error: function (er) {}
            })
        },
        submitForms(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatusre = true;
                    vm.btnvalre = "加载中";
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
                                vm.btnstatusre = false;
                                vm.btnvalre = "确定";
                                vm.shigumodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatusre = false;
                                vm.btnvalre = "确定";
                                vm.shigumodel = false;
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
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
            }).catch(() => {});
        },
        addRemark(row, index) {
            vm.courseId = row.id;
            vm.remarkmodel = true;
            // $.ajax({
            //     url:baseURL +''
            // })
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

        },
        closeTeacDialog() {
            vm.selects = vm.selectsCopy;
        }
    }
});