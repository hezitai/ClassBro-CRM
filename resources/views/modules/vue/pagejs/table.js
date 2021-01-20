var app = new Vue({
    el: '#app',
    data: {
        message: '表格控件测试'
    }
});

var tableView = new Vue({
    el: '#tableView',
    data: {
        //列表数据  
        tableData: [{
                birth: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            },
            {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎1',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                birth: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }
        ],
        //显示加载中样式  
        loading: false,
        //搜索表单  
        searchForm: {
            id: '',
            name: '',
            state: ''
        },
        //多选值  
        multipleSelection: [],
        //当前页  
        currentPage: 3,
        //分页大小  
        pageSize: 100,
        //总记录数  
        total: 800,
        //删除的弹出框  
        deleteVisible: false,
        //编辑界面是否显示  
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
            name: [{
                required: true,
                message: '请输入姓名',
                trigger: 'blur'
            }]
        },
        //编辑界面数据  
        editForm: {
            id: 0,
            name: '',
            sex: -1,
            age: 0,
            birth: '',
            address: ''
        },
    },
    methods: {
        //表格重新加载数据  
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },
        //表格编辑事件  
        editClick: function (row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //表格删除事件  
        deleteClick: function (row) {
            var _self = this;
            this.$confirm('确认删除' + row.name + '吗?', '提示', {
                type: 'warning'
            }).then(function () {
                _self.$message({
                    message: row.name + '删除成功',
                    type: 'success'
                });
                _self.loadingData(); //重新加载数据  
            }).catch(function (e) {
                if (e != "cancel")
                    console.log("出现错误：" + e);
            });
        },
        //新建事件  
        addClick: function () {
            var _self = this;
            this.editFormVisible = true;
            //_self.loadingData();//重新加载数据  
        },
        //表格查询事件  
        searchClick: function () {
            alert("搜索");
            var _self = this;
            _self.loadingData(); //重新加载数据  
        },
        //表格勾选事件  
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
            console.info(val);
        },
        //删除所选，批量删除  
        removeSelection: function () {
            var _self = this;
            var multipleSelection = this.multipleSelection;
            if (multipleSelection.length < 1) {
                _self.$message({
                    message: '请至少选中一条记录',
                    type: 'error'
                });
                return;
            }
            var ids = "";
            for (var i = 0; i < multipleSelection.length; i++) {
                var row = multipleSelection[i];
                ids += row.name + ","
            }
            this.$confirm('确认删除' + ids + '吗?', '提示', {
                type: 'warning'
            }).then(function () {
                _self.$message({
                    message: ids + '删除成功',
                    type: 'success'
                });
                _self.loadingData(); //重新加载数据  
            }).catch(function (e) {
                if (e != "cancel")
                    console.log("出现错误：" + e);
            });
        },
        //分页大小修改事件  
        pageSizeChange: function (val) {
            console.log('每页 ' + val + ' 条');
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据  
        },
        //当前页修改事件  
        currentPageChange: function (val) {
            this.currentPage = val;
            console.log('当前页: ' + val);
            var _self = this;
            _self.loadingData(); //重新加载数据  
        },
        //保存点击事件  
        editSubmit: function () {
            console.info(this.editForm);
        }
    }
})