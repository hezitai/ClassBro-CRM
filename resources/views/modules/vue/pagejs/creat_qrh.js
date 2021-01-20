var vm = new Vue({
    el: '#app',
    data() {
        return {
            hideUpoladPicture: true,
            useAccountToPay: '--',
            studCardInfo: null,
            updataFiles: false,
            uploadFilesArray: [],
            nomarlCurrency: '',
            currencyList: [], // 选择币种 数组
            xueqikadikoukeshi: 0,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            data: {
                cdId: 0,
                token: token,
                // groupId:groupId
            },
            myHeaders: {
                token: token
            },
            dingzhifudaoyuchongkeshi: false,
            transferImgList: [],
            xueqika: false,
            unitWorth: null,
            cardtimes: '',
            isCard: true,
            isCards: true,
            cardtime: false,
            cardNo: '',
            lastTime: '',
            cardpersenterTime: true,
            cardprice: true,
            cardminMoney: true,
            fileid: [],
            b1: false,
            b2: "确 定",
            url: "" + baseURL + "sys/seller/courseware/save",
            dialogVisibleDJ: false,
            dialogImageUrlDJ: '',
            fileListDJ: [],
            uploadUrl: "" + baseURL + "sys/seller/order/uploadToOss",
            fileList: [],
            changeType: '',
            Specialtype: false,
            specialOrder: true,
            cailiaotype: true,
            time: true,
            lessiontype: '',
            countryCode: '',
            coun: false,
            jisuan: false,
            ifis: false,
            deliverys: '',
            ordershow: false,
            aboutorder: '',
            parentId: '',
            sbtn: true,
            courses: '',
            userId: '',
            current: '',
            amount: '',
            img: false,
            color: '',
            btnstatus: false,
            btnval: "创建",
            countryId: '',
            error: '',
            mobile_show: true,
            yes: false,
            no: false,
            wxAccount: '',
            restaurants: [],
            mobiles: '',
            mobile: '',
            dis: true,
            dis1: false,
            order: false,
            cu: {},
            countrys: '',
            active: 0,
            showone: true,
            showList: true,
            showa: false,
            showb: true,
            activeName: 'first',
            courseFamiliaritys: '',
            show: true,
            purchaseOrderId: '',
            professionalNames: '',
            levels: '',
            universitys: '',
            tableDataBegin: [],
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            phone: '',
            professionalName: '',
            idss: [],
            options: [],
            name: '',
            label: '',
            sellerDemandDesc: '',
            dialogStatus: "",
            delivery: false,
            delivery1: false,
            // 确认函ID
            purchaseId: 0,
            cailiao: false,
            Special: false,
            queryQuotableUserList: [],
            grouplist: '',
            ruleForm: {
                useBalanceToSubscription: false,
                mobileCode: '',
                type: null,
                isFromCard: false,
                userId: '',
                group: '',
                courseFamiliarityId: '',
                endCourseTime: '',
                examTime: '',
                specialOfferUser: '',
                specialOffer: '',
                wordsNum: '',
                theSpecialOffer: false,
                decimalMaterialCost: '',
                minMoney: '',
                persenterTime: '',
                remark: '',
                aboutorder: '',
                amount: '',
                current: '',
                schoolYear: '',
                countryId: '',
                universityId: '',
                levelId: '',
                schoolYear: '',
                professionalId: '',
                nickName: '',
                wxAccount: '',
                mobile: '',
                totalPrice: '',
                price: '',
                scheduledTime: '',
                courseFamiliaritys: '',
                countrysid: '',
                startTime1: '',
                endTime1: '',
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
            },
            rules: {
                wxAccount: [{
                    required: true,
                    message: '请输入微信号',
                    trigger: 'blur'
                }, ],
                totalPrice: [{
                    required: true,
                    message: '请输入课时总价',
                    trigger: 'blur'
                }, ],
                price: [{
                    required: true,
                    message: '请输入课时单价',
                    trigger: 'blur'
                }, ],
                decimalMaterialCost: [{
                    required: true,
                    message: '请输入材料费',
                    trigger: 'blur'
                }, ],
                scheduledTime: [{
                    required: true,
                    message: '请输入预充课时',
                    trigger: 'blur'
                }, ],
                countrysid: [{
                    required: true,
                    message: '请选择留学国家',
                    trigger: 'change'
                }, ],
                mobile: [{
                    required: true,
                    message: '请输入学生手机号',
                    trigger: 'change'
                }, ],
                countryId: [{
                    required: true,
                    message: '请选择国家id',
                    trigger: 'change'
                }, ],
                professionalId: [{
                    required: true,
                    message: '请输入专业名称',
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
                // sellerDemandDesc: [{
                //     required: true,
                //     message: '请输入学生辅导需求',
                //     trigger: 'blur'
                // }, ],
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
                levelId: [{
                    required: true,
                    message: '请选择学术级别',
                    trigger: 'change'
                }, ],
                schoolYear: [{
                    required: true,
                    message: '请选择年级',
                    trigger: 'change'
                }, ],
                endCourseTime: [{
                    required: true,
                    message: '请选择Deal Deadline',
                    trigger: 'change'
                }, ],
                type: [{
                    required: true,
                    message: '请选择订单类型',
                    trigger: 'change'
                }, ],
                courseFamiliarityId: [{
                    required: true,
                    message: '请选择课程熟悉度',
                    trigger: 'change'
                }],
                minMoney: [{
                    required: true,
                    message: '请输入定金',
                    trigger: 'blur'
                }],
                examTime: [{
                    required: true,
                    message: '请选择deadline',
                    trigger: 'change'
                }],
                wordsNum: [{
                    required: true,
                    message: '请填写字数',
                    trigger: 'blur'
                }],
                specialOfferUser: [{
                    required: true,
                    message: '请选择报价人',
                    trigger: 'change'
                }],
                specialOffer: [{
                    required: true,
                    message: '请填写实际工作量',
                    trigger: 'blur'
                }],
            },
            orderQuestionsArr: [],
            isDingzhifudao: false,
            isKaoqiantuji: false,
            isLunwendalibao: false,
        }
    },
    mounted() {
        //sys/basedata/exchangeRate/list
        this.getcountrys()
        this.level()
        this.professionalNamedata()
        this.get_courseFamiliarity()
        this.getqueryQuotableUserList()
        this.xx()
        this.getMobile()
        this.getgroup()
        window.addEventListener('beforeunload', e => this.set());
        this.getcurreny();
        // this.getOrderQuestions();
        // this.filesUploadOss();
    },

    beforeMount() {
        $('.maskLoading').hide();
    },
    methods: {

        getOrderQuestions: function (val) {
            var _this = this;
            $.ajax({
                headers: {
                    token: token
                },
                data:{
                    type:val
                },
                url: baseURL + 'sys/seller/order/getOrderQuestions',
                success: function (r) {
                    // console.error(r);
                    _this.orderQuestionsArr = r.body;
                    for(var i in _this.orderQuestionsArr){
                        if(_this.orderQuestionsArr[i].select != null){
                            _this.orderQuestionsArr[i].select = JSON.parse(_this.orderQuestionsArr[i].select);
                        }
                    }
                    console.log(_this.orderQuestionsArr)
                },
                error: function (er) {

                }
            })
        },

        /**
         * groupId:课件组ID
         * i:index
         */
        filesUploadOss: function (groupId, i) {

            var _this = this;
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
            var uploadFileName = '';
            var GUID = new GUID();

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
                            // uploadFileName = encodeURIComponent(filename);
                            // console.log(uploadFileName)
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
                            // debugger
                            up.setOption({
                                'url': host,
                                'multipart_params': new_multipart_params,
                                // 'multi_selection': false,
                            });

                            up.start();
                        }
                        var uploader = new plupload.Uploader({
                            runtimes: 'html5,flash,silverlight,html4',
                            browse_button: 'selectfiles' + i,
                            flash_swf_url: 'libs/Moxie.swf',
                            silverlight_xap_url: 'libs/Moxie.xap',
                            url: 'http://oss.aliyuncs.com',
                            init: {
                                PostInit: function () {
                                    $('#selectfiles' + i).click();
                                },
                                FilesAdded: function (up, files) {
                                    vm.updataFiles = true;
                                    console.log(files);
                                    uploadFilesNo = files.length;
                                    plupload.each(files, function (file) {
                                        $('#ossfile' + i).append('<div id="' + file.id + '" style="padding-left: 20px;">' + file.name + ' (' + plupload.formatSize(file.size).split(' ')[0] + plupload.formatSize(file.size).split(' ')[1].toUpperCase() + ')<b><span id="file.id" style="display:inline-block"><span></b>' +
                                            '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>');
                                    });
                                    for (var k in files) {
                                        set_upload_param(up, files[k].name, true);
                                    }
                                },
                                BeforeUpload: function (up, file) {
                                    set_upload_param(up, file.name, true);
                                },
                                UploadProgress: function (up, file) {
                                    var d = $('#ossfile' + i).find('#' + file.id);
                                    d.find('.progress').css('display', 'block');
                                    d.find('b').html('<span style="display:inline-block;padding-left:10px;">' + file.percent + "%</span>");
                                    var prog = d.find('div').eq(0);
                                    var progBar = prog.find('div').eq(0);
                                    progBar.css('width', file.percent + '%');
                                    progBar.attr('aria-valuenow', file.percent);
                                },
                                FileUploaded: function (up, file, info) {
                                    if (info.status == 200) {
                                        uploadFilesTimes++;
                                        var aaa = {
                                            cdId: 0,
                                            groupId: groupId,
                                            name: file.name,
                                            url: host + '/' + g_dirname + encodeURIComponent(file.name)
                                        };
                                        vm.uploadFilesArray.push(aaa);
                                        console.log(vm.uploadFilesArray);
                                        if (uploadFilesTimes === uploadFilesNo) {
                                            if (i === 2) {
                                                $('#' + file.id).append($('<span class="importantlogo">文件描述 <input class="filesStateInput" placeholder="请填写文件描述" /></span>'))
                                                $('#' + file.id).find('input').blur(function(){
                                                    _this.setFileState(host + '/' + g_dirname + encodeURIComponent(file.name), $('#' + file.id).find('input').val());
                                                });
                                            }
                                            vm.updataFiles = false;
                                            uploader.destroy()
                                        }
                                    } else {
                                        vm.$message({
                                            type: 'error',
                                            message: '文件上传失败， 请刷新重试'
                                        });
                                        vm.updataFiles = false;
                                    }
                                },
                                Error: function (up, err) {
                                    vm.updataFiles = false;
                                    vm.$message({
                                        type: 'error',
                                        message: '文件上传失败， 请刷新重试'
                                    });
                                }
                            }
                        });
                        uploader.init();
                    }
                },
                error: function (er) {
                    vm.updataFiles = false;
                }

            })
        },
        setFileState(row, val) {
            console.log(row)
            console.log(val)
            console.log(vm.uploadFilesArray);
            for(var i in vm.uploadFilesArray){
                if(row == vm.uploadFilesArray[i].url){
                    vm.uploadFilesArray[i].description = val
                }
            }
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
        changeCurrency(val) {
            var result = null;
            for (var i in this.currencyList) {
                if (val == this.currencyList[i].id) {
                    result = this.currencyList[i];
                }
            };
            // console.log(result);
            this.cu.currency = result.tagerCurrency;
            this.useAccountToPay = result.tagerCurrency;
        },
        changeDJ() {

        },
        successDJ(response, file, fileList) {
            this.transferImgList.push(response.body[0]);
        },
        removeDJ(file, fileList) {},
        handleRemoveDJ(file, fileList) {
            this.transferImgList = [];
            for (var i in fileList) {
                this.transferImgList.push(fileList[i].response.body[0]);
            }
        },
        handlePictureCardPreviewDJ(file) {
            this.dialogImageUrlDJ = file.url;
            this.dialogVisibleDJ = true;
        },

        inputFunc(val) {
            if (val == 0 || val == undefined) {

            } else {
                if (vm.ruleForm.type == 1) {
                    vm.ruleForm.decimalMaterialCost = (Number(vm.ruleForm.totalPrice) * 30 / 100).toFixed(2)
                    vm.ruleForm.price = (Number(vm.ruleForm.totalPrice) * 0.14).toFixed(2)
                    vm.cardtimes = (vm.ruleForm.decimalMaterialCost / Number(vm.unitWorth) + 5).toFixed(2)
                }
                if (vm.ruleForm.type == 4) {

                }
                if (vm.ruleForm.type == 32) {
                    vm.cardtimes = (Number(vm.ruleForm.totalPrice) / Number(vm.unitWorth)).toFixed(2);
                }
            }
        },
        inputFuncs(val) {

        },
        changeprice() {
            if (vm.lessiontype == 1) {
                vm.xueqikadikoukeshi = (vm.ruleForm.totalPrice / vm.unitWorth).toFixed(2);
                vm.ruleForm.decimalMaterialCost = (vm.ruleForm.totalPrice * 30 / 100).toFixed(2);
                vm.ruleForm.scheduledTime = 5;
                vm.ruleForm.price = (vm.ruleForm.totalPrice * 14 / 100).toFixed(2);
            } else if (vm.lessiontype == 0) {
                var num = vm.ruleForm.totalPrice;
                var price = vm.ruleForm.price;
                if (num == "" && price == "") {} else if (num == 0 || price == 0) {
                    vm.ruleForm.scheduledTime = 0;
                } else {
                    vm.ruleForm.scheduledTime = (num / price).toFixed(2);
                }
                vm.xueqikadikoukeshi = vm.ruleForm.scheduledTime
            } else if (vm.lessiontype == 4) {
                // ruleForm.scheduledTime
                var decimalMaterialCost = Number(vm.ruleForm.decimalMaterialCost)
                var scheduledTime = Number(vm.ruleForm.scheduledTime)
                vm.xueqikadikoukeshi = (vm.ruleForm.totalPrice / vm.unitWorth).toFixed(2);
                var num = Number(vm.ruleForm.totalPrice)
                var price = Number(vm.ruleForm.price)
                vm.ruleForm.scheduledTime = ((num - decimalMaterialCost) / price).toFixed(2)
                vm.cardtimes = (Number(vm.ruleForm.decimalMaterialCost) / vm.unitWorth + Number(vm.ruleForm
                    .scheduledTime)).toFixed(2);
                if (vm.cardtimes == Infinity || vm.cardtimes == '-Infinity') {
                    vm.cardtimes = ""
                }
            }
        },
        set() {
            localStorage.setItem("formdata", JSON.stringify({
                "wxAccount": vm.ruleForm.wxAccount,
                "nickName": vm.ruleForm.nickName,
                "mobile": vm.ruleForm.mobile,
                "countryId": vm.ruleForm.countryId,
                "universityId": vm.ruleForm.universityId,
                "professionalId": vm.ruleForm.professionalId,
                "schoolYear": vm.ruleForm.schoolYear,
                "levelId": vm.ruleForm.levelId,
                "schoolAccount": vm.ruleForm.schoolAccount,
                "schoolPws": vm.ruleForm.schoolPws,
                "courseCode": vm.ruleForm.courseCode,
                "courseName": vm.ruleForm.courseName,
                "courseFamiliarityId": vm.ruleForm.courseFamiliarityId,
                "totalPrice": vm.ruleForm.totalPrice,
                "minMoney": vm.ruleForm.minMoney,
                "persenterTime": vm.ruleForm.persenterTime,
                "endCourseTime": vm.ruleForm.endCourseTime,
                "examTime": vm.ruleForm.examTime,
                "sellerDemandDesc": vm.ruleForm.sellerDemandDesc,
                "remark": vm.ruleForm.remark,
                "code": vm.ruleForm.code,
                "type": vm.ruleForm.type,
                "userId": vm.ruleForm.userId,
            }))
        },
        getToken() {
            var formdata = JSON.parse(localStorage.getItem("formdata"))
            if (formdata != undefined) {
                this.ruleForm.nickName = formdata.nickName
                this.ruleForm.mobile = formdata.mobile
                this.ruleForm.wxAccount = formdata.wxAccount
                this.ruleForm.countryId = formdata.countryId
                this.ruleForm.universityId = formdata.universityId
                this.ruleForm.professionalId = formdata.professionalId
                this.ruleForm.schoolYear = formdata.schoolYear
                this.ruleForm.levelId = formdata.levelId
                this.ruleForm.schoolAccount = formdata.schoolAccount
                this.ruleForm.schoolPws = formdata.schoolPws
                this.ruleForm.courseCode = formdata.courseCode
                this.ruleForm.courseName = formdata.courseName
                this.ruleForm.courseFamiliarityId = formdata.courseFamiliarityId
                this.ruleForm.totalPrice = formdata.totalPrice
                this.ruleForm.minMoney = formdata.minMoney
                this.ruleForm.persenterTime = formdata.persenterTime
                this.ruleForm.endCourseTime = formdata.endCourseTime
                this.ruleForm.examTime = formdata.examTime
                this.ruleForm.sellerDemandDesc = formdata.sellerDemandDesc
                this.ruleForm.remark = formdata.remark
                this.ruleForm.code = formdata.code
                this.ruleForm.type = formdata.type
                this.ruleForm.userId = formdata.userId
                if (this.ruleForm.mobile != "") {
                    this.iftrue()
                }
            }
        },
        getMobile() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var mobile = getUrlStr("mobile");
            if (mobile == "" || mobile == null) {
                this.getToken()
            } else {
                this.ruleForm.mobile = mobile;
                this.iftrue();
                this.activeName = "second";
                this.showa = true;
                this.showb = false;
            }
        },
        result() {
            vm.iftrue();
            // vm.xueqika = true;
            // vm.isCard=true;
            vm.ruleForm.isFromCard = false;

        },
        iftrue() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "absoluteMobile": this.ruleForm.mobile,
                    "page": 1,
                    "limit": 100000,
                },
                url: "" + baseURL + "/sys/seller/order/checkMobile",
                success: function (json) {
                    if (json.status == 200) {
                        if (json.body.studUserRVO == null) {
                            vm.error = "";
                        } else {
                            vm.ifis = false;
                            vm.userId = json.body.studUserRVO.userId;
                            vm.ruleForm.userId = json.body.studUserRVO.userId;
                            vm.ruleForm.mobileCode = json.body.studUserRVO.mobileCode;
                            vm.mobile_show = false;
                            vm.ruleForm.nickName = json.body.studUserRVO.nickName;
                            vm.ruleForm.countryId = json.body.studUserRVO.countryId;
                            vm.countryId = json.body.studUserRVO.countryId;
                            if (json.body.studUserRVO.countryId == null) {
                                vm.coun = false
                            } else {
                                vm.coun = true
                            }
                            vm.ruleForm.code = json.body.studUserRVO.countryId;
                            vm.ruleForm.type = '',
                                vm.ruleForm.mobile = Number(json.body.studUserRVO.mobile)
                            vm.ruleForm.wxAccount = json.body.studUserRVO.wxAccount;
                            vm.ruleForm.universityId = json.body.studUserRVO.universityId;
                            vm.ruleForm.levelId = json.body.studUserRVO.eduId;
                            vm.ruleForm.schoolYear = "" + json.body.studUserRVO.schoolYear + "";
                            vm.ruleForm.professionalId = json.body.studUserRVO.professionalId;
                            vm.ruleForm.schoolAccount = json.body.studUserRVO.schoolAccount;
                            vm.ruleForm.schoolPws = json.body.studUserRVO.schoolPws;
                            var time = (json.body.studUserRVO.spareTime).split("|");
                            var startTime1 = ((time[0].split(","))[0]).split("-");
                            vm.ruleForm.startTime1 = startTime1[0];
                            vm.ruleForm.endTime1 = startTime1[1];
                            var startTime2 = ((time[0].split(","))[1]).split("-");
                            vm.ruleForm.startTime2 = startTime2[0];
                            vm.ruleForm.endTime2 = startTime2[1];
                            var startTime3 = ((time[0].split(","))[2]).split("-");
                            vm.ruleForm.startTime3 = startTime3[0];
                            vm.ruleForm.endTime3 = startTime3[1];
                            var startTime4 = ((time[1].split(","))[0]).split("-");
                            vm.ruleForm.startTime4 = startTime4[0];
                            vm.ruleForm.endTime4 = startTime4[1];
                            var startTime5 = ((time[1].split(","))[1]).split("-");
                            vm.ruleForm.startTime5 = startTime5[0];
                            vm.ruleForm.endTime5 = startTime5[1];
                            var startTime6 = ((time[1].split(","))[2]).split("-");
                            vm.ruleForm.startTime6 = startTime6[0];
                            vm.ruleForm.endTime6 = startTime6[1];
                            var startTime7 = ((time[2].split(","))[0]).split("-");
                            vm.ruleForm.startTime7 = startTime7[0];
                            vm.ruleForm.endTime7 = startTime7[1];
                            var startTime8 = ((time[2].split(","))[1]).split("-");
                            vm.ruleForm.startTime8 = startTime8[0];
                            vm.ruleForm.endTime8 = startTime8[1];
                            var startTime9 = ((time[2].split(","))[2]).split("-");
                            vm.ruleForm.startTime9 = startTime9[0];
                            vm.ruleForm.endTime9 = startTime9[1];
                            var startTime10 = ((time[3].split(","))[0]).split("-");
                            vm.ruleForm.startTime10 = startTime10[0];
                            vm.ruleForm.endTime10 = startTime10[1];
                            var startTime11 = ((time[3].split(","))[1]).split("-");
                            vm.ruleForm.startTime11 = startTime11[0];
                            vm.ruleForm.endTime11 = startTime11[1];
                            var startTime12 = ((time[3].split(","))[2]).split("-");
                            vm.ruleForm.startTime12 = startTime12[0];
                            vm.ruleForm.endTime12 = startTime12[1];
                            var startTime13 = ((time[4].split(","))[0]).split("-");
                            vm.ruleForm.startTime13 = startTime13[0];
                            vm.ruleForm.endTime13 = startTime13[1];
                            var startTime14 = ((time[4].split(","))[1]).split("-");
                            vm.ruleForm.startTime14 = startTime14[0];
                            vm.ruleForm.endTime14 = startTime14[1];
                            var startTime15 = ((time[4].split(","))[2]).split("-");
                            vm.ruleForm.startTime15 = startTime15[0];
                            vm.ruleForm.endTime15 = startTime15[1];
                            var startTime16 = ((time[5].split(","))[0]).split("-");
                            vm.ruleForm.startTime16 = startTime16[0];
                            vm.ruleForm.endTime16 = startTime16[1];
                            var startTime17 = ((time[5].split(","))[1]).split("-");
                            vm.ruleForm.startTime17 = startTime17[0];
                            vm.ruleForm.endTime17 = startTime17[1];
                            var startTime18 = ((time[5].split(","))[2]).split("-");
                            vm.ruleForm.startTime18 = startTime18[0];
                            vm.ruleForm.endTime18 = startTime18[1];
                            var startTime19 = ((time[6].split(","))[0]).split("-");
                            vm.ruleForm.startTime19 = startTime19[0];
                            vm.ruleForm.endTime19 = startTime19[1];
                            var startTime20 = ((time[6].split(","))[1]).split("-");
                            vm.ruleForm.startTime20 = startTime20[0];
                            vm.ruleForm.endTime20 = startTime20[1];
                            var startTime21 = ((time[6].split(","))[2]).split("-");
                            vm.ruleForm.startTime21 = startTime21[0];
                            vm.ruleForm.endTime21 = startTime21[1];
                            vm.error = "该学生已注册";
                            vm.color = 'green';
                            vm.xx();
                            vm.getCurrent(vm.countrys, vm.countryId);
                            if (json.body.studCardBagRVO != null) {
                                vm.studCardInfo = json.body.studCardBagRVO;
                                vm.cardNo = json.body.studCardBagRVO.cardNo
                                vm.lastTime = json.body.studCardBagRVO.lastTime
                                vm.unitWorth = json.body.studCardBagRVO.unitWorth
                                // vm.ruleForm.isFromCard = true;
                                vm.ruleForm.isFromCard = true;
                                vm.cardtime = true
                                if (json.body.studCardBagRVO.lastTime == 0) {
                                    vm.isCards = false
                                    vm.cardtime = false
                                    vm.ruleForm.isFromCard = false
                                    vm.xueqika = true
                                }
                            } else {
                                vm.isCard = false
                                vm.isCards = false
                                vm.cardtime = false
                                vm.ruleForm.isFromCard = false
                            }
                        }
                        if (json.body.teacUserRVO != null) {
                            vm.ifis = false;
                            vm.color = 'red';
                            vm.error = "该账号已经被老师注册，请更换手机号";
                            vm.ruleForm.nickName = "";
                            vm.ruleForm.wxAccount = "";
                            vm.ruleForm.countryId = "";
                            vm.ruleForm.universityId = "";
                            vm.ruleForm.levelId = "";
                            vm.ruleForm.schoolYear = "";
                            vm.ruleForm.professionalId = "";
                        }
                        if (json.body.sysUserEntity != null) {
                            vm.ifis = false;
                            vm.color = 'red';
                            vm.error = "该账号已经在CRM注册，请更换手机号";
                            vm.ruleForm.nickName = "";
                            vm.ruleForm.wxAccount = "";
                            vm.ruleForm.countryId = "";
                            vm.ruleForm.universityId = "";
                            vm.ruleForm.levelId = "";
                            vm.ruleForm.schoolYear = "";
                            vm.ruleForm.professionalId = "";
                        }
                        if (json.body.studUserRVO == null && json.body.sysUserEntity == null &&
                            json.body.teacUserRVO == null) {
                            vm.ifis = false;
                            vm.mobile_show = true;
                            vm.error = "该账号未被注册";
                            vm.color = 'green';
                            vm.if = false;
                            vm.coun = false;
                            vm.ruleForm.mobileCode = '';
                            vm.ruleForm.nickName = "";
                            vm.ruleForm.wxAccount = "";
                            vm.ruleForm.countryId = "";
                            vm.ruleForm.universityId = "";
                            vm.ruleForm.levelId = "";
                            vm.ruleForm.schoolYear = "";
                            vm.ruleForm.schoolAccount = '';
                            vm.ruleForm.professionalId = "";
                            vm.ruleForm.type = '';
                            vm.ruleForm.courseCode = '';
                            vm.ruleForm.courseName = '';
                            vm.ruleForm.courseFamiliarityId = '';
                            vm.ruleForm.totalPrice = '';
                            vm.ruleForm.minMoney = '';
                            vm.ruleForm.schoolPws = '';
                            vm.ruleForm.persenterTime = '';
                            vm.ruleForm.endCourseTime = '';
                            vm.ruleForm.examTime = '';
                            vm.ruleForm.sellerDemandDesc = '';
                            vm.ruleForm.remark = '';
                            vm.ruleForm.code = '';
                            vm.ruleForm.userId = '';
                            vm.cu = {};
                            vm.studCardInfo = null;
                            vm.cardNo = '';
                            vm.lastTime = '';
                            vm.unitWorth = null;
                            // vm.ruleForm.isFromCard = true;
                            vm.ruleForm.isFromCard = true;
                            vm.cardtime = true
                            if (json.body.studCardBagRVO.lastTime == 0) {
                                vm.isCards = false
                                vm.cardtime = false
                                vm.ruleForm.isFromCard = false
                                vm.xueqika = true
                            }
                        }
                    }
                    if (json.status == 400) {
                        vm.ifis = false;
                        vm.error = json.body.msg;
                        vm.ruleForm.nickName = "";
                    }
                }
            });
        },
        getgroup() {
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
                        vm.grouplist = r.body.list
                    }
                }
            });
        },
        getCurrent(cus, cuid) {
            cus.forEach(element => {
                var cid = element.id;
                if (cid === cuid) {
                    vm.cu.currency = element.currency;
                    vm.countryCode = element.code;
                    return element.currency;
                }
                return "未找到指定币种";
            });
        },
        change_card(val) {
            console.log('--', val)
            console.log(this.dis1);
            if (val == true) {
                if (this.studCardInfo != null) {
                    this.cu.currency = this.studCardInfo.currency;
                }
            };
            vm.ruleForm.isFromCard = val;

            if (vm.ruleForm.type == '0' && vm.ruleForm.isFromCard == false) {
                vm.isDingzhifudao = true;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.cardtime = false
                vm.cardprice = true
                vm.cardpersenterTime = true
                vm.cardminMoney = true
                vm.cailiaotype = true;
                vm.cailiao = false;
                vm.order = true;
                vm.dis = true;
                vm.jisuan = true;
                vm.ruleForm.decimalMaterialCost = 0;
                vm.ruleForm.scheduledTime = null;
                vm.ruleForm.price = "";
                vm.dis1 = false;
                vm.ifis = true;
                vm.specialOrder = true;
                vm.Special = false;
                vm.ruleForm.wordsNum = 0;
                vm.time = true;
            } else if (vm.ruleForm.type == 1 && vm.ruleForm.isFromCard == false) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = true;
                vm.isLunwendalibao = false;
                vm.cardtime = false
                vm.cardprice = true
                vm.cardpersenterTime = true
                vm.cardminMoney = true
                vm.ruleForm.wordsNum = 0;
                vm.cardminMoney = true
                vm.cailiaotype = true;
                vm.cailiao = true;
                vm.order = true;
                vm.dis1 = true;
                // vm.dis1 = true;
                vm.ruleForm.price = ""
                vm.ruleForm.scheduledTime = 5;
                vm.time = true;
                vm.ifis = true;
                vm.specialOrder = true;
                vm.Special = false;
            } else if (vm.ruleForm.type == 4 && vm.ruleForm.isFromCard == false) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = true;
                vm.cardtime = false
                vm.cailiaotype = false;
                vm.dis1 = false;
                vm.cardminMoney = true
                vm.cailiao = true;
                vm.order = true;
                vm.ruleForm.price = "";
                vm.ruleForm.scheduledTime = null;
                vm.ifis = false;
                vm.time = true;
                vm.specialOrder = true;
                vm.Special = true;
            } else if (vm.ruleForm.type == 32 && vm.ruleForm.isFromCard == false) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.cardtime = false
                vm.ifis = true;
                vm.ruleForm.wordsNum = 0;
                vm.cailiaotype = true;
                vm.time = true;
                vm.specialOrder = false,
                    vm.order = false;
                vm.Special = false;
                vm.cailiao = false;
                vm.cardminMoney = true
            } else if (vm.ruleForm.type == '0' && vm.ruleForm.isFromCard == true) {
                vm.isDingzhifudao = true;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.cardtime = true
                vm.cardprice = false
                vm.cardminMoney = false
                vm.ruleForm.price = vm.unitWorth
                vm.order = false
                vm.cailiao = false
                vm.cardpersenterTime = false
                vm.specialOrder = false
            } else if (vm.ruleForm.type == 1 && vm.ruleForm.isFromCard == true) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = true;
                vm.isLunwendalibao = false;
                vm.cardtime = true
                vm.order = true
                vm.cardprice = true
                vm.cardminMoney = false
                // vm.cailiao = false
                vm.dis1 = true;
                vm.cailiao = true
                vm.cardpersenterTime = false
                vm.specialOrder = false
            } else if (vm.ruleForm.type == 4 && vm.ruleForm.isFromCard == true) {
                vm.isDingzhifudao = false;
                vm.Special = true
                vm.cardtime = true
                vm.order = true
                vm.dis1 = false;
                vm.cailiaotype = false;
                vm.specialOrder = true
                vm.cailiao = true
                vm.cardminMoney = false
                vm.cardpersenterTime = false
            } else if (vm.ruleForm.type == 32 && vm.ruleForm.isFromCard == true) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = true;
                vm.cardtime = true
                vm.order = false
                vm.cailiao = false
                vm.cardpersenterTime = false
                vm.specialOrder = false
                vm.cardminMoney = false
                vm.cardprice = true
            } else if (vm.ruleForm.isFromCard == true && vm.ruleForm.type == '') {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.isCards = true
                vm.cardtime = true
            } else if (vm.ruleForm.isFromCard == false && vm.ruleForm.type == '') {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.isCards = false
                vm.cardtime = false
            } else {}

            this.changeprice();
        },
        change_order(val) {
            console.log(val)
            if (val == 0 || val == 1 || val == 4) {
                this.getOrderQuestions(val);
            }
            vm.lessiontype = val;
            vm.ruleForm.totalPrice = '';
            vm.ruleForm.minMoney = '';
            vm.ruleForm.decimalMaterialCost = '';
            vm.ruleForm.price = '';
            vm.ruleForm.scheduledTime = '';
            vm.xueqikadikoukeshi = 0;
            vm.ruleForm.totalPrice = null;
            vm.ruleForm.price = null;
            vm.cardtimes = "";
            vm.ruleForm.minMoney = null;
            if (vm.ruleForm.type == '0' && vm.ruleForm.isFromCard == false) {
                vm.isDingzhifudao = true;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.cardtime = false
                vm.cardprice = true
                vm.cardpersenterTime = true
                vm.cardminMoney = true
                vm.cailiaotype = true;
                vm.cailiao = false;
                vm.order = true;
                vm.dis = true;
                vm.jisuan = true;
                vm.ruleForm.decimalMaterialCost = 0;
                vm.ruleForm.scheduledTime = null;
                vm.ruleForm.price = "";
                vm.dis1 = false;
                vm.ifis = true;
                vm.specialOrder = true;
                vm.Special = false;
                vm.ruleForm.wordsNum = 0;
                vm.time = true;
            } else if (vm.ruleForm.type == 1 && vm.ruleForm.isFromCard == false) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = true;
                vm.isLunwendalibao = false;
                vm.cardtime = false
                vm.cardprice = true
                vm.cardpersenterTime = true
                vm.cardminMoney = true
                vm.ruleForm.wordsNum = 0;
                vm.cardminMoney = true
                vm.cailiaotype = true;
                vm.cailiao = true;
                vm.order = true;
                vm.dis1 = true;
                vm.ruleForm.price = ""
                vm.ruleForm.scheduledTime = 5;
                vm.time = true;
                vm.ifis = true;
                vm.specialOrder = true;
                vm.Special = false;
            } else if (vm.ruleForm.type == 4 && vm.ruleForm.isFromCard == false) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = true;
                vm.cardtime = false
                vm.cailiaotype = false;
                vm.dis1 = false;
                vm.cardminMoney = true
                vm.cailiao = true;
                vm.order = true;
                vm.ruleForm.price = "";
                vm.ruleForm.scheduledTime = null;
                vm.ifis = false;
                vm.time = true;
                vm.specialOrder = true;
                vm.Special = true;
            } else if (vm.ruleForm.type == 32 && vm.ruleForm.isFromCard == false) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.cardtime = false
                vm.ifis = true;
                vm.ruleForm.wordsNum = 0;
                vm.cailiaotype = true;
                vm.time = true;
                vm.specialOrder = false,
                    vm.order = false;
                vm.Special = false;
                vm.cailiao = false;
                vm.cardminMoney = true
            } else if (vm.ruleForm.type == '0' && vm.ruleForm.isFromCard == true) {
                vm.isDingzhifudao = true;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.ruleForm.price = vm.unitWorth
                vm.cardtime = true
                vm.cardprice = false
                vm.cardminMoney = false
                vm.order = false
                vm.cailiao = false
                vm.cardpersenterTime = false
                vm.specialOrder = false
            } else if (vm.ruleForm.type == 1 && vm.ruleForm.isFromCard == true) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = true;
                vm.isLunwendalibao = false;
                vm.cardtime = true
                vm.order = true
                vm.cardprice = true
                vm.cardminMoney = false
                vm.dis1 = true;
                vm.cailiao = true
                vm.cardpersenterTime = false
                vm.specialOrder = false
            } else if (vm.ruleForm.type == 4 && vm.ruleForm.isFromCard == true) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = true;
                vm.Special = true
                vm.cardtime = true
                vm.order = true
                vm.cailiaotype = false;
                vm.cailiao = true;
                vm.dis1 = false;
                vm.cardminMoney = false
                vm.specialOrder = true
                vm.cardpersenterTime = false
            } else if (vm.ruleForm.type == 32 && vm.ruleForm.isFromCard == true) {
                vm.isDingzhifudao = false;
                vm.isKaoqiantuji = false;
                vm.isLunwendalibao = false;
                vm.cardtime = true
                vm.order = false
                vm.cailiao = false
                vm.cardpersenterTime = false
                vm.specialOrder = false
                vm.cardminMoney = false
                vm.cardprice = true
            } else {

            }

            this.changeprice();
        },
        get_courseFamiliarity() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    "token": token,
                    "page": 1,
                    "limit": 100,
                    "onlyMe": true
                },
                url: "" + baseURL + "sys/basedata/coursefamiliarity/list",
                success: function (json) {
                    vm.courseFamiliaritys = json.body.list;
                }
            });
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
        change_state(val) {
            vm.ruleForm.universityId = "";
            let obj = {};
            obj = this.countrys.find((item) => {
                return item.id === val;
            });
            // vm.cu = obj;
            vm.countryId = val;
            vm.xx();
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
                    vm.countrys = json.body.list
                }
            });
        },
        change_country(val) {
            if (vm.coun == true) {
                vm.coun = false
            } else {
                vm.coun = true
            }
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
        next() {
            vm.showa = true;
            vm.showb = false;
            vm.activeName = 'second';
        },
        // 返回
        back(tab, first) {
            this.$confirm('是否执行此操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.history.back(-1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 保存      
        save(formName) {
            if (vm.ruleForm.examTime == undefined) {
                vm.ruleForm.examTime = null;
            }
            if (vm.ruleForm.endCourseTime == undefined) {
                vm.ruleForm.endCourseTime = null;
            }
            if (vm.ruleForm.persenterTime == "") {
                vm.ruleForm.persenterTime = 0;
            }
            var model = this.$refs.ruleForm.model;
            if (vm.ruleForm.startTime1 == "" || vm.ruleForm.endTime1 == "") {
                time1 = '';
            } else {
                time1 = vm.ruleForm.startTime1 + "-" + vm.ruleForm.endTime1;
            }
            if (vm.ruleForm.startTime2 == "" || vm.ruleForm.endTime2 == "") {
                time2 = '';
            } else {
                time2 = vm.ruleForm.startTime2 + "-" + vm.ruleForm.endTime2;
            }
            if (vm.ruleForm.startTime3 == "" || vm.ruleForm.endTime3 == "") {
                time3 = '';
            } else {
                time3 = vm.ruleForm.startTime3 + "-" + vm.ruleForm.endTime3;
            }
            if (vm.ruleForm.startTime4 == "" || vm.ruleForm.endTime4 == "") {
                time4 = '';
            } else {
                time4 = vm.ruleForm.startTime4 + "-" + vm.ruleForm.endTime4;
            }
            if (vm.ruleForm.startTime5 == "" || vm.ruleForm.endTime5 == "") {
                time5 = '';
            } else {
                time5 = vm.ruleForm.startTime5 + "-" + vm.ruleForm.endTime5;
            }
            if (vm.ruleForm.startTime6 == "" || vm.ruleForm.endTime6 == "") {
                time6 = '';
            } else {
                time6 = vm.ruleForm.startTime6 + "-" + vm.ruleForm.endTime6;
            }
            if (vm.ruleForm.startTime7 == "" || vm.ruleForm.endTime7 == "") {
                time7 = '';
            } else {
                time7 = vm.ruleForm.startTime7 + "-" + vm.ruleForm.endTime7;
            }
            if (vm.ruleForm.startTime8 == "" || vm.ruleForm.endTime8 == "") {
                time8 = '';
            } else {
                time8 = vm.ruleForm.startTime8 + "-" + vm.ruleForm.endTime8;
            }
            if (vm.ruleForm.startTime9 == "" || vm.ruleForm.endTime9 == "") {
                time9 = '';
            } else {
                time9 = vm.ruleForm.startTime9 + "-" + vm.ruleForm.endTime9;
            }
            if (vm.ruleForm.startTime10 == "" || vm.ruleForm.endTime10 == "") {
                time10 = '';
            } else {
                time10 = vm.ruleForm.startTime10 + "-" + vm.ruleForm.endTime10;
            }
            if (vm.ruleForm.startTime11 == "" || vm.ruleForm.endTime11 == "") {
                time11 = '';
            } else {
                time11 = vm.ruleForm.startTime11 + "-" + vm.ruleForm.endTime11;
            }
            if (vm.ruleForm.startTime12 == "" || vm.ruleForm.endTime12 == "") {
                time12 = '';
            } else {
                time12 = vm.ruleForm.startTime12 + "-" + vm.ruleForm.endTime12;
            }
            if (vm.ruleForm.startTime13 == "" || vm.ruleForm.endTime13 == "") {
                time13 = '';
            } else {
                time13 = vm.ruleForm.startTime13 + "-" + vm.ruleForm.endTime13;
            }
            if (vm.ruleForm.startTime14 == "" || vm.ruleForm.endTime14 == "") {
                time14 = '';
            } else {
                time14 = vm.ruleForm.startTime14 + "-" + vm.ruleForm.endTime14;
            }
            if (vm.ruleForm.startTime15 == "" || vm.ruleForm.endTime15 == "") {
                time15 = '';
            } else {
                time15 = vm.ruleForm.startTime15 + "-" + vm.ruleForm.endTime15;
            }
            if (vm.ruleForm.startTime16 == "" || vm.ruleForm.endTime16 == "") {
                time16 = '';
            } else {
                time16 = vm.ruleForm.startTime16 + "-" + vm.ruleForm.endTime16;
            }
            if (vm.ruleForm.startTime17 == "" || vm.ruleForm.endTime17 == "") {
                time17 = '';
            } else {
                time17 = vm.ruleForm.startTime17 + "-" + vm.ruleForm.endTime17;
            }
            if (vm.ruleForm.startTime18 == "" || vm.ruleForm.endTime18 == "") {
                time18 = '';
            } else {
                time18 = vm.ruleForm.startTime18 + "-" + vm.ruleForm.endTime18;
            }
            if (vm.ruleForm.startTime19 == "" || vm.ruleForm.endTime19 == "") {
                time19 = '';
            } else {
                time19 = vm.ruleForm.startTime19 + "-" + vm.ruleForm.endTime19;
            }
            if (vm.ruleForm.startTime20 == "" || vm.ruleForm.endTime20 == "") {
                time20 = '';
            } else {
                time20 = vm.ruleForm.startTime20 + "-" + vm.ruleForm.endTime20;
            }
            if (vm.ruleForm.startTime21 == "" || vm.ruleForm.endTime21 == "") {
                time21 = '';
            } else {
                time21 = vm.ruleForm.startTime21 + "-" + vm.ruleForm.endTime21;
            }
            var freetime = time1 + ',' + time2 + ',' + time3 + '|' + time4 + ',' + time5 + ',' + time6 +
                '|' + time7 + ',' + time8 + ',' + time9 + '|' + time10 + ',' + time11 + ',' + time12 + '|' +
                time13 + ',' + time14 + ',' + time15 + '|' + time16 + ',' + time17 + ',' + time18 + '|' +
                time19 + ',' + time20 + ',' + time21;
            var self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (vm.changeType == true) {
                        if (vm.ruleForm.specialOfferUser == "" || vm.ruleForm.specialOffer == "") {
                            self.$message({
                                message: "请填写报价人和实际工作量",
                                type: 'warning',
                            });
                            return;
                        }
                    }
                    if (vm.ruleForm.type == 0 || vm.ruleForm.type == 1 || vm.ruleForm.type == 4) {
                        if (vm.ruleForm.examTime == "" || vm.ruleForm.endCourseTime == "") {
                            self.$message({
                                message: "请填写时间",
                                type: 'warning',
                            });
                            return;
                        }
                    }
                    if (Number(vm.ruleForm.totalPrice) < Number(vm.ruleForm.minMoney)) {
                        self.$message({
                            message: "定金不能大于总价",
                            type: 'warning',
                        });
                        return;
                    }
                    if (vm.ordershow == true) {
                        if (vm.ruleForm.aboutorder == "") {
                            self.$message({
                                message: "请选择关联订单",
                                type: 'warning',
                            });
                            return;
                        }
                    }
                    if (vm.order == true) {
                        if (vm.ruleForm.price == "") {
                            self.$message({
                                message: "请填写课程单价",
                                type: 'warning',
                            });
                            return;
                        }
                    }
                    
                    if (this.isDingzhifudao == true || this.isKaoqiantuji == true || this.isLunwendalibao == true) {
                        var strhhh = [];
                        for(var i in this.orderQuestionsArr){
                            var a = {};
                            a.value = this.orderQuestionsArr[i].value;
                            a.question = this.orderQuestionsArr[i].question;
                            a.answer = this.orderQuestionsArr[i].answer;
                            a.type = this.orderQuestionsArr[i].type;
                            strhhh.push(a);
                        }
                        // this.$refs.ruleForm.model.sellerDemandDesc = JSON.stringify(this.orderQuestionsArr);
                        this.$refs.ruleForm.model.sellerDemandDesc = JSON.stringify(strhhh);
                    }
                    // if (this.isKaoqiantuji == true) {
                    //     this.$refs.ruleForm.model.sellerDemandDesc = JSON.stringify(this.orderQuestionsArr);
                    // }
                    // if (this.isLunwendalibao == true) {
                    //     this.$refs.ruleForm.model.sellerDemandDesc = JSON.stringify(this.orderQuestionsArr);
                    // }
                    // if(vm.ruleForm.minMoney != 0){
                    //     if(this.transferImgList.length == 0){
                    //         vm.$message({
                    //             message: "请上传定金图片",
                    //             type: 'warning',
                    //         });
                    //         return;
                    //     }
                    // }
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
                            studUser: {
                                mobile: this.$refs.ruleForm.model.mobile,
                                password: this.$refs.ruleForm.model.password,
                                countryId: this.$refs.ruleForm.model.countryId,
                                nickName: this.$refs.ruleForm.model.nickName,
                                wxAccount: this.$refs.ruleForm.model.wxAccount,
                            },
                            flag: 1,
                            fromCard: vm.ruleForm.isFromCard,
                            specialOfferUser: vm.ruleForm.specialOfferUser,
                            specialOffer: vm.ruleForm.specialOffer,
                            wordsNum: vm.ruleForm.wordsNum,
                            theSpecialOffer: vm.ruleForm.theSpecialOffer,
                            decimalMaterialCost: Number(vm.ruleForm
                                .decimalMaterialCost),
                            // persenterTime: vm.ruleForm.persenterTime,
                            minMoney: Number(vm.ruleForm.minMoney),
                            parentId: this.$refs.ruleForm.model.aboutorder,
                            wxAccount: this.$refs.ruleForm.model.wxAccount,
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
                            decimalPrice: Number(vm.ruleForm.price),
                            universityId: this.$refs.ruleForm.model.universityId,
                            eduId: Number(this.$refs.ruleForm.model.levelId),
                            schoolYear: Number(this.$refs.ruleForm.model
                                .schoolYear),
                            examTime: this.$refs.ruleForm.model.examTime + ' 23:59:59',
                            endCourseTime: this.$refs.ruleForm.model.endCourseTime + ' 23:59:59',
                            courseFamiliarityId: Number(this.$refs.ruleForm.model
                                .courseFamiliarityId),
                            courseFamiliarity: vm.familiarity,
                            type: Number(this.$refs.ruleForm.model.type),
                            schoolAccount: this.$refs.ruleForm.model.schoolAccount,
                            schoolPws: this.$refs.ruleForm.model.schoolPws,
                            spareTime: freetime,
                            sellerDemandDesc: this.$refs.ruleForm.model
                                .sellerDemandDesc,
                            remark: this.$refs.ruleForm.model.remark,
                            coursewareIds: this.fileid,
                            transferImgList: this.transferImgList,
                            currency: vm.cu.currency,
                            mobileCode: vm.ruleForm.mobileCode,
                            studCoursewareCVOList: vm.uploadFilesArray,
                            minMoneyFromAccount: vm.ruleForm.useBalanceToSubscription,
                        }),
                        success: function (r) {
                            if (r.status == 200) {
                                vm.ruleForm = '';
                                localStorage.removeItem("formdata")
                                vm.btnstatus = false;
                                vm.btnval = "创建";
                                vm.$message({
                                    message: "创建成功",
                                    type: 'success',
                                });
                                setTimeout(function () {
                                    window.history.back();
                                }, 1000);
                            }
                            if (r.status == 400) {
                                self.$message({
                                    message: r.body.msg,
                                    type: 'warning',
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
        useBalanceToSubscriptionChange: function () {
            // console.log(vm.ruleForm.useBalanceToSubscription);
            if (vm.ruleForm.useBalanceToSubscription == true) {
                this.hideUpoladPicture = false;
            } else {
                this.hideUpoladPicture = true;
            }
        },
        change_type(val) {
            vm.changeType = val
            if (val == true) {
                vm.Specialtype = true;
            } else {
                vm.Specialtype = false;
            }
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
                    vm.levels = json.body.list
                }
            });
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
                    vm.professionalNames = json.body.list
                }
            });
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
        change_delivery1(val) {
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
                vm.ordershow = false
                vm.ruleForm.aboutorder = ""
            }
        },
        change(file, fileList) {
            vm.files = fileList
        },
        handleRemove(file, fileList) {
            vm.files = fileList
        },
        success(res) {
            vm.b1 = false
            vm.b2 = "确 定"
            vm.fileid.push.apply(vm.fileid, res.body)
            console.log(vm.fileid)
            vm.btnstatus = false
        },
        submitUpload(id) {
            if (vm.files == "" || vm.files == undefined) {
                return;
            }
            vm.b1 = true
            vm.b2 = "加载中"
            vm.btnstatus = true
            this.formDate = new FormData();
            for (i = 0; i < vm.files.length; i++) {
                this.formDate.append('file' + i, vm.files[i].raw);
            }
            this.formDate.append('cdId', "0")
            this.formDate.append('groupId', id)
            let config = {
                headers: {
                    processData: false,
                    contentType: false,
                    mimeType: "multipart/form-data",
                    token: token
                }
            }
            axios.post("" + baseURL + "sys/seller/courseware/save", this.formDate, config).then(res => {
                if (res.data.status == 200) {
                    vm.$message({
                        message: "创建成功",
                        type: 'success'
                    });
                    vm.b1 = false
                    vm.b2 = "确 定"
                    vm.fileid.push.apply(vm.fileid, res.data.body)
                    console.log(vm.fileid)
                    vm.btnstatus = false
                }
                if (res.data.status == 400) {
                    vm.$message({
                        message: res.data.body.msg,
                        type: 'warning'
                    });
                    vm.b1 = false
                    vm.b2 = "确 定"
                }
            }).catch(res => {

            })
        },
    }
});