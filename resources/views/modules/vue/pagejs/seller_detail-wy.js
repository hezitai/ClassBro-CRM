var vm = new Vue({
    el: '#app',
    data() {
        return {
            wyUpload: [],
            dropboxList: [],
            wyactiveNames: null,
            wylog: null,
            wyassociated: null,
            wyorder: {
                upload: []
            },
            iswy: false,
            wyid: null,
            percentage: 0,
            percentagestatus: "exception",
            studTermCardHour: '',
            studCardBag: true,
            b1: false,
            b2: "确 定",
            rviews: [],
            rviewsmodel: false,
            cailiaofei: true,
            divType: true,
            typeOrder: true,
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
            history: '',
            priceshow: false,
            dialogVisible: false,
            checked: false,
            courses: '',
            urls: [],
            id: '',
            aboutOrder: false,
            studCourses: [],
            classroomdata: [],
            studCoursewareList: [],
            filelist: [],
            ruleForm: {
                course: '',
                parentTotalPrice: '',
                Integer: '',
                parentLastPrepayment: '',
            },
            ruleForm1: {
                onePrice: '',
                username: '',
                nickname: '',
                sellerDemandDesc: '',
                hourlyWage: '',
                persenterTime: '',
                reaMonetary: '',
                arrearageMoney: '',
                wordsNum: "",
                theSpecialOffer: "",
                specialOfferUser: "",
                specialOffer: "",
            },
            ruleForm2: {
                courseCode: '',
                courseName: '',
                type: '',
            },
            message: '123',
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
            createOutUrlRow: {},

            coursesItem: [],
            getCourseGroup: true,
            isFirst: true,
            uploadFilesArray: [],
            uploadToClassBroArray: [],
        }
    },
    mounted() {
        this.getclassroomdata();
        this.getclassroomdataCB();
        this.coursedata();
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
        createOutUrl: function () {
            var _this = this;
            var val;
            this.createOutUrlRow = val;
            this.createOutUrlCourseId = this.id;
            this.createOutUrlDialogLoading = true;
            $.ajax({
                url: baseURL + 'sys/oper/generateShareLink',
                data: {
                    courseId: this.id
                },
                headers: {
                    token: token
                },
                success: function (r) {
                    _this.createOutUrlDialogLoading = false;
                    if (r.status == 200) {
                        _this.createOutUrlDialog = true;
                        _this.shareOutUrl = r.body.url;
                        _this.erweimaPic = baseURL + 'sys/oper/generateQRCode?courseId=' + _this.id + '&token=' + token;
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
        downDropbox: function (path, name) {
            // alert(111)
            window.open(path);
        },
        handlePreview(file) {
            console.log(file);
        },
        deleteDropboxBtn: function (row) {
            var _this = this;
            console.log(row);
            $.ajax({
                url: wybaseUrl + "hide?access-token=" + wytoken,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    media_id: row.id,
                    order_num: this.wyid,
                    revision_id: '',
                    type: 1,
                }),
                success: function (r) {
                    if (r.code == 200) {
                        vm.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        setInterval(function () {
                            window.location.reload();
                        }, 1500)
                    } else {
                        vm.$message({
                            message: '删除失败',
                            type: 'warning'
                        });
                    }
                }
            })
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

        seedetail(row, index) {
            // window.open("seller_detail.html?id=" + row.id + "");
            window.open("seller_detail.html?id=" + row.id + "");
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

        change(file, fileList) {
            vm.fileList = fileList
            console.log(vm.fileList)
            if (fileList.length == 1) {

            }
        },
        downFilesss: function (r) {
            window.open(r);
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
                        location.reload();
                    }
                });
            }).catch(() => {});
        },
        down(url, fileName) {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'blob'
            xhr.onload = function () {
                var blob = this.response
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName)
                } else {
                    var link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = window.URL.createObjectURL(blob)
                    link.download = fileName
                    link.click()
                    window.URL.revokeObjectURL(link.href)
                }
            }
            xhr.ontimeout = function (e) {

            }
            xhr.onerror = function (e) {

            }
            xhr.send()
        },
        getclassroomdataCB: function () {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var id = getUrlStr("id");
            this.id = id
            var parentId = getUrlStr("parentId");
            if (parentId == "null") {
                $("#parents").css("display", "none")
            }
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
                    "limit": 1000,
                    "exceptionType": ""
                },
                url: "" + baseURL + "sys/seller/order/getCourseObject?id=" + id + "",
                success: function (json) {
                    var courseLogs = json.body.courseLogs;
                    $("#logs").empty();
                    courseLogs.map(item => {
                        var loghtml =
                            "<li class='clears'><i style='margin-right:10px;'>" +
                            item.createAt + "</i><i>" + item.description +
                            "</i></li>";
                        $("#logs").append(loghtml)
                    })
                }
            });
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
            this.id = id;
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
            });
            this.wyid = getUrlStr("wyid");
            this.iswy = getUrlStr("iswy");
            if (this.iswy == 'true') {
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    data: {},
                    headers: {
                        token: token
                    },
                    url: baseURL + "sys/seller/order/queryWyardOrderInfo?courseId=" + id,
                    success: function (response) {
                        if (response.data.order.completed_work == null) {
                            vm.dropboxList = [];
                        } else {
                            vm.dropboxList = response.data.order.completed_work;
                        }
                        vm.wyorder = response.data.order
                        vm.wyUpload = response.data.order.upload;
                        vm.wyassociated = response.data.associated;
                        if (response.data.log == null) {
                            vm.wylog = [];
                        } else {
                            vm.wylog = response.data.log;
                        }
                        vm.wyactiveNames = response.data.order.activeNames;
                        loading.close();
                    },
                    error: function (er) {
                        loading.close();
                    }
                });
            }
        },
    }
});