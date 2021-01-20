var vm = new Vue({
    el: '#app',
    data() {
        return {
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
            allUploadFilesArray: [],
            allUploadAgainFilesArray: [],
        }
    },

    mounted() {
        this.getTableData();
    },
    methods: {
        activateClasseoom(row, index) {
            this.$confirm('此操作是否继续?', '提示', {
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
                        "sys/seller/classcourse/activeClassCourse?courseId=" + row.id + "",
                    success: function (json) {
                        if (json.status == 200) {
                            vm.$message({
                                type: 'success',
                                message: json.body.msg
                            });
                            vm.getTableData();
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
                            // debugger
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
                                            set_upload_param(uploader, '',
                                                false);
                                            return false;

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
                            // debugger
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
                                            set_upload_param(uploader, '',
                                                false);
                                            return false;
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
                    window.open("bigClassroomInfo1.html?id=" + row.courseId);
                } else {
                    window.open("bigClassOrderInfo.html?id=" + row.courseId);
                }
            } else if (row.studCourse.typeed == 4) {
                window.open("seller_detail-wy.html?id=" + row.courseId + "&wyid=" + row.studCourse
                    .offCourseName + '&iswy=true');
            } else {
                //   window.open("seller_detail.html?id=" + row.courseId + "");
                window.open("seller_detail.html?id=" + row.courseId + "");
            }


            // if (row.type == 64) {
            //     window.open("bigClassOrderInfo.html?id=" + row.courseId + "");
            //     // window.open("bigClassroomInfo1.html?id=" + row.courseId + "");
            // } else if (row.studCourse.typeed == 4) {
            //     window.open("seller_detail-wy.html?id=" + row.courseId + "&wyid=" + row.studCourse
            //         .offCourseName + '&iswy=true');
            // } else {
            //     //   window.open("seller_detail.html?id=" + row.courseId + "");
            //     window.open("seller_detail.html?id=" + row.courseId + "");
            // }
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
                    // "onlyMe": true,
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
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.creatst1 = false;
                                vm.creatbtn1 = "确 定";
                                vm.getTableData();
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
    }
});