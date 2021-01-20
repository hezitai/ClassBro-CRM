var vm = new Vue({
    el: '#app',
    data() {
        return {
            channelInformation: {},
            havechannelStatus: false,
            loadingPage: false,
            channelNameList: [],
            disabled1: true,
            disabled2: true,
            disabled3: true,
            disabled4: true,
            disabled5: true,
            activeName: 'first',
            showItem: true,
            noCheckList: false,
            channelInfo: {
                channelName: '',
                name: '',
                male: '',
                phone: '',
                idCard: '',
                phone: '',
                offlineChannel: false,
                channelCalled: '',
                date: {
                    start: '',
                    end: '',
                },
                year: '',
                area: '',
                checkList: [],
                monthData: '',
                yifangyaoqiu: '',
                otherThing: '',
                hezuoneirong: '',
                bankName: '',
                accountName: '',
                bankCardNum: '',
                meansPayments1: '',
                meansPayments2: '',
                meansPayments3: '',
                meansPayments4: '',
            },
            checkList: '',
            channelInforules: {
                idCard: [{
                    required: true,
                    message: '请输入身份证号',
                    trigger: 'blur'
                }],
                channelCalled: [{
                    required: true,
                    message: '请输入合同名称',
                    trigger: 'blur'
                }],
                date: [{
                    required: true,
                    message: '请输入有效期',
                    trigger: 'blur'
                }],
                year: [{
                    required: true,
                    message: '请输入合同期限',
                    trigger: 'blur'
                }],
                checkList: [{
                    required: true,
                    message: '请输入结算方式',
                    trigger: ''
                }],
                hezuoneirong: [{
                    required: true,
                    message: '请输入合作内容',
                    trigger: 'blur'
                }],
                bankName: [{
                    required: true,
                    message: '请输入开户行',
                    trigger: 'blur'
                }],
                accountName: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                bankCardNum: [{
                    required: true,
                    message: '请输入卡号',
                    trigger: 'blur'
                }],
                area: [{
                    required: true,
                    message: '请输入指定区域',
                    trigger: 'blur'
                }],
                monthData: [{
                    required: true,
                    message: '请输入结算日',
                    trigger: 'blur'
                }],
            },
            channelStatus: 0,
            channelType: 0,
            channelId: null,
            uploadFilesArray: [],
            updataFiles: false,
            channelFile: '',
            checkListArray: [{
                    name: '参加复试',
                    label: 1,
                    key: 1
                }, {
                    name: '以通过复试',
                    label: 2,
                    key: 2
                }, {
                    name: '以通过培训',
                    label: 4,
                    key: 4
                }, {
                    name: '以入职讲师收入的百分比提成',
                    label: 8,
                    key: 8
                },
                //  {
                //     name: '不结算',
                //     label: 0,
                //     key: 0
                // },
            ],
            viewChannelType: "",
            disabledchoose: false,
        }
    },

    mounted() {
        this.init()
        this.filesUploadOss()
    },
    methods: {
        changeNoCheckList() {
            console.log(this.noCheckList)
            if (this.noCheckList == true) {
                vm.disabled1 = true
                vm.disabled2 = true
                vm.disabled3 = true
                vm.disabled4 = true
                this.channelInfo.meansPayments1 = '';
                this.channelInfo.meansPayments2 = '';
                this.channelInfo.meansPayments3 = '';
                this.channelInfo.meansPayments4 = '';
                this.disabledchoose = true;
                this.channelInfo.checkList = [];
            }

        },
        viewChannel() {
            if (this.channelType == 0) {
                typeed = 4
            } else if (this.channelType == 1) {
                if (this.channelFile != '') {
                    typeed = 4
                } else {
                    typeed = 2
                }
            } else if (this.channelType == 2) {
                if (this.channelFile != '') {
                    typeed = 4
                } else {
                    typeed = 2
                }
            } else if (this.channelType == 3) {
                if (this.channelFile != '') {
                    typeed = 4
                } else {
                    typeed = 2
                }
            } else if (this.channelType == 4) {
                typeed = 1
            }
            var data = JSON.stringify({
                channelName: this.channelInfo.channelName,
                name: this.channelInfo.name,
                idCard: this.channelInfo.idCard,
                phone: this.channelInfo.phone,
                start: this.channelInfo.date.start,
                end: this.channelInfo.date.end,
                jobTitle: this.channelInformation.sysTeacChannel.dockingPeople,
                meansPayments: "[" + this.channelInfo.meansPayments1 * 1 +
                    "," + this.channelInfo.meansPayments2 * 1 + "," + this
                    .channelInfo.meansPayments3 * 1 + "," + this.channelInfo
                    .meansPayments4 * 1 + "]",
                checkList: this.channelInfo.checkList,
                additionalProvisions: this.channelInfo.hezuoneirong,
                authorityZone: this.channelInfo.area,
                indate: this.channelInfo.year,
                clearingFormTime: this.channelInfo.monthData * 1,
                contractName: this.channelInfo.channelCalled,
            })
            window.localStorage.setItem('channelInfo', data)
            if (typeed == 1) {
                window.open('channel2.html')
            } else if (typeed == 2) {
                window.open('channel1.html')
            } else if (typeed == 4) {
                this.$message({
                    type: "warning",
                    message: '三方合同请在上一步下载预览'
                })
            }
        },
        init() {
            getUrlStr = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            this.channelStatus = getUrlStr("type");
            this.channelId = getUrlStr("id");

            console.log(this.channelStatus);
            console.log(this.channelId);

            if (this.channelStatus === 0) {
                // 创建合同
            } else if (this.channelStatus == 1) {
                // 修改合同
                this.havechannelStatus = true;
                // this.getInfo(this.channelId)
                this.getChannel(this.channelId)
            } else if (this.channelStatus == 2) {
                // 续签合同
                this.havechannelStatus = true
                this.getChannel(this.channelId)
            }
            var _this = this;
            this.loadingPage = true;
            $.ajax({

                url: baseURL + 'sys/teacChannel/channelext/list',
                data: {
                    page: 1,
                    limit: 1000,
                    token: token,
                    order: 'stcex.create_at'
                },
                type: 'GET',
                success: function (r) {
                    _this.channelNameList = r.body.list;
                    _this.loadingPage = false;
                },
                error: function (er) {

                }
            })
        },
        getInfo(row) {
            console.log(row);
            var _this = this;
            this.loadingPage = true;
            $.ajax({
                url: baseURL + 'sys/teacChannel/channelext/info/' + row,
                headers: {
                    token: token
                },
                success: function (r) {
                    _this.channelInformation = r.body;
                    _this.channelInfo.name = r.body.sysTeacChannel.dockingPeople
                    _this.channelInfo.phone = r.body.sysTeacChannel.phone
                    _this.channelType = r.body.sysTeacChannel.channelType
                    _this.channelInfo.male = r.body.sysTeacChannel.sex
                    // if(_this.channelStatus == 1){
                    //     _this.channelInfo.channelName = r.body.sysTeacChannel.channelName
                    //     _this.
                    // } else if (this.channelStatus == 2) {

                    // }
                    // 0 - 无合作方式
                    // 1 - 院校合作
                    // 2 - 企业合作
                    // 3 - 资源合作
                    // 4 - 校园代理
                    _this.havechannelStatus = true
                    _this.loadingPage = false;
                },
                error: function (er) {

                }
            })
        },
        getChannel(id) {
            var _this = this;
            this.loadingPage = true;
            $.ajax({
                url: baseURL + 'sys/TeacChannel/contract/getById?id=' + id,
                headers: {
                    token: token
                },
                type: 'POST',
                success: function (r) {
                    _this.channelInformation = r.body;
                    _this.channelInfo.name = r.body.sysTeacChannel.dockingPeople
                    _this.channelInfo.phone = r.body.sysTeacChannel.phone
                    _this.channelType = r.body.sysTeacChannel.channelType
                    // if(_this.channelStatus == 1){
                    _this.channelInfo.channelName = r.body.sysTeacChannel.channelName
                    _this.channelInfo.idCard = r.body.idCardNo
                    _this.channelInfo.date.start = r.body.propagandaCycleStart
                    _this.channelInfo.date.end = r.body.propagandaCycleEnd
                    // _this.channelInfo.date = [];
                    // _this.channelInfo.date.push(r.body.propagandaCycleStart)
                    // _this.channelInfo.date.push(r.body.propagandaCycleEnd)
                    _this.channelInfo.year = r.body.indate
                    _this.channelInfo.area = r.body.authorityZone
                    _this.channelInfo.checkList = r.body.clearingFormArr
                    _this.channelInfo.meansPayments1 = JSON.parse(r.body.meansPayments)[0]
                    _this.channelInfo.meansPayments2 = JSON.parse(r.body.meansPayments)[1]
                    _this.channelInfo.meansPayments3 = JSON.parse(r.body.meansPayments)[2]
                    _this.channelInfo.meansPayments4 = JSON.parse(r.body.meansPayments)[3]
                    _this.channelInfo.monthData = r.body.clearingFormTime
                    _this.channelInfo.hezuoneirong = r.body.additionalProvisions
                    // _this.channelInfo.otherThing = r.body.additionalProvisions
                    // _this.channelInfo.yifangyaoqiu = r.body.specificArea
                    _this.channelInfo.channelCalled = r.body.contractName
                    _this.channelFile = r.body.contractUrl
                    _this.channelInfo.male = r.body.sysTeacChannel.sex
                    _this.channelInfo.yifangyaoqiu = r.body.specificArea;
                    _this.channelInfo.bankName = r.body.extSysTeacChannelCard.bankOfDeposit
                    _this.channelInfo.bankCardNum = r.body.extSysTeacChannelCard.idCardNo
                    _this.channelInfo.accountName = r.body.extSysTeacChannelCard.userName
                    if (r.body.clearingForm == null || r.body.clearingForm == '') {
                        _this.noCheckList = true;
                        vm.disabled1 = true
                        vm.disabled2 = true
                        vm.disabled3 = true
                        vm.disabled4 = true
                        _this.channelInfo.meansPayments1 = '';
                        _this.channelInfo.meansPayments2 = '';
                        _this.channelInfo.meansPayments3 = '';
                        _this.channelInfo.meansPayments4 = '';
                        _this.disabledchoose = true;
                        _this.channelInfo.checkList = [];
                    }
                    // } else if (this.channelStatus == 2) {
                    // channelName: '',
                    // name: '',
                    // male: '',
                    // phone: '',
                    // idCard: '',
                    // phone: '',
                    // offlineChannel: false,
                    // channelCalled: '',
                    // date: '',
                    // year: '',
                    // area: '',
                    // checkList: [],
                    // monthData: '',
                    // yifangyaoqiu: '',
                    // otherThing: '',
                    // hezuoneirong: '',
                    // bankName: '',
                    // accountName: '',
                    // bankCardNum: '',
                    // meansPayments1: '',
                    // meansPayments2: '',
                    // meansPayments3: '',
                    // meansPayments4: '',
                    // }
                    // 0 - 无合作方式
                    // 1 - 院校合作
                    // 2 - 企业合作
                    // 3 - 资源合作
                    // 4 - 校园代理
                    _this.havechannelStatus = true
                    _this.loadingPage = false;
                },
                error: function (er) {

                }
            })
        },
        createChannel() {
            var _this = this;
            var typeed = 0;

            if (this.channelType == 0) {
                typeed = 4
            } else if (this.channelType == 1 || this.channelType == 2 || this.channelType == 3) {
                if (this.channelFile != '') {
                    typeed = 4
                } else {
                    typeed = 2
                }
            } else if (this.channelType == 4) {
                typeed = 1
            }
            console.log(typeed)
            this.viewChannelType = typeed;
            $.ajax({
                url: baseURL + 'sys/TeacChannel/contract/saveContract',
                type: 'POST',
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "channelId": this.channelInformation.channelId,
                    "contractType": typeed,
                    "authorityZone": this.channelInfo.area,
                    "jobTitle": this.channelInformation.sysTeacChannel.dockingPeople,
                    "propagandaCycleStart": this.channelInfo.date.start,
                    "propagandaCycleEnd": this.channelInfo.date.end,
                    "clearingFormTime": this.channelInfo.monthData * 1,
                    "indate": this.channelInfo.year,
                    "idCardNo": this.channelInfo.idCard,
                    "clearingForm": this.checkList,
                    "meansPayments": "[" + this.channelInfo.meansPayments1 * 1 +
                        "," + this.channelInfo.meansPayments2 * 1 + "," + this
                        .channelInfo.meansPayments3 * 1 + "," + this.channelInfo
                        .meansPayments4 * 1 + "]",
                    "contractUrl": this.channelFile,
                    "additionalProvisions": this.channelInfo.hezuoneirong,
                    "bankOfDeposit": this.channelInfo.bankName,
                    "bankCardNo": this.channelInfo.bankCardNum,
                    "bankUserName": this.channelInfo.accountName,
                    "contractName": this.channelInfo.channelCalled,
                    "specificArea": this.channelInfo.yifangyaoqiu,
                }),
                success: function (r) {
                    if (r.status === 200) {
                        _this.$message({
                            type: 'success',
                            message: r.body.msg
                        });
                        window.setInterval(function () {
                            window.history.go(-1);
                        }, 1000)
                    } else {
                        _this.$message({
                            type: 'warning',
                            message: r.body.msg
                        });
                    }
                },
                error: function (er) {

                }
            })
        },
        setChannel() {
            var _this = this;
            if (this.channelType == 0) {
                typeed = 4
            } else if (this.channelType == 1 || this.channelType == 2 || this.channelType == 3) {
                if (this.channelFile != '') {
                    typeed = 4
                } else {
                    typeed = 2
                }
            } else if (this.channelType == 4) {
                typeed = 1
            }
            $.ajax({
                url: baseURL + 'sys/TeacChannel/contract/saveContract',
                type: 'POST',
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "id": this.channelId,
                    "channelId": this.channelInformation.channelId,
                    "contractType": typeed,
                    "authorityZone": this.channelInfo.area,
                    "jobTitle": this.channelInformation.sysTeacChannel.dockingPeople,
                    "propagandaCycleStart": this.channelInfo.date.start,
                    "propagandaCycleEnd": this.channelInfo.date.end,
                    "clearingFormTime": this.channelInfo.monthData * 1,
                    "indate": this.channelInfo.year,
                    "idCardNo": this.channelInfo.idCard,
                    "clearingForm": this.checkList,
                    "meansPayments": "[" + this.channelInfo.meansPayments1 * 1 +
                        "," + this.channelInfo.meansPayments2 * 1 + "," + this
                        .channelInfo.meansPayments3 * 1 + "," + this.channelInfo
                        .meansPayments4 * 1 + "]",
                    "contractUrl": this.channelFile,
                    "additionalProvisions": this.channelInfo.hezuoneirong,
                    "bankOfDeposit": this.channelInfo.bankName,
                    "bankCardNo": this.channelInfo.bankCardNum,
                    "bankUserName": this.channelInfo.accountName,
                    "contractName": this.channelInfo.channelCalled,
                    "specificArea": this.channelInfo.yifangyaoqiu,
                }),
                success: function (r) {
                    if (r.status === 200) {
                        _this.$message({
                            type: 'success',
                            message: r.body.msg
                        });
                        window.setInterval(function () {
                            window.history.go(-1);
                        }, 1000)
                    } else {
                        _this.$message({
                            type: 'warning',
                            message: r.body.msg
                        });
                    }
                },
                error: function (er) {

                }
            })
        },
        goChannel() {
            var _this = this;
            if (this.channelType == 0) {
                typeed = 4
            } else if (this.channelType == 1 || this.channelType == 2 || this.channelType == 3) {
                if (this.channelFile != '') {
                    typeed = 4
                } else {
                    typeed = 2
                }
            } else if (this.channelType == 4) {
                typeed = 1
            }
            $.ajax({
                url: baseURL + 'sys/TeacChannel/contract/renewContract',
                type: 'POST',
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "id": this.channelId,
                    "channelId": this.channelInformation.channelId,
                    "contractType": typeed,
                    "authorityZone": this.channelInfo.area,
                    "jobTitle": this.channelInformation.sysTeacChannel.dockingPeople,
                    "propagandaCycleStart": this.channelInfo.date.start,
                    "propagandaCycleEnd": this.channelInfo.date.end,
                    "clearingFormTime": this.channelInfo.monthData * 1,
                    "indate": this.channelInfo.year,
                    "idCardNo": this.channelInfo.idCard,
                    "clearingForm": this.checkList,
                    "meansPayments": "[" + this.channelInfo.meansPayments1 * 1 +
                        "," + this.channelInfo.meansPayments2 * 1 + "," + this
                        .channelInfo.meansPayments3 * 1 + "," + this.channelInfo
                        .meansPayments4 * 1 + "]",
                    "contractUrl": this.channelFile,
                    "additionalProvisions": this.channelInfo.hezuoneirong,
                    "bankOfDeposit": this.channelInfo.bankName,
                    "bankCardNo": this.channelInfo.bankCardNum,
                    "bankUserName": this.channelInfo.accountName,
                    "contractName": this.channelInfo.channelCalled,
                    "specificArea": this.channelInfo.yifangyaoqiu,
                }),
                success: function (r) {
                    if (r.status === 200) {
                        _this.$message({
                            type: 'success',
                            message: r.body.msg
                        });
                        window.setInterval(function () {
                            window.history.go(-1);
                        }, 1000)
                    } else {
                        _this.$message({
                            type: 'warning',
                            message: r.body.msg
                        });
                    }
                },
                error: function (er) {

                }
            })
        },
        changeTabHandleClick(val) {
            console.log(val.index);
            if (val.index == 0) {
                this.showItem = true
            } else {
                this.showItem = false
            }
        },
        nextBtn() {
            this.activeName = 'second';
            this.showItem = false;
        },
        beforeBtn() {
            this.activeName = 'first';
            this.showItem = true;
        },
        handleCheckAllChange(val) {
            console.log(val)
            var s = 0;
            val.forEach(function (a) {
                s += Number(a);
            }, 0);
            vm.checkList = s
        },
        handleCheck(val) {
            if (val.key === 1) {
                vm.disabled1 = false
            } else if (val.key === 2) {
                vm.disabled2 = false
            } else if (val.key === 4) {
                vm.disabled3 = false
            } else if (val.key === 8) {
                vm.disabled4 = false
            } else if (val.key === 0) {
                vm.disabled1 = true
                vm.disabled2 = true
                vm.disabled3 = true
                vm.disabled4 = true
                this.channelInfo.meansPayments1 = '';
                this.channelInfo.meansPayments2 = '';
                this.channelInfo.meansPayments3 = '';
                this.channelInfo.meansPayments4 = '';
                this.disabledchoose = true;
            }
        },
        handleCheck1(val) {
            if (val == true) {
                vm.disabled1 = false
            } else {
                vm.disabled1 = true
            }
        },
        handleCheck2(val) {
            if (val == true) {
                vm.disabled2 = false
            } else {
                vm.disabled2 = true
            }
        },
        handleCheck3(val) {
            if (val == true) {
                vm.disabled3 = false
            } else {
                vm.disabled3 = true
            }
        },
        handleCheck4(val) {
            if (val == true) {
                vm.disabled4 = false
            } else {
                vm.disabled4 = true
            }
        },
        handleCheck5(val) {
            if (val == true) {
                vm.disabled5 = false
            } else {
                vm.disabled5 = true
            }
        },
        filesUploadOss: function () {
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
            var uploadFileName;
            var GUID = new GUID();

            $.ajax({
                url: ossURL + 'api/oss/getAliOSSUploadSign?dir=' + 'contract/' + GUID.newGUID() + '/',
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
                            var new_multipart_params = {
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
                                'multiple_queues': false,
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
                                    // $('#selectfiles').click();
                                    $('#ossfile').innerHTML = ''
                                },
                                FilesAdded: function (up, files) {
                                    $('#ossfile').empty()
                                    vm.updataFiles = true;
                                    console.log(files);
                                    uploadFilesNo = files.length;
                                    plupload.each(files, function (file) {
                                        $('#ossfile').append('<div id="' + file.id + '" style="padding-left: 20px;">' + file.name + ' (' + plupload.formatSize(file.size).split(' ')[0] + plupload.formatSize(file.size).split(' ')[1].toUpperCase() + ')<b><span id="file.id" style="display:inline-block"><span></b>' +
                                            '<div class="progress" style="display:none;"><div class="progress-bar" style="width: 0%"></div></div>' +
                                            '</div>');
                                    });
                                    set_upload_param(up, '', true);
                                    return false
                                    // $('#postfiles').click()
                                    // console.log('FilesAdded')
                                },
                                BeforeUpload: function (up, file) {
                                    set_upload_param(up, file.name, true);
                                    console.log('BeforeUpload')
                                },
                                UploadProgress: function (up, file) {
                                    var d = $('#ossfile').find('#' + file.id);
                                    d.find('.progress').css('display', 'block');
                                    d.find('b').html('<span style="display:inline-block;padding-left:10px;">' + file.percent + "%</span>");
                                    var prog = d.find('div').eq(0);
                                    var progBar = prog.find('div').eq(0);
                                    progBar.css('width', file.percent + '%');
                                    progBar.attr('aria-valuenow', file.percent);
                                    console.log('UploadProgress')
                                },
                                FileUploaded: function (up, file, info) {
                                    console.log('FileUploaded')
                                    if (info.status == 200) {
                                        vm.channelFile = host + '/' + g_dirname + uploadFileName
                                        console.log(vm.channelFile);
                                        vm.channelType = 0;
                                        vm.updataFiles = false;
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
    }
});