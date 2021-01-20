var vm = new Vue({
    el: '#app',
    data() {
        return {

            switchValue: false,
            payToOrderArray: [],
            // isPayToOrder:false,
            multipleSelection: '',
            selectedIDs: '',
            idss: '',
            templateRadio: '',
            allRow: '',
            b1: false,
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
            rules1: {
                course: [{
                    required: true,
                    message: '请选择分组名称',
                    trigger: 'change'
                }, ]
            },
            courides: '',
            currencyed: '',
            selectedIDs: '',
            currencycreat: '',
            creatmodel1: false,
            creatst1: false,
            creatbtn1: "确 定",
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            dialogFormVisible: false,
            idss: [],
            operaterOrderStatusedArr: null,
            spoTypeArr: null,
            sooTypeedArr: null,
            sooStatusedArr: null,
            selects: '',
            countryId: '',
            country: '',
            key: '',
            id: '',
            val: 1,
            limit: 15,
            courses: '',
            page: "",
            name: '',
            course: '',
            ruleForm: {
                course: '',
            },
            rules: {
                country: [{
                    required: true,
                    message: '请选择委派教师',
                    trigger: 'change'
                }],
                payMoney: [{
                    required: true,
                    message: '请输入payMoney',
                    trigger: 'blur'
                }],
            },
            // ---------------
            applyBackDialogLoading: false,
            applyBackDialog: false,
            itemInfo: {
                studCourse: {
                    studPurchaseOrder: {}
                }
            },
            reasonDesc: '',
            backMoney: '',
            myHeaders2: {
                token: token
            },
            fileList2: [],
            data2: {},
            url2: "" + baseURL + "sys/oss/batchUpload",
            imgs2: [],
            urlArray: [],

            itemInfoAgain: {
                studCourse: {
                    studPurchaseOrder: {}
                },
                sysRefundOrder: {}
            },
            applyBackAgainDialogLoading: false,
            applyBackAgainDialog: false,
            backMoneyAgain: '',
            reasonDescAgain: '',
            backMoneyAgainFiles: [],
            myHeaders1: {
                token: token
            },
            fileList1: [],
            data1: {},
            url1: "" + baseURL + "sys/oss/batchUpload",
            imgs1: [],
            urlArrayAgain: [],
            applyBackAgainLoadingBtn: false,
            applyBackLoadingBtn: false,

            uploadUseData: {},
            allUploadFilesArray: [],
            allUploadAgainFilesArray: [],
        }
    },

    mounted() {
        this.getcurreny();
        this.getExchange();
        this.getTableData();
    },
    methods: {
        filesUploadOss: function () {
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
                        return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) +
                            this.addZero(this.date.getDay());
                    }
                    /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
                    GUID.prototype.getGUIDTime = function () {
                        return this.addZero(this.date.getHours()) + this.addZero(this.date
                                .getMinutes()) + this.addZero(this.date.getSeconds()) + this
                            .addZero(parseInt(this.date.getMilliseconds() / 10));
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
            var GUID = new GUID();

            $.ajax({
                url: ossURL + 'api/oss/getAliOSSUploadSign?dir=' + 'refundorder/' + GUID
                    .newGUID() + '/',
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

                        function set_upload_param(up, filename, ret) {
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
                        var uploader = new plupload.Uploader({
                            runtimes: 'html5,flash,silverlight,html4',
                            browse_button: 'selectfiles',
                            flash_swf_url: 'libs/Moxie.swf',
                            silverlight_xap_url: 'libs/Moxie.xap',
                            url: 'http://oss.aliyuncs.com',
                            init: {
                                PostInit: function () {
                                    document.getElementById('ossfile')
                                        .innerHTML = '';
                                    document.getElementById('postfiles')
                                        .onclick = function () {
                                            // if (vm.getCourseData.course != '') {
                                            set_upload_param(uploader, '',
                                                false);
                                            return false;
                                            // } else {
                                            //     vm.$message({
                                            //         type: 'error',
                                            //         message: '请选择要上传的课件组'
                                            //     })
                                            // }
                                        };
                                },
                                FilesAdded: function (up, files) {
                                    vm.applyBackDialog = true;
                                    console.log(files);
                                    uploadFilesNo = files.length;
                                    plupload.each(files, function (file) {
                                        $('#ossfile').append(
                                            '<div id="' + file.id +
                                            '" style="padding-left: 20px;">' +
                                            file.name + ' (' +
                                            plupload.formatSize(file
                                                .size).split(' ')[
                                                0] + plupload
                                            .formatSize(file.size)
                                            .split(' ')[1]
                                            .toUpperCase() +
                                            ')<b></b>' +
                                            '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>');
                                    });
                                    for (var k in files) {
                                        set_upload_param(up, files[k].name,
                                            true);
                                    }
                                },
                                BeforeUpload: function (up, file) {
                                    set_upload_param(up, file.name, true);
                                },
                                UploadProgress: function (up, file) {
                                    var d = $('#ossfile').find('#' + file
                                        .id);
                                    d.find('.progress').css('display', 'block');
                                    d.find('b').html(
                                        '<span style="display:inline-block;padding-left:10px;">' +
                                        file.percent + "%</span>");
                                    var prog = d.find('div').eq(0);
                                    var progBar = prog.find('div').eq(0);
                                    progBar.css('width', file.percent + '%');
                                    progBar.attr('aria-valuenow', file.percent);
                                },
                                FileUploaded: function (up, file, info) {
                                    if (info.status == 200) {
                                        var item = {
                                            "fileName": file.name,
                                            "fileUrl": host + '/' +
                                                g_dirname + file.name
                                        }
                                        vm.allUploadFilesArray.push(item);
                                    } else {
                                        vm.$message({
                                            type: 'error',
                                            message: '文件上传失败(FileUploaded)， 请刷新重试'
                                        });
                                        vm.applyBackDialog = false;
                                    }
                                },
                                Error: function (up, err) {
                                    vm.$message({
                                        type: 'error',
                                        message: '文件上传失败(Error)， 请刷新重试'
                                    });
                                    vm.applyBackDialog = false;
                                }
                            }
                        });
                        uploader.init();
                    }
                },
                error: function (er) {
                    vm.applyBackDialog = false;
                }

            })
        },
        filesUploadAgainOss: function () {
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
                        return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) +
                            this.addZero(this.date.getDay());
                    }
                    /* * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933 * 返回值：返回GUID日期格式的字条串 */
                    GUID.prototype.getGUIDTime = function () {
                        return this.addZero(this.date.getHours()) + this.addZero(this.date
                                .getMinutes()) + this.addZero(this.date.getSeconds()) + this
                            .addZero(parseInt(this.date.getMilliseconds() / 10));
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
            var GUID = new GUID();

            $.ajax({
                url: ossURL + 'api/oss/getAliOSSUploadSign?dir=' + 'refundorder/' + GUID
                    .newGUID() + '/',
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

                        function set_upload_param(up, filename, ret) {
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
                        var uploader = new plupload.Uploader({
                            runtimes: 'html5,flash,silverlight,html4',
                            browse_button: 'selectfiles_again',
                            flash_swf_url: 'libs/Moxie.swf',
                            silverlight_xap_url: 'libs/Moxie.xap',
                            url: 'http://oss.aliyuncs.com',
                            init: {
                                PostInit: function () {
                                    document.getElementById('ossfile_again')
                                        .innerHTML = '';
                                    document.getElementById('postfiles_again')
                                        .onclick = function () {
                                            // if (vm.getCourseData.course != '') {
                                            set_upload_param(uploader, '',
                                                false);
                                            return false;
                                            // } else {
                                            //     vm.$message({
                                            //         type: 'error',
                                            //         message: '请选择要上传的课件组'
                                            //     })
                                            // }
                                        };
                                },
                                FilesAdded: function (up, files) {
                                    vm.applyBackAgainDialog = true;
                                    // console.log(files);
                                    uploadFilesNo = files.length;
                                    plupload.each(files, function (file) {
                                        $('#ossfile_again').append(
                                            '<div id="' + file.id +
                                            '" style="padding-left: 20px;">' +
                                            file.name + ' (' +
                                            plupload.formatSize(file
                                                .size).split(' ')[
                                                0] + plupload
                                            .formatSize(file.size)
                                            .split(' ')[1]
                                            .toUpperCase() +
                                            ')<b></b>' +
                                            '<div class="progress_again" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>');
                                    });
                                    for (var k in files) {
                                        set_upload_param(up, files[k].name,
                                            true);
                                    }
                                },
                                BeforeUpload: function (up, file) {
                                    set_upload_param(up, file.name, true);
                                },
                                UploadProgress: function (up, file) {
                                    var d = $('#ossfile_again').find('#' + file
                                        .id);
                                    d.find('.progress_again').css('display',
                                        'block');
                                    d.find('b').html(
                                        '<span style="display:inline-block;padding-left:10px;">' +
                                        file.percent + "%</span>");
                                    var prog = d.find('div').eq(0);
                                    var progBar = prog.find('div').eq(0);
                                    progBar.css('width', file.percent + '%');
                                    progBar.attr('aria-valuenow', file.percent);
                                },
                                FileUploaded: function (up, file, info) {
                                    if (info.status == 200) {
                                        var item = {
                                            "fileName": file.name,
                                            "fileUrl": host + '/' +
                                                g_dirname + file.name
                                        }
                                        vm.allUploadAgainFilesArray.push(item);
                                    } else {
                                        vm.$message({
                                            type: 'error',
                                            message: '文件上传失败， 请刷新重试'
                                        });
                                        vm.applyBackAgainDialog = false;
                                    }
                                },
                                Error: function (up, err) {
                                    vm.$message({
                                        type: 'error',
                                        message: '文件上传失败， 请刷新重试'
                                    });
                                    vm.applyBackAgainDialog = false;
                                }
                            }
                        });
                        uploader.init();
                    }
                },
                error: function (er) {
                    vm.applyBackAgainDialog = false;
                }

            })
        },



        // 转账支付窗口 上传事件↓
        handlePreview2(file) {},
        success2(response, file, fileList) {},
        onerror2(response, file, fileList) {},
        change2(file, fileList) {
            vm.imgs2 = fileList;
        },
        uploadFile2(file, fileList) {},
        handleRemove2(file, fileList) {},
        submitUpload: function () {

        },
        handlePreview1(file) {},
        success1(response, file, fileList) {},
        onerror1(response, file, fileList) {},
        change1(file, fileList) {
            vm.imgs1 = fileList;
        },
        uploadFile1(file, fileList) {},
        handleRemove1(file, fileList) {},
        submitUpload1: function () {

        },
        // 转账支付窗口 上传事件↑
        applyBackBtn: function (row, index) {
            this.applyBackDialog = true;
            this.filesUploadOss();
            this.itemInfo = row;
            console.log(this.itemInfo);
        },
        applyBackDialogEvent: function () {
            this.applyBackDialog = false;
            this.reasonDesc = [];
            this.urlArray = [];
            this.backMoney = [];
            this.imgs2 = [];
            this.fileList2 = [];
            this.allUploadFilesArray = [];
        },
        downFile: function (url) {
            window.open(url);
        },
        applyBackSubmit: function () {
            if (this.backMoney == '' || this.backMoney == null || this.backMoney ==
                undefined) {
                vm.$message({
                    type: 'error',
                    message: '请填写正确退款金额'
                });
                return;
            }
            if (this.reasonDesc == '' || this.reasonDesc == null || this.reasonDesc ==
                undefined) {
                vm.$message({
                    type: 'error',
                    message: '请填写正确理由'
                });
                return;
            }
            if (this.allUploadFilesArray.length == 0 || this.allUploadFilesArray == []) {
                vm.$message({
                    type: 'error',
                    message: '请上传文件！'
                });
                return;
            }
            vm.$message({
                type: 'warning',
                message: '正在提交退款...'
            });
            var _this = this;
            this.applyBackDialogLoading = true;
            this.applyBackLoadingBtn = true;
            var data = {
                courseId: _this.itemInfo.courseId, // 课程id
                reason: _this.reasonDesc, // 申请理由
                files: _this.allUploadFilesArray, // 附件URL
                refundId: _this.itemInfo.id, // 退款单ID
                refundAmount: _this.backMoney // 退款金额
            };
            $.ajax({
                url: baseURL + 'sys/seller/order/requestRefund',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                headers: {
                    token: token
                },
                success: function (r) {
                    console.log(r);
                    if (r.status == 200) {
                        vm.$message({
                            type: 'success',
                            message: r.body.msg
                        });
                        setInterval(function () {
                            window.location.reload();
                        }, 1000)
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        });
                        _this.applyBackDialogLoading = false;
                        _this.applyBackLoadingBtn = false;
                    }
                },
                error: function (er) {
                    _this.applyBackDialogLoading = false;
                    _this.applyBackLoadingBtn = false;
                }
            })
        },
        applyBackAgainBtn: function (row, index) {
            this.applyBackAgainDialog = true;
            this.filesUploadAgainOss();
            this.itemInfoAgain = row;
            this.backMoneyAgain = this.itemInfoAgain.sysRefundOrder.refundAmount;
            this.reasonDescAgain = this.itemInfoAgain.sysRefundOrder.reasonJson[this.itemInfoAgain
                .sysRefundOrder.reasonJson.length - 1].reason;
            this.backMoneyAgainFiles = this.itemInfoAgain.sysRefundOrder.reasonJson[this.itemInfoAgain
                .sysRefundOrder.reasonJson.length - 1].file
        },
        applyBackAgainDialogEvent: function () {
            this.applyBackAgainDialog = false;
            this.reasonDescAgain = [];
            this.urlArrayAgain = [];
            this.backMoneyAgain = [];
            this.imgs1 = [];
            this.fileList1 = [];
            this.allUploadAgainFilesArray = [];
        },
        applyBackAgainSubmit: function () {
            if (this.backMoneyAgain == '' || this.backMoneyAgain == null || this.backMoneyAgain ==
                undefined) {
                vm.$message({
                    type: 'error',
                    message: '请填写正确退款金额'
                });
                return;
            }
            if (this.reasonDescAgain == '' || this.reasonDescAgain == null || this.reasonDescAgain ==
                undefined) {
                vm.$message({
                    type: 'error',
                    message: '请填写正确理由'
                });
                return;
            }
            if (this.allUploadAgainFilesArray.length == 0 || this.allUploadAgainFilesArray == []) {
                vm.$message({
                    type: 'error',
                    message: '请上传文件！'
                });
                return;
            }
            var _this = this;
            this.applyBackAgainLoadingBtn = true;
            this.applyBackAgainDialogLoading = true;
            // _this.allUploadAgainFilesArray    
            var data = {
                courseId: _this.itemInfoAgain.courseId, // 课程id
                reason: _this.reasonDescAgain, // 申请理由
                files: _this.allUploadAgainFilesArray, // 附件URL
                refundId: _this.itemInfoAgain.id, // 退款单ID
                refundAmount: _this.backMoneyAgain // 退款金额
            };
            $.ajax({
                url: baseURL + 'sys/seller/order/requestRefund',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                headers: {
                    token: token
                },
                success: function (r) {
                    console.log(r);
                    if (r.status == 200) {
                        vm.$message({
                            type: 'success',
                            message: r.body.msg
                        });
                        setInterval(function () {
                            window.location.reload();
                        }, 1000)
                    } else {
                        vm.$message({
                            type: 'warning',
                            message: r.body.msg
                        });
                        _this.applyBackAgainDialogLoading =
                            false;
                        _this.applyBackAgainLoadingBtn = false;
                    }
                },
                error: function (er) {
                    _this.applyBackAgainDialogLoading = false;
                    _this.applyBackAgainLoadingBtn = false;
                }
            });
        },
        tableRowClassName: function ({
            row,
            rowIndex
        }) {
            // if (rowIndex === 1) {
            //     return 'warning-row';
            // } else if (rowIndex === 3) {
            //     return 'error-row';
            // } else if (rowIndex === 3) {
            //     return 'success-row';
            // }
            // return '';
        },
        seedetail(row, index) {
            if (row.studCourse.spoType == 64) {
                if (row.studCourse.parentId == null) {
                    window.open("bigClassroomInfo1.html?id=" + row.courseId + "&teacherId=" + row.studCourse.teacherId);
                } else {
                    window.open("bigClassOrderInfo.html?id=" + row.courseId);
                }
                // window.open("bigClassOrderInfo.html?id=" + row.courseId + "");
                // window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
            } else if (row.studCourse.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.courseId + "&wyid=" + row.studCourse
                    .offCourseName + '&iswy=true');
            } else {
                //   window.open("seller_detail.html?id=" + row.courseId + "");
                window.open("seller_detail.html?id=" + row.courseId + "");
            }
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
                    "statused": 208,
                    "onlyMe": true,
                    "key": this.tableDataName,
                },
                url: "" + baseURL + "/sys/seller/order/list",
                success: function (json) {
                    self.tableDataEnd = json.body.list;
                    self.total = json.body.totalCount;
                    self.pageSize = json.body.totalCount;
                    self.currentPage = json.body.currPage;
                    loading.close();
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getTableData;
            this.handleCurrentChange(this.currentPage);
        },

        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            let ids = [];
            let currencyed = [];
            let courids = [];
            this.multipleSelection.map((item) => {
                var id = item.id;
                ids.push("" + id + "");
                var currency = item.currency;
                currencyed.push("" + currency + "");
                var abb = item.courseId;
                courids.push("" + abb + "");
            });
            this.courides = courids;
            this.selectedIDs = ids;
            console.log('多选', ids);
            this.idss = this.selectedIDs;
            this.currencyed = currencyed;
        },
        creat() {
            var id = vm.courides
            var ids = id.join()
            vm.selid = ids
            if (id.length === 0 || id.length > 1) {
                return;
            }
            vm.ruleForm.payMoney = ""
            vm.currencycreat = vm.currencyed.join();
            vm.creatmodel1 = true;
        },
        creatsave(formName) {
            var self = this;
            var _this = this;
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
                        url: "" + baseURL + "/sys/seller/order/createSupportPaymentDemand",
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
                                        _this.nomarlCurrency = _this.payDialogInfo.current;
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

    }
});