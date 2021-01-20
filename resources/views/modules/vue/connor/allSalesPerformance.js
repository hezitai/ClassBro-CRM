$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/seller/order/myDeptPerformanceList',
        datatype: "json",
        colModel: [
            /*{label: 'ID', name: 'id', index: "id", width: 45, key: true},*/
            {
                label: '订单号',
                name: 'orderNo',
                width: 180,
                formatter: function (value, potions, row) {
                    if (value == null) {
                        return "<a onclick='openDetail(" + JSON.stringify(row) + ")'></a>";
                    } else {
                        return "<a onclick='openDetail(" + JSON.stringify(row) + ")'>" + value + "</a>";
                    }
                }
            },
            {
                label: '课程名称',
                name: 'offCourseName',
                width: 70
            },
            {
                label: '销售名称',
                name: 'sellerName',
                width: 60
            },
            {
                label: '学生名称',
                name: 'studName',
                width: 60
            },
            {
                label: '课堂名称',
                name: 'classroomName',
                width: 70
            },
            {
                label: '来源',
                name: 'fromSource',
                width: 60,
                formatter: function (value, options, row) {
                    switch (value) {
                        case 1:
                            return "销售预付";
                        case 2:
                            return "学生预付";
                        case 4:
                            return "学生追付";
                        case 8:
                            return "课程消耗";
                        case 16:
                            return "课堂消耗";
                        case 32:
                            return "赠送时长";
                        case 64:
                            return "课程退款";
                        case 128:
                            return "系统扣除";
                        case 128:
                            return "系统补偿";
                        case 256:
                            return "系统返还";
                    }
                }
            },
            {
                label: '金额',
                name: 'money',
                width: 60
            },
            {
                label: '币种',
                name: 'current',
                width: 30
            },
            {
                label: '业绩类型',
                name: 'perType',
                width: 60,
                formatter: function (value, options, row) {
                    switch (value) {
                        case 1:
                            return "销售业绩";
                        case 2:
                            return "消耗业绩";
                    }
                }
            },
            {
                label: '产生时间',
                name: 'createAt',
                width: 110
            },
            {
                label: '业绩补偿',
                width: 110,
                formatter: function (value, potions, row) {
                    if(row.perType == 1 && row.money * 1 < 0){
                        return "<button class='buchangbtn' onclick='buchang(" + JSON.stringify(row) + ")'>补偿</button>";
                    } else {
                        return "<button class='buchangbtnCancel'>补偿</button>";
                    }
                }
            }
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        order: 1,
        jsonReader: {
            root: "body.list",
            page: "body.currPage",
            total: "body.totalPage",
            records: "body.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order",
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({
                "overflow-x": "hidden"
            });
        }
    });
    initTime();
    $("#timeFrom").on("change", function () {
        vm.q.timeFrom = $("#timeFrom").val();
        if (vm.q.timeFrom != null && vm.q.timeFrom != '') {
            vm.q.timeFrom += " 00:00:00";
        }
        vm.query();
        $("#timeFrom").datetimepicker("hide");
    });
    $("#timeTo").on("change", function () {
        vm.q.timeTo = $("#timeTo").val();
        if (vm.q.timeTo != null && vm.q.timeTo != '') {
            vm.q.timeTo += " 23:59:59";
        }
        vm.query();
        $("#timeTo").datetimepicker("hide");
    });

    buchang = function (row) {
        // console.log(row);
        vm.buchangEvent(row);
    }

    openDetail = function (row) {
        // window.open( "../seller_detail.html?id=" + courseId);
        window.open("../seller_detail.html?id=" + row.courseId);
    }

});



var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            key: null,
            timeFrom: null,
            timeTo: null,
            perType: null
        },
        showList: true,
        title: null,
        buchangyeji: false,
        buchangjine: '',
        allRow:{},
    },
    mounted() {
        this.query();
    },
    methods: {
        getMonthDays() {
            var date = new Date();
            date.setDate(1);
            var month = parseInt(date.getMonth() + 1);
            var day = date.getDate();
            if (month < 10) {
                month = '0' + month
            }
            if (day < 10) {
                day = '0' + day
            }
            vm.q.timeFrom = date.getFullYear() + '-' + month + '-' + day
        },
        getCurrentMonthLast() {
            var date = new Date();
            var currentMonth = date.getMonth();
            var nextMonth = ++currentMonth;
            var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
            var oneDay = 1000 * 60 * 60 * 24;
            var lastTime = new Date(nextMonthFirstDay - oneDay);
            var month = parseInt(lastTime.getMonth() + 1);
            var day = lastTime.getDate();
            if (month < 10) {
                month = '0' + month
            }
            if (day < 10) {
                day = '0' + day
            }
            vm.q.timeTo = new Date(date.getFullYear() + '-' + month + '-' + day);
        },

        reloadOnPageOne: function () {
            vm.showList = true;
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'key': vm.q.key,
                    'perType': vm.q.perType,
                    'timeFrom': vm.q.timeFrom,
                    'timeTo': vm.q.timeTo
                },
                page: 1
            }).trigger("reloadGrid");
        },
        query: function () {
            vm.reloadOnPageOne();
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'key': vm.q.key,
                    'perType': vm.q.perType,
                    'timeFrom': vm.q.timeFrom,
                    'timeTo': vm.q.timeTo
                },
                page: page
            }).trigger("reloadGrid");
        },
        buchangEvent: function (row) {
            console.log(row);
            this.allRow = row
            vm.buchangyeji = true;
        },
        buchangyejiHandleClose: function () {
            this.buchangyeji = false;
            this.buchangjine = '';
        },
        buchangyejiSubmit: function () {
            var _this = this;
            $.ajax({
                url: baseURL + 'sys/seller/order/deletePerformanceDeduction?recordId=' + this.allRow.id + '&money=' + this.buchangjine,
                headers: {
                    token: token,
                },
                type: 'POST',
                success: function (r) {
                    if (r.status == 200) {
                        vm.$message({
                            type: 'success',
                            message: r.body.msg
                        });
                        window.location.reload();
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
    }
});

function initTime() {
    $(".mydatetime").datetimepicker({
        //format: 'yyyy-mm-dd hh:ii:ss',
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        language: 'zh-CN',
        todayBtn: true,
        minView: "month"
    });
}