var vm = new Vue({
    el: '#app',
    data() {
        return {
            afterSaleRemark: null,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            updataFiles: false,
            changeEndCourseTimeData: '',
            changeExamTimeData: '',
            showExamTimeDialog: false,
            // -------------------------------------------------------
            warningPaymentMoney: false,
            stillNeedPaymentMoney: 0,
            stillNeedPay: 0,
            paymentAmount: 0,
            showTypePayment: {
                studCardBag: null,
                studAccountList: [],
            },
            showTypePaymentOnoff: false,
            exchangeArray: [],
            exchangeArrays: [],
            publicAmount: '',
            publicAmounts: '',
            residuePayMoney: '', // 剩余支付金额
            newRresiduePayMoney: '',
            payId: 0,
            downfileTypeOtherBtn: false,
            downfileType4Btn: false,
            balanceEnough: false,
            newPaymentMethod: [],
            paymentMethod: [],
            checkList: [],
            paymentReadyArray: [],
            newChiocePaymentMethodArray: [],
            chiocePaymentMethodArray: [],
            checkedStudAccountList: [],
            rightAwayPayLoading: false,
            uploadProgress: false,
            payDialogInfo: {}, // 用户数据
            rightAwayPay: false, // 立即支付 弹窗Boolean值
            rightAwayPayType0: false, // 订单支付 Boolean
            rightAwayPayType1: false, // 余额支付 Boolean
            rightAwayPayType2: false, // 转账支付 Boolean
            rightAwayPayType3: false, // 学期卡支付 Boolean
            getPaymentListResult: [], // 获取订单支付 接口返回列表
            rightAwayPayType0Confirm: false, // 订单支付确认窗口 Boolean
            rightAwayPayType3Confirm: false, // 学期卡支付确认窗口 Boolean
            rightAwayPayType0Information: {}, // 订单支付 确认窗口select获取的label值
            rightAwayPayType3Information: {}, // 学期卡支付 确认窗口 接口返回值
            xueqikadikoukeshi: 0, // 学期卡抵扣课时
            rightAwayPayType1Balance: 0, // 获取余额
            rightAwayPayType2Doc: '', //转账支付备注
            payType2ToPayType: false, // 是否是从余额转账跳转到转账充值
            uploadImgTimes: 0, //上传图片循环次数
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
            thisCourseId: 0,

            uploadStatus: 'exception',
            uploadPercent: 20,
            showUploadProgress: false,
            dropboxList: [],
            choiceDropBoxArray: [],
            uploadFileActive: 0,
            nomarlCurrency: '',
            // -------------------------------------------------------
            canPay: false, //是否可以支付
            canViewCourseware: false, //是否可以看见课件
            canViewDropBox: false, // 是否可以看见Dropbox
            canViewG: false, // 是否可以看见教师工资
            userRoleUtilsEntity: {}, // 存储身份
            isEndCourse: false, //是否结课
            isType1: false, // 是否是考前突击
            percentage: 0,
            showProgress: false,
            percentagestatus: "success",
            studTermCardHour: '',
            studCardBag: false,
            rviews: [],
            rviewsmodel: false,
            cailiaofei: true,
            divType: true,
            typeOrder: true,
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
            priceshow: false,
            b1: false,
            b2: "确 定",
            s1: true,
            s2: true,
            red: '',
            radio: '1',
            badMoney: '',
            isFromOrder: true,
            // mm1: false,
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
            btnstatus: false,
            dialogVisible: false,
            checked: false,
            courses: '',
            history: '',
            urls: [],
            checks: '',
            id: '',
            classroomdata: [],
            extSysPaymentdata: [],
            studCoursewareList: [],
            filelist: [],
            getCourseData: {
                materialCost: '',
                course: '',
                parentTotalPrice: '',
                Integer: '',
                parentLastPrepayment: '',
            },
            getCourseObjData: {
                onePrice: '',
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
                arrearageMoney: '',
                wordsNum: "",
                theSpecialOffer: "",
                specialOfferUser: "",
                specialOffer: "",
            },
            hasDayGoLessons: {
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
            rules: {},
            currencyList: [],
            showChangeExamTime: false,
            islunwendalibao: false,

            hasStatused: {},
            // 添加课程流水
            addCourseLogDialog: false,
            addCourseDesc: '',
            addCourseLoading: false,
            // 
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
            // 批量下载
            checkedArray: [],
            checkedBoxAll: false,
            downloadAllCourseLoading: false,
            downLoadChooseCourseLoading: false,
            downloadFiles: false,
            showClassTime: true,
            switchValue: false,
            payToOrderArray: [],
            // isPayToOrder:false,
            multipleSelection: '',
            selectedIDs: '',
            idss: '',
            templateRadio: '',
            allRow: '',
            question: '',
            isDingzhifudao: false,
            isDingzhifudaoNew: false,
        }
    },
    mounted() {
        this.getclassroomdata();
        this.coursedata();
        this.getcurreny();
        this.getExchange();

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
                    return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
                }
                /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
                GUID.prototype.getGUIDTime = function () {
                    return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
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
        var accessid, accesskey, host, policyBase64, signature;
        var uploadFilesNo = 0;
        var uploadFilesTimes = 0;
        var uploadFileName;
        var GUID = new GUID()
        $.ajax({
            url: ossURL + 'api/oss/getAliOSSUploadSign?dir=' + 'courseware/' + GUID.newGUID() + '/',
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
                        console.log(uploadFileName)
                        set_upload_param(up, filename, false);
                    }

                    function set_upload_param(up, filename, ret) {
                        if (ret) {
                            formatFileName(up, filename);
                        }
                        vm.uploadFileActive = 3;
                        new_multipart_params = {
                            'key': g_dirname + filename,
                            'policy': policyBase64,
                            'OSSAccessKeyId': accessid,
                            'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                            'signature': signature
                        };
                        up.setOption({
                            'url': host,
                            'multipart_params': new_multipart_params,
                        });
                        up.start();
                    }
                    var uploader = new plupload.Uploader({
                        runtimes: 'html5,flash,silverlight,html4',
                        browse_button: 'selectfiles',
                        flash_swf_url: 'js/Moxie.swf',
                        silverlight_xap_url: 'js/Moxie.xap',
                        url: 'http://oss.aliyuncs.com',
                        init: {
                            PostInit: function () {
                                document.getElementById('ossfile').innerHTML = '';
                                document.getElementById('postfiles').onclick = function () {
                                    if (vm.getCourseData.course != '') {
                                        set_upload_param(uploader, '', false);
                                        return false;
                                    } else {
                                        vm.$message({
                                            type: 'error',
                                            message: '请选择要上传的课件组'
                                        })
                                    }
                                };
                            },
                            FilesAdded: function (up, files) {
                                if (vm.getCourseData.course != '') {
                                    uploadFilesNo = files.length;
                                    plupload.each(files, function (file) {
                                        document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '" style="padding: 10px 0;">' + file.name + ' (' + plupload.formatSize(file.size).split(' ')[0] + plupload.formatSize(file.size).split(' ')[1].toUpperCase() + ')<b></b>' +
                                            '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>';
                                    });
                                    vm.uploadFileActive = 2;
                                } else {
                                    vm.$message({
                                        type: 'error',
                                        message: '请选择要上传的课件组'
                                    });
                                    document.getElementById('ossfile').innerHTML = '';
                                }
                            },

                            BeforeUpload: function (up, file) {
                                vm.updataFiles = true;
                                set_upload_param(up, file.name, true);
                            },

                            UploadProgress: function (up, file) {
                                var d = document.getElementById(file.id);
                                d.getElementsByClassName('progress')[0].style.display = 'block';
                                d.getElementsByTagName('b')[0].innerHTML = '<span style="display:inline-block;padding-left:10px;">' + file.percent + "%</span>";
                                var prog = d.getElementsByTagName('div')[0];
                                var progBar = prog.getElementsByTagName('div')[0]
                                progBar.style.width = file.percent + '%';
                                progBar.setAttribute('aria-valuenow', file.percent);
                            },
                            FileUploaded: function (up, file, info) {
                                if (info.status == 200) {
                                    vm.uploadFilesArray = [];
                                    var aaa = {
                                        cdId: vm.id,
                                        groupId: vm.getCourseData.course,
                                        name: file.name,
                                        url: host + '/' + g_dirname + uploadFileName
                                    };
                                    vm.uploadFilesArray.push(aaa);
                                    $.ajax({
                                        url: baseURL + 'sys/seller/courseware/saveWithOssUrl',
                                        type: 'POST',
                                        contentType: "application/json",
                                        headers: {
                                            token: token,
                                        },
                                        data: JSON.stringify(vm.uploadFilesArray),
                                        success: function (r) {
                                            vm.updataFiles = false;
                                            if (r.status == 200) {
                                                vm.$message({
                                                    type: 'success',
                                                    message: '文件上传成功'
                                                });
                                                vm.getclassroomdata();
                                                setInterval(function () {
                                                    $('#' + file.id).css('display', 'none');
                                                    vm.uploadFileActive = 1;
                                                }, 2000);

                                            }
                                        },
                                        error: function (er) {
                                            vm.updataFiles = false;
                                        }
                                    })
                                } else {
                                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                                }
                            },
                            Error: function (up, err) {
                                vm.$message({
                                    type: 'error',
                                    message: '文件上传失败， 请刷新重试'
                                });
                                vm.updataFiles = false;
                            }
                        }
                    });

                    uploader.init();
                }

            },
            error: function (er) {

            }
        })
    },
    beforeMount() {
        $('.maskLoading').hide();
    },
    filters: {
        rounding(value) {
            return value.toFixed(2)
        },
        spliting(value) {
            return value.split(' ')[0]
        }
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
        downloadZip: function () {
            console.log(this.checkedArray);
            var arr = JSON.stringify(this.checkedArray);
            this.downLoadChooseCourse(arr);
        },
        downLoadChooseCourse: function (urlArray) {
            // console.log(this.checkedArray);
            this.downloadFiles = true;
            vm.$message({
                type: 'success',
                message: '文件正在打包中...'
            })
            var _this = this;
            $.ajax({
                type: "POST",
                dataType: "json",
                headers: {
                    "token": token
                },
                contentType: 'application/json',
                data: urlArray,
                url: ossURL + "/resource/getZipFile",
                success: function (r) {
                    console.log(r);
                    vm.downloadFiles = false;
                    if (r.status == 200) {
                        vm.$message({
                            type: 'success',
                            message: '文件打包成功'
                        });
                        window.location.href = ossURL + r.body.filePath;
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        })
                    }
                },
                error: function (er) {
                    this.downloadFiles = false;
                }
            });
        },
        chooseDownLoadCheckBox: function (row) {
            console.log(row)
            row.checkbox = !row.checkbox;
            // console.log(row.checkbox);
            if (row.checkbox == true) {
                this.checkedArray.push(row.url);
            } else {
                for (var i in this.checkedArray) {
                    if (this.checkedArray[i] == row.url) {
                        this.checkedArray.splice(i, 1);
                    }
                }
            }
            // if (this.checkedArray.length == this.coursesItem.length) {
            //     this.checkedBoxAll = true;
            // }
            console.log(this.checkedArray);
            // var arr = this.checkedArray.join('{split}');
            // this.downLoadChooseCourse(arr);
        },
        checkBoxAll: function (val) {
            // console.log(val);
            // if (val == true) {
            //     for (var i in vm.coursesItem) {
            //         vm.coursesItem[i].checkbox = true;
            //         vm.checkedArray.push(vm.coursesItem[i].id);
            //         console.log(vm.coursesItem[i].checkbox)
            //     }
            //     // vm.coursesItem = vm.coursesItem;
            // } else {
            //     vm.checkedArray = [];
            //     for (var i in vm.coursesItem) {
            //         vm.coursesItem[i].checkbox = false;
            //         console.log(vm.coursesItem[i].checkbox)

            //     }
            //     // vm.coursesItem = vm.coursesItem;
            // }
            // console.log(this.checkedArray)
            var checkedArray = [];
            for (var i in vm.coursesItem) {
                checkedArray.push(vm.coursesItem[i].url);
            }
            console.log(checkedArray);

            var arr = JSON.stringify(checkedArray);
            this.downLoadChooseCourse(arr);
            // console.log(vm.coursesItem[i].checkbox)
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
            this.addCourseLoading = true;
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
                        }, 1000);
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        });
                    }
                    this.addCourseLoading = false;
                },
                error: function (er) {
                    this.addCourseLoading = false;
                }
            })
        },
        changeExamTime: function () {
            this.showExamTimeDialog = true;
            this.changeEndCourseTimeData = '';
            this.changeExamTimeData = '';
            // this.changeEndCourseTimeData = this.getCourseData.endCourseTime;
            // this.changeExamTimeData = this.getCourseData.examTime;
        },
        downFiles: function (row) {
            window.open(row.url)
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
                    examTime: this.changeExamTimeData,
                    //  + ' 23:59:59'
                    endCourseTime: this.changeEndCourseTimeData
                    //  + ' 23:59:59'
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
                        _this.changeEndCourseTimeData = this.getCourseData.endCourseTime;
                        _this.changeExamTimeData = this.getCourseData.examTime;
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


        chooseDropBoxEvent: function (val) {
            var onOff = false;
            if (this.choiceDropBoxArray.length != 0) {
                for (var i in this.choiceDropBoxArray) {
                    if (val == this.choiceDropBoxArray[i]) {
                        onOff = true;
                        this.choiceDropBoxArray.splice(i, 1);
                    }
                }
            }
            if (onOff == false) {
                this.choiceDropBoxArray.push(val);
            } else {
                onOff == false
            }
            console.log(this.choiceDropBoxArray);
        },
        crowDownDropBox: function () {
            vm.$message({
                message: '文件正在服务器打包,请耐心等待,不要刷新页面',
                type: 'success'
            });
            var _this = this;
            var updataArray = [];
            updataArray = JSON.stringify(this.choiceDropBoxArray);
            console.log(updataArray);
            this.downLoadChooseCourse(updataArray);

        },
        DownAllDropBox: function () {
            var arr = [];
            for (var i in this.dropboxList) {
                arr.push(this.dropboxList[i].url);
            };
            var updataArray = '';
            updataArray = JSON.stringify(arr);
            console.log(updataArray);
            this.downLoadChooseCourse(updataArray);
        },
        downDropBox: function (url) {
            window.open(url);
        },
        // handlePreview(file) {
        //     console.log(file);
        // },
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
                        if (json.body != []) {
                            var rviews = [];
                            // debugger;
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
                        } else {
                            vm.$message({
                                type: 'warning',
                                message: '暂无记录'
                            })
                        }
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: json.body.msg
                        })
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

        deleteDropbox: function (row) {
            var _this = this;
            this.$confirm('确认删除Dropbox？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    headers: {
                        "token": token,
                    },
                    data: JSON.stringify([row.id]),
                    url: "" + baseURL + "sys/seller/courseware/delete",
                    success: function (json) {
                        if (json.status == 200) {
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            location.reload();
                        } else {
                            vm.$message({
                                type: 'warning',
                                message: json.body.msg
                            });
                        }

                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        // uploadFileChange(file, fileList) {
        //     vm.fileList = fileList
        //     // console.log(vm.fileList);
        //     // console.log(file);
        //     if (fileList.length == 1) {

        //     }
        //     if (vm.getCourseData.course == '') {
        //         vm.$message({
        //             message: '请选择上传的文件组',
        //             type: 'error'
        //         });
        //         this.fileList = [];
        //         return;
        //     }
        //     this.uploadFileActive = 2;
        //     // vm.getCourseData.course
        //     // vm.submitUpload();


        // },


        // uploadProgressLength: function () {
        //     // this.uploadProgress = true;
        //     // this.uploadPercent = 
        // },
        // handleRemove(file, fileList) {
        //     vm.fileList = fileList
        //     console.log(vm.fileList)
        // },
        // uploadFile(file) {
        //     this.formDate = new FormData();
        //     for (i = 0; i < vm.fileList.length; i++) {
        //         this.formDate.append('file' + i, vm.fileList[i].raw);
        //     }
        // },


        change_course(courseid) {
            console.log(vm.getCourseData.course);
            this.uploadFileActive = 1;
            this.getCourseGroup = false;
        },
        submitUpload() {

        }, // submitUpload() {
        //     // vm.showProgress = true;
        //     this.formDate = new FormData();
        //     for (i = 0; i < vm.fileList.length; i++) {
        //         this.formDate.append('file' + i, vm.fileList[i].raw);
        //     }
        //     this.showUploadProgress = true;
        //     this.uploadStatus = 'success';
        //     $('.coursewaressssss').find('.el-progress-bar__inner').animate({
        //         width: '95%'
        //     }, 3000);
        //     vm.$message('文件上传中...');
        //     this.updataFiles = true;
        //     var _this = this;
        //     vm.b1 = true
        //     vm.b2 = "加载中"
        //     // this.formDate = new FormData();
        //     this.$refs.upload.submit();
        //     this.formDate.append('cdId', vm.id);
        //     this.formDate.append('groupId', vm.getCourseData.course);
        //     let config = {
        //         headers: {
        //             processData: false,
        //             contentType: false,
        //             mimeType: "multipart/form-data",
        //             token: token,
        //         }
        //     }
        //     $.ajax({
        //         type: 'POST',
        //         url: "" + baseURL + "sys/seller/courseware/save",
        //         data: _this.formDate,
        //         dataType: 'json',
        //         processData: false,
        //         contentType: false,
        //         mimeType: "multipart/form-data",
        //         headers: {
        //             token: token,
        //         },
        //         beforeSend: function (json) {

        //         },
        //         success: function (res) {
        //             if (res.status == 200) {
        //                 // debugger;
        //                 // location.reload();
        //                 vm.$message({
        //                     message: '上传成功',
        //                     type: 'success'
        //                 });
        //                 history.go(0);
        //                 _this.getclassroomdata();
        //                 _this.coursedata();
        //                 _this.uploadFileActive = 3;
        //             } else if (res.status == 400) {
        //                 _this.uploadStatus = 'exception';
        //                 vm.$message({
        //                     message: res.body.msg,
        //                     type: 'error'
        //                 });

        //                 _this.showUploadProgress = false;
        //                 // vm.$message({
        //                 //     message: res.data.body.msg,
        //                 //     type: 'warning'
        //                 // });
        //                 _this.fileList = [];
        //                 _this.uploadPercent = '10';
        //                 $('.coursewaressssss').find('.el-progress-bar__inner').css('width',
        //                     '10%');
        //                 vm.b1 = false;
        //                 vm.b2 = "确 定";
        //             } else {
        //                 _this.uploadStatus = 'exception';
        //                 _this.showUploadProgress = false;
        //                 vm.$message({
        //                     message: res.body.msg,
        //                     type: 'error'
        //                 });
        //                 _this.fileList = [];
        //                 _this.uploadPercent = '10';
        //                 $('.coursewaressssss').find('.el-progress-bar__inner').css('width',
        //                     '10%');
        //             }
        //             this.updataFiles = false;
        //         },
        //         error: function (er) {
        //             vm.$message({
        //                 message: res.data.body.msg,
        //                 type: 'warning'
        //             });
        //             this.updataFiles = false;
        //         }
        //     })

        // },
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
                        vm.courses = lists
                        console.log(vm.courses);
                    }
                }
            });
        },
        downfile() {
            vm.showProgress = true;
            $(".el-progress-bar__inner").css("width", "0%");
            // debugger;
            var arr = [];
            var checkedCount = 0;
            for (var i = 0; i < $("#batchDownload ul li input").length; i++) {
                // debugger;
                var Uarry = $("#batchDownload ul li input");
                var Tresult = Uarry.eq(i).attr("data-name");
                var checkbox = document.getElementsByName("tie_in[]");
                if (checkbox[i].checked) {
                    checkedCount++;
                    arr.push(Tresult);
                }
            }
            var arrjoin = arr.join(";");
            if (arrjoin == '') {
                vm.showProgress = false;
                vm.$message({
                    message: '请选择要批量下载的文件',
                    type: 'warning'
                });
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
                        window.open(baseURL + json.body.filePath);
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
                    vm.showProgress = false;
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
        getclassroomdata: function () {
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
                    if (json.body.studPurchaseOrder.type == 1) {
                        vm.isType1 = true;
                        if (json.body.statused == 1024) {
                            vm.isEndCourse = true;
                        } else {
                            vm.isEndCourse = false;
                        }
                    }
                    vm.afterSaleRemark = JSON.parse(json.body.afterSaleRemark);
                    vm.question = json.body.studPurchaseOrder.sellerDemandDesc;
                    if (json.body.studPurchaseOrder.type == 0 || json.body.studPurchaseOrder.type == 1 || json.body.studPurchaseOrder.type == 4) {
                        vm.isDingzhifudao = true;
                        if (json.body.studPurchaseOrder.orderQuestions == null) {
                            vm.isDingzhifudaoNew = false;
                        } else {
                            vm.isDingzhifudaoNew = true;
                            vm.question = json.body.studPurchaseOrder.orderQuestions;
                        }
                    }
                    vm.createOutUrlRow = json.body;
                    vm.hasStatused = json.body.userRoleUtilsEntity;
                    vm.showChangeExamTime = json.body.userRoleUtilsEntity.hasOper;
                    vm.canPay = json.body.canPay;
                    vm.canViewCourseware = json.body.canViewCourseware;
                    vm.canViewDropBox = json.body.canViewDropBox;
                    vm.canViewG = json.body.canViewG;
                    vm.dropboxList = json.body.dropBoxList;
                    vm.userRoleUtilsEntity = json.body.userRoleUtilsEntity;
                    if (json.body.studPurchaseOrder.type == "4") {
                        vm.typeOrder = true;
                        vm.islunwendalibao = true;
                        vm.showClassTime = false;
                    }
                    if (json.body.studPurchaseOrder.type == '0') {
                        vm.typeOrder = true;
                        vm.cailiaofei = false
                        vm.alltime = false
                        vm.islunwendalibao = false;
                        vm.showClassTime = true;
                    }
                    if (json.body.studPurchaseOrder.type == '1') {
                        vm.typeOrder = true;
                        vm.alltime = false
                        vm.islunwendalibao = false;
                        vm.showClassTime = true;
                    }
                    if (json.body.studPurchaseOrder.type == '32') {
                        vm.typeOrder = false;
                        vm.islunwendalibao = false;
                        vm.showClassTime = true;
                    }
                    if (json.body.studPurchaseOrder.studTermCardId != 0) {
                        vm.studTermCardHour = json.body.studPurchaseOrder.studTermCardHour,
                            vm.studCardBag = true
                    } else {
                        vm.studCardBag = false
                    }

                    vm.getCourseObjData.wordsNum = json.body.studPurchaseOrder.wordsNum;
                    vm.getCourseObjData.leftMoney = json.body.studPurchaseOrder.leftMoney + ' ' + json
                        .body.studPurchaseOrder.currency;
                    vm.getCourseObjData.arrearageMoney = json.body.studPurchaseOrder.arrearageMoney + ' ' + json
                        .body.studPurchaseOrder.currency;
                    if (json.body.studPurchaseOrder.theSpecialOffer == true) {
                        vm.getCourseObjData.specialOfferUser = json.body.studPurchaseOrder
                            .specialOfferSysUser.username;
                        vm.divType = true;
                        vm.getCourseObjData.theSpecialOffer = "是";
                    } else {
                        vm.getCourseObjData.specialOfferUser = "";
                        vm.divType = false;
                        vm.getCourseObjData.theSpecialOffer = "否";
                    }
                    vm.getCourseObjData.specialOffer = json.body.studPurchaseOrder
                        .specialOffer,
                        vm.extSysPaymentdata = json.body.extSysPaymentDemandsList;
                    vm.getCourseData.parentTotalPrice = json.body.parentTotalPrice + " " +
                        json
                        .body.studPurchaseOrder.currency;
                    vm.getCourseData.Integer = json.body.studPurchaseOrder.prepayment +
                        " " +
                        json.body.studPurchaseOrder.currency;
                    vm.getCourseData.materialCost = json.body.studPurchaseOrder
                        .materialCost +
                        " " + json.body.studPurchaseOrder.currency;
                    vm.getCourseData.parentLastPrepayment = json.body.parentLastPrepayment +
                        " " + json.body.studPurchaseOrder.currency;
                    vm.studCourses = json.body.studCourses
                    if (json.body.studCourses == "") {

                    } else {
                        vm.aboutOrder = true;
                    }
                    vm.classroomdata = json.body.classroomList;
                    vm.studCoursewareList = json.body.studCoursewareList;
                    vm.studdate = json.body.studUser;
                    vm.filelist = json.body.studCoursewareList;
                    vm.getCourseObjData.orderNo = json.body.orderNo;
                    vm.getCourseObjData.remark = json.body.remark;
                    if (json.body.studPurchaseOrder.scheduledTime == null) {
                        vm.getCourseObjData.scheduledTime = 0;
                    } else {
                        vm.getCourseObjData.scheduledTime = json.body.studPurchaseOrder
                            .scheduledTime;
                    }
                    if (json.body.allSchooltime == null) {
                        vm.getCourseObjData.allSchooltime = 0;
                    } else {
                        vm.getCourseObjData.allSchooltime = json.body.allSchooltime;
                    }
                    if (json.body.studPurchaseOrder.persenterTime == null) {
                        vm.getCourseObjData.persenterTime = 0;
                    } else {
                        vm.getCourseObjData.persenterTime = json.body.studPurchaseOrder
                            .persenterTime;
                    }
                    if (json.body.studPurchaseOrder.type == 0 || json.body.studPurchaseOrder
                        .type == 1) {
                        vm.priceshow = true;
                    }
                    vm.getCourseObjData.onePrice = json.body.studPurchaseOrder.price + " " + json.body.studPurchaseOrder.currency;
                    vm.getCourseObjData.reaMonetary = (json.body.studPurchaseOrder.reaMonetary * 1 + json.body.studPurchaseOrder.arrearageMoney * 1) + " " + json.body.studPurchaseOrder.currency
                    vm.getCourseObjData.totalPrice = json.body.studPurchaseOrder.totalPrice + " " + json.body.studPurchaseOrder.currency;
                    vm.getCourseObjData.prepayment = json.body.studPurchaseOrder.prepayment + " " + json.body.studPurchaseOrder.currency;
                    vm.getCourseObjData.prices1 = Number(json.body.teacG) + Number(json.body.teacPreG);
                    vm.getCourseObjData.prices2 = Number(json.body.teacOtg) + Number(json.body.teacPreOtg);
                    vm.getCourseObjData.sellerDemandDesc = json.body.studPurchaseOrder.sellerDemandDesc;
                    vm.hasDayGoLessons.spareTime = json.body.studPurchaseOrder.spareTime;
                    if (vm.hasDayGoLessons.spareTime != null) {
                        var spareTime = json.body.studPurchaseOrder.spareTime.split("|");
                        var one = spareTime[0];
                        var ones = one.split(",");
                        vm.hasDayGoLessons.am1 = ones[0];
                        vm.hasDayGoLessons.bm1 = ones[1];
                        vm.hasDayGoLessons.pm1 = ones[2];
                        var two = spareTime[1];
                        var twos = two.split(",");
                        vm.hasDayGoLessons.am2 = twos[0];
                        vm.hasDayGoLessons.bm2 = twos[1];
                        vm.hasDayGoLessons.pm2 = twos[2];
                        var three = spareTime[2];
                        var threes = three.split(",");
                        vm.hasDayGoLessons.am3 = threes[0];
                        vm.hasDayGoLessons.bm3 = threes[1];
                        vm.hasDayGoLessons.pm3 = threes[2];
                        var four = spareTime[3];
                        var fours = four.split(",");
                        vm.hasDayGoLessons.am4 = fours[0];
                        vm.hasDayGoLessons.bm4 = fours[1];
                        vm.hasDayGoLessons.pm4 = fours[2];
                        var five = spareTime[4];
                        var fives = five.split(",");
                        vm.hasDayGoLessons.am5 = fives[0];
                        vm.hasDayGoLessons.bm5 = fives[1];
                        vm.hasDayGoLessons.pm5 = fives[2];
                        var six = spareTime[5];
                        var sixs = six.split(",");
                        vm.hasDayGoLessons.am6 = sixs[0];
                        vm.hasDayGoLessons.bm6 = sixs[1];
                        vm.hasDayGoLessons.pm6 = sixs[2];
                        var seven = spareTime[6];
                        var sevens = seven.split(",");
                        vm.hasDayGoLessons.am7 = sevens[0];
                        vm.hasDayGoLessons.bm7 = sevens[1];
                        vm.hasDayGoLessons.pm7 = sevens[2];
                    }
                    if (json.body.statused == 1) {
                        vm.getCourseObjData.statused = "未处理（无任何销售接单）"
                    }
                    if (json.body.statused == 2) {
                        vm.getCourseObjData.statused = "待审核"
                    }
                    if (json.body.statused == 4) {
                        vm.getCourseObjData.statused = "待确定"
                    }
                    if (json.body.statused == 8) {
                        vm.getCourseObjData.statused = "待规划（等待教师/运营接单）"
                    }
                    if (json.body.statused == 16) {
                        vm.getCourseObjData.statused = "规划中(订单第一次超时等待运营接单)"
                    }
                    if (json.body.statused == 32) {
                        vm.getCourseObjData.statused = "规划中(订单第二次超时等待运营主管强制指派)"
                    }
                    if (json.body.statused == 64) {
                        vm.getCourseObjData.statused = "规划中(运营接单待指派，正在处理)"
                    }
                    if (json.body.statused == 128) {
                        vm.getCourseObjData.statused = "待排课"
                    }
                    if (json.body.statused == 256) {
                        vm.getCourseObjData.statused = "已排课"
                    }
                    if (json.body.statused == 512) {
                        vm.getCourseObjData.statused = "申请结课中"
                    }
                    if (json.body.statused == 1024) {
                        vm.getCourseObjData.statused = "已结课"
                    }
                    if (json.body.statused == 2048) {
                        vm.getCourseObjData.statused = "已强制结课"
                    }
                    if (json.body.statused == 4096) {
                        vm.getCourseObjData.statused = "已取消"
                    }
                    if (json.body.statused == 8192) {
                        vm.getCourseObjData.statused = "坏单申请中"
                    }
                    if (json.body.statused == 16384) {
                        vm.getCourseObjData.statused = "订单作废"
                    }
                    if (json.body.statused == 32768) {
                        vm.getCourseObjData.statused = "销售被更换"
                    }
                    vm.getCourseObjData.username = json.body.sysSeller.username;
                    vm.getCourseObjData.nickname = json.body.sysUserEntity.username;
                    vm.getCourseObjData.nickname1 = json.body.teacUser.username;
                    vm.getCourseObjData.teacFixedPrice = json.body.teacFixedPrice;

                    vm.hasDayGoLessons.courseName = json.body.studPurchaseOrder.courseName;
                    vm.hasDayGoLessons.courseCode = json.body.studPurchaseOrder.courseCode;
                    if (json.body.studPurchaseOrder.type == 0) {
                        vm.hasDayGoLessons.type = "定制辅导"
                        vm.downfileType4Btn = false;
                        vm.downfileTypeOtherBtn = false;
                    }
                    if (json.body.studPurchaseOrder.type == 1) {
                        vm.hasDayGoLessons.type = "考前突击"
                        vm.downfileType4Btn = false;
                        vm.downfileTypeOtherBtn = true;
                    }
                    if (json.body.studPurchaseOrder.type == 2) {
                        vm.hasDayGoLessons.type = "包课辅导"
                        vm.downfileType4Btn = false;
                        vm.downfileTypeOtherBtn = true;
                    }
                    if (json.body.studPurchaseOrder.type == 4) {
                        vm.hasDayGoLessons.type = "论文辅导"
                        vm.downfileType4Btn = true;
                        vm.downfileTypeOtherBtn = false;
                    }
                    if (json.body.studPurchaseOrder.type == 32) {
                        vm.hasDayGoLessons.type = "特殊订单"
                        vm.downfileType4Btn = false;
                        vm.downfileTypeOtherBtn = false;
                    }
                    vm.getCourseData.nickname = json.body.studUser.nickName;
                    vm.getCourseData.schoolName = json.body.sysUniversity.name;
                    vm.getCourseData.temCourseName = json.body.sysProfessionalCourses
                        .chineseName;
                    vm.getCourseData.levelName = json.body.studUser.eduName;
                    vm.getCourseData.schoolYear = json.body.studPurchaseOrder.schoolYear;
                    if (json.body.studPurchaseOrder.endCourseTime != null) {
                        vm.getCourseData.endCourseTime = json.body.studPurchaseOrder.endCourseTime.split(':')[0] + ":" + json.body.studPurchaseOrder.endCourseTime.split(':')[1];
                    }
                    if (json.body.studPurchaseOrder.examTime != null) {
                        vm.getCourseData.examTime = json.body.studPurchaseOrder.examTime.split(':')[0] + ":" + json.body.studPurchaseOrder.examTime.split(':')[1];
                    }
                    vm.getCourseData.schoolAccount = json.body.studPurchaseOrder
                        .schoolAccount;
                    vm.getCourseData.schoolPws = json.body.studPurchaseOrder.schoolPws;
                    loading.close();
                    // var studCoursewareList = json.body.studCoursewareList;
                    // var groupName = studCoursewareList.groupName;
                    vm.coursesItem = JSON.parse(JSON.stringify(json.body.studCoursewareList));
                    for (var i in vm.coursesItem) {
                        vm.coursesItem[i].checkbox = false;
                        // console.log(vm.coursesItem[i]);
                    }
                    console.log(vm.coursesItem);
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
        deleteFiles: function (id) {
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
                        setInterval(function () {
                            location.reload();
                        }, 1500)
                    }
                });
            }).catch(() => {});
        },
        seedetail(row, index) {
            // window.open("seller_detail.html?id=" + row.id + "");
            window.open("seller_detail.html?id=" + row.id + "");
        },
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
        downfileTypeOther: function () {
            window.open(
                'https://classbro-oss.oss-cn-hongkong.aliyuncs.com/statice-resource/%E8%B5%84%E6%96%99%E6%95%B4%E7%90%86%E6%A8%A1%E6%9D%BF.zip'
            )
        },
        downfileType4: function () {
            window.open(
                'https://classbro-oss.oss-cn-hongkong.aliyuncs.com/statice-resource/%E8%AE%BA%E6%96%87%E5%A4%A7%E7%A4%BC%E5%8C%85%EF%BC%88%E5%8C%85%E6%8B%AC%E5%A4%A7%E8%AE%BA%E6%96%87%EF%BC%89(1).zip'
            )
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
                    this.publicAmount = ((amounts * publicExchange) / this.exchangeArray[i].exchange).toFixed(2);
                }
            };
            return this.publicAmount;
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
                    this.publicAmounts = ((amounts * publicExchange) / this.exchangeArrays[i].exchange).toFixed(2);
                }
            };
            return this.publicAmounts;
        },
        // CheckBox change事件
        changePaymentEvent: function (val) {
            // 是否显示"余额不足需要充值"的文字

            var paymentMoney = 0;

            for (var j in this.chiocePaymentMethodArray) {
                // console.log(this.chiocePaymentMethodArray[j].checked)
                paymentMoney += this.chiocePaymentMethodArray[j].exchangeMoney * 1;
            }
            if ((this.payDialogInfo.badMoney * 1 - paymentMoney) > 0) {
                this.warningPaymentMoney = true;
                this.stillNeedPay = this.payDialogInfo.badMoney * 1 - paymentMoney;

            } else {
                this.warningPaymentMoney = false;
                this.stillNeedPay = this.payDialogInfo.badMoney * 1 - paymentMoney;
                // for (var i in this.paymentMethod) {
                //     this.paymentMethod[i].disabled = false;
                //     this.paymentMethod[i].pulsMoneyExchange = 0;
                //     this.paymentMethod[i].plusMoney = 0;
                // }
            }
            // 
            // if (val.exchangeMoney * 1 > this.payDialogInfo.badMoney * 1) {
            //     for (var i in this.paymentMethod) {
            //         if (val.id != this.paymentMethod[i].id) {
            //             this.paymentMethod[i].disabled = true;
            //         }
            //     }
            // }
            // for (var j in this.chiocePaymentMethodArray) {
            //     this.chiocePaymentMethodArray[j].checked = true;
            //     this.chiocePaymentMethodArray[j].choose = true;
            // };

            // 如果都不选  的变化事件
            if (this.chiocePaymentMethodArray.length == 0) {
                // this.paymentMethod = JSON.parse(JSON.stringify(this.newPaymentMethod));
                this.balanceEnough = false;
                this.warningPaymentMoney = false;
                // this.chiocePaymentMethodArray = [];
                // for (var i in this.paymentMethod) {
                //     this.paymentMethod[i].disabled = false;
                //     this.paymentMethod[i].pulsMoneyExchange = 0;
                //     this.paymentMethod[i].plusMoney = 0;
                //     // if (this.paymentMethod[i].checked == true) {
                //     //     this.chiocePaymentMethodArray.push(this.paymentMethod[i]);
                //     // }
                // }
            };
            this.ExchangeMoney(this.stillNeedPay, this.payDialogInfo.current, this.nomarlCurrency);
            this.stillNeedPaymentMoney = this.publicAmount;
            // this.newPaymentMethod = JSON.parse(JSON.stringify(this.paymentMethod));
            // console.log(this.stillNeedPay);
            // console.log(this.chiocePaymentMethodArray);
            //stillNeedPay
        },
        // 还需支付金额 input blur事件
        changeResiduePayMoneyEvent: function () {
            if (this.nomarlCurrency != '') {
                // this.paymentMethod = JSON.parse(JSON.stringify(this.newPaymentMethod));
                // var testNum = 0;

                // for (var j in this.paymentMethod) {
                //     if (this.paymentMethod[j].current != this.nomarlCurrency) {
                //         this.paymentMethod[j].pulsMoneyExchange = 0;
                //         this.paymentMethod[j].plusMoney = 0;
                //     }
                //     if (this.paymentMethod[j].money * 1 == 0) {
                //         this.paymentMethod[j].disabled = false;
                //         // this.paymentMethod[j].checked = false;
                //     }
                //     if (this.paymentMethod[j].current == this.nomarlCurrency) {
                //         if (this.paymentMethod[j].hasCard == false) {
                //             this.paymentMethod[j].disabled = true;
                //             this.paymentMethod[j].checked = true;
                //         }
                //     }
                // }

                // for (var i in this.paymentMethod) {
                //     if (this.paymentMethod[i].current == this.nomarlCurrency) {
                //         if (this.paymentMethod[i].hasCard == false) {
                //             testNum++;
                //         }
                //         this.paymentMethod[i].plusMoney = this.residuePayMoney;
                //         this.ExchangeMoney(this.residuePayMoney, this.nomarlCurrency, this.payDialogInfo.current);
                //         this.paymentMethod[i].pulsMoneyExchange = this.publicAmount;
                //     }
                // };
                // if (testNum == 0) {
                //     this.ExchangeMoney(this.residuePayMoney, this.nomarlCurrency, this.payDialogInfo.current);
                //     var obj = {
                //         hasCard: false,
                //         money: 0,
                //         current: this.nomarlCurrency,
                //         type: 2,
                //         id: this.paymentMethod.length + 2,
                //         exchangeMoney: 0,
                //         disabled: true,
                //         plusMoney: this.residuePayMoney,
                //         checked: true,
                //         pulsMoneyExchange: this.publicAmount,
                //         choose: false,
                //     };
                //     this.paymentMethod.push(obj);
                // }
                // console.log(this.paymentMethod)
                // this.chiocePaymentMethodArray = [];
                // for (var k in this.paymentMethod) {
                //     if (this.paymentMethod[k].checked == true) {
                //         this.chiocePaymentMethodArray.push(this.paymentMethod[k]);
                //     }
                // };

                // var exchangeNum = 0;
                // this.residuePayMoney 
                this.ExchangeMoney(this.stillNeedPay, this.payDialogInfo.current, this.nomarlCurrency);
                console.log(this.publicAmount);
                this.stillNeedPaymentMoney = this.publicAmount;
                //  = this.nomarlCurrency
                // if(this.publicAmount){

                // }

            }
        },
        // 还需支付金额 币种change事件
        changeCurrency: function (val) {
            // warningPaymentMoney
            // console.log(this.chiocePaymentMethodArray);
            // var nowChiocePaymentMethodArray = JSON.parse(JSON.stringify(this.chiocePaymentMethodArray));

            // this.changePaymentEvent(val);

            // this.paymentMethod = JSON.parse(JSON.stringify(this.newPaymentMethod));
            // var testNum = 0;

            // for (var j in this.paymentMethod) {
            // if (this.paymentMethod[j].current != val) {
            //     this.paymentMethod[j].pulsMoneyExchange = 0;
            //     this.paymentMethod[j].plusMoney = 0;
            // }
            // if (this.paymentMethod[j].money * 1 == 0) {
            //     this.paymentMethod[j].disabled = false;
            //     // this.paymentMethod[j].checked = false;
            // }
            // if (this.paymentMethod[j].current == val) {
            //     if (this.paymentMethod[j].hasCard == false) {
            //         this.paymentMethod[j].disabled = true;
            //         this.paymentMethod[j].checked = true;
            //     }
            // }
            // }

            // for (var i in this.paymentMethod) {
            //     if (this.paymentMethod[i].current == val) {
            //         // if (this.paymentMethod[i].hasCard == false) {
            //         //     testNum++;
            //         // }
            //         this.paymentMethod[i].plusMoney = this.residuePayMoney;
            //         this.ExchangeMoney(this.residuePayMoney, val, this.payDialogInfo.current);
            //         this.paymentMethod[i].pulsMoneyExchange = this.publicAmount;
            //     }
            // };
            // if (testNum == 0) {
            //     this.ExchangeMoney(this.residuePayMoney, val, this.payDialogInfo.current);
            //     var obj = {
            //         hasCard: false,
            //         money: 0,
            //         current: val,
            //         type: 2,
            //         id: this.paymentMethod.length + 2,
            //         exchangeMoney: 0,
            //         disabled: true,
            //         plusMoney: this.residuePayMoney,
            //         checked: true,
            //         pulsMoneyExchange: this.publicAmount,
            //         choose: false,
            //     };
            //     this.paymentMethod.push(obj);
            // }
            // console.log(this.paymentMethod)
            // this.chiocePaymentMethodArray = [];
            // for (var k in this.paymentMethod) {
            //     if (this.paymentMethod[k].checked == true) {
            //         this.chiocePaymentMethodArray.push(this.paymentMethod[k]);
            //     }

            //     if (this.paymentMethod[k].exchangeMoney * 1 > this.payDialogInfo.badMoney * 1) {
            //         this.warningPaymentMoney = false;
            //     } else {
            //         this.warningPaymentMoney = true;
            //     }
            // };
            // var paymentMoney = 0;

            // for (var j in this.chiocePaymentMethodArray) {
            //     // console.log(this.chiocePaymentMethodArray[j].checked)
            //     paymentMoney += this.chiocePaymentMethodArray[j].exchangeMoney * 1;
            // }
            // if ((this.payDialogInfo.badMoney * 1 - paymentMoney) > 0) {
            //     this.warningPaymentMoney = true;
            //     this.stillNeedPay = this.payDialogInfo.badMoney * 1 - paymentMoney;
            // } else {
            //     this.warningPaymentMoney = false;
            //     this.stillNeedPay = this.payDialogInfo.badMoney * 1 - paymentMoney;
            // }

            // for(var i in nowChiocePaymentMethodArray){
            //     this.chiocePaymentMethodArray.push(nowChiocePaymentMethodArray[i]);
            // }
            // stillNeedPaymentMoney
            this.ExchangeMoneyOrder(this.stillNeedPay, this.payDialogInfo.current, val);
            this.stillNeedPaymentMoney = this.publicAmounts;
            console.log(this.stillNeedPaymentMoney);
        },
        // 支付按钮
        payDemandsByMoreMethod: function () {
            var _this = this;
            var data = {
                payId: this.payId,
                paymentMethodEntity: [],
            };
            // if (this.chiocePaymentMethodArray.length == 0) {
            //     vm.$message({
            //         message: '请选择支付方式',
            //         type: 'warning'
            //     });
            //     return;
            // }
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
                        // // 需要充值
                        // // _this.paymentMethod = JSON.parse(JSON.stringify(_this.newPaymentMethod));
                        // // _this.newRresiduePayMoney = _this.residuePayMoney
                        // _this.chiocePaymentMethodArray = [];
                        // _this.balanceEnough = true;
                        // _this.residuePayMoney = r.body;
                        // // _this.nomarlCurrency = _this.payDialogInfo.current;
                        // for (var i in _this.paymentMethod) {
                        //     if (_this.nomarlCurrency == _this.paymentMethod[i].current) {
                        //         _this.paymentMethod[i].plusMoney = _this.residuePayMoney;
                        //         _this.paymentMethod[i].disabled = true;
                        //         // _this.paymentMethod[i].checked = true;
                        //         _this.ExchangeMoney(_this.residuePayMoney, _this.nomarlCurrency, _this.nomarlCurrency);
                        //         _this.paymentMethod[i].pulsMoneyExchange = _this.publicAmount;
                        //     }
                        //     if (_this.paymentMethod[i].checked == true) {
                        //         _this.chiocePaymentMethodArray.push(_this.paymentMethod[i]);
                        //     }
                        // };
                        // // _this.newPaymentMethod = JSON.parse(JSON.stringify(_this.paymentMethod));
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
            this.switchValue = false;
            this.payToOrderArray = [];
        },

        // 转账支付创口 转账支付接口
        rightAwayPayType2Submit: function () {
            var _this = this;
            console.log(this.chiocePaymentMethodArray);
            for (var i in this.chiocePaymentMethodArray) {
                this.paymentAmount += this.chiocePaymentMethodArray[i].exchangeMoney * 1;
            }
            // debugger;
            // if ((this.payDialogInfo.badMoney - this.paymentAmount) < 0) {
            if (this.stillNeedPay <= 0) {
                this.payDemandsByMoreMethod();
            } else {
                this.formDate = new FormData();
                this.$refs.upload.submit();
                this.formDate.append('current', vm.nomarlCurrency);
                this.formDate.append('studId', vm.payDialogInfo.studId);
                // if (this.payType2ToPayType == true) {
                //     this.formDate.append('amount', this.payDialogInfo.badMoney - this
                //         .rightAwayPayType1Balance);
                // } else if (this.payType2ToPayType == false) {
                //     this.formDate.append('amount', vm.payDialogInfo.badMoney);
                // }
                this.formDate.append('amount', vm.residuePayMoney);
                this.formDate.append('remark', vm.rightAwayPayType2Doc);
                if (vm.payDialogInfo.courseId != null) {
                    this.formDate.append('courseId', vm.payDialogInfo.courseId);
                } else if (vm.payDialogInfo.courseId === null) {
                    this.formDate.append('courseId', '');
                }
                // this.formDate.append('payId', vm.payDialogInfo.id);
                // this.formDate.append('payMoney', vm.payDialogInfo.badMoney);
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
                            // if (_this.showTypePaymentOnoff == true) {
                            //     vm.$message({
                            //         message: '账单支付成功',
                            //         type: 'success'
                            //     });
                            //     setInterval(function () {
                            //         window.location.reload();
                            //     }, 1500)
                            // } else if (_this.showTypePaymentOnoff == false) {
                            _this.payDemandsByMoreMethod();
                            // }
                            // 
                            // vm.rightAwayPayType2 = false;
                            // _this.fileList2 = [];
                            // _this.rightAwayPayType2Doc = '',
                            //     _this.getclassroomdata();
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

        apply(row, index) {
            // vm.mm1 = true;
            vm.type = row.type;
            // 用户信息赋值到payDialogInfo 并设置max&min的值
            vm.rightAwayPay = true;
            vm.payDialogInfo = row;
            vm.residuePayMoney = vm.payDialogInfo.badMoney;
            this.stillNeedPay = vm.payDialogInfo.badMoney;
            // 获取支付方式
            this.rightAwayPayLoading = true;
            this.payId = row.id;
            var _this = this;
            // 获取多币种支付账户
            $.ajax({
                url: baseURL + 'sys/seller/order/queryStudPaymentMethod?payId=' + row.id,
                type: 'GET',
                headers: {
                    token: token
                },
                success: function (r) {
                    console.log(r);
                    _this.nomarlCurrency = _this.payDialogInfo.current;
                    _this.showTypePayment = r.body;
                    _this.ExchangeMoneyOrder(_this.payDialogInfo.badMoney, _this.payDialogInfo.current, _this.payDialogInfo.current);
                    _this.stillNeedPaymentMoney = _this.publicAmounts;
                    if (_this.showTypePayment.studCardBag == null && _this.showTypePayment.studAccountList.length >= 1) {
                        _this.showTypePaymentOnoff = true; // 无学期卡一种余额
                    } else {
                        _this.showTypePaymentOnoff = false; // 有学期卡多种充余额
                    }
                    if (r.body.studCardBag != null) {
                        var obj1 = {
                            hasCard: true,
                            lastTime: r.body.studCardBag.lastTime,
                            money: r.body.studCardBag.addWorth * 1 + r.body.studCardBag.realWorth * 1 - r.body.studCardBag.consumedWorth * 1,
                            current: r.body.studCardBag.currency,
                            type: 1,
                            id: 0,
                            exchangeMoney: r.body.studCardBag.lastMoneyByPayId,
                            disabled: false,
                            plusMoney: 0,
                            checked: false,
                            pulsMoneyExchange: 0,
                            choose: false,
                        };
                        _this.paymentMethod.push(obj1);
                    }
                    for (var i in r.body.studAccountList) {
                        var obj = {
                            hasCard: false,
                            money: r.body.studAccountList[i].money,
                            current: r.body.studAccountList[i].current,
                            type: 2,
                            id: i * 1 + 1,
                            exchangeMoney: r.body.studAccountList[i].moneyByPayId,
                            disabled: false,
                            plusMoney: 0,
                            checked: false,
                            pulsMoneyExchange: 0,
                            choose: false,
                        };
                        _this.paymentMethod.push(obj);
                    }
                    _this.rightAwayPayLoading = false;
                    _this.newPaymentMethod = JSON.parse(JSON.stringify(_this.paymentMethod));
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
            // -------------------------------------------------------
            vm.badMoney = row.badMoney;
            vm.getCourseData.studId = row.studId;
            vm.getCourseData.current = row.current;
            vm.getCourseData.id = row.id;
            vm.amount = row.badMoney;
            vm.getCourseObjData.studname = row.nickName;
            vm.getCourseObjData.amount1 = row.minMoney;
            vm.getCourseObjData.amount = row.badMoney;
            if (row.parentId == null) {
                vm.radshow = false;
                vm.radio = "2";
            } else {
                vm.radshow = true;
                vm.radio = "1";
            }
            if (row.courseId == null) {
                vm.getCourseData.courseId = " "
            } else {
                vm.getCourseData.courseId = row.courseId;
            }
            return
        },
        // -------------------------------------------------------
        // 订单付款 获取需要付款的订单
        getPaymentType0Event(row) {
            let obj = {};
            obj = this.getPaymentListResult.find((item) => {
                return item.id === row;
            });
            this.rightAwayPayType0Information = obj.orderNo;
        },
        paymentSubmit: function (row) {
            console.log(row);
        },
        // select确认支付类型
        payment(result) {
            var _this = this;
            console.log(result);
            console.log(result.paytype);
            if (result.paytype == undefined) {
                // alert('请选择支付方式');
                vm.$message({
                    message: '请选择支付方式',
                    type: 'warning'
                });
            } else if (result.paytype == 0) { //订单支付
                this.rightAwayPay = false;
                this.rightAwayPayType0 = true;
                $.ajax({
                    type: 'GET',
                    url: baseURL + 'sys/seller/order/getUndoneCustomList?token=' + token +
                        '&page=1&limit=1000&userId=' + _this.payDialogInfo.studId +
                        '&notIncludeId=' + _this.thisCourseId,
                    dataType: 'json',
                    success: function (r) {
                        console.log(r);
                        _this.getPaymentListResult = r.body;
                        _this.rightAwayPayType0Confirm = false;
                    },
                    error: function (er) {

                    }
                })
            } else if (result.paytype == 1) { //余额支付
                this.rightAwayPay = false;
                this.rightAwayPayType1 = true;
                $.ajax({
                    type: 'GET',
                    url: baseURL + 'sys/seller/order/getStudentAmountById?studId=' + _this
                        .payDialogInfo.studId + '&currency=' + _this.payDialogInfo.current +
                        '&token=' + token,
                    dataType: 'json',
                    success: function (r) {
                        console.log(r);
                        _this.rightAwayPayType1Balance = r.body;
                    },
                    error: function (er) {

                    }
                })
            } else if (result.paytype == 2) { //转账支付
                this.rightAwayPay = false;
                this.rightAwayPayType2 = true;
                this.payType2ToPayType = false;
            } else if (result.paytype == 3) { //学期卡支付
                this.rightAwayPayType3Confirm = true;
                $.ajax({
                    url: baseURL + 'sys/seller/order/queryStudCardBag?token=' + token + '&studId=' +
                        _this.payDialogInfo.studId,
                    type: 'GET',
                    dataType: 'json',
                    success: function (r) {
                        // console.log(r);
                        _this.rightAwayPayType3Information = r.body;
                        console.log(_this.rightAwayPayType3Information);
                        _this.xueqikadikoukeshi = (_this.payDialogInfo.badMoney / _this
                            .rightAwayPayType3Information.unitWorth).toFixed(2);
                        console.log(_this.xueqikadikoukeshi);
                    },
                    error: function (er) {

                    },
                })

            };
        },
        // 转账支付窗口 上传事件↓
        handlePreview2(file) {},
        success2(response, file, fileList) {},
        onerror2(response, file, fileList) {},
        change2(file, fileList) {
            vm.imgs = fileList;
            vm.span = 24 / (fileList.length);
            vm.fileListnum = fileList.length;
        },
        uploadFile2(file, fileList) {
            this.formDate.append('file' + this.uploadImgTimes, file.file);
            this.uploadImgTimes++;
        },
        handleRemove2(file, fileList) {
            vm.span = 24 / (fileList.length);
        },
        // 转账支付窗口 上传事件↑

        // -------------------------------------------------------
        downFile1: function (num) {
            console.log(num);
            if (num == 1) {
                window.open('https://classbro-oss.oss-cn-hongkong.aliyuncs.com/statice-resource/%E8%B5%84%E6%96%99%E6%95%B4%E7%90%86%E6%A8%A1%E6%9D%BF.zip')
            } else {
                window.open('https://classbro-oss.oss-cn-hongkong.aliyuncs.com/statice-resource/%E8%AE%BA%E6%96%87%E5%A4%A7%E7%A4%BC%E5%8C%85%EF%BC%88%E5%8C%85%E6%8B%AC%E5%A4%A7%E8%AE%BA%E6%96%87%EF%BC%89(1).zip')
            }
        }
    }
});