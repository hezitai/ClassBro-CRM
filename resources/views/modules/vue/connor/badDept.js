$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/seller/order/paymentDemandsList',
        datatype: "json",
        colModel: [
            /*{label: 'ID', name: 'id', index: "id", width: 45, key: true},*/
            /*{label: '订单号', name: 'orderNo', width: 120},
            {label: '课程名称', name: 'username', width: 90},
            {label: '销售名称', name: 'sellerName', width: 90},*/
            {label: '学生名称', name: 'nickName', width: 90},
            {label: '原因', name: 'exceptionMsg', width: 60 },
            {label: '金额', name: 'badMoney', width: 60},
            {label: '币种', name: 'current', width: 30},
            {label: '产生时间', name: 'createAt', width: 90}
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
            records: "body.totalCount",
        },
        postData: {
            statusedArr: "1, 4"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order",
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
