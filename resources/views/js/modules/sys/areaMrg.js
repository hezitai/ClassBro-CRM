$(function () {
    $.ajax({
        type: "get",
        url: baseURL + "sys/basedata/country/list",
        datatype: "json",
        data: {
            token:token,
            page:"1",
            limit:"10",
            receiver:"140140",
            pageSize:"30"
            }, 
        success: function(data){
            var data = data.body.list;
            var cty = data.length;
            for (var i=0;i<cty;i++)
            {
            var op = data[i].name;
            var id = data[i].id;
            $("#city").append("<option value="+id+">"+op+"</option>")
            } 
        }
    })

    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/basedata/area/list',
        datatype: "json",
        colModel: [			
			{ label: '国家ID', name: 'id', index: "user_id", width: 45, key: true },
			{ label: '国家ID', name: 'countryId', width: 75 },
            { label: 'name', name: 'name', width: 75 },
			{ label: 'superId', name: 'superId', width: 90 },
			{ label: '创建时间', name: 'createAt', width: 80 },
			{ label: '结束时间', name: 'updateAt', index: "create_time", width: 90}
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "body",
            page: "body",
            total: "body",
            records: "body"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        },
    });
});

var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
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
		q:{
			username: null
		},
		showList: true,
		title:null,
		roleList:{},
		user:{
			status:1,
			deptId:null,
            deptName:null,
			roleIdList:[]
        }       
	},
	methods: {
		query: function () {
            vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.roleList = {};
			vm.user = {deptName:null, deptId:null, status:1, roleIdList:[]};
			
			//获取角色信息
			this.getRoleList();

			vm.getDept();
		},
        getDept: function(){
            //加载部门树
            $.get(baseURL + "sys/dept/list", function(r){
                ztree = $.fn.zTree.init($("#deptTree"), setting, r);
                var node = ztree.getNodeByParam("deptId", vm.user.deptId);
                if(node != null){
                    ztree.selectNode(node);

                    vm.user.deptName = node.name;
				}
            })
        },
		update: function () {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			
			vm.showList = false;
            vm.title = "修改";
			
			vm.getUser(userId);
			//获取角色信息
			this.getRoleList();
        },
        getSelect: function () {

		},
		del: function () {
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/basedata/area/delete",
                    contentType: "application/json",
				    data: JSON.stringify(userIds),
				    success: function(r){
						if(r.body.status == 200){
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
		saveOrUpdate: function () {
			var url = vm.user.userId == null ? "sys/basedata/area/save" : "sys/basedata/area/update";
			console.log(url);
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.user),
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
		getUser: function(userId){
			$.get(baseURL + "sys/basedata/area/info/"+userId, function(r){
				// vm.user = r.user;
				// vm.user.password = null;
                vm.getDept();
			});
		},
		getRoleList: function(){
			$.get(baseURL + "sys/role/select", function(r){
				vm.roleList = r.list;
			});
		},
        deptTree: function(){
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
                    vm.user.deptId = node[0].deptId;
                    vm.user.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
        getSelect: function(){
			$.get(baseURL + "sys/basedata/country/list", function(r){
				vm.user = r.user;
			});
		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'key': vm.q.username},
                page:page
            }).trigger("reloadGrid");
		}
    }
});
$("#city").change(function(){
    var cy = $("#city").val();
    alert(cy);
    vm.showList = true;
    var page = $("#jqGrid").jqGrid('getGridParam','page');
    $("#jqGrid").jqGrid('setGridParam',{ 
        postData:{'countryId': cy,'superId': "0"},
        page:page
    }).trigger("reloadGrid");
    });
