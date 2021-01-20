var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "superId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var ztree;

var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        title: null,
        dept:{
            parentName:null,
            parentId:0,
			orderNum:0,
			name:null
		},
		dept1:{
            parentName:null,
            parentId:0,
			orderNum:0,
			name:null
		},
		countrys:[],
        countryId:'',
        s1:"19",
        s2:"",
        s3:""
	},
	mounted() {
		$.ajax({
			type: "get",
			url: baseURL + "sys/basedata/country/list",
			data:{
				limit: 1000,
				page: 1
			},
			success: function(r){
				vm.countrys = r.body.list;
			}
		});
	},
    methods: {
		change_country:function(event){
            vm.countryId = event.target.value;
            console.log(vm.countryId);
                var s1 = vm.countryId;
                var s2 = 10;
                var s3 = 1;
                $.get(baseURL + "sys/dept/info", function(r){
                    var colunms = Dept.initColumn();
                    var table = new TreeTable(Dept.id, baseURL + "sys/basedata/area/list?countryId="+s1+"&limit="+s2+"&page="+s3+"", colunms);
                    table.setRootCodeValue(r.id);
                    table.setExpandColumn(2);
                    table.setIdField("id");
                    table.setCodeField("id");
                    table.setParentCodeField("superId");
                    table.setExpandAll(false);
                    table.init();
                    Dept.table = table;
                });
        },
        getDept: function(){
			var coun = $("#country").val();
			$("#deptTree").css("display","block");
			$("#cTree").css("display","none");
			$.ajax({
				type: "get",
				url: baseURL + "sys/basedata/area/select",
				data: {"countryId":""+coun+""},
				success: function(r){
					ztree = $.fn.zTree.init($("#deptTree"), setting, r.body);
					var node = ztree.getNodeByParam("deptId", vm.dept.parentId);
					ztree.selectNode(node);
					// vm.dept.parentName = node.name;
				}
			});
		},
		cDept: function(){
			$("#deptTree").css("display","none");
			$("#cTree").css("display","block");
			$.ajax({
				type: "get",
				url: baseURL + "sys/basedata/channel/select",
				data: {"areaId":""+vm.dept.super+""},
				success: function(r){
					ztree = $.fn.zTree.init($("#cTree"), setting, r.body);
					var node = ztree.getNodeByParam("deptId", vm.dept.parentId);
					ztree.selectNode(node);
					// vm.dept.parentName = node.name;
				}
			});
		},
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.dept = {parentName:null,parentId:0,orderNum:0};
        },
        update: function () {
			var deptId = getDeptId();
			console.log(deptId);
            if(deptId == false){
                return ;
            }
			
			vm.showList = false;
            vm.title = "修改";

            $.get(baseURL + "sys/basedata/channel/info/"+deptId, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.dept = r.body;
			});
        },
        del: function () {
			var deptId = [getDeptId()];
			var user_id = [];
			var a = user_id.push(deptId);
			console.log(deptId);
            if(deptId == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
					url: baseURL + "sys/basedata/channel/delete",
					contentType: "application/json",
                    data: JSON.stringify(deptId),
                    success: function(r){
                        if(r.body.status === 200){
                            alert('操作成功', function(){
                                vm.reload();
                            });
                        }else{
                            alert(r.body.msg);
                        }
                    }
                });
            });
        },
        saveOrUpdate: function (event) {
			var coun = $("#country").val();
			var area = $("#name").val();
			var zipcode = $("#zipcode").val();
			var channelTypeId = $("#channelTypeId").val();
			var code = $("#code").val();
			console.log(vm.dept.coun);
            var url = vm.dept.id == null ? "sys/basedata/channel/save" : "sys/basedata/channel/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
				data: JSON.stringify({
					// superId:vm.dept.super,
					superId:vm.dept1.super,
					areaId: vm.dept.super,
					channelTypeId:vm.dept.super,
					name:area,
                    code:code,
                    id:vm.dept.id
				}),
                success: function(r){
                    if(r.body.status === 200){
                        alert('操作成功', function(){
                            vm.reload();
                        });
                    }else{
                        alert(r.body.msg);
                    }
                }
            });
        },
        deptTree: function(){
			vm.getDept();
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择部门",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级部门
                    vm.dept.parentId = node[0].deptId;
					vm.dept.parentName = node[0].name;
					vm.dept.coun = node[0].countryId;
                    vm.dept.super = node[0].id;
                    $("#depyname").val(vm.dept.parentName);
					if(vm.dept.coun == null){
						vm.dept.coun = vm.countryId;
					}
					console.log(vm.dept.parentName);
                    layer.close(index);
                }
            });
		},
		cTree: function(){
			vm.cDept();
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择部门",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node1 = ztree.getSelectedNodes();
                    //选择上级部门
                    vm.dept1.parentId = node1[0].deptId;
					vm.dept1.name = node1[0].name;
					vm.dept1.coun = node1[0].countryId;
                    vm.dept1.super = node1[0].id;
                    $("#depyname1").val(vm.dept1.name);
					if(vm.dept1.coun == null){
						vm.dept1.coun = vm.countryId;
					}
					layer.close(index);
					console.log(vm.dept1.super);
                }
            });
        },
        reload: function () {
            vm.showList = true;
			var s1 = vm.countryId;
			var s2 = 10;
			var s3 = 1;
			$.get(baseURL + "sys/dept/info", function(r){
				var colunms = Dept.initColumn();
				var table = new TreeTable(Dept.id, baseURL + "sys/basedata/channel/list?limit="+s2+"&page="+s3+"", colunms);
				table.setRootCodeValue(r.id);
				table.setExpandColumn(2);
				table.setIdField("id");
				table.setCodeField("id");
				table.setParentCodeField("superId");
				table.setExpandAll(false);
				table.init();
				Dept.table = table;
			});
        }
    }
});

var Dept = {
    id: "deptTable",
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Dept.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '渠道名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
		{title: '渠道编号', field: 'code', align: 'center', valign: 'middle', sortable: true, width: '100px'},
		{title: '创建时间', field: 'createAt', align: 'center', valign: 'middle', sortable: true, width: '100px'},
		{title: '更新时间', field: 'updateAt', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '渠道id', field: 'channelTypeId', align: 'center', valign: 'middle', sortable: true, width: '100px'}]
    return columns;
};


function getDeptId () {
    var selected = $('#deptTable').bootstrapTreeTable('getSelections');
    if (selected.length == 0) {
        alert("请选择一条记录");
        return false;
    } else {
        return selected[0].id;
    }
}


$(function () {
	var s1 = vm.countryId;
	var s2 = 10;
	var s3 = 1;
    $.get(baseURL + "sys/dept/info", function(r){
		var colunms = Dept.initColumn();
        var table = new TreeTable(Dept.id, baseURL + "sys/basedata/channel/list?limit="+s2+"&page="+s3+"", colunms);
        table.setRootCodeValue(r.id);
        table.setExpandColumn(2);
        table.setIdField("id");
        table.setCodeField("id");
        table.setParentCodeField("superId");
        table.setExpandAll(false);
        table.init();
		Dept.table = table;
	});
});
