$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/basedata/university/list',
        datatype: "json",
        colModel: [			
			{ label: 'ID', name: 'id', index: "user_id", width: 45, key: true },
			{ label: '大学名称', name: 'name', width: 90 },
			{ label: '学校编码', name: 'code', width: 75 },
			{ label: '学术评级', name: 'academicRating', width: 75 },
			{ label: '学校官网', name: 'unUrl', width: 75 },
			{ label: '创建时间', name: 'createAt', width: 85},
			{ label: '更新时间', name: 'updateAt', width: 85 }
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
		},
		// countryName:{},
		// cityName:"请选择城市",
		// area:[
		//  {
		//  "country":"美国",
		//  "city":[
		//   "纽约",
		//   "洛杉矶",
		//   "旧金山",
		//   "西雅图",
		//   "波士顿",
		//   "休斯顿",
		//   "圣地亚哥",
		//   "芝加哥",
		//   "其它",
		//  ]
		//  },
		//  {
		//  "country":"加拿大",
		//  "city":[
		//   "温哥华",
		//   "多伦多",
		//   "蒙特利尔",
		//   "其它"
		//  ]
		//  },
		//  {
		//  "country":"澳大利亚",
		//  "city":[
		//   "悉尼",
		//   "墨尔本",
		//   "其它"
		//  ]
		//  },
		//  {
		//  "country":"新加坡",
		//  "city":[
		//   "新加坡"
		//  ]
		//  },
		// ],
	},
	methods: {
		function () {
			alert(1);
			var _self = this;
			$.ajax({
				type: 'post',
				url: '...',
				success:function(data) {
					_self.goodsList = data;
				}
			});
		},
		// selectCountry(value){
		// 	this.cityName=this.countryName.city;
		// 	console.log(this.value);
		// 	},
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
			//this.getRoleList();
		},
		del: function () {
			var userIds = getSelectedRows();
			console.log(userIds);
			if(userIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/basedata/country/delete",
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
			// alert(vm.userId);
			var url = vm.user.id == null ? "sys/basedata/country/save" : "sys/basedata/country/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.user),
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
		},
		getUser: function(id){
			$.get(baseURL + "sys/basedata/country/info/"+id, function(r){
				vm.user = r.body;
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