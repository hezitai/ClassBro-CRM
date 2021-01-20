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
		countrys:[],
        countryId:'',
        s1:"19",
        s2:"",
        s3:"",
        deptId:''
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
            var coun = $("#count_id").val();
            vm.countryId = event.target.value;
            console.log(vm.countryId);
                var s1 = vm.countryId;
                var s2 = 10;
                var s3 = 1;
                $.get(baseURL + "sys/dept/info", function(r){
                    var colunms = Dept.initColumn();
                    var table = new TreeTable(Dept.id, baseURL + "sys/basedata/area/list?countryId="+coun+"&limit="+s2+"&page="+s3+"", colunms);
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
            var country = $("#country").val();
			console.log(vm.countryId);
			$.ajax({
				type: "get",
				url: baseURL + "sys/basedata/area/select",
				data: {"countryId":""+country+""},
				success: function(r){
					ztree = $.fn.zTree.init($("#deptTree"), setting, r.body);
					var node = ztree.getNodeByParam("deptId", vm.dept.parentId);
					ztree.selectNode(node);
                    // vm.dept.parentName = node.name;
                    // $("#dapt").val(vm.dept.parentName);
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
            if(deptId == false){
                return ;
            }

            $.get(baseURL + "sys/basedata/area/info/"+deptId, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.dept = r.body;
			});
        },
        del: function () {
            var deptId = [getDeptId()];
            vm.deptId = deptId;
            if(deptId == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/basedata/area/delete",
                    data: JSON.stringify(deptId),
                    contentType: "application/json",
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
			var type = $(".radio[name='optionsRadios']:checked").val();
			var area = $("#area").val();
			var zipcode = $("#zipcode").val();
			console.log(vm.dept.superId);
            var url = vm.dept.superId == null ? "sys/basedata/area/save" : "sys/basedata/area/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
				data: JSON.stringify({
					countryId:vm.dept.coun,
					superId:vm.dept.super,
					type:type,
					name:area,
                    zipcode:zipcode,
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
                    console.log(vm.dept.parentName);
                    $("#dapt").val(vm.dept.parentName);
					vm.dept.coun = node[0].countryId;
					vm.dept.super = node[0].id;
					if(vm.dept.coun == null){
						vm.dept.coun = vm.countryId;
					}
                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var coun = $("#count_id").val();
            console.log(coun);
            var s1 = 58;
            var s2 = 10;
            var s3 = 1;
            $.get(baseURL + "sys/dept/info", function(r){
                var colunms = Dept.initColumn();
                var table = new TreeTable(Dept.id, baseURL + "sys/basedata/area/list?countryId=58&limit="+s2+"&page="+s3+"", colunms);
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
        {title: '地区ID', field: 'id', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '地区名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
        {title: '创建时间', field: 'createAt', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '更新时间', field: 'updateAt', align: 'center', valign: 'middle', sortable: true, width: '100px'}]
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
    var coun = $("#count_id").val();
    console.log(coun);
    var s1 = 58;
	var s2 = 10;
	var s3 = 1;
    $.get(baseURL + "sys/dept/info", function(r){
		var colunms = Dept.initColumn();
        var table = new TreeTable(Dept.id, baseURL + "sys/basedata/area/list?countryId=58&limit="+s2+"&page="+s3+"", colunms);
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
