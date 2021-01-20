var vm = new Vue({
    el: '#app',
    data() {
        return {
            shigumodelLoading: false,
            uploadFilesArray: [],
            uploader: null,
            chooseOrder: [],
            updataFiles: false,
            loadingAll: false,
            result: '',
            result2dec1: '',
            result2dec2: '',
            result2dec3: '',
            result2dec4: '',
            returnmodel: false,
            showdiv: false,
            label: "退还学生金额",
            s1: false,
            s2: false,
            s3: false,
            btn1: false,
            btn2: false,
            reset: false,
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
            dialogFormVisible: false,
            dialogFormVisible4: false,
            idss: [],
            operaterOrderStatusedArr: null,
            spoTypeArr: null,
            sooTypeedArr: null,
            selects: '',
            countryId: '',
            country: '',
            key: '',
            id: '',
            val: 1,
            page: "",
            name: '',
            ruleForm: {
                blurLeftMoney: '',
                person_liable: '',
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
                reason: '',
                sooStatusedArr: '133120',
                hasOperPerformance: true,
                hasSalesPerformance: true,
                extStudCardBagLastTimeChange: '',
            },
            model: {
                totalPrice: '',
                prepayment: '',
                teacGs: '',
                teacOtgs: '',
                currency: '',
                reaMonetary: '',
                money: '',
                arrearageMoney: '',
                allSchooltime: '',
                teacFixedPrice: '',
                parentTotalPrice: '',
                parentConsumePrepayment: '',
                parentLastPrepayment: '',
                leftMoney: '',
                extStudCardBagLastTime: '',
            },
            totalPrice: '',
            prepayment: '',
            teacGs: '',
            teacOtgs: '',
            currency: '',
            reaMonetary: '',
            money: '',
            arrearageMoney: '',
            allSchooltime: '',
            teacFixedPrice: '',
            parentTotalPrice: '',
            parentConsumePrepayment: '',
            parentLastPrepayment: '',
            leftMoney: '',
            studTermCardId: '',
            extStudCardBagLastTime: '',
            teacType: '',
            materialCost: '',
            spoType: '',
            // extStudCardBagLastTime: '',
            blurLeftMoney: "",
            rules: {
                person_liable: [{
                    required: true,
                    message: '请选择责任人',
                    trigger: 'change'
                }],
                studMoney: [{
                    required: true,
                    message: '请输入信息',
                    trigger: 'blue'
                }],
                blurLeftMoney: [{
                    required: true,
                    message: '请输入调整金额',
                    trigger: 'blue'
                }],
                extStudCardBagLastTimeChange: [{
                    required: true,
                    message: '请输入调整学期卡余额',
                    trigger: 'blue'
                }],
                reason: [{
                    required: true,
                    message: '请输入理由',
                    trigger: 'blue'
                }]
            },
            selectOPtion: [{
                key: "1",
                label: "销售 ",
                value: "1"
            }, {
                key: "2",
                label: "师资",
                value: "2"
            }, {
                key: "4",
                label: "讲师 ",
                value: "4"
            }, {
                key: "8",
                label: "学生 ",
                value: "8"
            }],
            disposeOrderDialog: false,
            disposePerson: [],
            desc: '',
            files: '',
            result: '',
            feedBackImg: [],
            isFeedBack: false,
            descArr: [],
            bindData:['']
        }
    },

    mounted() {
        this.getTableData();
        this.hasPermission();
    },
    methods: {
        
        addDesc: function () {
            this.descArr.push(this.bindData);
            // this.desc = '';
        },
        delDesc: function (index) {
            this.descArr.splice(index, 1);
            this.bindData.splice(index, 1);
        },
        deleteImg: function (i) {
            vm.feedBackImg.splice(i, 1);
        },
        checkFeedback: function (row, index) {
            var str = {};
            str = row.sysAfterSaleExceptionLog.sysAfterSaleExceptionLogEntity;
            console.log(str)
            if (str === null) {
                vm.$message({
                    type: 'warning',
                    message: '暂无Feedback'
                })
                return
            }
            for (var i in str.personTypeArr) {
                vm.disposePerson.push(str.personTypeArr[i] + '')
            }
            // vm.disposePerson = str.personTypeArr;
            vm.feedBackImg = str.files;
            vm.bindData = str.reasons;
            vm.descArr = JSON.parse(JSON.stringify(vm.bindData));
            vm.result = str.doSomething + '';
            vm.result2dec1 = str.afterSaleRemarks[0].answer
            vm.result2dec2 = str.afterSaleRemarks[1].answer
            vm.result2dec3 = str.afterSaleRemarks[2].answer
            vm.result2dec4 = str.afterSaleRemarks[3].answer
            vm.isFeedBack = true
            this.disposeOrder(row, index);
        },
        disposeOrder: function (row, index) {
            if (this.isFeedBack == false) {
                this.feedBackImg = [];
                this.descArr = [];
                this.bindData = ['']
                // this.isFeedBack = false
            }
            this.disCourseId = row.id;
            this.disposeOrderDialog = true

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
        disposeOrderDialogClose: function () {
            vm.isFeedBack = false
            this.disposeOrderDialog = false;
            this.disposePerson = [];
            this.desc = '';
            this.result = '';
            this.result2dec1 = '';
            this.result2dec2 = '';
            this.result2dec3 = '';
            this.result2dec4 = '';
            this.uploadFilesArray = [];
            this.bindData = ['']
            vm.uploader.destroy();
        },
        disposeOrderDialogSubmit: function () {
            var _this = this;
            if (vm.disposePerson === null || vm.disposePerson === undefined || vm.disposePerson === []) {
                vm.$message({
                    type: 'warning',
                    message: '请选择责任人'
                })
                return
            }

            // if (this.isFeedBack === false) {
            //     this.descArr.push(this.desc);
            // }
            if (vm.descArr === null || vm.descArr === undefined || vm.descArr.length === 0) {
                vm.$message({
                    type: 'warning',
                    message: '请填写处理意见'
                })
                return
            }
            for (var i in vm.feedBackImg) {
                vm.uploadFilesArray.push(vm.feedBackImg[i]);
            }
            // if (vm.uploadFilesArray === null || vm.uploadFilesArray === undefined || vm.uploadFilesArray.length === 0) {
            //     vm.$message({
            //         type: 'warning',
            //         message: '请上传文件'
            //     })
            //     return
            // }
            if (vm.result === null || vm.result === undefined || vm.result === '') {
                vm.$message({
                    type: 'warning',
                    message: '请选择处理结果'
                })
                return
            }
            if (vm.result === 2) {
                if (vm.result2dec1 === null || vm.result === '') {
                    vm.$message({
                        type: 'warning',
                        message: '请填写已完成的辅导内容'
                    })
                    return
                }
                if (vm.result2dec2 === null || vm.result === '') {
                    vm.$message({
                        type: 'warning',
                        message: '请填写需完成的辅导内容'
                    })
                    return
                }
                if (vm.result2dec3 === null || vm.result === '') {
                    vm.$message({
                        type: 'warning',
                        message: '请填写下一节课需求'
                    })
                    return
                }
                if (vm.result2dec4 === null || vm.result === '') {
                    vm.$message({
                        type: 'warning',
                        message: '请填写对下一任老师说的话'
                    })
                    return
                }
            }
            var decArr = [];
            var afterSaleRemarks = [{
                    "question": "已完成的辅导内容:",
                    "answer": vm.result2dec1
                },
                {
                    "question": "需完成的辅导内容:",
                    "answer": vm.result2dec2
                },
                {
                    "question": "下一节课需求:",
                    "answer": vm.result2dec3
                },
                {
                    "question": "对下一任老师说的话:",
                    "answer": vm.result2dec4
                }
            ];
            var personType = 0;
            for (var i in vm.disposePerson) {
                personType = personType + vm.disposePerson[i] * 1
            }
            for (var i in vm.bindData) {
                decArr.push(vm.bindData[i]);
            }
            // debugger
            // vm.feedBackImg.files
            // for (var i in vm.feedBackImg) {
            //     vm.uploadFilesArray.push(vm.feedBackImg[i]);
            // }
            $.ajax({
                url: baseURL + "sys/oper/giveAdviceForOrder",
                type: 'post',
                dataType: 'json',
                headers: {
                    token: token,
                },
                contentType: 'application/json',
                data: JSON.stringify({
                    courseId: vm.disCourseId,
                    personType: personType,
                    reasons: decArr,
                    files: vm.uploadFilesArray,
                    doSomething: vm.result,
                    afterSaleRemarks: afterSaleRemarks
                }),
                success: function (r) {
                    if (r.status === 200) {
                        vm.$message({
                            type: 'success',
                            message: r.body.msg
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

        imchat(row, index) {
            window.open("chathistory.html?tid=" + row.groupNo + "&sellerId=" + row.sellerRepresenId + "&studId=" + row.userId);
        },
        change_spoTypeArr(val) {
            vm.spoTypeArr = val;
            this.getTableData();
        },
        hasPermission(permission) {
            if (window.parent.permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            }
        },
        change_sooTypeedArr(val) {
            vm.sooTypeedArr = val;
            this.getTableData();
        },
        change_sooStatusedArr(val) {
            vm.sooStatusedArr = val;
            this.getTableData();
        },
        search() {
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
                    "limit": 15,
                    "statused": 65536,
                    // "spoTypeArr": this.spoTypeArr,
                    // "sooTypeedArr": this.sooTypeedArr,
                    // "statused": this.ruleForm.sooStatusedArr,
                    "key": this.tableDataName,
                    "exceptionType": 4
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
        returnValueToAccount(row, index) {
            vm.studId = row.userId
            vm.currency = row.currency
            this.$confirm('是否执行此操作?', '提示', {
                confirmButtonText: '同意',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {
                        "token": token,
                        "studId": vm.studId,
                        "currency": vm.currency
                    },
                    url: "" + baseURL + "/sys/oper/returnValueToAccount",
                    success: function (json) {
                        if (json.status == 200) {
                            vm.$message({
                                message: json.body.msg,
                                type: 'success'
                            });
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                        }
                    }
                });
            }).catch(() => {

            });
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },
        dialogFormVisibleClose: function () {
            this.dialogFormVisible4 = false;
            vm.ruleForm.GB = "";
            vm.ruleForm.OTGB = "";
            vm.ruleForm.studMoney = "";
            vm.ruleForm.person_liable = "";
            vm.ruleForm.reason = "";
            this.ruleForm.blurLeftMoney = "";
            this.ruleForm.extStudCardBagLastTime = "";
        },
        end(row, index) {
            this.loadingAll = true;
            vm.ruleForm.GB = "";
            vm.ruleForm.OTGB = "";
            vm.ruleForm.studMoney = "";
            vm.ruleForm.person_liable = "";
            vm.ruleForm.reason = "";
            vm.btn1 = true;
            vm.btn2 = false;
            vm.label = "退还学生金额";

            if (row.parentId == null) {
                vm.s1 = false
            } else {
                vm.s1 = true
            }
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "id": row.id
                },
                url: "" + baseURL + "/sys/oper/getAccidentParameter",
                success: function (json) {
                    if (json.status == 200) {
                        vm.spoType = json.body.studPurchaseOrder.type; //订单类型
                        if (vm.spoType == 1) {
                            vm.materialCost = json.body.studPurchaseOrder.materialCost;
                        }
                        vm.totalPrice = json.body.studPurchaseOrder.totalPrice; //订单金额
                        vm.currency = json.body.studPurchaseOrder.currency; // 币种
                        vm.prepayment = json.body.studPurchaseOrder.prepayment; //已支付金额
                        vm.leftMoney = json.body.studPurchaseOrder.leftMoney; // 订单余额
                        vm.ruleForm.blurLeftMoney = json.body.studPurchaseOrder.leftMoney
                        vm.arrearageMoney = json.body.studPurchaseOrder.arrearageMoney; //欠费金额
                        vm.studTermCardId = json.body.studPurchaseOrder
                            .studTermCardId; //是否用学期卡支付
                        vm.allSchooltime = json.body.allSchooltime; //学生已上课时
                        if (vm.studTermCardId != 0) {
                            vm.extStudCardBagLastTime = json.body.extStudCardBag
                                .lastTime //学期卡余额
                            vm.ruleForm.extStudCardBagLastTimeChange = json.body.extStudCardBag
                                .lastTime //学期卡余额
                        }
                        vm.teacType = json.body.teacType;
                        vm.teacGs = json.body.teacG * 1 + json.body.teacPreG * 1; //讲师已获G
                        vm.ruleForm.GB = vm.teacGs;
                        if (vm.teacType != null) {
                            if (vm.teacType == 1) { // 全职
                                vm.teacOtgs = json.body.teacOtg * 1 + json.body
                                    .teacPreOtg * 1; //全职已获OTG
                                vm.ruleForm.OTGB = vm.teacOtgs;
                            }
                        }

                        if (json.body.teacType == 1) {
                            vm.showdiv = true
                            vm.s2 = true;
                            vm.s3 = false;
                        } else if (json.body.teacType == 2) {
                            vm.showdiv = true
                            vm.s2 = false;
                            vm.s3 = true;
                        } else if (json.body.teacType == null) {
                            vm.showdiv = false
                            vm.ruleForm.OTGB = 0;
                            vm.s3 = false;
                            vm.s2 = false;
                        };
                        vm.loadingAll = false;
                        // vm.parentTotalPrice = json.body.parentTotalPrice
                        // vm.parentConsumePrepayment = json.body.parentConsumePrepayment
                        // vm.parentLastPrepayment = json.body.parentLastPrepayment
                        // vm.currency = row.studPurchaseOrder.currency;
                        // vm.reaMonetary = row.studPurchaseOrder.reaMonetary;
                        // vm.money = row.studPurchaseOrder.prepayment - row.studPurchaseOrder.reaMonetary;
                        // vm.teacFixedPrice = row.teacFixedPrice;
                        // vm.teacGs = Number(row.teacG) + Number(row.teacPreG);
                        // vm.teacOtgs = Number(row.teacOtg) + Number(row.teacPreOtg);
                        vm.courseId = row.studPurchaseOrder.courseId;
                    }
                }
            });

            vm.dialogFormVisible4 = true;
        },
        change_teacher(row, index) {
            console.log(row)
            vm.ruleForm.GB = "";
            vm.ruleForm.OTGB = "";
            vm.ruleForm.studMoney = "";
            vm.ruleForm.person_liable = "";
            vm.ruleForm.reason = "";
            // vm.btn1 = true;
            // vm.btn2 = false;
            // vm.label = "退还学生金额";
            // if (row.teacType = 1) {
            //     vm.s2 = true;
            //     vm.s3 = true;
            // } else if (row.teacType = null) {
            //     vm.ruleForm.OTGB = 0;
            //     vm.ruleForm.GB = 0;
            //     vm.s3 = false;
            //     vm.s2 = false;
            // } else {
            //     vm.s2 = false;
            //     vm.s3 = true;
            // }
            // if (row.parentId == null) {
            //     vm.s1 = false
            // } else {
            //     vm.s1 = true
            // }
            vm.label = "调整学生金额";
            vm.btn1 = false;
            vm.btn2 = true;
            // vm.courseId = row.studPurchaseOrder.courseId;

            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "id": row.id
                },
                url: "" + baseURL + "/sys/oper/getAccidentParameter",
                success: function (json) {
                    if (json.status == 200) {
                        vm.spoType = json.body.studPurchaseOrder.type; //订单类型
                        if (vm.spoType == 1) {
                            vm.materialCost = json.body.studPurchaseOrder.materialCost;
                        }
                        vm.totalPrice = json.body.studPurchaseOrder.totalPrice; //订单金额
                        vm.currency = json.body.studPurchaseOrder.currency; // 币种
                        vm.prepayment = json.body.studPurchaseOrder.prepayment; //已支付金额
                        vm.leftMoney = json.body.studPurchaseOrder.leftMoney; // 订单余额
                        vm.ruleForm.blurLeftMoney = json.body.studPurchaseOrder.leftMoney
                        vm.arrearageMoney = json.body.studPurchaseOrder.arrearageMoney; //欠费金额
                        vm.studTermCardId = json.body.studPurchaseOrder
                            .studTermCardId; //是否用学期卡支付
                        vm.allSchooltime = json.body.allSchooltime; //学生已上课时
                        if (vm.studTermCardId != 0) {
                            vm.extStudCardBagLastTime = json.body.extStudCardBag
                                .lastTime //学期卡余额
                            vm.ruleForm.extStudCardBagLastTimeChange = json.body.extStudCardBag
                                .lastTime //学期卡余额
                        }
                        vm.teacGs = json.body.teacG * 1 + json.body.teacPreG * 1; //讲师已获G
                        vm.ruleForm.GB = vm.teacGs;
                        vm.teacType = json.body.teacType;
                        if (vm.teacType != null) {
                            if (vm.teacType == 1) { // 全职
                                vm.teacOtgs = json.body.teacOtg * 1 + json.body
                                    .teacPreOtg * 1; //全职已获OTG
                                vm.ruleForm.OTGB = vm.teacOtgs;
                            }
                        }

                        if (json.body.teacType == 1) {
                            vm.showdiv = true
                            vm.s2 = true;
                            vm.s3 = false;
                        } else if (json.body.teacType == 2) {
                            vm.showdiv = true
                            vm.s2 = false;
                            vm.s3 = true;
                        } else if (json.body.teacType == null) {
                            vm.showdiv = false
                            vm.ruleForm.OTGB = 0;
                            vm.ruleForm.GB = 0;
                            vm.s3 = false;
                            vm.s2 = false;
                        };
                        vm.loadingAll = false;
                        // vm.parentTotalPrice = json.body.parentTotalPrice
                        // vm.parentConsumePrepayment = json.body.parentConsumePrepayment
                        // vm.parentLastPrepayment = json.body.parentLastPrepayment;
                        // vm.allSchooltime = json.body.allSchooltime;
                        // vm.totalPrice = row.studPurchaseOrder.totalPrice;
                        // vm.currency = row.studPurchaseOrder.currency;
                        // vm.prepayment = row.studPurchaseOrder.prepayment;
                        // vm.reaMonetary = row.studPurchaseOrder.reaMonetary;
                        // vm.money = row.studPurchaseOrder.prepayment - row.studPurchaseOrder
                        //     .reaMonetary;
                        // vm.arrearageMoney = row.studPurchaseOrder.arrearageMoney;
                        // vm.allSchooltime = row.allSchooltime;
                        // vm.teacFixedPrice = row.teacFixedPrice;
                        // vm.teacGs = Number(row.teacG) + Number(row.teacPreG);
                        // vm.teacOtgs = Number(row.teacOtg) + Number(row.teacPreOtg);
                        vm.courseId = row.studPurchaseOrder.courseId;
                    }
                }
            });
            vm.dialogFormVisible4 = true;
        },
        submitForm3(formName) {
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
                            gb: Number(this.ruleForm.GB),
                            otgb: Number(this.ruleForm.OTGB),
                            personType: this.ruleForm.person_liable,
                            reason: this.ruleForm.reason,
                            hasSalesPerformance: this.ruleForm.hasSalesPerformance,
                            hasOperPerformance: this.ruleForm.hasOperPerformance,
                            orderLastMoney: this.ruleForm.blurLeftMoney,
                            cardLastTime: this.ruleForm.extStudCardBagLastTimeChange,
                            isFinishOrder: false,
                        },
                        url: "" + baseURL + "/sys/oper/doOrderAfterSale",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible4 = false;
                                vm.ruleForm.hasSalesPerformance = true;
                                vm.getTableData();
                                vm.resetForm(formName);
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
                            courseId: vm.courseId,
                            gb: Number(this.ruleForm.GB),
                            otgb: Number(this.ruleForm.OTGB),
                            personType: this.ruleForm.person_liable,
                            reason: this.ruleForm.reason,
                            hasSalesPerformance: this.ruleForm.hasSalesPerformance,
                            hasOperPerformance: this.ruleForm.hasOperPerformance,
                            orderLastMoney: this.ruleForm.blurLeftMoney,
                            cardLastTime: this.ruleForm.extStudCardBagLastTimeChange,
                            isFinishOrder: true,
                        },
                        url: "" + baseURL + "/sys/oper/doOrderAfterSale",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                vm.btnstatus = false;
                                vm.btnval = "确 定";
                                vm.dialogFormVisible4 = false;
                                vm.ruleForm.hasSalesPerformance = true;
                                vm.getTableData();
                                vm.resetForm(formName);
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
        returnsubmitForm(formName) {

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
        Application(row, index) {
            vm.studId = row.userId
            vm.currency = row.currency
            // vm.courseId = row.studPurchaseOrder.courseId;
            // vm.dialogFormVisible = true ;
            if (row.spoType == "-1") {
                this.$confirm('确定要驳回事故单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        data: {
                            "token": token,
                            "studId": vm.studId,
                            "currency": vm.currency
                        },
                        url: "" + baseURL + "/sys/oper/rejectValueToAccount",
                        success: function (json) {
                            if (json.status == 200) {
                                vm.$message({
                                    message: json.body.msg,
                                    type: 'success'
                                });
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);
                            }
                        }
                    });
                }).catch(() => {});

            } else {
                this.$confirm('确定要驳回事故单?', '提示', {
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
                            courseId: row.studPurchaseOrder.courseId,
                        },
                        url: "" + baseURL + "/sys/oper/returnAccidentOrder",
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
                                vm.getTableData();
                            }
                        }
                    });
                }).catch(() => {});
            }

        },
        seedetail(row, index) {
            if (row.spoType == 64) {
                // window.open("bigClassroomInfo.html?id=" + row.id + "");
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else {
                //   window.open("seller_detail.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.id + "");
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
});