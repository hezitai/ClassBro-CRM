var vm = new Vue({
    el: '#app',
    data() {
        return {
            percentage: 0,
            percentagestatus: "exception",
            rviews: [],
            rviewsmodel: false,
            changebtn: false,
            shigumodel: false,
            shigumodels: false,
            btnstatus: false,
            btnval: "确 定",
            filebtn: true,
            btnshow: true,
            personid: '',
            currentPage: 0,
            pageSize: 0,
            total: 0,
            limit: 0,
            personpage: 1,
            personlimit: 5,
            persondata: [],
            personmodel: false,
            aboutOrder: false,
            radshow: false,
            fileList1: [],
            myHeaders1: {
                token: token
            },
            url1: "" + baseURL + "sys/seller/order/evidenceThumbSave",
            data1: {
                amount: '',
                current: '',
                studId: '',
            },
            selectedIDs: '',
            b1: false,
            b2: "确 定",
            s1: true,
            s2: true,
            red: '',
            radio: '1',
            badMoney: '',
            isFromOrder: true,
            mm1: false,
            mm: false,
            studCourses: [],
            fileList: [],
            myHeaders: {
                token: token
            },
            url: "" + baseURL + "/sys/seller/courseware/save",
            data: {
                cdId: "",
                groupId: ""
            },
            checks: '',
            btnstatus: false,
            dialogVisible: false,
            checked: false,
            courses: '',
            history: '',
            urls: [],
            id: '',
            classroomdata: [],
            extSysPaymentdata: [],
            studCoursewareList: [],
            filelist: [],
            ruleForm: {
                preferential: '',
                teacNickName: '',
                materialCost: '',
                course: '',
                parentTotalPrice: '',
                Integer: '',
                parentLastPrepayment: '',
                temCourseName: '',
                universityName: '',
                statused: '',
                studUser: '',
                countryName: '',
            },
            ruleForm1: {
                username: '',
                nickname: '',
                sellerDemandDesc: '',
                persenterTime: '',
                allSchooltime: '',
                reaMonetary: '',
                current: '',
                amount1: '',
                amount: '',
                studname: '',
                studId: '',
                decimalScheduledTime: '',
                explained: '',

            },
            ruleForm2: {
                courseCode: '',
                courseName: '',
                type: '',
                current: '',
                amount: '',
                studId: '',
                id: '',
                amount1: '',
                courseId: '',
            },
            rules1: {},
            rules: {
                descriptions: [{
                    required: true,
                    message: '请输入理由',
                    trigger: 'blue'
                }],
                descriptionss: [{
                    required: true,
                    message: '请输入理由',
                    trigger: 'blue'
                }],
            },
            // 添加课程流水
            addCourseLogDialog: false,
            addCourseDesc: '',
            // 
        }
    },
    mounted() {
        this.getclassroomdata();
        this.coursedata();
        this.getInfo();
    },
    methods: {
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
            let ids = [];
            this.multipleSelection.map((item) => {
                var id = item.classroomId;
                ids.push("" + id + "");
            });
            this.selectedIDs = ids;
            console.log('多选', ids);
            this.idss = this.selectedIDs;
        },
        handlePreview(file) {
            console.log(file);
        },
        creatOrder() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            window.location.href = "creatClassroomOrder.html?id=" + id + "";
        },
        getInfo() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var model = getUrlStr("model");
            var end = getUrlStr("end");
            $.ajax({
                type: "get",
                url: "" + baseURL + "sys/user/info",
                dataType: "json",
                data: {
                    "token": token,
                },
                success: function (r) {
                    var roleIdList = r.user.roleIdList;
                    roleIdList.forEach(v => {
                        if (v === 7 || v === 8) {
                            vm.btnshow = false;
                        }
                        if (model == "true") {
                            vm.btnshow = false;
                        }
                        if (end == "true") {
                            vm.btnshow = false;
                            vm.filebtn = false;
                        }
                        if (v === 5 || v === 6) {
                            vm.filebtn = false;
                        }
                    })
                }
            });
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
                    if (json.status == 500) {
                        alert(json.body.msg)
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
        success(response, file, fileList) {
            if (response.status == 200) {
                vm.$message({
                    message: '上传文件成功',
                    type: 'success'
                });
                vm.fileList = [];
                $("#ss").empty();
                vm.getclassroomdata();
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
        change_lession(row, index) {
            window.location.href = "editClassroomOrder.html?id=" + row.courseId + "";
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
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            this.id = id
            var teacherId = getUrlStr("teacherId");
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
                    "isBig": true,
                },
                url: "" + baseURL + "sys/seller/classcourse/getCourseObject?id=" + id + "",
                success: function (json) {
                    if (json.status == 400) {
                        alert(json.body.msg)
                        return
                    }
                    if (teacherId == 'null') {
                        vm.changebtn = true;
                    } else {
                        vm.changebtn = false;
                    }
                    var courseLogs = json.body.courseLogs;
                    courseLogs.map(item => {
                        var loghtml =
                            "<li class='clears'><i style='margin-right:10px;'>" +
                            item.createAt + "</i><i>" + item.description +
                            "</i></li>";
                        $("#logs").append(loghtml)
                    })
                    if (json.body.studPurchaseOrder.endCourseTime === null) {

                    } else {
                        vm.ruleForm.endCourseTime = json.body.studPurchaseOrder
                            .endCourseTime.substring(0, 10);
                    }
                    if (json.body.studPurchaseOrder.examTime === null) {

                    } else {
                        vm.ruleForm.examTime = json.body.studPurchaseOrder.examTime
                            .substring(0, 10);
                    }
                    vm.ruleForm.explained = json.body.studPurchaseOrder.description
                    vm.ruleForm.decimalScheduledTime = Number(json.body.scheduledTime) / 100
                    vm.classroomdata = json.body.classroomList
                    vm.ruleForm.temCourseName = json.body.studPurchaseOrder.courseName
                    vm.ruleForm.courseCode = json.body.studPurchaseOrder.courseCode
                    vm.ruleForm.universityName = json.body.universityName;
                    vm.ruleForm.countryName = json.body.countryName;
                    vm.ruleForm.sysSeller = json.body.sysSeller.username;
                    vm.ruleForm.teacNickName = json.body.teacUserName;
                    vm.extSysPaymentdata = json.body.studClassStudents;
                    var studPreferentialPolicies = [];
                    json.body.studPreferentialPolicies.forEach(element => {
                        studPreferentialPolicies.push(Number(element.preferential) +
                            "折")
                    });
                    vm.ruleForm.preferential = studPreferentialPolicies.join(";")
                    if (json.body.statused == 8) {
                        vm.ruleForm.statused = "待规划(等待教师/运营接单)"
                    }
                    if (json.body.statused == 16) {
                        vm.ruleForm.statused = "规划中(订单第一次超时等待运营接单)"
                    }
                    if (json.body.statused == 32) {
                        vm.ruleForm.statused = "规划中(订单第二次超时等待运营主管强制指派)"
                    }
                    if (json.body.statused == 64) {
                        vm.ruleForm.statused = "规划中(运营接单待指派，正在处理)"
                    }
                    if (json.body.statused == 128) {
                        vm.ruleForm.statused = "待排课"
                    }
                    if (json.body.statused == 256) {
                        vm.ruleForm.statused = "已排课"
                    }
                    if (json.body.statused == 512) {
                        vm.ruleForm.statused = "待结课"
                    }
                    if (json.body.statused == 1024) {
                        vm.ruleForm.statused = "已结课"
                    }
                    if (json.body.statused == 4096) {
                        vm.ruleForm.statused = "已取消"
                    }
                    if (json.body.statused == 65536) {
                        vm.ruleForm.statused = "事故单申请中"
                    }
                    if (json.body.statused == 262144) {
                        vm.ruleForm.statused = "事故单更换教师"
                    }
                    loading.close();
                    var studCoursewareList = json.body.studCoursewareList;
                    var groupName = studCoursewareList.groupName;
                    var arr0 = [];
                    studCoursewareList.map(function (value, key) {
                        if (value.groupName == vm.courses[0].groupName) {
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

                    $.each(vm.courses, function (key1, value1) {
                        var arr0 = [];
                        console.log(value1)
                        console.log(key1)
                        studCoursewareList.map(function (value, key) {
                            // console.log(value)
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

                    // arr0.map(item => {
                    //     var html = "<li data-id='" + item.id +
                    //         "'><input class='checkbox' name='tie_in[]' type='checkbox' data-name='" +
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
                    //         "'>" + item.name + "</a>" + item.createAt +
                    //         "<button class='button'>删除</button></li>";
                    //     $("." + vm.courses[0].name + "").append(html)
                    // })
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
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
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
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
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
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
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
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
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
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
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
                    //         item.url + "'/><a class='view' data-name='" + url + item.url +
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
        apply(row, index) {
            vm.mm1 = true;
            vm.type = row.type;
            vm.badMoney = row.badMoney;
            vm.ruleForm.studId = row.studId;
            vm.ruleForm.current = row.current;
            vm.ruleForm.id = row.id;
            vm.amount = row.badMoney;
            vm.ruleForm1.studname = row.nickName;
            vm.ruleForm1.amount1 = row.minMoney;
            vm.ruleForm1.amount = row.badMoney;
            if (row.parentId == null) {
                vm.radshow = false;
                vm.radio = "2";
            } else {
                vm.radshow = true;
                vm.radio = "1";
            }
            if (row.courseId == null) {
                vm.ruleForm.courseId = " "
            } else {
                vm.ruleForm.courseId = row.courseId;
            }
            return
        },
        save1(formName) {
            var self = this;
            if (vm.radio == "1") {
                vm.isFromOrder = true
            } else {
                vm.isFromOrder = false
            }
            vm.creatst1 = true;
            vm.creatbtn1 = "加载中";
            $.ajax({
                type: "post",
                dataType: "json",
                headers: {
                    "token": token
                },
                data: {
                    "token": token,
                    "studId": vm.ruleForm.studId,
                    "currency": vm.ruleForm.current,
                    "payMoney": vm.ruleForm1.amount,
                    "sysPaymentDemandId": vm.ruleForm.id,
                    "isFromOrder": vm.isFromOrder,
                },
                url: "" + baseURL + "/sys/seller/order/offsetPaymentDemand",
                success: function (json) {
                    if (json.status == 200) {
                        vm.creatmodel1 = false;
                        vm.creatst1 = false;
                        vm.creatbtn1 = "确 定";
                        if (json.body.needMoney == 0) {
                            self.$message({
                                message: "账单支付成功",
                                type: 'success',
                            });
                            vm.getclassroomdata();
                            vm.mm1 = false;
                        } else {
                            vm.mm1 = false;
                            vm.ruleForm.amount = json.body.needMoney
                            vm.ruleForm.amount1 = vm.ruleForm1.amount
                            vm.ruleForm.studname = vm.ruleForm1.studname
                            vm.mm = true;
                        }
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
        },
        submitUpload1() {
            if (vm.ruleForm.remark == undefined) {
                vm.ruleForm.remark = " "
            }
            this.formDate = new FormData();
            this.$refs.upload.submit();
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
                        vm.getclassroomdata();
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
        save(formName) {
            var badMoney = Number(vm.badMoney)
            var amount = Number(vm.ruleForm.amount)
            if (vm.type == 1) {
                if (amount > badMoney) {
                    vm.red = "课程预付 可以少不可以多";
                    return
                }
            }
            if (vm.type == 2) {
                if (amount < badMoney) {
                    vm.red = "欠费账单 可以多不可以少";
                    return
                }
            }
            if (vm.fileListnum == 0) {
                vm.$message({
                    message: "请选择图片",
                    type: 'warning'
                });
                return;
            }
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.b1 = true;
                    vm.b2 = "加载中";
                    vm.submitUpload1();
                } else {
                    vm.$message({
                        message: "请完善信息",
                        type: 'warning'
                    });
                }
            });
        },
        handlePreview1(file) {
            console.log(file);
        },
        success1(response, file, fileList) {
            console.log(response);
        },
        onerror1(response, file, fileList) {
            vm.$message({
                message: response.body.msg,
                type: 'warning'
            });
        },
        change1(file, fileList) {
            vm.fileListnum = fileList.length;
            console.log(vm.fileListnum)
            if (fileList.length == 1) {

            }
        },
        uploadFile1(file) {
            this.formDate = new FormData();
            for (i = 0; i < vm.fileListnum; i++) {
                this.formDate.append('file' + i, file.file);
            }
        },
        handleRemove1(file, fileList) {
            vm.fileListnum = fileList.length
            console.log(vm.fileListnum)
            if (fileList.length == 1) {

            }
        },
        deleteClasseoom(row, index) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            this.$confirm('此操作将结束该班课, 是否继续?', '提示', {
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
                    url: "" + baseURL +
                        "/sys/seller/classcourse/finishedClassCourse?courseId=" + id + "",
                    success: function (json) {
                        if (json.status == 200) {
                            vm.$message({
                                type: 'success',
                                message: json.body.msg
                            });
                        }

                        if (json.status == 400) {
                            vm.$message({
                                type: 'warning',
                                message: json.body.msg
                            });
                        }
                    }
                });
            }).catch(() => {});
        },
        seebill(row, index) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            window.location.href = "editClassroom.html?id=" + id + "";
        },
        addClasseoom(row, index) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            console.log(vm.ruleForm.current, scope.row.currency, "&current=" + vm.ruleForm.current);

            window.location.href = "addClassroom.html?id=" + id + "";
        },
        change_teacher1(row, index) {
            vm.shigumodel = true;
        },
        submitForms(formName) {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
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
                            courseId: id,
                            description: this.ruleForm.descriptions,
                        },
                        url: "" + baseURL + "sys/order/applyAccidentOrder",
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
        change_teacher(row, index) {
            vm.courseId = row.courseId
            vm.shigumodels = true;
        },
        submitFormss(formName) {
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
                            description: this.ruleForm.descriptionss,
                        },
                        url: "" + baseURL + "sys/order/applyAccidentOrder",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.shigumodels = false;
                                vm.getTableData();
                            }
                            if (json.status == 400) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'warning'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确定";
                                vm.shigumodels = false;
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        getperson() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": vm.personpage,
                    "limit": vm.personlimit,
                    "classroomId": vm.personid
                },
                url: "" + baseURL + "sys/seller/classcourse/queryStudByClassroomId",
                success: function (json) {
                    vm.persondata = json.body.list;
                    vm.total = json.body.totalCount;
                    vm.pageSize = json.body.totalCount;
                    vm.currentPage = json.body.currPage;
                }
            });
        },
        xuke() {
            if (vm.selectedIDs == "") {
                vm.$message({
                    message: '至少选择一条课堂',
                    type: 'warning'
                })
                return
            } else {
                vm.$message({
                    message: '此功能暂未开放',
                    type: 'warning'
                })
            }
        },
        shenqing() {
            if (vm.selectedIDs == "") {
                vm.$message({
                    message: '至少选择一条课堂',
                    type: 'warning'
                })
                return
            } else {
                vm.$message({
                    message: '此功能暂未开放',
                    type: 'warning'
                })
            }
        },
        quxiao() {
            if (vm.selectedIDs == "") {
                vm.$message({
                    message: '至少选择一条课堂',
                    type: 'warning'
                })
                return
            } else {
                vm.$message({
                    message: '此功能暂未开放',
                    type: 'warning'
                })
            }
        },
        person(row, index) {
            vm.personid = row.id;
            vm.getperson();
            vm.personmodel = true;
        },
        handleCurrentChange(val) {
            vm.personpage = val;
            vm.getperson();
        },
        handleSizeChange(val) {
            this.personlimit = val;
            this.getperson();
            this.handleCurrentChange(this.currentPage);
        },
        editOrder(row, index) {
            window.location.href = "editClassroomOrder.html?id=" + row.courseId + "";
        },
        seedetail(row, index) {
            window.open("bigClassOrderInfo.html?id=" + row.courseId + "");
            // window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
        },
    }
});