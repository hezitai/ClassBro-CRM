var vm = new Vue({
    el: '#app',
    data() {
        return {
            teacherInformation: {
                tuGrade: ''
            },
            dialogFormVisible3: false,
            jiekeids: '',
            sub4: false,
            sub3: false,
            sub5: false,
            sub6: false,
            usertype: {
                // hasFina: true,
                // hasMaster: true,
                // hasOper: true,
                // hasOperManager: true,
                // hasRoot: true,
                // hasSales: true,
                // hasSalesGroupMaster: true,
                // hasSalesManager: true,
                // hasTrain: true,
            },
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "/sys/seller/order/updateOrderPrice",
            ruleForm: {
                totalPrice: "",
                prepayment: "",
                courseId: "",
            },
            imglength: '',
            showprepayment: false,
            delivery: false,
            btn: false,
            pricemodel: false,
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            val: 1,
            courseId: '',
            page: "",
            btnval: "确定",
            btnstatus: false,
            rules: {
                totalPrice: [{
                    required: true,
                    message: '请输入新的价格',
                    trigger: 'blur'
                }, ],
            },
            PresenterTimerules: {
                time: [{
                    required: true,
                    message: '请填写赠送时长',
                    trigger: 'blur'
                }],
                description: [{
                    required: true,
                    message: '请填写赠送理由',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请选择类型',
                    trigger: 'change'
                }],
            },
            PresenterTimeruleForm: {
                time: '',
                description: '',
                type: '0',
            },
            timebtnstatus: false,
            timebtnval: "确 定",
            timemodel: false,
            badmodel: false,
            badmodelid: '',
            badmodelruleForm: {
                shigutype: '',
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
            badmodelrules: {
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
                shigutype: [{
                    required: true,
                    message: '请选择事故类别',
                    trigger: 'change'
                }]
            },
            badmodelbtnval2: "确定",
            badmodelbtnstatus: false,
            shigumodel: false,
            shigumodelLoading: false,
            uploadFilesArray: [],
            uploader: null,
            chooseOrder: [],
            updataFiles: false,
            shigumodelrules: {
                shigutype: [{
                    required: true,
                    message: '请选择事故类别',
                    trigger: 'change'
                }],
                descriptions: [{
                    required: true,
                    message: '请填写理由',
                    trigger: 'blur'
                }],
            },
            shigumodelruleForm: {
                descriptions: '',
                shigutype: '',
            },
            operruleForm: {
                shigutype: '',
                descriptions: '',
            },
            operrules: {

            },
            apply_SellercourseId: '',
            opershigumodel: false,
            shigumodelLoading: false,
            operuploadFilesArray: [],
            operuploader: null,
            opershigumodelLoading: false,
            jiekeruleForm: {
                doSomething: '',
                sooStatusedArr: '全部',
                description: '',
                one: '',
                gbre: '',
                sendGb: '',
            },
            selects: '',
            selectsCopy: '',
            gg: false,
            givecourid: '',
            dialogFormVisible1: false,
            giveruleForm: {},
            giverules: {},
            selects: [],
            evaluates: '',
            evaluate: false,
            tiaozhengDialog: false,
            tiaozhengform: {},
            tiaozhengruleform: {
                money: 0,
                type: 0,
                desc: '',
                gb: '',
            },
            courseIdtiaozheng: '',
            moneytime: '',
        }
    },
    multipleSelection: [],
    mounted() {
        this.getTableData();
        this.getUser();
        this.getOperTeacList()
    },
    methods: {
        changeRaidoType: function (val) {
            this.tiaozhengruleform.type = val;
        },
        // sys/seller/order/putTeacHourlyWage
        tiaozhengtime: function () {
            var _this = this
            $.ajax({
                url: baseURL + 'sys/seller/order/putTeacHourlyWage',
                data: {
                    courseId: this.courseIdtiaozheng,
                    hourlyWage: this.tiaozhengruleform.money
                },
                type:'post',
                success:function(r){
                    if (r.status === 200) {
                        vm.$message({
                            type: 'success',
                            message: r.body.msg
                        })
                        vm.tiaozhengDialogClose();
                        vm.getTableData();
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        })
                    }
                },
                error:function(er){

                }
            })
        },
        tiaozheng: function (row, index) {
            this.tiaozhengDialog = true;
            this.tiaozhengruleform.money = row.hourlyWage
            this.moneytime = row.hourlyWage
            this.courseIdtiaozheng = row.id
        },
        tiaozhengDialogClose: function () {
            this.tiaozhengform = {};
            this.tiaozhengruleform = {
                money: '',
                type: 0,
                desc: '',
                gb: '',
            };
            this.courseIdtiaozheng = '';
            this.tiaozhengDialog = false;
        },
        tiaozhengDialogSubmit: function () {
            // 奖励G币 sys/oper/handselGbToTeacher
            // courseId: 1855
            // gb: 324
            // 扣除 sys/oper/discountTeacIncome
            // courseId: 1855
            // description: 人发生地方
            // gb: 324
            // 预付 sys/oper/advanceGbToTeacher
            // courseId: 2659
            // gb: 123
            // otgb:
            var url;
            var data;
            if (this.tiaozhengruleform.type === 0) {
                url = baseURL + 'sys/oper/advanceGbToTeacher';
                data = {
                    courseId: this.courseIdtiaozheng,
                    gb: this.tiaozhengruleform.gb,
                }
            } else if (this.tiaozhengruleform.type === 1) {
                url = baseURL + 'sys/oper/handselGbToTeacher';
                data = {
                    courseId: this.courseIdtiaozheng,
                    gb: this.tiaozhengruleform.gb,
                    otgb: '',
                }
            } else if (this.tiaozhengruleform.type === 2) {
                url = baseURL + 'sys/oper/discountTeacIncome';
                data = {
                    courseId: this.courseIdtiaozheng,
                    gb: this.tiaozhengruleform.gb,
                    description: this.tiaozhengruleform.desc,
                }
            }
            var _this = this;
            $.ajax({
                url: url,
                data: data,
                type: 'POST',
                success: function (r) {
                    if (r.status === 200) {
                        vm.$message({
                            type: 'success',
                            message: r.body.msg
                        })
                        vm.tiaozhengDialogClose();
                        vm.getTableData();
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
        // exit() {
        //     vm.evaluate = false;
        // },
        // see_evaluate(row, index) {
        //     vm.evaluate = true;
        //     $.ajax({
        //         type: "get",
        //         dataType: "json",
        //         data: {
        //             "token": token,
        //             "page": 1,
        //             "limit": 10
        //         },
        //         url: "" + baseURL + "sys/oper/getCourseEvaluation?courseId=" + row.id + "",
        //         success: function (json) {
        //             if (json.body == null) {
        //                 vm.evaluates = "";
        //             } else {
        //                 vm.evaluates = json.body;
        //             }

        //         }
        //     });
        // },
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
        imchat(row, index) {
            if (row.groupNo === '') {
                vm.$message({
                    type: 'warning',
                    message: '暂无聊天记录'
                })
            } else {
                window.open("modules/vue/chathistory.html?tid=" + row.groupNo + "&sellerId=" + row.sellerRepresenId +
                    "");
            }
        },
        badordersubmitForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.badmodelbtnstatus = true;
                    vm.badmodelbtnval2 = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            id: vm.badmodelid,
                            description: this.badmodelruleForm.description,
                            exceptionType: this.badmodelruleForm.extype,
                        },
                        url: "" + baseURL + "/sys/seller/order/applyBadOrder",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: '坏单申请成功',
                                    type: 'success'
                                });
                                vm.badmodelbtnstatus = false;
                                vm.badmodelbtnval2 = "确定";
                                vm.badmodel = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.badmodelbtnstatus = false;
                                vm.badmodelbtnval2 = "确定";
                                vm.badmodel = false;
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        badorder(row, idnex) {
            vm.badmodel = true;
            vm.badmodelid = row.id;
        },
        records(row, index) {
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/seller/order/getClassroomConversation",
                dataType: "json",
                data: {
                    "token": token,
                    "classroomId": row.id,
                },
                success: function (r) {
                    vm.history = [];
                    if (r.status == 400) {
                        alert("暂无记录")
                    } else {
                        vm.dialogVisible = true;

                        function timestampToTime(timestamp) {
                            var date = new Date(timestamp);
                            var Y = date.getFullYear() + '-';
                            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) :
                                date.getMonth() + 1) + '-';
                            var D = date.getDate() + ' ';
                            var h = date.getHours() + ':';
                            var m = date.getMinutes() + ':';
                            var s = date.getSeconds();
                            return Y + M + D + h + m + s;
                        }
                        var ess = [];
                        for (i = 0; i < r.body.list.length; i++) {
                            var es = [];
                            var joinTime = timestampToTime(r.body.list[i].joinTime);
                            var leaveTime = timestampToTime(r.body.list[i].leaveTime);
                            var userroleid = r.body.list[i].userroleid;
                            var suerrole = '';
                            if (userroleid == "0") {
                                suerrole = "讲师"
                            } else if (userroleid == "1") {
                                suerrole = "助教"
                            } else if (userroleid == 2) {
                                suerrole = "学员"
                            } else if (userroleid == "3") {
                                suerrole = "直播用户"
                            } else {
                                suerrole = "巡检员"
                            }
                            var m = r.body.list[i].duration;
                            var duration = m / 60;
                            durations = duration.toFixed(2);
                            es.nickname = r.body.list[i].nickname;
                            es.joinTime = joinTime;
                            es.suerrole = suerrole;
                            es.duration = durations;
                            es.leaveTime = leaveTime;
                            ess.push(es);
                        }
                        vm.history = ess;
                        console.log(vm.history)
                    }
                }
            });
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
        blank_out(row, index) {
            vm.$confirm("是否作废该订单?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "" + baseURL + "/sys/seller/order/invalidOrder",
                    data: {
                        "token": token,
                        "courseId": row.id,
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
        timemodelClose() {
            this.PresenterTimeruleForm = {
                time: '',
                description: '',
                type: '0',
            };
            this.timemodel = false;
        },
        salesPresenterTime(row, index) {
            vm.timemodel = true;
            vm.PresenterTimeruleForm.studId = row.id;
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var self = this;
                    vm.timebtnstatus = true;
                    vm.timebtnval = "加载中";
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        headers: {
                            "token": token
                        },
                        data: {
                            "token": token,
                            "courseId": vm.PresenterTimeruleForm.studId,
                            "time": vm.PresenterTimeruleForm.time,
                            "description": vm.PresenterTimeruleForm.description,
                            "type": vm.PresenterTimeruleForm.type,
                        },
                        url: "" + baseURL + "/sys/seller/order/salesPresenterTime",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.timemodel = false;
                                vm.timebtnstatus = false;
                                vm.timebtnval = "确 定";
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.timebtnstatus = false;
                                vm.timebtnval = "确 定";
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                            }
                        }
                    });
                } else {
                    return;
                }
            });
        },
        getTableData: function () {
            var urlinfo = window.location.href;
            if (urlinfo.indexOf('=') >= 0) {
                var userName = urlinfo.split("?")[1].split("=")[1];
                var key = decodeURI(userName);
            }
            if (key !== undefined) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading'
                });
                var self = this;
                var token = localStorage.getItem("token");
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        "token": token,
                        "page": this.val,
                        "limit": 20,
                        "key": key
                    },
                    url: "" + baseURL + "/sys/seller/order/superList",
                    success: function (json) {
                        self.usertype = json.body.userRoleUtilsEntity;
                        self.tableDataEnd = json.body.list;
                        self.total = json.body.totalCount;
                        self.pageSize = json.body.totalCount;
                        self.currentPage = json.body.currPage;
                        loading.close();
                        // debugger;
                    }
                });
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        getUser() {
            $.getJSON(baseURL + "sys/user/info", function (r) {
                vm.user = r.user;
                var roleIdList = r.user.roleIdList;
                roleIdList.forEach(v => {
                    if (v === 11) {
                        vm.btn = true;
                    } else if (v == 13) {
                        vm.btn = false;
                    } else if (v === 6) {
                        vm.btn = false;
                    } else {
                        vm.btn = false;
                    }
                })
            });
        },
        handleCurrentChange(val) {
            console.log(val)
            vm.val = val;
            vm.getTableData();
        },
        openorder(row, index) {
            if (row.spoType == 64) {
                window.open("modules/vue/bigClassOrderInfo.html?id=" + row.id + "");
                // window.open("modules/vue/bigClassroomInfo1.html?id=" + row.id + "");
            } else if (row.typeed == 4) {
                window.open("modules/vue/seller_detail-wy.html?id=" + row.id + "&wyid=" + row.offCourseName + '&iswy=true');
            } else {
                // window.open( "modules/vue/super_seller_detail.html?id="+row.id+"&type="+row.spoType+"");
                window.open("modules/vue/seller_detail.html?id=" + row.id + "&type=" + row.spoType + "");
            }

        },
        changeprice(row, index) {
            this.pricemodel = true;
            this.ruleForm.courseId = row.id;
        },
        submitForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.submitUpload();
                    vm.btnstatus = true;
                    vm.btnval = "加载中";
                }
            });
        },
        change_delivery(val) {
            if (val === true) {
                vm.showprepayment = true;
            } else {
                vm.showprepayment = false;
            }
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        success(response, file, fileList) {
            if (response.status == 200) {
                vm.$message({
                    message: '上传文件成功',
                    type: 'success'
                });
                vm.btnval = "确定";
                vm.btnstatus = false;
                vm.pricemodel = false;
                vm.fileList = [];
                vm.ruleForm.prepayment = "";
                vm.ruleForm.totalPrice = "";
                vm.delivery = false;
                vm.showprepayment = false;
                vm.getTableData();
            }
            if (response.status == 400) {
                vm.$message({
                    message: response.body.msg,
                    type: 'warning'
                });
                vm.btnval2 = "确定";
                vm.btnstatus = false;
            }
        },
        onerror(response, file, fileList) {
            vm.$message({
                message: response.body.msg,
                type: 'warning'
            });
        },
        change(file, fileList) {
            vm.imglength = fileList.length;
        },
        handleRemove(file, fileList) {
            vm.imglength = fileList.length;
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
                        "courseId": row.id,
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
                        "courseId": row.id,
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
        handlePreview(file) {},
        closeTeacDialog() {
            vm.selects = vm.selectsCopy;
        },
        getOperTeacList: function () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 1000,
                    "tudStatused": 10,
                },
                url: "" + baseURL + "sys/oper/teacList",
                success: function (json) {
                    vm.selects = json.body.list;
                    vm.selectsCopy = vm.selects;
                }
            });
        },
        give(row, _index) {
            if (row.spoType == 0 || row.spoType == 1) {
                vm.gg = false;
            } else if (row.spoType == 64) {
                vm.gg = false;
            } else {
                vm.gg = true;
                vm.giveruleForm.price = row.teacFixedPrice;
            }

            vm.givecourid = row.id;
            this.dialogFormVisible1 = true;

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
                            teacId: this.giveruleForm.country,
                            courseId: vm.givecourid,
                            price: this.giveruleForm.price,
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

        sure_end(row, index) {
            vm.teacherInformation.tuGrade = row.tuGrade;
            vm.teacherInformation.teacUserName = row.teacUserName;
            vm.jiekeruleForm.doSomething = "";
            vm.sub3 = false;
            vm.sub4 = false;
            vm.sub5 = false;
            vm.spoType = row.spoType;
            vm.teacType = row.teacType;
            if (row.spoType == 2 || row.spoType == 4 || row.spoType == 32) {
                vm.jiekeruleForm.gb1 = row.teacFixedPrice;
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
                    vm.jiekeruleForm.gb1 = 0;
                    vm.jiekeruleForm.otgb1 = 0;
                } else {
                    vm.sub3 = false;
                    vm.sub5 = false;
                    vm.jiekeruleForm.gb1 = 0;
                    vm.jiekeruleForm.otgb1 = 0;
                }
            }
            vm.jiekeids = row.id;
            vm.dialogFormVisible3 = true;
        },

        sure_endhandleChange(val) {
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
                            doSomething: Number(this.jiekeruleForm.doSomething),
                            courseId: vm.jiekeids,
                            description: this.jiekeruleForm.description,
                            gb: this.jiekeruleForm.gb1,
                            otgb: this.jiekeruleForm.otgb1,
                            sendGb: this.jiekeruleForm.sendGb,
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
                                vm.jiekeruleForm.doSomething = '',
                                    vm.jiekeruleForm.sendGb = '',
                                    vm.jiekeruleForm.description = '',
                                    vm.jiekeruleForm.gb1 = '',
                                    vm.jiekeruleForm.otgb1 = '',
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





        opershigumodelClose: function () {
            vm.operupdataFiles = false;
            vm.operuploader.destroy();
            vm.opershigumodel = false;
            vm.operuploadFilesLength = [];
            vm.operruleForm.descriptions = '';
            vm.operruleForm.shigutype = '';
            vm.operuploadFilesArray = [];
        },
        opershigumodelSubmit: function () {
            var _this = this;
            if (vm.operruleForm.descriptions === null || vm.operruleForm.descriptions === undefined || vm.operruleForm.descriptions === '') {
                vm.$message({
                    type: 'warning',
                    message: '请选择事故类别'
                })
                return
            }
            if (vm.operruleForm.shigutype === null || vm.operruleForm.shigutype === undefined || vm.operruleForm.shigutype === '') {
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
                    courseId: vm.operid,
                    description: vm.operruleForm.descriptions,
                    type: vm.operruleForm.shigutype,
                    ossUrls: vm.operuploadFilesArray
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
        apply_Oper(row, index) {
            vm.operid = row.id;
            // vm.shigumodel = true;
            vm.opershigumodel = true;
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

                        vm.operuploader = new plupload.Uploader({
                            runtimes: 'html5,flash,silverlight,html4',
                            browse_button: 'selectfiles2',
                            flash_swf_url: 'js/Moxie.swf',
                            silverlight_xap_url: 'js/Moxie.xap',
                            url: 'http://oss.aliyuncs.com',
                            init: {
                                PostInit: function () {
                                    document.getElementById('ossfile2').innerHTML = '';
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
                                        document.getElementById('ossfile2').innerHTML += '<div id="' + file.id +
                                            '" style="padding: 10px 0;">' + file.name + ' (' + plupload.formatSize(file
                                                .size).split(' ')[0] + plupload.formatSize(file.size).split(' ')[1]
                                            .toUpperCase() + ')<b></b>' +
                                            '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>';
                                    });
                                    vm.shigumodelLoading = true;
                                    set_upload_param(vm.operuploader, '', false);

                                },

                                BeforeUpload: function (up, file) {
                                    set_upload_param(up, file.name, true);
                                },

                                UploadProgress: function (up, file) {
                                    vm.operupdataFiles = true;
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

                                        vm.operuploadFilesArray.push(host + '/' + g_dirname + uploadFileName);
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
                                    vm.operupdataFiles = false;
                                    vm.operuploader = destroy();
                                    vm.opershigumodel = false;
                                    vm.operuploadFilesLength = [];
                                }
                            }
                        });
                        vm.operuploader.init();
                    }

                },
                error: function (er) {}
            })
        },



        shigumodelClose: function () {
            vm.updataFiles = false;
            vm.uploader.destroy();
            vm.shigumodel = false;
            vm.uploadFilesLength = [];
            vm.shigumodelruleForm.descriptions = '';
            vm.shigumodelruleForm.shigutype = '';
            vm.uploadFilesArray = [];
        },
        shigumodelSubmit: function () {
            var _this = this;
            if (vm.shigumodelruleForm.descriptions === null || vm.shigumodelruleForm.descriptions === undefined || vm.shigumodelruleForm.descriptions === '') {
                vm.$message({
                    type: 'warning',
                    message: '请选择事故类别'
                })
                return
            }
            if (vm.shigumodelruleForm.shigutype === null || vm.shigumodelruleForm.shigutype === undefined || vm.shigumodelruleForm.shigutype === '') {
                vm.$message({
                    type: 'warning',
                    message: '请选择事故类别'
                })
                return
            }
            $.ajax({
                url: baseURL + "sys/seller/order/applyAccidentOrder",
                type: 'post',
                dataType: 'json',
                headers: {
                    token: token,
                },
                contentType: 'application/json',
                data: JSON.stringify({
                    courseId: vm.apply_SellercourseId,
                    description: vm.shigumodelruleForm.descriptions,
                    type: vm.shigumodelruleForm.shigutype,
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
        apply_Seller(row, index) {
            console.log(row.id)
            vm.apply_SellercourseId = row.id;
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
                            browse_button: 'selectfiles1',
                            flash_swf_url: 'js/Moxie.swf',
                            silverlight_xap_url: 'js/Moxie.xap',
                            url: 'http://oss.aliyuncs.com',
                            init: {
                                PostInit: function () {
                                    document.getElementById('ossfile1').innerHTML = '';
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
                                        document.getElementById('ossfile1').innerHTML += '<div id="' + file.id +
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
    }
});