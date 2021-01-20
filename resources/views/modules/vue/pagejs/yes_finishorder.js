var vm = new Vue({
    el: '#app',
    data() {
        return {
            tableDataName: "",
            tableDataEnd: [],
            currentPage: 0,
            pageSize: 0,
            total: 0,
            idss: [],
            selects: '',
            key: '',
            id: '',
            val: 1,
            page: "",
            name: '',
            spoTypeArr: '133120',
            rules: {},
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
            bindData: [''],
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
        }
    },

    mounted() {
        this.getTableData();
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
                    "key": this.tableDataName,
                    "statused": this.spoTypeArr,
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
        search() {
            this.getTableData();
        },
        openData() {
            this.getTableData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(this.currentPage);
        },
        change_spoTypeArr(val) {
            vm.spoTypeArr = val;
            vm.getTableData();
        },
        seedetail(row, index) {
            if (row.spoType == 64) {
                window.open("bigClassroomInfo1.html?id=" + row.id + "");
            } else {
                //   window.open("seller_detail.html?id=" + row.id + "");
                window.open("seller_detail.html?id=" + row.id + "");
            }
        },
        handleCurrentChange(val) {
            vm.val = val;
            this.getTableData();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
});