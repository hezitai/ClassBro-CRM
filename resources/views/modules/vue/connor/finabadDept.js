$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/finance/audit/paymentDemandsList',
        datatype: "json",
        colModel: [
            {label: 'ID', name: 'id', index: "id", width: 45, key: true},
            /*{label: '订单号', name: 'orderNo', width: 120},*/
            /*{label: '课程名称', name: 'username', width: 90},*/
            {label: '销售名称', name: 'username', width: 90},
            {label: '学生名称', name: 'nickName', width: 90},
            {label: '原因', name: 'exceptionMsg', width: 60 },
            {label: '金额', name: 'badMoney', width: 60},
            {label: '币种', name: 'current', width: 30},
            {label: '产生时间', name: 'createAt', width: 90},
            {label: '审核状态', name: 'statused', width: 60, formatter: function (value, options, row) {
                switch (value) {
                    case 1:
                        return "待处理";
                    case 2:
                        return "学生已处理";
                    case 4:
                        return "销售已处理";
                    case 8:
                        return "已结束";
                }
            }},
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
        jsonReader: {
            root: "body.list",
            page: "body.currPage",
            total: "body.totalPage",
            records: "body.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
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
});


var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            key: null,
            timeFrom: null,
            timeTo: null
        },
        showList: true,
        title: null,
    },
    methods: {
        query: function () {
            vm.reloadOnPageOne();
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'key': vm.q.key,
                    'timeFrom': vm.q.timeFrom,
                    'timeTo': vm.q.timeTo},
                page: page
            }).trigger("reloadGrid");
        },
        reloadOnPageOne: function () {
            vm.showList = true;
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'key': vm.q.key,
                    'timeFrom': vm.q.timeFrom,
                    'timeTo': vm.q.timeTo},
                page: 1
            }).trigger("reloadGrid");
        },
        del: function () {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }
            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/finance/audit/deletePaymentDemands",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.status == 200) {
                            alert('操作成功', function(){
                                vm.reloadOnPageOne();
                            });
                        } else {
                            alert(r.body.msg);
                        }
                    }
                });
            });
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
