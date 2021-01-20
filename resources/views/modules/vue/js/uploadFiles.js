/**
 * 参数：
 * 需要上传oss的文件路径名称
 * token
 * 选择文件的按钮el
 * 进度条el
 * 上传按钮el
 * 是否需要上传按钮 true / false
 * set_upload_param时的事件
 * FilesAdded时的事件
 * UploadProgress时的事件
 * FileUploaded时的事件
 * Error事件
 */

function OssUploadFilesForWeb({
    file_path: file_path,
    selectfiles: selectfiles,
    ossfile: ossfile,
    postfiles: postfiles,
    needUploadBtn: needUploadBtn,
    setUploadParam: setUploadParam,
    filesAdded: filesAdded,
    uploadProgress: uploadProgress,
    fileUploaded: fileUploaded,
    error: error
}) {

}



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
    url: ossURL + 'api/oss/getAliOSSUploadSign?dir=' + file_path + '/' + GUID.newGUID() + '/',
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
                browse_button: selectfiles,
                flash_swf_url: 'js/Moxie.swf',
                silverlight_xap_url: 'js/Moxie.xap',
                url: 'http://oss.aliyuncs.com',
                init: {
                    PostInit: function () {
                        ossfile.innerHTML = '';
                        postfiles.onclick = function () {
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
                            console.log(files);
                            /*for(var i in files){
                                files[i].name = encodeURIComponent(files[i].name);
                            }*/
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
                            })
                        }

                    },

                    BeforeUpload: function (up, file) {
                        set_upload_param(up, file.name, true);
                    },

                    UploadProgress: function (up, file) {
                        vm.updataFiles = true;
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
                            // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传准备完成，等待上传';
                            // console.log(host + '/' + g_dirname + file.name);
                            uploadFilesTimes++;
                            var aaa = {
                                cdId: vm.id,
                                groupId: vm.getCourseData.course,
                                name: file.name,
                                // url: host + '/' + g_dirname + file.name
                                url: host + '/' + g_dirname + uploadFileName
                            };
                            vm.uploadFilesArray.push(aaa);
                            if (uploadFilesTimes === uploadFilesNo) {
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
                                            setInterval(function () {
                                                // window.location.reload();
                                            }, 1000)
                                        }
                                    },
                                    error: function (er) {
                                        vm.updataFiles = false;
                                    }
                                })
                            }
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