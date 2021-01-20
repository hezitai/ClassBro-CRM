var menu_ztree;
    var menu_setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "menuId",
                pIdKey: "parentId",
                rootPId: -1
            },
            key: {
                url: "nourl"
            }
        },
        check: {
            enable: true,
            nocheckInherit: true
        }
    };

    //部门结构树
    var dept_ztree;
    var dept_setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "deptId",
                pIdKey: "parentId",
                rootPId: -1
            },
            key: {
                url: "nourl"
            }
        }
    };
    //数据树
    var data_ztree;
    var data_setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "deptId",
                pIdKey: "parentId",
                rootPId: -1
            },
            key: {
                url: "nourl"
            }
        },
        check: {
            enable: true,
            nocheckInherit: true,
            chkboxType: {
                "Y": "",
                "N": ""
            }
        }
    };
    var vm = new Vue({
        el: '#app',
        data() {
            return {
                loadingalert: false,
                chooseDeptArray: [], // 导出销售业绩  选择部门返回数组
                getDeptUser: [], // 传入组别  获取部门人员
                chooseDeptArrayUser: [], // 选择人员数组
                deptTypeList: [],
                perTypes: [], //业绩数组
                spoTypes: [], //订单数组
                dataTime: '', // 时间选择器
                formatDataTimeFrom: '', // 格式化时间选择器-开始
                formatDataTimeTo: '', // 格式化时间选择器-结束
                showDeptUserItem: false, // 人员选择UI显示
                exportDialog: false,
                performanceType: [{
                    name: '销售业绩',
                    id: 1
                }, {
                    name: '消耗业绩',
                    id: 2
                }],
                orderType: [{
                    name: '定制辅导',
                    id: 0
                }, {
                    name: '考前突击',
                    id: 1
                }, {
                    name: '论文大礼包',
                    id: 4
                }, {
                    name: '特殊订单',
                    id: 32
                }, {
                    name: '班课辅导',
                    id: 64
                }],
                pickerOptions3: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                tableDataBegin: [],
                tableDataName: "",
                tableDataEnd: [],
                currentPage: 0,
                pageSize: 0,
                total: 0,
                idss: [],
                data: '',
                value: ["", ""],
                page: 1,
                limit: 15,
                ruleForm: {},
                rules: {},
                q: {
                    roleName: null
                },
                // showList: true,
                // title: null,
                role: {
                    deptId: null,
                    deptName: null
                },
                GETDEPTID: '',
            }
        },
        multipleSelection: [],
        mounted() {
            this.Time();
            this.getUrl();
            this.getMonthDays();
            this.getMonthDay();
            this.getTableData();
            // this.showList = false;
            // this.title = "新增";
            // this.role = {deptName:null, deptId:null};
        },
        methods: {
            getUrl: function () {

                // 
                if (window.location.href.split('html')[1] == '') {
                    this.GETDEPTID = '';
                } else {
                    this.GETDEPTID = window.location.href.split('deptId=')[1];
                }
                console.log(window.location.href.split('html')[1] == '');
                // alert(window.location.href.split('deptId=')[1]);
            },
            chooseDept: function (id) {
                console.log(this.chooseDeptArray);
                this.showDeptUserItem = true;
                this.getXiaoShouUser();
                // if(this.chooseDeptArray.length == 0){
                //     this.showDeptUserItem = false;
                // }
            },
            chooseDeptUser: function () {
                console.log(this.chooseDeptArrayUser);
            },
            choosePerTypes: function () {
                console.log(this.perTypes);
            },
            chooseSpoTypes: function () {
                console.log(this.spoTypes);
            },
            changeDataTime: function () {
                console.log(this.dataTime);
                // this.formatDataTime
                this.formatDataTimeFrom = this.dataTime[0] + ' 00:00:00';
                this.formatDataTimeTo = this.dataTime[1] + ' 23:59:59';
                console.log(this.formatDataTimeFrom, this.formatDataTimeTo);
            },
            exportList: function () {
                this.exportDialog = true;
                // this.getMenuTree(null);
                // this.getDept();
                // this.getDataTree();
                this.getXiaoShou();
            },
            getXiaoShou: function () {
                var _this = this;
                this.loadingalert = true;
                $.get(baseURL + "sys/dept/list", {
                    deptType: 1
                }, function (r) {
                    // console.log(r);
                    _this.loadingalert = false;
                    _this.deptTypeList = r;
                    // for(var i in r){
                    //     _this.chooseDeptArr.push(r[i].deptId);
                    // }
                });
            },
            getXiaoShouUser: function () {
                var _this = this;
                this.loadingalert = true;
                console.log(this.chooseDeptArray);
                var toStr;
                toStr = this.chooseDeptArray.join(',');
                console.log(toStr)
                if (this.chooseDeptArray.length == 0) {
                    toStr = 0;
                    _this.showDeptUserItem = false;
                }
                $.ajax({
                    url: baseURL + "sys/user/list",
                    data: {
                        deptIdStr: toStr,
                        page: 1,
                        limit: 1111,
                    },
                    success: function (r) {
                        _this.loadingalert = false;
                        _this.getDeptUser = r.page.list;
                    },
                    error: function (er) {

                    }
                })
            },
            exportExcel: function () {
                var _this = this;
                console.log("部门：" + this.chooseDeptArray + "人员：" + this.chooseDeptArrayUser + "业绩：" + this
                    .perTypes + "订单：" + this.spoTypes + "时间：" + this.formatDataTime);
                $.ajax({
                    url: baseURL + 'sys/seller/order/exportSellerPerformanceList',
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/json",
                    headers: {
                        token: token,
                    },
                    data: JSON.stringify({
                        "perTypes": _this.perTypes,
                        "timeFrom": _this.formatDataTimeFrom,
                        "timeTo": _this.formatDataTimeTo,
                        "spoTypes": _this.spoTypes,
                        "deptIds": _this.chooseDeptArray,
                        "userIds": _this.chooseDeptArrayUser
                    }),
                    success: function (r) {
                        console.log(r);
                        window.open(r.fileUrl);
                        _this.exportDialog = false;
                        vm.$message({
                            message: '导出成功',
                            type: 'success'
                        });
                        _this.chooseDeptArray = [];
                        _this.chooseDeptArrayUser = [];
                        _this.perTypes = [];
                        _this.spoTypes = [];
                        _this.dataTime = [];
                        _this.showDeptUserItem = false;
                    },
                    error: function (er) {
                        vm.$message({
                            message: '导出失败',
                            type: 'warning'
                        });
                    }
                })
            },
            getDept: function () {
                //加载部门树
                var _this = this;
                $.get(baseURL + "sys/dept/list", function (r) {
                    dept_ztree = $.fn.zTree.init($("#deptTree"), dept_setting, r);
                    var node = dept_ztree.getNodeByParam("deptId", _this.role.deptId);
                    console.log(node);
                    if (node != null) {
                        dept_ztree.selectNode(node);

                        _this.role.deptName = node.name;
                    }
                })
            },
            // deptTree: function () {
            //     var _this = this;
            //     layer.open({
            //         type: 1,
            //         offset: '50px',
            //         skin: 'layui-layer-molv',
            //         title: "选择部门",
            //         area: ['300px', '450px'],
            //         shade: 0,
            //         shadeClose: false,
            //         content: jQuery("#deptLayer"),
            //         btn: ['确定', '取消'],
            //         btn1: function (index) {
            //             var node = dept_ztree.getSelectedNodes();
            //             //选择上级部门
            //             _this.role.deptId = node[0].deptId;
            //             _this.role.deptName = node[0].name;

            //             layer.close(index);
            //         }
            //     });
            // },
            getMenuTree: function (roleId) {
                //加载菜单树
                $.get(baseURL + "sys/menu/list", function (r) {
                    menu_ztree = $.fn.zTree.init($("#menuTree"), menu_setting, r);
                    //展开所有节点
                    menu_ztree.expandAll(true);

                    if (roleId != null) {
                        vm.getRole(roleId);
                    }
                });
            },
            getRole: function (roleId) {
                $.get(baseURL + "sys/role/info/" + roleId, function (r) {
                    vm.role = r.role;

                    //勾选角色所拥有的菜单
                    var menuIds = vm.role.menuIdList;
                    for (var i = 0; i < menuIds.length; i++) {
                        var node = menu_ztree.getNodeByParam("menuId", menuIds[i]);
                        menu_ztree.checkNode(node, true, false);
                    }

                    //勾选角色所拥有的部门数据权限
                    var deptIds = vm.role.deptIdList;
                    for (var i = 0; i < deptIds.length; i++) {
                        var node = data_ztree.getNodeByParam("deptId", deptIds[i]);
                        data_ztree.checkNode(node, true, false);
                    }

                    vm.getDept();
                });
            },
            getDataTree: function (roleId) {
                //加载菜单树
                $.get(baseURL + "sys/dept/list", function (r) {
                    data_ztree = $.fn.zTree.init($("#dataTree"), data_setting, r);
                    //展开所有节点
                    data_ztree.expandAll(true);
                });
            },
            saveOrUpdate: function () {
                //获取选择的菜单
                var nodes = menu_ztree.getCheckedNodes(true);

                //获取选择的数据
                var nodes = data_ztree.getCheckedNodes(true);
                var deptIdList = new Array();
                for (var i = 0; i < nodes.length; i++) {
                    deptIdList.push(nodes[i].deptId);
                }
                vm.role.deptIdList = deptIdList;

                console.log(vm.role.deptIdList);
                // var url = vm.role.roleId == null ? "sys/role/save" : "sys/role/update";
                $.ajax({
                    type: "GET",
                    url: baseURL + 'sys/user/list',
                    data: {
                        page: 1,
                        limit: 1000,
                        deptIds: vm.role.deptIdList,
                    },
                    // contentType: "application/json",
                    // data: JSON.stringify(vm.role),
                    success: function (r) {
                        console.log(r);
                    }
                });
                // $.ajax({
                //     type: "POST",
                //     url: baseURL + url,
                //     contentType: "application/json",
                //     data: JSON.stringify(vm.role),
                //     success: function (r) {
                //         if (r.code === 0) {
                //             alert('操作成功', function () {
                //                 vm.reload();
                //             });
                //         } else {
                //             alert(r.body.msg);
                //         }
                //     }
                // });
            },
            search: function () {
                this.getTableData();
            },
            choosedata: function (value) {
                this.value = value;
                this.finishTimeFrom = value[0] + " 00:00:00"
                this.finishTimeTo = value[1] + " 23:59:59"
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
                        "page": this.page,
                        "perType": 1,
                        "limit": this.limit,
                        "timeFrom": this.finishTimeFrom,
                        "timeTo": this.finishTimeTo,
                        'deptId': this.GETDEPTID,
                    },
                    url: "" + baseURL + "sys/seller/order/getPerformanceRankList",
                    success: function (json) {
                        var tableDataEnd = []
                        json.body.list.forEach((element, ids) => {
                            var obj = {}
                            obj.sellerName = element.sellerName
                            obj.deptName = element.deptName
                            obj.money = element.money
                            obj.index = ids
                            obj.page = json.body.currPage
                            tableDataEnd.push(obj)
                        });
                        self.tableDataEnd = tableDataEnd
                        self.total = json.body.totalCount
                        self.pageSize = json.body.totalCount
                        self.currentPage = json.body.currPage
                        loading.close()
                    }
                });
            },
            Time(now) {
                let year = new Date(now).getFullYear();
                let month = new Date(now).getMonth() + 1;
                let date = new Date(now).getDate();
                if (month < 10) month = "0" + month;
                if (date < 10) date = "0" + date;
                return year + "-" + month + "-" + date;
            },
            getMonthDays(myMonth) {
                let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
                let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
                let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
                return days;
            },
            getMonthDay(myMonth) {
                var finishTimeFrom = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
                var finishTimeTo = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), this
                    .getMonthDays(new Date().getMonth())))
                this.finishTimeFrom = finishTimeFrom + " 00:00:00";
                this.finishTimeTo = finishTimeTo + " 23:59:59";
                this.data = [finishTimeFrom, finishTimeTo]
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val;
                this.handleCurrentChange(this.currentPage);
                this.getTableData();
            },

            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val;
                this.getTableData();
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
            },
        }
    });