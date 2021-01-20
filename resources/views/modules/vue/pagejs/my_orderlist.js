var vm = new Vue({
    el: '#app',
    data() {
        return {
            shigumodelLoading:false,
            uploadFilesArray:[],
            uploader:null,
            chooseOrder: [],
            updataFiles:false,
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
            data: {
                cdId: '',
                groupId: ""
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            queryQuotableUserList: [],
            Special: false,
            Specialdiv: false,
            shigumodel: false,
            cailiao: false,
            disnum1: false,
            dis2: false,
            min: false,
            disminMoney: false,
            currencycreat: '',
            currencys: '',
            selid: '',
            creatmodel1: false,
            creatst1: false,
            creatbtn1: "确 定",
            jisuan: false,
            dis1: false,
            courides: '',
            courseIds: '',
            selectedIDs: '',
            disnum: false,
            asas: true,
            ordershow: false,
            parentId: '',
            sbtn: false,
            statuseds: '',
            btnstatus: false,
            btnval: "创建",
            btnval1: "修改",
            btnval2: "确定",
            btnval3: "确定",
            val: 1,
            b1: false,
            limit: 15,
            countryId: '',
            wxAccount: '',
            see: true,
            id1: '',
            id2: '',
            delivery: false,
            forbidden: false,
            dis: true,
            order: false,
            cu: {},
            disabledInput: true,
            professionalNames: '',
            countrys: '',
            showList: true,
            showa: false,
            showb: true,
            activeName: 'first',
            show666: false,
            shows: false,
            show1: true,
            show2: true,
            show3: true,
            purchaseOrderId: '',
            demands: '',
            levels: '',
            universitys: '',
            courses: '',
            courseId: '',
            totalPrice: '',
            currencys: "",
            currency: '',
            change_courseFamiliaritys: '',
            courseFamiliaritys: '',
            deliverys: '',
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            extStudCoursewareList: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            courseFamiliarity: '',
            idss: [],
            badmodel: false,
            options: [],
            selectedOptions: [],
            name: '',
            label: '',
            sellerDemandDesc: '',
            description: '',
            dialogStatus: "",
            currencylabel: '',
            currencyvalue: '',
            extype: '',
            ruleForm1: {
                course: '',
            },
            ruleForm: {
                shigutype:'',
                wordsNum: '',
                decimalMaterialCost: 0,
                minMoney: '',
                persenterTime: '',
                payMoney: '',
                discountRate: '',
                remark: '',
                aboutorder: '',
                course: '',
                schoolYear: '',
                wxAccount: '',
                professionalId: '',
                sellerDemandDesc: '',
                currency: '',
                nickName: '',
                totalPrice: '',
                courseId: '',
                startTime1: '',
                endTime1: '',
                universityId: '',
                demandTypeId: '',
                levelId: '',
                examTime: '',
                endCourseTime: '',
                type: '',
                courseFamiliarityId: '',
                startTime2: '',
                endTime2: '',
                startTime3: '',
                endTime3: '',
                startTime4: '',
                endTime4: '',
                startTime5: '',
                endTime5: '',
                startTime6: '',
                endTime6: '',
                startTime7: '',
                endTime7: '',
                startTime8: '',
                endTime8: '',
                startTime9: '',
                endTime9: '',
                startTime10: '',
                endTime10: '',
                startTime11: '',
                endTime11: '',
                startTime12: '',
                endTime12: '',
                startTime13: '',
                endTime13: '',
                startTime14: '',
                endTime14: '',
                startTime15: '',
                endTime15: '',
                startTime16: '',
                endTime16: '',
                startTime17: '',
                endTime17: '',
                startTime18: '',
                endTime18: '',
                startTime19: '',
                endTime19: '',
                startTime20: '',
                endTime20: '',
                startTime21: '',
                endTime21: '',
                familiarity: '',
            },
            rules: {
                wxAccount: [{
                    required: true,
                    message: '请输入微信号',
                    trigger: 'blur'
                }, ],
                courseName: [{
                    required: true,
                    message: '请输入课程名称',
                    trigger: 'blur'
                }, ],
                courseCode: [{
                    required: true,
                    message: '请输入课程编号',
                    trigger: 'blur'
                }, ],
                type: [{
                    required: true,
                    message: '请选择订单类型',
                    trigger: 'change'
                }, ],
                sellerDemandDesc: [{
                    required: true,
                    message: '请输入学生辅导需求',
                    trigger: 'blur'
                }, ],
                description: [{
                    required: true,
                    message: '请输入理由',
                    trigger: 'blur'
                }, ],
                extype: [{
                    required: true,
                    message: '请选择类型',
                    trigger: 'change'
                }, ],
                totalPrice: [{
                    required: true,
                    message: '请填写课程总价',
                    trigger: 'blur'
                }],
                courseFamiliarityId: [{
                    required: true,
                    message: '请选择课程熟悉度',
                    trigger: 'change'
                }, ],
                nickName: [{
                    required: true,
                    message: '请输入学生姓名',
                    trigger: 'blur'
                }, ],
                universityId: [{
                    required: true,
                    message: '请选择学校',
                    trigger: 'change'
                }, ],
                countryId: [{
                    required: true,
                    message: '请选择留学国家',
                    trigger: 'change'
                }, ],
                professionalId: [{
                    required: true,
                    message: '请选择专业名称',
                    trigger: 'change'
                }, ],
                schoolYear: [{
                    required: true,
                    message: '请输入学年',
                    trigger: 'blur'
                }, ],
                endCourseTime: [{
                    required: true,
                    message: '请输入期望节课时间',
                    trigger: 'blur'
                }, ],
                levelId: [{
                    required: true,
                    message: '请选择学术级别',
                    trigger: 'change'
                }, ],
                payMoney: [{
                    required: true,
                    message: '请输入payMoney',
                    trigger: 'blur'
                }, ],
                examTime: [{
                    required: true,
                    message: '请选择Official Deadline',
                    trigger: 'change'
                }],
                descriptions: [{
                    required: true,
                    message: '请填写理由',
                    trigger: 'blur'
                }],
                shigutype:[{
                    required: true,
                    message: '请选择事故类别',
                    trigger: 'change'
                }]
            },
            rules1: {
                course: [{
                    required: true,
                    message: '请选择分组名称',
                    trigger: 'change'
                }, ]
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
    multipleSelection: [],
    beforeCreate() {
        const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading'
        })
    },
    mounted() {
        this.getcountrys();
        this.getTableData();
        this.coursedata();
        this.level();
        this.demand();
        this.get_currency();
        this.get_courseFamiliarity();
        this.professionalNamedata();
        this.hasPermission();
        this.getcurreny();
        this.getqueryQuotableUserList();
        this.getExchange();
    },
    methods: {
        payToOrderEvent: function (val) {
            console.log(val);
        },
        rightAwayPayType22Submit: function (row) {
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
                success: function (r) {
                    console.log(r);
                    if (r.body.needMoney == 0) {
                        vm.$message({
                            type: 'success',
                            message: '支付成功'
                        });
                        setInterval(function () {
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
                error: function (er) {
                    vm.rightAwayPayLoading = false;
                }
            })
        },
        payToOrderArraySelectionChange: function (val) {
            console.log(val);
            val.checked = true;
            this.allRow = val;
            this.payToOrderArray.forEach(item => {
                if (item.id !== val.id) {
                    item.checked = false
                }
            })
        },
        professionalNamedata() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/professionalCourses/list",
                success: function (json) {
                    vm.professionalNames = json.body.list;
                }
            });
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
        getqueryQuotableUserList() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 100,
                },
                url: "" + baseURL + "/sys/seller/order/queryQuotableUserList",
                success: function (json) {
                    vm.queryQuotableUserList = json.body;
                }
            });
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        inputFunc(val) {
            if (vm.ruleForm.type == 1) {
                vm.ruleForm.decimalMaterialCost = (Number(vm.ruleForm.totalPrice) * 30 / 100).toFixed(2);
            }
        },
        change_order(val) {
            vm.ruleForm.totalPrice = null;
            if (val == 0) {
                vm.order = true;
                vm.dis = true;
                vm.jisuan = true;
                vm.ruleForm.decimalMaterialCost = 0;
                vm.cailiao = false;
            } else if (val == 1) {
                vm.cailiao = true;
            } else if (val == 4) {
                vm.cailiao = true;
                vm.ruleForm.decimalMaterialCost = 0;
            } else {
                vm.ruleForm.decimalMaterialCost = 0;
                vm.cailiao = false;
                vm.order = false;
                vm.currency = null;
                vm.dis = false;
                vm.jisuan = false;
            }
        },
        change_course(courseid) {
            vm.courseid = courseid;
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
        coursedata() {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/seller/courseware/groupList",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                success: function (r) {
                    vm.courses = r.body.list;
                }
            });
        },
        rowClass({
            row
        }) {
            if (row.statused === 16 || row.statused === 32 || row.statused === 128) {
                return 'color1'
            }
            if (row.studCourse.deleteFlag !== false) {
                return 'color1'
            }
        },
        submitForm2(formName) {
            var self = this;
            vm.btnval2 = "加载中";
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.data.groupId = this.$refs.ruleForm1.model.course;
                    vm.btnstatus = true;
                    vm.submitUpload();
                }
            });
        },
        getTableData: function () {
            var self = this
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            })
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": this.val,
                    "limit": this.limit,
                    "statused": 47,
                    "onlyMe": true,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "sys/seller/order/list",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        search() {
            vm.val = 1;
            vm.getTableData();
        },
        changeprice() {
            var num = vm.ruleForm.totalPrice;
            var price = vm.ruleForm.price;
            if (num == "" && price == "") {} else if (num == 0 || price == 0) {
                vm.ruleForm.scheduledTime = 0;
            } else {
                vm.ruleForm.scheduledTime = (num / price).toFixed(2);
            }
        },
        get_courseFamiliarity() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "onlyMe": true
                },
                url: "" + baseURL + "sys/basedata/coursefamiliarity/list",
                success: function (json) {
                    vm.courseFamiliaritys = json.body.list;
                }
            });
        },
        href() {
            parent.createStudAccount()
            window.location.href = 'creat_qrh.html'
        },
        imchat(row, index) {
            window.open("chathistory.html?tid=" + row.studCourse.groupNo + "&&sellerId=" + row.sellerId +
                "");
        },
        // 修改
        changetext: function (row, index) {
            if (row.type == 64) {
                window.location.href = "editClassroomOrder.html?id=" + row.courseId + "";
                return;
            }
            vm.min = false;
            vm.dis1 = true;
            vm.dis2 = true;
            vm.disnum1 = true;
            vm.disminMoney = true;
            var purchaseStatused = row.purchaseStatused;
            vm.asas = false;
            vm.statuseds = row.statused;
            if (row.studCourse.statused > 4) {
                vm.disnum = true;
                vm.show666 = true;
                vm.shows = false;
            } else {
                vm.shows = true;
                vm.show666 = false;
            }
            if (row.type == 1 || row.type == 4) {
                vm.cailiao = true
            }
            vm.see = false;
            vm.purchaseOrderId = row.purchaseOrderId;
            vm.courseId = row.courseId;
            vm.data.cdId = row.courseId;
            vm.idfile = row.courseId;
            id = row.id;
            courseId = row.courseId;
            $.ajax({
                type: "GET",
                dataType: "json",
                headers: {
                    "token": token
                },
                data: {},
                url: "" + baseURL + "sys/seller/order/findPurOrderInfo/" + courseId + "",
                success: function (json) {
                    if (json.status == 400) {
                        vm.$message({
                            message: "请填写确认函",
                            type: 'warning'
                        });
                    } else {
                        vm.showList = false;
                        vm.show = false;
                        vm.show1 = true;
                        vm.show2 = false;
                        var courseFamiliarityId = json.body.courseFamiliarityId;
                        var type = json.body.type;
                        vm.extStudCoursewareList = json.body.extStudCoursewareList;
                        vm.cu = json.body;
                        vm.ruleForm.type = "" + type + "";
                        if (json.body.type == 0) {
                            vm.order = true;
                            vm.dis = true;
                        } else {
                            vm.order = false;
                            vm.dis = false;
                        }
                        if (json.body.type == 4) {
                            vm.Special = true;
                            vm.ruleForm.wordsNum = json.body.wordsNum;
                            if (json.body.theSpecialOffer == true) {
                                vm.ruleForm.specialOfferUser = json.body.specialOfferUser
                                vm.ruleForm.theSpecialOffer = json.body.theSpecialOffer
                                vm.ruleForm.specialOffer = json.body.specialOffer
                                vm.Specialdiv = true;
                            }
                        }
                        vm.ruleForm.decimalMaterialCost = json.body.materialCost,
                            vm.ruleForm.persenterTime = json.body.persenterTime,
                            vm.ruleForm.minMoney = json.body.minMoney,
                            vm.ruleForm.wxAccount = json.body.wxAccount;
                        vm.ruleForm.professionalId = json.body.professionalId;
                        vm.ruleForm.countryId = json.body.countryId;
                        vm.countryId = json.body.countryId;
                        vm.xx();
                        vm.ruleForm.remark = json.body.remark;
                        vm.ruleForm.courseName = json.body.courseName;
                        vm.ruleForm.courseId = json.body.courseId;
                        vm.ruleForm.courseCode = json.body.courseCode;
                        vm.ruleForm.scheduledTime = json.body.scheduledTime;
                        vm.ruleForm.price = json.body.price;
                        vm.ruleForm.totalPrice = json.body.totalPrice;
                        vm.ruleForm.currencyId = json.body.currencyId;
                        vm.ruleForm.currency = json.body.currency;
                        vm.ruleForm.nickName = json.body.studName;
                        vm.ruleForm.universityId = json.body.universityId;
                        vm.currencyvalue = json.body.currencyId;
                        vm.currencylabel = json.body.currency;
                        vm.ruleForm.levelId = json.body.eduName;
                        vm.ruleForm.schoolYear = "" + json.body.schoolYear + "";
                        vm.ruleForm.examTime = json.body.examTime;
                        vm.ruleForm.endCourseTime = json.body.endCourseTime;
                        vm.ruleForm.courseFamiliarityId = courseFamiliarityId;
                        vm.ruleForm.courseFamiliarity = courseFamiliarityId;
                        vm.ruleForm.demandTypeId = json.body.demandTypeId;
                        vm.ruleForm.schoolAccount = json.body.schoolAccount;
                        vm.ruleForm.schoolPws = json.body.schoolPws;
                        vm.ruleForm.sellerDemandDesc = json.body.sellerDemandDesc;
                        var spareTime = json.body.spareTime;
                        var spareTimes = spareTime.split("|"); // 以|分割为每周的时间
                        var spareTime_1 = spareTimes[0]; // 周一的时间
                        var spareTime_week1s = spareTime_1.split(","); //以，分割为每天的早中晚时间
                        var spareTime1q = spareTime_week1s[0]; // 周一早上的时间
                        var ts1 = spareTime1q.split("-");
                        var t1s = ts1[0];
                        var t1e = ts1[1];
                        vm.ruleForm.startTime1 = t1s;
                        vm.ruleForm.endTime1 = t1e;
                        var spareTime1w = spareTime_week1s[1]; //周一中午的时间
                        var ts2 = spareTime1w.split("-");
                        var t2s = ts2[0];
                        var t2e = ts2[1];
                        vm.ruleForm.startTime2 = t2s;
                        vm.ruleForm.endTime2 = t2e;
                        var spareTime1e = spareTime_week1s[2]; //周一下午午的时间
                        var ts3 = spareTime1e.split("-");
                        var t3s = ts3[0];
                        var t3e = ts3[1];
                        vm.ruleForm.startTime3 = t3s;
                        vm.ruleForm.endTime3 = t3e;
                        //周二
                        var spareTime_2 = spareTimes[1]; // 周二的时间
                        var spareTime_week2s = spareTime_2.split(","); //以，分割为每天的早中晚时间
                        var spareTime2q = spareTime_week2s[0]; // 周二早上的时间
                        var ts4 = spareTime2q.split("-");
                        var t4s = ts4[0];
                        var t4e = ts4[1];
                        vm.ruleForm.startTime4 = t4s;
                        vm.ruleForm.endTime4 = t4e;
                        var spareTime2w = spareTime_week2s[1]; //周二中午的时间
                        var ts5 = spareTime2w.split("-");
                        var t5s = ts5[0];
                        var t5e = ts5[1];
                        vm.ruleForm.startTime5 = t5s;
                        vm.ruleForm.endTime5 = t5e;
                        var spareTime2e = spareTime_week2s[2]; //周二下午午的时间
                        var ts6 = spareTime2e.split("-");
                        var t6s = ts6[0];
                        var t6e = ts6[1];
                        vm.ruleForm.startTime6 = t6s;
                        vm.ruleForm.endTime6 = t6e;
                        //周三
                        var spareTime_3 = spareTimes[2]; // 周三的时间
                        var spareTime_week3s = spareTime_3.split(","); //以，分割为每天的早中晚时间
                        var spareTime3q = spareTime_week3s[0]; // 周三早上的时间
                        var ts7 = spareTime3q.split("-");
                        var t7s = ts7[0];
                        var t7e = ts7[1];
                        vm.ruleForm.startTime7 = t7s;
                        vm.ruleForm.endTime7 = t7e;
                        var spareTime3w = spareTime_week3s[1]; //周三中午的时间
                        var ts8 = spareTime3w.split("-");
                        var t8s = ts8[0];
                        var t8e = ts8[1];
                        vm.ruleForm.startTime8 = t8s;
                        vm.ruleForm.endTime8 = t8e;
                        var spareTime3e = spareTime_week3s[2]; //周三下午午的时间
                        var ts9 = spareTime3e.split("-");
                        var t9s = ts9[0];
                        var t9e = ts9[1];
                        vm.ruleForm.startTime9 = t9s;
                        vm.ruleForm.endTime9 = t9e;
                        //周四
                        var spareTime_4 = spareTimes[3]; // 周四的时间
                        var spareTime_week4s = spareTime_4.split(","); //以，分割为每天的早中晚时间
                        var spareTime4q = spareTime_week4s[0]; // 周四早上的时间
                        var ts10 = spareTime4q.split("-");
                        var t10s = ts10[0];
                        var t10e = ts10[1];
                        vm.ruleForm.startTime10 = t10s;
                        vm.ruleForm.endTime10 = t10e;
                        var spareTime4w = spareTime_week4s[1]; //周四中午的时间
                        var ts11 = spareTime4w.split("-");
                        var t11s = ts11[0];
                        var t11e = ts11[1];
                        vm.ruleForm.startTime11 = t11s;
                        vm.ruleForm.endTime11 = t11e;
                        var spareTime4e = spareTime_week4s[2]; //周四下午午的时间
                        var ts12 = spareTime4e.split("-");
                        var t12s = ts12[0];
                        var t12e = ts12[1];
                        vm.ruleForm.startTime12 = t12s;
                        vm.ruleForm.endTime12 = t12e;
                        //周五
                        var spareTime_5 = spareTimes[4]; // 周五的时间
                        var spareTime_week5s = spareTime_5.split(","); //以，分割为每天的早中晚时间
                        var spareTime5q = spareTime_week5s[0]; // 周五早上的时间
                        var ts13 = spareTime5q.split("-");
                        var t13s = ts13[0];
                        var t13e = ts13[1];
                        vm.ruleForm.startTime13 = t13s;
                        vm.ruleForm.endTime13 = t13e;
                        var spareTime5w = spareTime_week5s[1]; //周五中午的时间
                        var ts14 = spareTime5w.split("-");
                        var t14s = ts14[0];
                        var t14e = ts14[1];
                        vm.ruleForm.startTime14 = t14s;
                        vm.ruleForm.endTime14 = t14e;
                        var spareTime5e = spareTime_week5s[2]; //周五下午午的时间
                        var ts15 = spareTime5e.split("-");
                        var t15s = ts15[0];
                        var t15e = ts15[1];
                        vm.ruleForm.startTime15 = t15s;
                        vm.ruleForm.endTime15 = t15e;
                        //周六
                        var spareTime_6 = spareTimes[5]; // 周六的时间
                        var spareTime_week6s = spareTime_6.split(","); //以，分割为每天的早中晚时间
                        var spareTime6q = spareTime_week6s[0]; // 周六早上的时间
                        var ts16 = spareTime6q.split("-");
                        var t16s = ts16[0];
                        var t16e = ts16[1];
                        vm.ruleForm.startTime16 = t16s;
                        vm.ruleForm.endTime16 = t16e;
                        var spareTime6w = spareTime_week6s[1]; //周六中午的时间
                        var ts17 = spareTime6w.split("-");
                        var t17s = ts17[0];
                        var t17e = ts17[1];
                        vm.ruleForm.startTime17 = t17s;
                        vm.ruleForm.endTime17 = t17e;
                        var spareTime6e = spareTime_week6s[2]; //周六下午午的时间
                        var ts18 = spareTime6e.split("-");
                        var t18s = ts18[0];
                        var t18e = ts18[1];
                        vm.ruleForm.startTime18 = t18s;
                        vm.ruleForm.endTime18 = t18e;
                        //周日
                        var spareTime_7 = spareTimes[6]; // 周日的时间
                        var spareTime_week7s = spareTime_7.split(","); //以，分割为每天的早中晚时间
                        var spareTime7q = spareTime_week7s[0]; // 周六早上的时间
                        var ts19 = spareTime7q.split("-");
                        var t19s = ts19[0];
                        var t19e = ts19[1];
                        vm.ruleForm.startTime19 = t19s;
                        vm.ruleForm.endTime19 = t19e;
                        var spareTime7w = spareTime_week7s[1]; //周六中午的时间
                        var ts20 = spareTime7w.split("-");
                        var t20s = ts20[0];
                        var t20e = ts20[1];
                        vm.ruleForm.startTime20 = t20s;
                        vm.ruleForm.endTime20 = t20e;
                        var spareTime7e = spareTime_week7s[2]; //周六下午午的时间
                        var ts21 = spareTime7e.split("-");
                        var t21s = ts21[0];
                        var t21e = ts21[1];
                        vm.ruleForm.startTime21 = t21s;
                        vm.ruleForm.endTime21 = t21e;
                    }

                }
            });
        },

        seetext(row, index) {
            if (row.type == 1 || row.type == 4) {
                vm.cailiao = true
            }
            vm.min = true;
            vm.ruleForm.nickName = row.studCourse.callName;
            vm.ruleForm.wxAccount = row.studCourse.wxAccount;
            vm.idfile = row.courseId;
            vm.showList = false;
            vm.show1 = false;
            vm.show3 = false;
            vm.userId = row.studCourse.userId;
            vm.data.cdId = row.courseId;
            vm.courseId = row.courseId;
            this.$refs.ruleForm.model.school1 = row.studCourse.schoolName;
            this.$refs.ruleForm.model.zy1 = row.studProfessionalName;
            this.getstudinfo();
        },
        getstudinfo() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "studId": vm.userId
                },
                url: "" + baseURL + "/sys/seller/order/findUserInfo",
                success: function (json) {
                    vm.ruleForm.countryId = json.body.countryId;
                    vm.countryId = json.body.countryId;
                    vm.xx();
                    vm.ruleForm.currency = json.body.currency;
                    vm.ruleForm.universityId = json.body.universityName;
                    vm.ruleForm.professionalId = json.body.professionalName;
                    vm.id1 = json.body.universityId;
                    vm.id2 = json.body.professionalId;
                    if (json.body.schoolYear == null) {
                        vm.ruleForm.schoolYear = "";
                    } else {
                        vm.ruleForm.schoolYear = "" + json.body.schoolYear + "";
                    }
                    vm.ruleForm.levelId = json.body.eduId;
                    vm.cu = json.body;
                }
            });
        },
        change1(val) {
            vm.id1 = val
        },
        change2(val) {
            vm.id2 = val
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.handleCurrentChange(this.currentPage);
        },
        change_state(val) {
            vm.disabledInput = true;
            let obj = {};
            obj = this.countrys.find((item) => {
                return item.id === val;
            });
            // vm.cu = obj;
            vm.countryId = val;
            vm.xx();
        },

        xx() {
            var self = this;
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "countryId": this.countryId
                },
                url: "" + baseURL + "sys/basedata/university/list",
                success: function (json) {
                    vm.universitys = json.body.list;
                }
            });
        },
        handleClick(tab, first) {
            var val = tab.index;
            if (val == 0) {
                vm.showa = false;
                vm.showb = true;
            } else {
                vm.showa = true;
                vm.showb = false;
            }
        },
        display() {
            this.$confirm('是否要执行此操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                vm.disabledInput = false;
            }).catch(() => {

            });
        },
        sees(row, index) {
            console.log(row);
            if (row.studCourse.studPurchaseOrder.type == 64) {
                if (row.studCourse.parentId == null) {
                    window.open("bigClassroomInfo1.html?id=" + row.courseId + "&teacherId=" + row.studCourse.teacherId);
                } else {
                    window.open("bigClassOrderInfo.html?id=" + row.courseId);
                }

                // window.open("bigClassOrderInfo.html?id=" + row.courseId + "");
                // window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
            } else if (row.studCourse.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.courseId + "&wyid=" + row.studCourse
                    .offCourseName + "&iswy=true");
            } else {
                window.open("seller_detail.html?id=" + row.courseId + "");
            }
        },
        // 更新
        update1(formName) {
            if (this.$refs.ruleForm.model.examTime == undefined) {
                this.$refs.ruleForm.model.examTime = null;
            }
            var model = this.$refs.ruleForm.model;
            var startTime1 = this.$refs.ruleForm.model.startTime1;
            var endTime1 = this.$refs.ruleForm.model.endTime1;
            var startTime2 = this.$refs.ruleForm.model.startTime2;
            var endTime2 = this.$refs.ruleForm.model.endTime2;
            var startTime3 = this.$refs.ruleForm.model.startTime3;
            var endTime3 = this.$refs.ruleForm.model.endTime3;
            var startTime4 = this.$refs.ruleForm.model.startTime4;
            var endTime4 = this.$refs.ruleForm.model.endTime4;
            var startTime5 = this.$refs.ruleForm.model.startTime5;
            var endTime5 = this.$refs.ruleForm.model.endTime5;
            var startTime6 = this.$refs.ruleForm.model.startTime6;
            var endTime6 = this.$refs.ruleForm.model.endTime6;
            var startTime7 = this.$refs.ruleForm.model.startTime7;
            var endTime7 = this.$refs.ruleForm.model.endTime7;
            var startTime8 = this.$refs.ruleForm.model.startTime8;
            var endTime8 = this.$refs.ruleForm.model.endTime8;
            var startTime9 = this.$refs.ruleForm.model.startTime9;
            var endTime9 = this.$refs.ruleForm.model.endTime9;
            var startTime10 = this.$refs.ruleForm.model.startTime10;
            var endTime10 = this.$refs.ruleForm.model.endTime10;
            var startTime11 = this.$refs.ruleForm.model.startTime11;
            var endTime11 = this.$refs.ruleForm.model.endTime11;
            var startTime12 = this.$refs.ruleForm.model.startTime12;
            var endTime12 = this.$refs.ruleForm.model.endTime12;
            var startTime13 = this.$refs.ruleForm.model.startTime13;
            var endTime13 = this.$refs.ruleForm.model.endTime13;
            var startTime14 = this.$refs.ruleForm.model.startTime14;
            var endTime14 = this.$refs.ruleForm.model.endTime14;
            var startTime15 = this.$refs.ruleForm.model.startTime15;
            var endTime15 = this.$refs.ruleForm.model.endTime15;
            var startTime16 = this.$refs.ruleForm.model.startTime16;
            var endTime16 = this.$refs.ruleForm.model.endTime16;
            var startTime17 = this.$refs.ruleForm.model.startTime17;
            var endTime17 = this.$refs.ruleForm.model.endTime17;
            var startTime18 = this.$refs.ruleForm.model.startTime18;
            var endTime18 = this.$refs.ruleForm.model.endTime18;
            var startTime19 = this.$refs.ruleForm.model.startTime19;
            var endTime19 = this.$refs.ruleForm.model.endTime19;
            var startTime20 = this.$refs.ruleForm.model.startTime20;
            var endTime20 = this.$refs.ruleForm.model.endTime20;
            var startTime21 = this.$refs.ruleForm.model.startTime21;
            var endTime21 = this.$refs.ruleForm.model.endTime21;
            if (startTime1 == "" || endTime1 == "") {
                time1 = '';
            } else {
                time1 = startTime1 + "-" + endTime1;
            }
            if (startTime2 == "" || endTime2 == "") {
                time2 = '';
            } else {
                time2 = startTime2 + "-" + endTime2;
            }
            if (startTime3 == "" || endTime3 == "") {
                time3 = '';
            } else {
                time3 = startTime3 + "-" + endTime3;
            }
            if (startTime4 == "" || endTime4 == "") {
                time4 = '';
            } else {
                time4 = startTime4 + "-" + endTime4;
            }
            if (startTime5 == "" || endTime5 == "") {
                time5 = '';
            } else {
                time5 = startTime5 + "-" + endTime5;
            }
            if (startTime6 == "" || endTime6 == "") {
                time6 = '';
            } else {
                time6 = startTime6 + "-" + endTime6;
            }
            if (startTime7 == "" || endTime7 == "") {
                time7 = '';
            } else {
                time7 = startTime7 + "-" + endTime7;
            }
            if (startTime8 == "" || endTime8 == "") {
                time8 = '';
            } else {
                time8 = startTime8 + "-" + endTime8;
            }
            if (startTime9 == "" || endTime9 == "") {
                time9 = '';
            } else {
                time9 = startTime9 + "-" + endTime9;
            }
            if (startTime10 == "" || endTime10 == "") {
                time10 = '';
            } else {
                time10 = startTime10 + "-" + endTime10;
            }
            if (startTime11 == "" || endTime11 == "") {
                time11 = '';
            } else {
                time11 = startTime11 + "-" + endTime11;
            }
            if (startTime12 == "" || endTime12 == "") {
                time12 = '';
            } else {
                time12 = startTime12 + "-" + endTime12;
            }
            if (startTime13 == "" || endTime13 == "") {
                time13 = '';
            } else {
                time13 = startTime13 + "-" + endTime13;
            }
            if (startTime14 == "" || endTime14 == "") {
                time14 = '';
            } else {
                time14 = startTime14 + "-" + endTime14;
            }
            if (startTime15 == "" || endTime15 == "") {
                time15 = '';
            } else {
                time15 = startTime15 + "-" + endTime15;
            }
            if (startTime16 == "" || endTime16 == "") {
                time16 = '';
            } else {
                time16 = startTime16 + "-" + endTime16;
            }
            if (startTime17 == "" || endTime17 == "") {
                time17 = '';
            } else {
                time17 = startTime17 + "-" + endTime17;
            }
            if (startTime18 == "" || endTime18 == "") {
                time18 = '';
            } else {
                time18 = startTime18 + "-" + endTime18;
            }
            if (startTime19 == "" || endTime19 == "") {
                time19 = '';
            } else {
                time19 = startTime19 + "-" + endTime19;
            }
            if (startTime20 == "" || endTime20 == "") {
                time20 = '';
            } else {
                time20 = startTime20 + "-" + endTime20;
            }
            if (startTime21 == "" || endTime21 == "") {
                time21 = '';
            } else {
                time21 = startTime21 + "-" + endTime21;
            }
            var self = this;
            var freetime = time1 + ',' + time2 + ',' + time3 + '|' + time4 + ',' + time5 + ',' + time6 +
                '|' + time7 + ',' + time8 + ',' + time9 + '|' + time10 + ',' + time11 + ',' + time12 + '|' +
                time13 + ',' + time14 + ',' + time15 + '|' + time16 + ',' + time17 + ',' + time18 + '|' +
                time19 + ',' + time20 + ',' + time21;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval1 = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/order/updateAfterConfirm",
                        dataType: "json",
                        data: {
                            id: vm.purchaseOrderId,
                            courseId: vm.courseId,
                            spareTime: freetime,
                            sellerDemandDesc: this.$refs.ruleForm.model.sellerDemandDesc,
                            remark: this.$refs.ruleForm.model.remark,
                        },
                        success: function (r) {
                            if (r.status == 200) {
                                self.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval1 = "修改";
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                            }
                            if (r.status == 400) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval1 = "修改";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 更新
        update2(formName) {
            if (this.$refs.ruleForm.model.examTime == undefined) {
                this.$refs.ruleForm.model.examTime = null;
            }
            if (this.$refs.ruleForm.model.decimalMaterialCost == undefined) {
                this.$refs.ruleForm.model.decimalMaterialCost = null;
            }
            if (this.$refs.ruleForm.model.persenterTime == "") {
                vm.ruleForm.persenterTime = 0;
            }
            var model = this.$refs.ruleForm.model;
            var startTime1 = this.$refs.ruleForm.model.startTime1;
            var endTime1 = this.$refs.ruleForm.model.endTime1;
            var startTime2 = this.$refs.ruleForm.model.startTime2;
            var endTime2 = this.$refs.ruleForm.model.endTime2;
            var startTime3 = this.$refs.ruleForm.model.startTime3;
            var endTime3 = this.$refs.ruleForm.model.endTime3;
            var startTime4 = this.$refs.ruleForm.model.startTime4;
            var endTime4 = this.$refs.ruleForm.model.endTime4;
            var startTime5 = this.$refs.ruleForm.model.startTime5;
            var endTime5 = this.$refs.ruleForm.model.endTime5;
            var startTime6 = this.$refs.ruleForm.model.startTime6;
            var endTime6 = this.$refs.ruleForm.model.endTime6;
            var startTime7 = this.$refs.ruleForm.model.startTime7;
            var endTime7 = this.$refs.ruleForm.model.endTime7;
            var startTime8 = this.$refs.ruleForm.model.startTime8;
            var endTime8 = this.$refs.ruleForm.model.endTime8;
            var startTime9 = this.$refs.ruleForm.model.startTime9;
            var endTime9 = this.$refs.ruleForm.model.endTime9;
            var startTime10 = this.$refs.ruleForm.model.startTime10;
            var endTime10 = this.$refs.ruleForm.model.endTime10;
            var startTime11 = this.$refs.ruleForm.model.startTime11;
            var endTime11 = this.$refs.ruleForm.model.endTime11;
            var startTime12 = this.$refs.ruleForm.model.startTime12;
            var endTime12 = this.$refs.ruleForm.model.endTime12;
            var startTime13 = this.$refs.ruleForm.model.startTime13;
            var endTime13 = this.$refs.ruleForm.model.endTime13;
            var startTime14 = this.$refs.ruleForm.model.startTime14;
            var endTime14 = this.$refs.ruleForm.model.endTime14;
            var startTime15 = this.$refs.ruleForm.model.startTime15;
            var endTime15 = this.$refs.ruleForm.model.endTime15;
            var startTime16 = this.$refs.ruleForm.model.startTime16;
            var endTime16 = this.$refs.ruleForm.model.endTime16;
            var startTime17 = this.$refs.ruleForm.model.startTime17;
            var endTime17 = this.$refs.ruleForm.model.endTime17;
            var startTime18 = this.$refs.ruleForm.model.startTime18;
            var endTime18 = this.$refs.ruleForm.model.endTime18;
            var startTime19 = this.$refs.ruleForm.model.startTime19;
            var endTime19 = this.$refs.ruleForm.model.endTime19;
            var startTime20 = this.$refs.ruleForm.model.startTime20;
            var endTime20 = this.$refs.ruleForm.model.endTime20;
            var startTime21 = this.$refs.ruleForm.model.startTime21;
            var endTime21 = this.$refs.ruleForm.model.endTime21;
            if (startTime1 == "" || endTime1 == "") {
                time1 = '';
            } else {
                time1 = startTime1 + "-" + endTime1;
            }
            if (startTime2 == "" || endTime2 == "") {
                time2 = '';
            } else {
                time2 = startTime2 + "-" + endTime2;
            }
            if (startTime3 == "" || endTime3 == "") {
                time3 = '';
            } else {
                time3 = startTime3 + "-" + endTime3;
            }
            if (startTime4 == "" || endTime4 == "") {
                time4 = '';
            } else {
                time4 = startTime4 + "-" + endTime4;
            }
            if (startTime5 == "" || endTime5 == "") {
                time5 = '';
            } else {
                time5 = startTime5 + "-" + endTime5;
            }
            if (startTime6 == "" || endTime6 == "") {
                time6 = '';
            } else {
                time6 = startTime6 + "-" + endTime6;
            }
            if (startTime7 == "" || endTime7 == "") {
                time7 = '';
            } else {
                time7 = startTime7 + "-" + endTime7;
            }
            if (startTime8 == "" || endTime8 == "") {
                time8 = '';
            } else {
                time8 = startTime8 + "-" + endTime8;
            }
            if (startTime9 == "" || endTime9 == "") {
                time9 = '';
            } else {
                time9 = startTime9 + "-" + endTime9;
            }
            if (startTime10 == "" || endTime10 == "") {
                time10 = '';
            } else {
                time10 = startTime10 + "-" + endTime10;
            }
            if (startTime11 == "" || endTime11 == "") {
                time11 = '';
            } else {
                time11 = startTime11 + "-" + endTime11;
            }
            if (startTime12 == "" || endTime12 == "") {
                time12 = '';
            } else {
                time12 = startTime12 + "-" + endTime12;
            }
            if (startTime13 == "" || endTime13 == "") {
                time13 = '';
            } else {
                time13 = startTime13 + "-" + endTime13;
            }
            if (startTime14 == "" || endTime14 == "") {
                time14 = '';
            } else {
                time14 = startTime14 + "-" + endTime14;
            }
            if (startTime15 == "" || endTime15 == "") {
                time15 = '';
            } else {
                time15 = startTime15 + "-" + endTime15;
            }
            if (startTime16 == "" || endTime16 == "") {
                time16 = '';
            } else {
                time16 = startTime16 + "-" + endTime16;
            }
            if (startTime17 == "" || endTime17 == "") {
                time17 = '';
            } else {
                time17 = startTime17 + "-" + endTime17;
            }
            if (startTime18 == "" || endTime18 == "") {
                time18 = '';
            } else {
                time18 = startTime18 + "-" + endTime18;
            }
            if (startTime19 == "" || endTime19 == "") {
                time19 = '';
            } else {
                time19 = startTime19 + "-" + endTime19;
            }
            if (startTime20 == "" || endTime20 == "") {
                time20 = '';
            } else {
                time20 = startTime20 + "-" + endTime20;
            }
            if (startTime21 == "" || endTime21 == "") {
                time21 = '';
            } else {
                time21 = startTime21 + "-" + endTime21;
            }
            var self = this;
            var freetime = time1 + ',' + time2 + ',' + time3 + '|' + time4 + ',' + time5 + ',' + time6 +
                '|' + time7 + ',' + time8 + ',' + time9 + '|' + time10 + ',' + time11 + ',' + time12 + '|' +
                time13 + ',' + time14 + ',' + time15 + '|' + time16 + ',' + time17 + ',' + time18 + '|' +
                time19 + ',' + time20 + ',' + time21;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval1 = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/order/updatePurchaseOrder",
                        contentType: "application/json",
                        data: JSON.stringify({
                            id: vm.purchaseOrderId,
                            courseId: vm.courseId,
                            flag: 0,
                            remark: this.$refs.ruleForm.model.remark,
                            minMoney: vm.ruleForm.minMoney,
                            persenterTime: vm.ruleForm.persenterTime,
                            studentName: this.$refs.ruleForm.model.nickName,
                            countryId: this.$refs.ruleForm.model.countryId,
                            professionalId: this.$refs.ruleForm.model
                                .professionalId,
                            type: this.$refs.ruleForm.model.type,
                            courseName: this.$refs.ruleForm.model.courseName,
                            courseCode: this.$refs.ruleForm.model.courseCode,
                            decimalScheduledTime: Number(this.$refs.ruleForm.model
                                .scheduledTime),
                            decimalTotalPrice: Number(this.$refs.ruleForm.model
                                .totalPrice),
                            decimalPrice: Number(this.$refs.ruleForm.model.price),
                            universityId: this.$refs.ruleForm.model.universityId,
                            eduId: Number(this.$refs.ruleForm.model.levelId),
                            schoolYear: this.$refs.ruleForm.model.schoolYear,
                            examTime: this.$refs.ruleForm.model.examTime,
                            endCourseTime: this.$refs.ruleForm.model.endCourseTime,
                            courseFamiliarityId: Number(this.$refs.ruleForm.model
                                .courseFamiliarityId),
                            type: Number(this.$refs.ruleForm.model.type),
                            schoolAccount: this.$refs.ruleForm.model.schoolAccount,
                            schoolPws: this.$refs.ruleForm.model.schoolPws,
                            spareTime: freetime,
                            sellerDemandDesc: this.$refs.ruleForm.model
                                .sellerDemandDesc,
                            wxAccount: this.$refs.ruleForm.model.wxAccount,
                            decimalMaterialCost: Number(this.$refs.ruleForm.model
                                .decimalMaterialCost),
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                self.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                vm.btnstatus = true;
                                vm.btnval1 = "修改";
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                            }
                            if (r.status == 400) {
                                vm.$message({
                                    message: r.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval1 = "修改";
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        next() {
            vm.showa = true;
            vm.showb = false;
            vm.activeName = 'second';
        },
        // 返回
        back: function () {
            window.location.reload();
        },
        // 保存      
        save(formName1) {
            if (this.$refs.ruleForm.model.examTime == undefined) {
                this.$refs.ruleForm.model.examTime = null;
            }
            if (this.$refs.ruleForm.model.decimalMaterialCost == undefined) {
                this.$refs.ruleForm.model.decimalMaterialCost = null;
            }
            if (this.$refs.ruleForm.model.persenterTime == "") {
                vm.ruleForm.persenterTime = 0;
            }
            var model = this.$refs.ruleForm.model;
            var startTime1 = this.$refs.ruleForm.model.startTime1;
            var endTime1 = this.$refs.ruleForm.model.endTime1;
            var startTime2 = this.$refs.ruleForm.model.startTime2;
            var endTime2 = this.$refs.ruleForm.model.endTime2;
            var startTime3 = this.$refs.ruleForm.model.startTime3;
            var endTime3 = this.$refs.ruleForm.model.endTime3;
            var startTime4 = this.$refs.ruleForm.model.startTime4;
            var endTime4 = this.$refs.ruleForm.model.endTime4;
            var startTime5 = this.$refs.ruleForm.model.startTime5;
            var endTime5 = this.$refs.ruleForm.model.endTime5;
            var startTime6 = this.$refs.ruleForm.model.startTime6;
            var endTime6 = this.$refs.ruleForm.model.endTime6;
            var startTime7 = this.$refs.ruleForm.model.startTime7;
            var endTime7 = this.$refs.ruleForm.model.endTime7;
            var startTime8 = this.$refs.ruleForm.model.startTime8;
            var endTime8 = this.$refs.ruleForm.model.endTime8;
            var startTime9 = this.$refs.ruleForm.model.startTime9;
            var endTime9 = this.$refs.ruleForm.model.endTime9;
            var startTime10 = this.$refs.ruleForm.model.startTime10;
            var endTime10 = this.$refs.ruleForm.model.endTime10;
            var startTime11 = this.$refs.ruleForm.model.startTime11;
            var endTime11 = this.$refs.ruleForm.model.endTime11;
            var startTime12 = this.$refs.ruleForm.model.startTime12;
            var endTime12 = this.$refs.ruleForm.model.endTime12;
            var startTime13 = this.$refs.ruleForm.model.startTime13;
            var endTime13 = this.$refs.ruleForm.model.endTime13;
            var startTime14 = this.$refs.ruleForm.model.startTime14;
            var endTime14 = this.$refs.ruleForm.model.endTime14;
            var startTime15 = this.$refs.ruleForm.model.startTime15;
            var endTime15 = this.$refs.ruleForm.model.endTime15;
            var startTime16 = this.$refs.ruleForm.model.startTime16;
            var endTime16 = this.$refs.ruleForm.model.endTime16;
            var startTime17 = this.$refs.ruleForm.model.startTime17;
            var endTime17 = this.$refs.ruleForm.model.endTime17;
            var startTime18 = this.$refs.ruleForm.model.startTime18;
            var endTime18 = this.$refs.ruleForm.model.endTime18;
            var startTime19 = this.$refs.ruleForm.model.startTime19;
            var endTime19 = this.$refs.ruleForm.model.endTime19;
            var startTime20 = this.$refs.ruleForm.model.startTime20;
            var endTime20 = this.$refs.ruleForm.model.endTime20;
            var startTime21 = this.$refs.ruleForm.model.startTime21;
            var endTime21 = this.$refs.ruleForm.model.endTime21;
            if (startTime1 == "" || endTime1 == "") {
                time1 = '';
            } else {
                time1 = startTime1 + "-" + endTime1;
            }
            if (startTime2 == "" || endTime2 == "") {
                time2 = '';
            } else {
                time2 = startTime2 + "-" + endTime2;
            }
            if (startTime3 == "" || endTime3 == "") {
                time3 = '';
            } else {
                time3 = startTime3 + "-" + endTime3;
            }
            if (startTime4 == "" || endTime4 == "") {
                time4 = '';
            } else {
                time4 = startTime4 + "-" + endTime4;
            }
            if (startTime5 == "" || endTime5 == "") {
                time5 = '';
            } else {
                time5 = startTime5 + "-" + endTime5;
            }
            if (startTime6 == "" || endTime6 == "") {
                time6 = '';
            } else {
                time6 = startTime6 + "-" + endTime6;
            }
            if (startTime7 == "" || endTime7 == "") {
                time7 = '';
            } else {
                time7 = startTime7 + "-" + endTime7;
            }
            if (startTime8 == "" || endTime8 == "") {
                time8 = '';
            } else {
                time8 = startTime8 + "-" + endTime8;
            }
            if (startTime9 == "" || endTime9 == "") {
                time9 = '';
            } else {
                time9 = startTime9 + "-" + endTime9;
            }
            if (startTime10 == "" || endTime10 == "") {
                time10 = '';
            } else {
                time10 = startTime10 + "-" + endTime10;
            }
            if (startTime11 == "" || endTime11 == "") {
                time11 = '';
            } else {
                time11 = startTime11 + "-" + endTime11;
            }
            if (startTime12 == "" || endTime12 == "") {
                time12 = '';
            } else {
                time12 = startTime12 + "-" + endTime12;
            }
            if (startTime13 == "" || endTime13 == "") {
                time13 = '';
            } else {
                time13 = startTime13 + "-" + endTime13;
            }
            if (startTime14 == "" || endTime14 == "") {
                time14 = '';
            } else {
                time14 = startTime14 + "-" + endTime14;
            }
            if (startTime15 == "" || endTime15 == "") {
                time15 = '';
            } else {
                time15 = startTime15 + "-" + endTime15;
            }
            if (startTime16 == "" || endTime16 == "") {
                time16 = '';
            } else {
                time16 = startTime16 + "-" + endTime16;
            }
            if (startTime17 == "" || endTime17 == "") {
                time17 = '';
            } else {
                time17 = startTime17 + "-" + endTime17;
            }
            if (startTime18 == "" || endTime18 == "") {
                time18 = '';
            } else {
                time18 = startTime18 + "-" + endTime18;
            }
            if (startTime19 == "" || endTime19 == "") {
                time19 = '';
            } else {
                time19 = startTime19 + "-" + endTime19;
            }
            if (startTime20 == "" || endTime20 == "") {
                time20 = '';
            } else {
                time20 = startTime20 + "-" + endTime20;
            }
            if (startTime21 == "" || endTime21 == "") {
                time21 = '';
            } else {
                time21 = startTime21 + "-" + endTime21;
            }
            var freetime = time1 + ',' + time2 + ',' + time3 + '|' + time4 + ',' + time5 + ',' + time6 +
                '|' + time7 + ',' + time8 + ',' + time9 + '|' + time10 + ',' + time11 + ',' + time12 + '|' +
                time13 + ',' + time14 + ',' + time15 + '|' + time16 + ',' + time17 + ',' + time18 + '|' +
                time19 + ',' + time20 + ',' + time21;
            var self = this;
            this.$refs[formName1].validate((valid) => {
                if (valid) {
                    if (vm.ordershow == true) {
                        if (vm.ruleForm.aboutorder == "") {
                            self.$message({
                                message: "请选择关联订单",
                                type: 'warning',
                            });
                            return;
                        }
                    }
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                    $.ajax({
                        type: "POST",
                        headers: {
                            "token": token
                        },
                        url: "" + baseURL + "sys/seller/order/savePurchaseOrder",
                        contentType: "application/json",
                        data: JSON.stringify({
                            courseId: vm.courseId,
                            flag: 0,
                            minMoney: vm.ruleForm.minMoney,
                            persenterTime: vm.ruleForm.persenterTime,
                            parentId: this.$refs.ruleForm.model.aboutorder,
                            studentName: this.$refs.ruleForm.model.nickName,
                            countryId: this.$refs.ruleForm.model.countryId,
                            professionalId: vm.id2,
                            universityId: vm.id1,
                            type: this.$refs.ruleForm.model.type,
                            courseName: this.$refs.ruleForm.model.courseName,
                            courseCode: this.$refs.ruleForm.model.courseCode,
                            decimalScheduledTime: this.$refs.ruleForm.model
                                .scheduledTime,
                            decimalTotalPrice: Number(this.$refs.ruleForm.model
                                .totalPrice),
                            decimalPrice: Number(this.$refs.ruleForm.model.price),
                            eduId: Number(this.$refs.ruleForm.model.levelId),
                            schoolYear: this.$refs.ruleForm.model.schoolYear,
                            examTime: this.$refs.ruleForm.model.examTime,
                            endCourseTime: this.$refs.ruleForm.model.endCourseTime,
                            courseFamiliarityId: Number(this.$refs.ruleForm.model
                                .courseFamiliarityId),
                            courseFamiliarity: vm.familiarity,
                            type: Number(this.$refs.ruleForm.model.type),
                            schoolAccount: this.$refs.ruleForm.model.schoolAccount,
                            schoolPws: this.$refs.ruleForm.model.schoolPws,
                            spareTime: freetime,
                            sellerDemandDesc: this.$refs.ruleForm.model
                                .sellerDemandDesc,
                            wxAccount: this.$refs.ruleForm.model.wxAccount,
                            remark: this.$refs.ruleForm.model.remark,
                            decimalMaterialCost: Number(this.$refs.ruleForm.model
                                .decimalMaterialCost),
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                self.$message({
                                    message: r.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "创建";
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000)

                            }
                            if (r.status == 400) {
                                self.$message({
                                    message: r.body.msg,
                                    type: 'wanring'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "创建";
                            }
                        }
                    });
                } else {
                    this.$message.error('请完善信息');
                    return false;
                }
            });
        },
        change_currency(val) {
            let obj = {};
            obj = this.currencys.find((item) => {
                return item.id === val;
            });
            vm.currencyvalue = obj.id;
            vm.currencylabel = obj.tagerCurrency;
        },
        change_courseFamiliarityId(val) {
            let obj = {};
            obj = this.courseFamiliaritys.find((item) => {
                return item.id === val;
            });
            vm.courseFamiliarityId = obj.id;
            vm.familiarity = obj.familiarity;
        },
        send(row, index) {
            var self = this;
            var token = localStorage.getItem("token");
            self.$confirm('是否要发确认函?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "token": localStorage.getItem("token"),
                            "courseId": row.courseId,
                            "purId": row.purchaseOrderId,
                        },
                        url: "" + baseURL + "sys/seller/order/sendPurchaseOrder",
                        success: function (json) {
                            if (json.status == "400") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                            if (json.status == "200") {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                        }
                    });
                })
        },
        handleCurrentChange(val) {
            vm.val = val;
            vm.getTableData();
        },
        handleSelectionChange(val) {
            // chooseOrder
            this.chooseOrder = val;
            // console.log(val);
            this.multipleSelection = val;
            let ids = [];
            let stss = [];
            let courids = [];
            let currencyed = [];
            this.multipleSelection.map((item) => {
                var id = item.id;
                ids.push("" + id + "");
                var sts = item.statused;
                stss.push("" + sts + "");
                var abb = item.courseId;
                courids.push("" + abb + "");
                var currency = item.currency;
                currencyed.push("" + currency + "");
            });
            this.selectedIDs = ids;
            this.selectedsts = stss;
            this.courides = courids;
            this.currencyed = currencyed;
            // console.log('多选', ids);
        },
        level() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/edubackground/list",
                success: function (json) {
                    vm.levels = json.body.list;
                }
            });
        },
        demand() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/demandtype/list",
                success: function (json) {
                    vm.demands = json.body.list;
                }
            });
        },
        get_currency() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000
                },
                url: "" + baseURL + "sys/basedata/exchangeRate/list",
                success: function (json) {
                    vm.currencys = json.body.list;
                }
            });
        },

        apply(row, idnex) {
            vm.badmodel = true;
            vm.id = row.id;
        },

        submitForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval2 = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            id: vm.id,
                            description: this.ruleForm.description,
                            exceptionType: this.ruleForm.extype,
                        },
                        url: "" + baseURL + "/sys/seller/order/applyBadOrder",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: '坏单申请成功',
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval2 = "确定";
                                vm.badmodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval2 = "确定";
                                vm.badmodel = false;
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        submitForms(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.btnstatus = true;
                    vm.btnval2 = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: vm.courseId,
                            description: this.ruleForm.descriptions,
                        },
                        url: "" + baseURL + "sys/seller/order/applyAccidentOrder",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval2 = "确定";
                                vm.shigumodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval2 = "确定";
                                vm.shigumodel = false;
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        shigumodelClose:function(){
            vm.updataFiles = false;
            vm.uploader.destroy();
            vm.shigumodel = false;
            vm.uploadFilesLength = [];
            vm.ruleForm.descriptions = '';
            vm.ruleForm.shigutype = '';
            vm.uploadFilesArray = [];
        },
        shigumodelSubmit:function(){
            var _this = this;
            if(vm.ruleForm.descriptions === null || vm.ruleForm.descriptions === undefined || vm.ruleForm.descriptions === ''){
                vm.$message({
                    type:'warning',
                    message:'请选择事故类别'
                })
                return
            }
            if(vm.ruleForm.shigutype === null || vm.ruleForm.shigutype === undefined || vm.ruleForm.shigutype === ''){
                vm.$message({
                    type:'warning',
                    message:'请选择事故类别'
                })
                return
            }
            $.ajax({
                url:baseURL + "sys/seller/order/applyAccidentOrder",
                type:'post',
                dataType: 'json',
                headers:{
                    token:token,
                },
                contentType:'application/json',
                data:JSON.stringify({
                    courseId:vm.courseId,
                    description:vm.ruleForm.descriptions,
                    type:vm.ruleForm.shigutype,
                    ossUrls:vm.uploadFilesArray
                }),
                success:function(r){
                    if(r.status === 200){
                        vm.$message({
                            type:'success',
                            message:'申请成功'
                        })
                        window.setInterval(function(){
                            window.location.reload()
                        }, 1200)
                    } else {
                        vm.$message({
                            type:'warning',
                            message:r.body.msg
                        })
                    }
                },
                error:function(er){

                }
            })
        },
        apply_Accident(row, index) {
            console.log(row.courseId)
            vm.courseId = row.courseId;
            vm.shigumodel = true;
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
        change_delivery(val) {
            if (val === true) {
                vm.ordershow = true;
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        "token": token,
                        "page": 1,
                        "limit": 1000,
                        "userId": this.userId,
                    },
                    url: "" + baseURL + "/sys/seller/order/getUndoneCustomList",
                    success: function (json) {
                        vm.deliverys = json.body;
                    }
                });
            } else {
                vm.ordershow = false;
                vm.ruleForm.aboutorder = "";
            }
        },
        lock_order(row, index) {
            vm.$confirm("是否锁定该订单?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "" + baseURL + "/sys/seller/order/lockOrder",
                    data: {
                        "token": token,
                        "courseId": row.studCourse.id,
                    },
                    success: function (json) {
                        if (json.status == 400) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'warning'
                            });
                        }
                        if (json.status == 200) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            vm.getTableData();
                        }
                    }
                });
            }).catch(() => {

            });
        },
        unlock_order(row, index) {
            vm.$confirm("是否解锁该订单?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "" + baseURL + "/sys/seller/order/unLockOrder",
                    data: {
                        "token": token,
                        "courseId": row.studCourse.id,
                    },
                    success: function (json) {
                        if (json.status == 400) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'warning'
                            });
                        }
                        if (json.status == 200) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            vm.getTableData();
                        }
                    }
                });
            }).catch(() => {

            });
        },
        creat1() {
            // this.chooseOrder
            var id = vm.courides
            if (id != "") {
                var ids = id.join()
                vm.selid = ids
                if (id.length === 0 || id.length > 1) {
                    vm.$message({
                        type: 'warning',
                        message: '只能选择一条订单'
                    })
                    return;
                }
                console.log(this.chooseOrder);

                vm.ruleForm.payMoney = ""
                vm.currencycreat = vm.currencyed.join();
                vm.creatmodel1 = true;
            } else {
                vm.$message({
                    type: 'warning',
                    message: '请选择一条订单'
                })
                return;
            }
        },
        creatsave(formName) {
            var _this = this;
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.creatst1 = true;
                    vm.creatbtn1 = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            courseId: this.selid,
                            payMoney: this.ruleForm.payMoney,
                        },
                        url: "" + baseURL +
                            "/sys/seller/order/createPurchasingPaymentDemand",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.creatmodel1 = false;
                                // vm.$message({
                                //     message: json.body.msg,
                                //     type: 'success'
                                // });
                                vm.creatst1 = false;
                                vm.creatbtn1 = "确 定";
                                // vm.getTableData();

                                // var GET_ID = _this.chooseOrder[0].courseId;
                                // $.ajax({
                                //     type: "get",
                                //     dataType: "json",
                                //     data: {
                                //         "token": token,
                                //         "page": 1,
                                //         "limit": 1000,
                                //         "exceptionType": ""
                                //     },
                                //     url: "" + baseURL + "sys/seller/order/getCourseObject?id=" + GET_ID + "",
                                //     success:function(r){
                                //         console.log(r);
                                //     },
                                //     error:function(er){

                                //     }
                                // })
                                var row = json.body.resultBean;
                                // debugger;
                                // .studCourse
                                vm.studId = row.studId;
                                vm.payDialogInfo = row;
                                vm.residuePayMoney = vm.payDialogInfo.badMoney;
                                _this.stillNeedPay = vm.payDialogInfo.badMoney;
                                // 获取支付方式
                                _this.rightAwayPayLoading = true;
                                _this.payId = row.id;
                                // var _this = this;
                                _this.rightAwayPay = true;
                                // 获取多币种支付账户
                                $.ajax({
                                    url: baseURL +
                                        'sys/seller/order/queryStudPaymentMethod?payId=' +
                                        row.id,
                                    type: 'GET',
                                    headers: {
                                        token: token
                                    },
                                    success: function (r) {
                                        console.log(r);
                                        _this.nomarlCurrency = _this
                                            .payDialogInfo.current;
                                        _this.showTypePayment = r.body;
                                        _this.ExchangeMoneyOrder(_this
                                            .payDialogInfo.badMoney,
                                            _this.payDialogInfo.current,
                                            _this.payDialogInfo.current);
                                        _this.stillNeedPaymentMoney = _this.publicAmounts;
                                        if (_this.showTypePayment
                                            .studCardBag == null && _this
                                            .showTypePayment.studAccountList
                                            .length >= 1) {
                                            _this.showTypePaymentOnoff =
                                                true; // 无学期卡一种余额
                                        } else {
                                            _this.showTypePaymentOnoff =
                                                false; // 有学期卡多种充余额
                                        }
                                        if (r.body.studCardBag != null) {
                                            var obj1 = {
                                                hasCard: true,
                                                lastTime: r.body
                                                    .studCardBag
                                                    .lastTime,
                                                money: r.body
                                                    .studCardBag
                                                    .addWorth * 1 + r
                                                    .body.studCardBag
                                                    .realWorth * 1 - r
                                                    .body.studCardBag
                                                    .consumedWorth * 1,
                                                current: r.body
                                                    .studCardBag
                                                    .currency,
                                                type: 1,
                                                id: 0,
                                                exchangeMoney: r.body
                                                    .studCardBag
                                                    .lastMoneyByPayId,
                                                disabled: false,
                                                plusMoney: 0,
                                                checked: false,
                                                pulsMoneyExchange: 0,
                                                choose: false,
                                            };
                                            _this.paymentMethod.push(obj1);
                                        }
                                        for (var i in r.body
                                                .studAccountList) {
                                            var obj = {
                                                hasCard: false,
                                                money: r.body
                                                    .studAccountList[i]
                                                    .money,
                                                current: r.body
                                                    .studAccountList[i]
                                                    .current,
                                                type: 2,
                                                id: i * 1 + 1,
                                                exchangeMoney: r.body
                                                    .studAccountList[i]
                                                    .moneyByPayId,
                                                disabled: false,
                                                plusMoney: 0,
                                                checked: false,
                                                pulsMoneyExchange: 0,
                                                choose: false,
                                            };
                                            _this.paymentMethod.push(obj);
                                        }
                                        _this.rightAwayPayLoading = false;
                                        _this.newPaymentMethod = JSON.parse(
                                            JSON.stringify(_this
                                                .paymentMethod));
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
                                    success: function (r) {
                                        vm.payToOrderArray = r.body;
                                        for (var i in vm.payToOrderArray) {
                                            vm.payToOrderArray[i].checked = false;
                                        }
                                    },
                                    error: function (er) {

                                    }
                                });

                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.creatst1 = false;
                                vm.creatbtn1 = "确 定";
                            }
                        }
                    });
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
        getExchange: function () {
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
                success: function (r) {
                    _this.exchangeArray = r.body.list;
                    _this.exchangeArrays = r.body.list;
                }
            });
        },
        // 汇率模块
        ExchangeMoney: function (amounts, beforeCu, afterCu) {
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
        ExchangeMoneyTwice: function (amounts, beforeCu, afterCu) {
            var publicAmount = 0;
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
                    publicAmount = ((amounts * publicExchange) / this.exchangeArray[i].exchange)
                        .toFixed(2);
                }
            };
            return publicAmount;
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
                success: function (r) {
                    console.log(r.body.list);
                    _this.currencyList = r.body.list;
                },
                error: function (er) {

                }
            })
        },
        ExchangeMoneyOrder: function (amounts, beforeCu, afterCu) {
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
        changePaymentEvent: function (val) {
            // 是否显示"余额不足需要充值"的文字
            // var conut = 0;
            // conut += val.exchangeMoney * 1;
            // console.log(conut)
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
            // if (this.payDialogInfo.badMoney <= conut) {
            //     for (var i in this.paymentMethod) {
            //         if (val.id != this.paymentMethod[i].id) {
            //             this.paymentMethod[i].disabled = true;
            //         } else {
            //             this.paymentMethod[i].disabled = false;
            //         }
            //     }
            // } else {
            //     for (var i in this.paymentMethod) {
            //         this.paymentMethod[i].disabled = false;
            //     }
            // }
            // 如果都不选  的变化事件
            if (this.chiocePaymentMethodArray.length == 0) {
                this.balanceEnough = false;
                this.warningPaymentMoney = false;
                // for (var i in this.paymentMethod) {
                //     this.paymentMethod[i].disabled = false;
                // }
                // conut = 0;
            };
            this.ExchangeMoney(this.stillNeedPay, this.payDialogInfo.current, this.nomarlCurrency);
            this.stillNeedPaymentMoney = this.publicAmount;
        },
        // 还需支付金额 input blur事件
        changeResiduePayMoneyEvent: function () {
            if (this.nomarlCurrency != '') {
                this.ExchangeMoney(this.stillNeedPay, this.payDialogInfo.current, this
                    .nomarlCurrency);
                this.stillNeedPaymentMoney = this.publicAmount;
            }
        },
        // 还需支付金额 币种change事件
        changeCurrency: function (val) {
            this.ExchangeMoneyOrder(this.stillNeedPay, this.payDialogInfo.current, val);
            this.stillNeedPaymentMoney = this.publicAmounts;
        },
        // 支付按钮
        payDemandsByMoreMethod: function () {
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
                success: function (r) {
                    if (r.body.needMoney == 0) {
                        vm.$message({
                            message: '支付成功',
                            type: 'success'
                        });
                        setInterval(function () {
                            window.location.reload();
                        }, 1500)
                    } else {
                        vm.$message({
                            message: '支付失败, 请重新计算汇率',
                            type: 'warning'
                        });

                    }
                },
                error: function (er) {

                }
            })
        },
        // 关闭多币种支付弹窗事件
        rightAwayPayHandleClose: function () {
            this.residuePayMoney = '';
            this.paymentMethod = [];
            this.newPaymentMethod = [];
            this.chiocePaymentMethodArray = [];
            this.imgs = [];
            this.rightAwayPayType2Doc = '';
            this.nomarlCurrency = '';
            this.rightAwayPay = false;
        },

        // 转账支付创口 转账支付接口
        rightAwayPayType2Submit: function () {
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
                } else if(vm.payDialogInfo.courseId === null){
                    this.formDate.append('courseId','');
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

    }
});