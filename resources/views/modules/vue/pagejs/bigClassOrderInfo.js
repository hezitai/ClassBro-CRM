var vm = new Vue({
    el: '#app',
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            showExamTimeDialog: false,
            changeEndCourseTimeData: '',
            changeExamTimeData: '',
            showChangeExamTime: false,
            studTermCardHour: '',
            studCardBag: true,
            b1: false,
            b2: "确 定",
            rviews: [],
            rviewsmodel: false,
            ffs: false,
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "/sys/seller/courseware/save",
            data: {
                cdId: "",
                groupId: ""
            },
            btnstatus: false,
            history: '',
            dialogVisible: false,
            checked: false,
            courses: '',
            urls: [],
            id: '',
            checks: '',
            classroomdata: [],
            bigclassroomdata: [],
            studCoursewareList: [],
            filelist: [],
            quanjubizhong: '',
            ruleForm: {
                course: '',
                sysSeller: '',
                universityName: '',
                parentCountryName: '',
                decimalScheduledTime: '',
                explained: '',
            },
            ruleForm1: {
                username: '',
                nickname: '',
                sellerDemandDesc: '',
                hourlyWage: '',
                allSchooltime: '',
                persenterTime: '',
                reaMonetary: '',
                arrearageMoney: '',
            },
            ruleForm2: {
                courseCode: '',
                courseName: '',
                type: '',
            },
            selectedIDs: '',
            // 添加课程流水
            addCourseLogDialog: false,
            addCourseDesc: '',
            // 
        }
    },
    mounted() {
        this.getclassroomdata();
        this.coursedata();
    },
    methods: {
        cancel: function (row, index) {
            vm.$confirm('是否确认取消报名？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                var _this = this;
                console.log(row)
                $.ajax({
                    url: baseURL + 'sys/seller/classcourse/cancelClass',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify({
                        courseId: vm.id,
                        classroomId: row.id,
                    }),
                    headers: {
                        token: token
                    },
                    success: function (r) {
                        console.log(r);
                        if (r.status == 200) {
                            vm.$message({
                                type: 'success',
                                message: '取消报名成功'
                            });
                        } else {
                            vm.$message({
                                type: 'warning',
                                message: r.body.msg
                            });
                        }
                    },
                    error: function (er) {

                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '已取消'
                });
            });

        },
        cancelBatch: function () {
            if (vm.selectedIDs == "") {
                vm.$message({
                    message: '至少选择一条课堂',
                    type: 'warning'
                })
                return
            } else {
                vm.$confirm('是否确认取消报名？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    var _this = this;
                    var arr = [];
                    arr = this.idss;
                    $.ajax({
                        url: baseURL + 'sys/seller/classcourse/cancelClassBatch',
                        contentType: 'application/json',
                        type: 'POST',
                        data: JSON.stringify({
                            courseId: vm.id,
                            classroomIds: arr,
                        }),
                        headers: {
                            token: token
                        },
                        success: function (r) {
                            if (r.status == 200) {
                                vm.$message({
                                    type: 'success',
                                    message: '取消报名成功'
                                });
                            } else {
                                vm.$message({
                                    type: 'warning',
                                    message: r.body.msg
                                });
                            }
                        },
                        error: function (er) {

                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消'
                    });
                });

            }
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
        },
        quxiao() {

        },
        changeExamTime: function () {
            this.showExamTimeDialog = true;
            this.changeEndCourseTimeData = '';
            // this.changeExamTimeData = '';
            // this.changeEndCourseTimeData = this.getCourseData.endCourseTime;
            // this.changeExamTimeData = this.getCourseData.examTime;
        },
        showExamTimeSubmit: function () {
            var _this = this;
            // console.log(this.changeEndCourseTimeData,this.changeExamTimeData);
            $.ajax({
                url: baseURL + 'sys/oper/updateOrderDealAndOfficial',
                type: 'POST',
                headers: {
                    token: token,
                },
                data: {
                    courseId: this.id,
                    examTime: this.changeEndCourseTimeData,
                    endCourseTime: this.changeEndCourseTimeData
                },
                success: function (r) {
                    console.log(r);
                    if (r.status == 200) {
                        vm.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        // location.reload();
                        _this.getclassroomdata();
                        _this.showExamTimeDialog = false;
                        _this.changeEndCourseTimeData = _this.ruleForm.endCourseTime;
                        // _this.changeExamTimeData = this.getCourseData.examTime;
                    } else {
                        vm.$message({
                            message: r.body.msg,
                            type: 'warning'
                        });
                    }
                },
                error: function (er) {

                }
            })
        },
        // 添加课程流水
        addCourseLogs: function () {
            this.addCourseLogDialog = true;
            console.log(this.getCourseObjData);
        },
        // 添加课程流水 关闭事件
        addCourseLogDialogBeforeClose: function () {
            this.addCourseLogDialog = false;
            this.addCourseDesc = '';
        },
        // 添加课程流水 submit事件
        submitAddCourseLog: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/seller/order/addOrderDescLog',
                type: 'POST',
                headers: {
                    token: token,
                },
                data: {
                    desc: this.addCourseDesc,
                    courseId: this.id,
                },
                success: function (r) {
                    if (r.status == 200) {
                        vm.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        setInterval(function () {
                            window.location.reload();
                        }, 1500)
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: '添加失败'
                        });
                    }
                },
                error: function (er) {

                }
            })
        },
        handlePreview(file) {
            console.log(file);
        },
        rview(row, index) {
            console.log(row.cdId)
            $.ajax({
                type: "get",
                url: "" + baseURL + "/sys/seller/order/getAudio?classroomId=" + row.id + "",
                dataType: "json",
                data: {
                    "token": token
                },
                success: function (json) {
                    if (json.status == 200) {
                        if (json.body != "") {
                            var rviews = [];
                            json.body.forEach(element => {
                                var obj = {};
                                obj.https_playpath = element.https_playpath;
                                obj.duration = ((element.duration) / 60000).toFixed(
                                    "2") + " 分钟";
                                obj.size = ((element.size) / 1024 / 1024).toFixed("2") +
                                    " M";
                                rviews.push(obj);
                            })
                            vm.rviews = rviews;
                            vm.rviewsmodel = true;
                        }
                    }
                }
            });
        },
        copy(parameter) {
            const text = parameter.https_playpath;
            const input = document.getElementById("input");
            input.value = text;
            input.select()
            document.execCommand("copy");
        },
        revise(row, index) {
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
        success(response, file, fileList) {
            if (response.status == 200) {
                vm.$message({
                    message: '上传文件成功',
                    type: 'success'
                });
                vm.fileList = [];
                location.reload();
            }
            if (response.status == 400) {
                vm.$message({
                    message: response.body.msg,
                    type: 'warning'
                });
                vm.fileList = [];
            }
        },
        onerror(response, file, fileList) {
            vm.$message({
                message: response.body.msg,
                type: 'warning'
            });
        },
        change(file, fileList) {
            vm.fileList = fileList
            console.log(vm.fileList)
            if (fileList.length == 1) {

            }
        },
        handleRemove(file, fileList) {
            vm.fileList = fileList
            console.log(vm.fileList)
        },
        uploadFile(file) {
            this.formDate = new FormData();
            for (i = 0; i < vm.fileList.length; i++) {
                this.formDate.append('file' + i, vm.fileList[i].raw);
            }
        },
        submitUpload() {
            vm.b1 = true
            vm.b2 = "加载中"
            this.formDate = new FormData();
            this.$refs.upload.submit();
            this.formDate.append('cdId', vm.id);
            this.formDate.append('groupId', vm.ruleForm.course);
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
                    location.reload();
                }
                if (res.data.status == 400) {
                    vm.$message({
                        message: res.data.body.msg,
                        type: 'warning'
                    });
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
        check(val) {
            vm.checks = val
            if (val == true) {
                $(".checkbox").prop("checked", true);
            } else {
                $(".checkbox").prop("checked", false);
            }
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
                    if (r.status == 200) {
                        var lists = [];
                        r.body.list.forEach(function (element) {
                            var list = {};
                            list.groupName = element.groupName;
                            list.name = element.groupName.split(" ")[0];
                            list.id = element.id;
                            lists.push(list);
                        })
                        vm.courses = lists;
                    }
                }
            });
        },
        change_course(courseid) {
            vm.data.groupId = courseid;
        },
        downfile() {
            $(".el-progress-bar__inner").css("width", "0%");
            var arr = [];
            var checkedCount = 0;
            for (var i = 0; i < $("#ul li input").length; i++) {
                var Uarry = $("#ul li input");
                var Tresult = Uarry.eq(i).attr("data-name");
                var checkbox = document.getElementsByName("tie_in[]");
                if (checkbox[i].checked) {
                    checkedCount++;
                    arr.push(Tresult);
                }
            }
            var arrjoin = arr.join(";");
            if (arrjoin == '') {
                return
            }
            vm.btnstatus = true;
            vm.$message({
                message: '文件正在服务器打包,请耐心等待,不要刷新页面',
                type: 'success'
            });
            $.ajax({
                type: "GET",
                dataType: "json",
                headers: {
                    "token": token
                },
                data: {
                    fileStr: arrjoin
                },
                url: "" + baseURL + "/resource/getZipFile",
                beforeSend: function (json) {
                    $(".el-progress-bar__inner").animate({
                        width: "60%"
                    });
                },
                success: function (json) {
                    if (json.status == 200) {
                        vm.btnstatus = false;
                        $(".el-progress-bar__inner").animate({
                            width: "100%"
                        });
                        vm.percentagestatus = 'success'
                        window.open(json.body.filePath);
                    }
                    if (json.status == 400) {
                        vm.btnstatus = false;
                        vm.$message({
                            message: json.body.msg,
                            type: 'warning'
                        });
                        $(".el-progress-bar__inner").animate({
                            width: "90%"
                        });
                        vm.percentagestatus = 'exception'
                    }
                    if (json.status == 500) {
                        vm.$message({
                            message: '下载失败',
                            type: 'warning'
                        });
                        $(".el-progress-bar__inner").animate({
                            width: "75%"
                        });
                        vm.percentagestatus = 'exception'
                    }
                }
            });
        },
        del(row, index) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    headers: {
                        "token": token
                    },
                    data: JSON.stringify([row.id]),
                    url: "" + baseURL + "sys/seller/courseware/delete",
                    success: function (json) {
                        vm.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        vm.getclassroomdata();
                    }
                });
            }).catch(() => {});
        },
        getclassroomdata: function () {
            var _this = this;
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            this.id = id
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 6,
                    "exceptionType": ""
                },
                url: "" + baseURL + "sys/seller/classcourse/getCourseObject?id=" + id + "",
                success: function (json) {
                    if (json.body.studUser != null) {
                        if (json.body.studUser.studCardBag != null) {
                            vm.studCardBag = true
                            vm.studTermCardHour = json.body.studPurchaseOrder
                                .studTermCardHour
                        } else {
                            vm.studCardBag = false
                        }
                    } else {
                        vm.studCardBag = false
                    }
                    vm.ruleForm.explained = json.body.studPurchaseOrder.description
                    vm.ruleForm.decimalScheduledTime = Number(json.body.scheduledTime) / 100
                    vm.ruleForm.universityName = json.body.parentUniversityName;
                    vm.ruleForm2.parentCountryName = json.body.parentCountryName;
                    vm.bigclassroomdata = json.body.classroomList;
                    vm.showChangeExamTime = json.body.userRoleUtilsEntity.hasOper;
                    if (json.body.classroomList.length == 0) {
                        _this.quanjubizhong = '';
                    } else {
                        _this.quanjubizhong = json.body.classroomList[0].currency;
                    }

                    vm.classroomdata = json.body.classroomList;
                    vm.studCoursewareList = json.body.studCoursewareList;
                    vm.studdate = json.body.studUser;
                    vm.filelist = json.body.studCoursewareList;
                    vm.ruleForm1.orderNo = json.body.orderNo;
                    vm.ruleForm1.remark = json.body.remark;
                    if (json.body.studPurchaseOrder.scheduledTime == null) {
                        vm.ruleForm1.scheduledTime = 0;
                    } else {
                        vm.ruleForm1.scheduledTime = json.body.studPurchaseOrder
                            .scheduledTime;
                    }
                    if (json.body.allSchooltime == null) {
                        vm.ruleForm1.allSchooltime = 0;
                    } else {
                        vm.ruleForm1.allSchooltime = json.body.allSchooltime;
                    }
                    if (json.body.studPurchaseOrder.persenterTime == null) {
                        vm.ruleForm1.persenterTime = 0;
                    } else {
                        vm.ruleForm1.persenterTime = json.body.studPurchaseOrder
                            .persenterTime;
                    }
                    vm.ruleForm1.arrearageMoney = json.body.studPurchaseOrder
                        .arrearageMoney + " " + json.body.studPurchaseOrder.currency;
                    vm.ruleForm1.reaMonetary = json.body.studPurchaseOrder.prepayment - json
                        .body.studPurchaseOrder.reaMonetary + " " + json.body
                        .studPurchaseOrder.currency;
                    vm.ruleForm1.totalPrice = json.body.studPurchaseOrder.totalPrice + " " +
                        json.body.studPurchaseOrder.currency;
                    vm.ruleForm1.prepayment = json.body.studPurchaseOrder.prepayment + " " +
                        json.body.studPurchaseOrder.currency;
                    vm.ruleForm1.prices1 = Number(json.body.teacG) + Number(json.body
                        .teacPreG);
                    vm.ruleForm1.prices2 = Number(json.body.teacOtg) + Number(json.body
                        .teacPreOtg);
                    vm.ruleForm1.hourlyWage = json.body.hourlyWage;
                    vm.ruleForm1.sellerDemandDesc = json.body.studPurchaseOrder
                        .sellerDemandDesc;
                    vm.ruleForm2.spareTime = json.body.studPurchaseOrder.spareTime;
                    if (vm.ruleForm2.spareTime != null) {
                        var spareTime = json.body.studPurchaseOrder.spareTime.split("|");
                        var one = spareTime[0];
                        var ones = one.split(",");
                        vm.ruleForm2.am1 = ones[0];
                        vm.ruleForm2.bm1 = ones[1];
                        vm.ruleForm2.pm1 = ones[2];
                        var two = spareTime[1];
                        var twos = two.split(",");
                        vm.ruleForm2.am2 = twos[0];
                        vm.ruleForm2.bm2 = twos[1];
                        vm.ruleForm2.pm2 = twos[2];
                        var three = spareTime[2];
                        var threes = three.split(",");
                        vm.ruleForm2.am3 = threes[0];
                        vm.ruleForm2.bm3 = threes[1];
                        vm.ruleForm2.pm3 = threes[2];
                        var four = spareTime[3];
                        var fours = four.split(",");
                        vm.ruleForm2.am4 = fours[0];
                        vm.ruleForm2.bm4 = fours[1];
                        vm.ruleForm2.pm4 = fours[2];
                        var five = spareTime[4];
                        var fives = five.split(",");
                        vm.ruleForm2.am5 = fives[0];
                        vm.ruleForm2.bm5 = fives[1];
                        vm.ruleForm2.pm5 = fives[2];
                        var six = spareTime[5];
                        var sixs = six.split(",");
                        vm.ruleForm2.am6 = sixs[0];
                        vm.ruleForm2.bm6 = sixs[1];
                        vm.ruleForm2.pm6 = sixs[2];
                        var seven = spareTime[6];
                        var sevens = seven.split(",");
                        vm.ruleForm2.am7 = sevens[0];
                        vm.ruleForm2.bm7 = sevens[1];
                        vm.ruleForm2.pm7 = sevens[2];
                    }
                    if (json.body.statused == 1) {
                        vm.ruleForm1.statused = "未处理（无任何销售接单）"
                    }
                    if (json.body.statused == 2) {
                        vm.ruleForm1.statused = "待审核"
                    }
                    if (json.body.statused == 4) {
                        vm.ruleForm1.statused = "待确定"
                    }
                    if (json.body.statused == 8) {
                        vm.ruleForm1.statused = "待规划（等待教师/运营接单）"
                    }
                    if (json.body.statused == 16) {
                        vm.ruleForm1.statused = "规划中(订单第一次超时等待运营接单)"
                    }
                    if (json.body.statused == 32) {
                        vm.ruleForm1.statused = "规划中(订单第二次超时等待运营主管强制指派)"
                    }
                    if (json.body.statused == 64) {
                        vm.ruleForm1.statused = "规划中(运营接单待指派，正在处理)"
                    }
                    if (json.body.statused == 128) {
                        vm.ruleForm1.statused = "待排课"
                    }
                    if (json.body.statused == 256) {
                        vm.ruleForm1.statused = "已排课"
                    }
                    if (json.body.statused == 512) {
                        vm.ruleForm1.statused = "申请结课中"
                    }
                    if (json.body.statused == 1024) {
                        vm.ruleForm1.statused = "已结课"
                    }
                    if (json.body.statused == 2048) {
                        vm.ruleForm1.statused = "已强制结课"
                    }
                    if (json.body.statused == 4096) {
                        vm.ruleForm1.statused = "已取消"
                    }
                    if (json.body.statused == 8192) {
                        vm.ruleForm1.statused = "坏单申请中"
                    }
                    if (json.body.statused == 16384) {
                        vm.ruleForm1.statused = "订单作废"
                    }
                    if (json.body.statused == 32768) {
                        vm.ruleForm1.statused = "销售被更换"
                    }
                    if (json.body.parentId != null) {
                        vm.ruleForm.sysSeller = json.body.parentSysSeller.username;
                        vm.ruleForm1.nickname = json.body.sysUserEntity.username;
                        vm.ffs = false;
                    } else {
                        vm.ruleForm.sysSeller = json.body.username;
                        vm.ffs = true;
                    }
                    vm.ruleForm1.username = json.body.sysSeller.username;
                    //  vm.ruleForm1.nickname = json.body.sysUserEntity.username;
                    vm.ruleForm1.nickname1 = json.body.teacUserName;
                    vm.ruleForm1.teacFixedPrice = json.body.teacFixedPrice;

                    vm.ruleForm2.courseName = json.body.studPurchaseOrder.courseName;
                    vm.ruleForm2.courseCode = json.body.studPurchaseOrder.courseCode;
                    if (json.body.studPurchaseOrder.type == 0) {
                        vm.ruleForm2.type = "定制辅导"
                    }
                    if (json.body.studPurchaseOrder.type == 1) {
                        vm.ruleForm2.type = "考前突击"
                    }
                    if (json.body.studPurchaseOrder.type == 2) {
                        vm.ruleForm2.type = "包课辅导"
                    }
                    if (json.body.studPurchaseOrder.type == 4) {
                        vm.ruleForm2.type = "论文辅导"
                    }
                    if (json.body.studPurchaseOrder.type == 32) {
                        vm.ruleForm2.type = "特殊订单"
                    }
                    vm.ruleForm.nickname = json.body.callName;
                    vm.ruleForm.schoolName = json.body.universityName;
                    //  vm.ruleForm.temCourseName = json.body.sysProfessionalCourses.chineseName;
                    //  vm.ruleForm.levelName = json.body.studUser.eduName;
                    vm.ruleForm.schoolYear = json.body.studPurchaseOrder.schoolYear;
                    if (json.body.studPurchaseOrder.endCourseTime === null) {

                    } else {
                        // vm.ruleForm.endCourseTime = json.body.studPurchaseOrder
                        //     .endCourseTime.substring(0, 10);
                        vm.ruleForm.endCourseTime = json.body.studPurchaseOrder.endCourseTime.split(':')[0] + ":" + json.body.studPurchaseOrder.endCourseTime.split(':')[1];
                    }
                    if (json.body.studPurchaseOrder.examTime === null) {

                    } else {
                        vm.ruleForm.examTime = json.body.studPurchaseOrder.examTime
                            .substring(0, 10);
                    }
                    vm.ruleForm.schoolAccount = json.body.studPurchaseOrder.schoolAccount;
                    vm.ruleForm.schoolPws = json.body.studPurchaseOrder.schoolPws;
                    loading.close();
                    var studCoursewareList = json.body.studCoursewareList;
                    var groupName = studCoursewareList.groupName;
                    var courseLogs = json.body.courseLogs;
                    courseLogs.map(item => {
                        var loghtml =
                            "<li class='clears'><i style='margin-right:10px;'>" +
                            item.createAt + "</i><i>" + item.description +
                            "</i></li>";
                        $("#logs").append(loghtml)
                    })
                    $.each(vm.courses, function (value1, key1) {
                        var arr0 = [];
                        studCoursewareList.map(function (value, key) {
                            if (value.groupName == value1.groupName) {
                                for (i = 0; i < 1; i++) {
                                    var array0 = {};
                                    array0.name = value.name;
                                    array0.createAt = value.createAt;
                                    array0.url = value.url;
                                    array0.id = value.id;
                                    arr0.push(array0);
                                }
                            }
                        });
                        arr0.map(item => {
                            var html = "<li data-id='" + item.id +
                                "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                                item.url + "'/><a class='view' href='" +
                                url + item.url +
                                "'>" + item.name + "</a>" + item.createAt +
                                "<button class='button'>删除</button></li>";
                            $("." + value1.name + "").append(html)
                        })
                    });

                    // var arr1 = [];
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[1].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array1 = {};
                    //             array1.name = value.name;
                    //             array1.createAt = value.createAt;
                    //             array1.url = value.url;
                    //             array1.id = value.id;
                    //             arr1.push(array1);
                    //         }
                    //     }
                    // });
                    // arr1.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' href='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[1].name + "").append(html)
                    // })
                    // var arr2 = [];
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[2].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array2 = {};
                    //             array2.name = value.name;
                    //             array2.createAt = value.createAt;
                    //             array2.url = value.url;
                    //             array2.id = value.id;
                    //             arr2.push(array2);
                    //         }
                    //     }
                    // });
                    // arr2.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' href='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[2].name + "").append(html)
                    // })
                    // var arr3 = [];
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[3].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array3 = {};
                    //             array3.name = value.name;
                    //             array3.createAt = value.createAt;
                    //             array3.url = value.url;
                    //             array3.id = value.id;
                    //             arr3.push(array3);
                    //         }
                    //     }
                    // });
                    // arr3.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' href='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[3].name + "").append(html)
                    // })
                    // var arr4 = [];
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[4].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array4 = {};
                    //             array4.name = value.name;
                    //             array4.createAt = value.createAt;
                    //             array4.url = value.url;
                    //             array4.id = value.id;
                    //             arr4.push(array4);
                    //         }
                    //     }
                    // });
                    // arr4.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' href='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[4].name + "").append(html)
                    // })

                    // var arr5 = [];
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[5].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array5 = {};
                    //             array5.name = value.name;
                    //             array5.createAt = value.createAt;
                    //             array5.url = value.url;
                    //             array5.id = value.id;
                    //             arr5.push(array5);
                    //         }
                    //     }
                    // });
                    // arr5.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' href='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[5].name + "").append(html)
                    // })
                    // var arr6 = [];
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[6].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array6 = {};
                    //             array6.name = value.name;
                    //             array6.createAt = value.createAt;
                    //             array6.url = value.url;
                    //             array6.id = value.id;
                    //             arr6.push(array6);
                    //         }
                    //     }
                    // });
                    // arr6.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' href='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[6].name + "").append(html)
                    // })
                    // var arr7 = [];
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[7].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array7 = {};
                    //             array7.name = value.name;
                    //             array7.createAt = value.createAt;
                    //             array7.url = value.url;
                    //             array7.id = value.id;
                    //             arr7.push(array7);
                    //         }
                    //     }
                    // });
                    // arr7.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[7].name + "").append(html)
                    // })
                    // var arr8 = [];
                    // var groupName = vm.courses[8].groupName;
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[8].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array8 = {};
                    //             array8.name = value.name;
                    //             array8.createAt = value.createAt;
                    //             array8.url = value.url;
                    //             array8.id = value.id;
                    //             arr8.push(array8);
                    //         }
                    //     }
                    // });
                    // arr8.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[8].name + "").append(html)
                    // })
                    // var arr9 = [];
                    // var groupName = vm.courses[9].groupName;
                    // studCoursewareList.map(function (value, key) {
                    //     if (value.groupName == vm.courses[9].groupName) {
                    //         for (i = 0; i < 1; i++) {
                    //             var array9 = {};
                    //             array9.name = value.name;
                    //             array9.createAt = value.createAt;
                    //             array9.url = value.url;
                    //             array9.id = value.id;
                    //             arr9.push(array9);
                    //         }
                    //     }
                    // });
                    // arr9.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[9].name + "").append(html)
                    // })
                    $(".button").click(function () {
                        var id = $(this).parent("li").attr("data-id");
                        vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            $.ajax({
                                type: "POST",
                                contentType: "application/json",
                                headers: {
                                    "token": token
                                },
                                data: JSON.stringify([id]),
                                url: "" + baseURL +
                                    "sys/seller/courseware/delete",
                                success: function (json) {
                                    vm.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    location.reload();
                                }
                            });
                        }).catch(() => {});
                    });
                    $(".view").click(function () {
                        var name = $(this).attr("data-name");
                        window.open(name);
                    });
                }
            });
        },
    }
});