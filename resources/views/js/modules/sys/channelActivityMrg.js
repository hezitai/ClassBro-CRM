$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/channel/channelactivity/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: "id", width: 40, key: true },
			{ label: '活动标题', name: 'title', width: 125 },
			{ label: '活动编号', name: 'activityNo', width: 55 },
            { label: '活动地区', name: 'areaName', width: 75 },
			{ label: '渠道姓名', name: 'channelName', width: 90 },
			{ label: '活动人数', name: 'partNumber', width: 90 },
			{ label: '参与人员', name: 'participantUser', width: 80 },
			{ label: '创建时间', name: 'createAt', index: "create_time", width: 90}
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
		},
		user1:{
			status:1,
			deptId:null,
            deptName:null,
			roleIdList:[],
			super:''
		},
		countryId:'',
		countrys:[],
		channels:''
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
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.roleList = {};
			vm.user = {deptName:null, deptId:null, status:1, roleIdList:[]};
			vm.dept = {parentName:null,parentId:0,orderNum:0};
			
			//获取角色信息
			// this.getRoleList();

			// vm.getDept();
		},
		change_country:function(event){
            vm.countryId = event.target.value;
            console.log(vm.countryId);
                var s1 = vm.countryId;
                var s2 = 10;
                var s3 = 1;
		},
		change_channel:function(event){
            vm.countryId = event.target.value;
            console.log(vm.countryId);
                var s1 = vm.countryId;
                var s2 = 10;
                var s3 = 1;
        },
        getDept: function(){
			var country_id = $("#country").val();
			$.ajax({
				type: "get",
				url: baseURL + "sys/basedata/area/select",
				data: {"countryId":""+country_id+""},
				success: function(r){
					ztree = $.fn.zTree.init($("#deptTree"), setting, r.body);
					var node = ztree.getNodeByParam("deptId", vm.parentId);
					ztree.selectNode(node);
					// vm.dept.parentName = node.name;
				}
			});
		},
		getchan: function(){
			$.ajax({
				type: "get",
				url: baseURL + "sys/basedata/channel/select",
				data: {"areaId":""+vm.user.super+""},
				success: function(r){
					ztree = $.fn.zTree.init($("#channelTree"), setting, r.body);
					var node = ztree.getNodeByParam("deptId", vm.parentId);
					ztree.selectNode(node);
					// vm.dept.parentName = node.name;
				}
			});
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
		del: function () {
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/channel/channelactivity/delete",
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
		// 获取二维码
		getcode: function(){
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}else{
				$.get(baseURL + "sys/channel/channelactivity/info/"+userId, function(r){
					if(r.body.status == 200){
						vm.user = r.body;
						var activityNo = r.body.id;
						$("#code").attr("src",""+baseURL+"sys/channel/channelactivity/getQr/"+activityNo+"?token="+token+"")
						$("#myModal").modal('show');
						// $.get(baseURL + "sys/channel/channelactivity/getQr/"+activityNo, function(r){
							
						// });
					}
				});
			}
		},
		saveOrUpdate: function () {
			var url = vm.user.userId == null ? "sys/channel/channelactivity/save" : "sys/channel/channelactivity/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
				data: JSON.stringify({
					activityNo:vm.user.activityNo,
					// deptName:vm.user.deptName,
					partNumber:vm.user.partNumber,
					participantUser:vm.user.participantUser,
					channelId:vm.user1.super,
					areaId:vm.user.super,
					title:vm.user.title,
					id:vm.user.id
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
		getUser: function(userId){
			$.get(baseURL + "sys/channel/channelactivity/info/"+userId, function(r){
				vm.user = r.body;
				// vm.user.password = null;

                // vm.getDept();
			});
		},
		getRoleList: function(){
			$.get(baseURL + "sys/role/select", function(r){
				vm.roleList = r.list;
			});
		},
        deptTree: function(){
			$("#channelTree").css("display","none");
			$("#deptTree").css("display","block");
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
                    vm.user.deptId = node[0].deptId;
					vm.user.deptName = node[0].name;
					vm.user.super = node[0].id;
					console.log(vm.user.super);
					if(vm.user.super == 0){
						alert('不能选择一级', function(){
							layer.close(index);
						});
						return;
					}else{
						$("#s1").val(vm.user.deptName);
						layer.close(index);
					}
                }
            });
		},
		channelTree: function(){
			$("#deptTree").css("display","none");
			$("#channelTree").css("display","block");
			vm.getchan();
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
                    vm.user1.deptId = node1[0].deptId;
					vm.user1.deptName = node1[0].name;
					vm.user1.super = node1[0].id;
					if(vm.user1.super == 0){
						alert('不能选择一级', function(){
							layer.close(index);
						});
						return;
					}else{
						$("#s2").val(vm.user1.deptName);
						layer.close(index);
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