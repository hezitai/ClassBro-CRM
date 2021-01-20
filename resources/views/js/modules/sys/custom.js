$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/seller/order/list?page=1&limit=20&statused=39&typeed=0',
		datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: "user_id", width: 45, key: true },
			{ label: '接单时间', name: 'createAt', width: 125 },
			{ label: '定制需求说明', name: 'studCourse.explained', width: 75 },
            { label: '称呼', name: 'studCourse.callName', width: 75 },
			{ label: '微信号', name: 'studCourse.wxAccount', width: 90 },
			{ label: 'im群号', name: 'studCourse.groupNo', index: "group_id", width: 90 },
			{ label: '学校姓名', name: 'studCourse.schoolName', width: 80 },
			{ label: '详细说明', name: 'explained', index: "create_time", width: 90}
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
            root: "body.list",
            page: "body.currPage",
            total: "body.totalPage",
            records: "body.totalCount"
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
				console.log(node);
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
		get_order: function(){
			var id = getSelectedRow("user_id");
			var rowData = $("#jqGrid").jqGrid('getRowData',id);
			console.log(rowData);
			if(id == null){
				return ;
			}
			confirm('确定要接单吗？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/seller/order/lootOrder",
                    // contentType: "application/json",
				    data: {
						courseId:"28",
						groupNo:"gg845353535",
					},
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
						if(r.code == 0){
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
			console.log(url);
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.user),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(){
							vm.reload();
						});
					}else{
						alert(r.body.msg);
					}
				}
			});
		},
		getInfo: function(userId){
			$.get(baseURL + "sys/user/info/"+userId, function(r){
				vm.user = r.user;
			});
		},
		getUser: function(userId){
			$.get(baseURL + "sys/user/info/"+userId, function(r){
				vm.user = r.user;
				vm.user.password = null;
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
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'username': vm.q.username},
                page:page
            }).trigger("reloadGrid");
		}
	}
});