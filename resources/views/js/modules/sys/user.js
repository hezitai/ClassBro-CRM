$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/user/list',
        datatype: "json",
        colModel: [		
			{ label: '用户ID', name: 'userId', index: "user_id", width: 45, key: true },
			{ label: '用户名', name: 'username', width: 75 },
            { label: '所属部门', name: 'deptName', width: 75 },
			{ label: '邮箱', name: 'email', width: 90 },
			{ label: '手机号', name: 'mobile', width: 80 },
			{ label: '状态', name: 'status', width: 80, formatter: function(value, options, row){
				return value === 0 ? 
					'<span class="label label-danger">禁用</span>' : 
					'<span class="label label-success">正常</span>';
			}},
			{ label: '创建时间', name: 'createTime', index: "create_time", width: 90}
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
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
	});
	vm.showList5 = false;
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

//菜单树
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
			url:"nourl"
		}
	},
	check:{
		enable:true,
		nocheckInherit:true
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
            url:"nourl"
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
            url:"nourl"
        }
    },
    check:{
        enable:true,
        nocheckInherit:true,
        chkboxType:{ "Y" : "", "N" : "" }
    }
};
var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			username: null
		},
		showList2:false,
		showList5:true,
		max:'',
		input:false,
		showinput1:false,
		showinput2:false,
		showList: true,
		showSubList: false,
		title:null,
		roleList:{},
		user:{
			maxval:'',
			lootNum:'',
			target:'',
			status:1,
			deptId:null,
			deptName:null,
			salesTarget:0,
			roleIdList:[]
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.showList2 = true;
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
				console.log(node);
                if(node != null){
                    ztree.selectNode(node);

					vm.user.deptName = node.name;
				};
				
            })
        },
		update: function () {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			
			vm.showList = false;
			vm.showList2 = true;
            vm.title = "修改";
			
			vm.getUser(userId);
			//获取角色信息
			this.getRoleList();
		},
		del: function () {
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}	
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/user/delete",
                    contentType: "application/json",
				    data: JSON.stringify(userIds),
				    success: function(r){
						if(r.body.states == 200){
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
			var url = vm.user.userId == null ? "sys/user/save" : "sys/user/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.user),
			    success: function(r){
			    	if(r.status === 200){
						alert('操作成功', function(){
							window.location.reload();
						});
					}else{
						alert(r.body.msg);
					}
				}
			});
		},
		getUser: function(userId){
			$.get(baseURL + "sys/user/info/"+userId, function(r){
				vm.user = r.user;
				vm.user.password = null;
                vm.getDept();
			});
		},
		changevalue: function (val){ 
			var val = $("#myselect").val();
			if(val == "0"){
				vm.input = false;
				vm.user.maxval = 0;
			}else if(val == "-1"){
				vm.user.maxval = -1;
				vm.input = false;
			}else if(val == "-2"){
				vm.user.maxval = -2;
				vm.input = false;
			}else if(val == "-3"){
				vm.user.maxval = -3;
				vm.input = false;
			}else{
				vm.input = true;
			}     
		}, 
		operation1: function(){
			var userId = getSelectedRow();
			vm.userId = userId;
			$.get(baseURL + "sys/user/info/"+userId, function(r){
				var deptType = r.user.deptType;
				if(deptType === 1){
					$("#table").css("display","none");
					vm.showinput1 = true;
				}else{
					alert("只能选择销售")
				}
			});
		},
		save1:function(){
			$.ajax({
				type: "POST",
			    url: baseURL + "/sys/user/putSellerTarget",
				dataType: "json", 
			    data: {
					"userId":vm.userId,
					"lootNum":vm.user.target,
				},
			    success: function(r){
			    	if(r.status === 200){
						alert('操作成功', function(){
							window.location.reload();
						});
					}else{
						alert(r.body.msg);
					}
				}
			});
		},
		operation2: function(){
			var userId = getSelectedRow();
			vm.userId = userId;
			$.get(baseURL + "sys/user/info/"+userId, function(r){
				var deptType = r.user.deptType;
				if(deptType === 1){
					$("#table").css("display","none");
					vm.showinput2 = true;
				}else{
					alert("只能选择销售")
				}
			});
		},
		getRole(){
			
			// var roleId = getSelectedObject();
			// if(roleId == null){
			// 	return ;
			// }
			vm.showList5 = true;
			vm.showList = false;
			//vm.getDataTree();
			$.get(baseURL + "sys/dept/list", function(r){
                data_ztree = $.fn.zTree.init($("#dataTree"), data_setting, r);
                //展开所有节点
				data_ztree.expandAll(true);
				
				var row = getSelectedObject();
				$.ajax({
					url: ""+baseURL+"/sys/oper/getDeptIdsByOperId",
					type: 'post',
					headers:{token: token},
					data: {
						operId:row.userId
					},
					success: function(data) {
						//勾选角色所拥有的菜单
						var zTree = $.fn.zTree.getZTreeObj("dataTree");
						$.each(data.body.ids, function(index, value) {
							var node = zTree.getNodeByParam("deptId", value);
							node.checked = true;
							zTree.updateNode(node);
						});
					}
				});
            });
            //vm.getMenuTree(roleId);

            //vm.getDept();
		},
		saveOperDutyGroup: function() {
			var zTree = $.fn.zTree.getZTreeObj("dataTree");
			var dutyGroupIds = "";
			var rows = zTree.getCheckedNodes();
			$.each(rows, function(index, value) {
				dutyGroupIds += value.deptId;
				dutyGroupIds += ";";
			});
			var row = getSelectedObject();
			$.ajax({
				url: ""+baseURL+"/sys/oper/saveOperDutyGroupBatch",
				type: 'post',
				headers:{token: token},
				data: {
					operId:row.userId,
					dutyGroupIds: dutyGroupIds
				},
				success: function(data) {
					if(data.status === 200){
						alert('操作成功', function(){
							window.location.reload();
						});
					}else{
						alert(data.body.msg);
					}
				}
			});
		},
		getDataTree: function(roleId) {
            //加载菜单树
            $.get(baseURL + "sys/dept/list", function(r){
                data_ztree = $.fn.zTree.init($("#dataTree"), data_setting, r);
                //展开所有节点
                data_ztree.expandAll(true);
            });
        },
		// getRole: function(roleId){
		// 	var row = getSelectedObject();
		// 	var roleIdList = row.roleIdList;

		// 	if(roleIdList == ""){
		// 		return;
		// 	}else{
		// 		vm.showList5 = false;
		// 		vm.showList = false;
		// 		$.get(baseURL + "sys/role/info/"+roleIdList, function(r){
		// 			vm.role = r.role;
					
		// 			//勾选角色所拥有的菜单
		// 			var menuIds = vm.role.menuIdList;
		// 			for(var i=0; i<menuIds.length; i++) {
		// 				var node = menu_ztree.getNodeByParam("menuId", menuIds[i]);
		// 				menu_ztree.checkNode(node, true, false);
		// 			}
	
		// 			//勾选角色所拥有的部门数据权限
		// 			var deptIds = vm.role.deptIdList;
		// 			for(var i=0; i<deptIds.length; i++) {
		// 				var node = data_ztree.getNodeByParam("deptId", deptIds[i]);
		// 				data_ztree.checkNode(node, true, false);
		// 			}
	
		// 			vm.getDept();
		// 		});
		// 	}
		// },
		getMenuTree: function(roleId) {
			//加载菜单树
			$.get(baseURL + "sys/menu/list", function(r){
				menu_ztree = $.fn.zTree.init($("#menuTree"), menu_setting, r);
				//展开所有节点
				menu_ztree.expandAll(true);
				
				if(roleId != null){
					vm.getRole(roleId);
				}
			});
	    },

		getDept: function(){
            //加载部门树
            $.get(baseURL + "sys/dept/list", function(r){
                dept_ztree = $.fn.zTree.init($("#deptTree"), dept_setting, r);
				var node = dept_ztree.getNodeByParam("deptId", vm.role.deptId);
				console.log(node);
                if(node != null){
                    dept_ztree.selectNode(node);

                    vm.role.deptName = node.name;
                }
            })
        },
		forbid: function(){
			var userId = getSelectedRow();
			if(userId == null){
				return;
			}
			vm.userId = userId;
			$.ajax({
				type: "POST",
			    url: baseURL + "sys/user/lockUser/",
				dataType: "json", 
			    data: {
					"userId":vm.userId,
				},
			    success: function(r){
			    	if(r.status === 200){
						alert('操作成功', function(){
							window.location.reload();
						});
					}else{
						alert(r.body.msg);
					}
				}
			});
		},
		save2:function(){
			$.ajax({
				type: "POST",
			    url: baseURL + "/sys/user/putUserMaxLootNum",
				dataType: "json", 
			    data: {
					"userId":vm.userId,
					"lootNum":vm.user.maxval,
				},
			    success: function(r){
			    	if(r.status === 200){
						alert('操作成功', function(){
							window.location.reload();
						});
					}else{
						alert(r.body.msg);
					}
				}
			});
		},
		getRoleList: function(){
			$.get(baseURL + "sys/role/select", function(r){
				vm.roleList = r.list;
			});
		},
		back(){
			window.location.reload();
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
                    var node = dept_ztree.getSelectedNodes();
                    //选择上级部门
                    vm.user.deptId = node[0].deptId;
                    vm.user.deptName = node[0].name;

					layer.close(index);
					// 销售部门-销售业绩目标
					if(node[0].deptType == 1){
						vm.showSubList = true;
                    }else{
						vm.showSubList = false;
					}
                }
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