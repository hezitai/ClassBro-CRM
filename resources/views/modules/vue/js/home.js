var vm = new Vue({  
  el:'#app',
  data() {
    return {
    tableDataBegin: [],
    tableDataName: "",
    tableDataEnd: [],
    currentPage: 0,
    pageSize: 0,
    total:0,
    filterTableDataEnd:[],
    dialogFormVisible:false,
    idss:[],
    page:"",
    titleMap: {
      addEquipment:'编辑',
      editEquipment: "添加"
            },
    dialogStatus: "",
    ruleForm: {
        name: '',
        code: '',
        currency: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入name', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入code', trigger: 'blur' }
        ],
        currency: [
          { required: true, message: '请输入currency', trigger: 'blur' }
        ]
      }
    }
},
multipleSelection: [],
mounted() {
this.getTableData(); 
if (this.totalItems > this.pageSize) {
for (let index = 0; index < this.pageSize; index++) {
this.tableDataEnd.push(this.tableDataBegin[index]);
}
} else {
this.tableDataEnd = this.tableDataBegin;
}
},
methods: {
getTableData:function(){  
  const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var self = this;  
      var token = localStorage.getItem("token");
      $.ajax({  
        type : "get",  
        dataType: "json", 
        data:{
          "token": token,
          "page": 1,
          "limit": 8 
        } ,
        url : "http://www.classbro.ca/crm/sys/basedata/country/list",  
        success : function(json) {  
         self.tableDataEnd=json.body.list;  
         self.total = json.body.totalCount;
         self.pageSize = json.body.totalCount;
         self.currentPage = json.body.currPage;
         loading.close();
       },  
       error : function(json) {  

      }  
    });    
    },
openData() {this.getTableData();},
handleSizeChange(val) {
console.log(`每页 ${val} 条`);
this.pageSize = val;
this.handleCurrentChange(this.currentPage);
},
handleClose(done) {
this.$confirm('确认关闭？')
  .then(_ => {
    done();
  })
  .catch(_ => {});
},
dialogVisible(row,_index){
this.listIndex=_index;
this.editObj=row;
let index=this.listIndex
console.log(this.tableDataEnd[index]);
this.dialogFormVisible=true;
this.dialogStatus = "addEquipment";
this.inputValue=row.name;
},
add(){
this.dialogFormVisible=true;
this.dialogStatus = "editEquipment";
},
handleCurrentChange(val) {
console.log(`当前页: ${val}`);
this.currentPage = val;
this.page =  this.currentPage;
console.log(this.page);
const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var self = this;  
      var token = localStorage.getItem("token");
      $.ajax({  
        type : "get",  
        dataType: "json", 
        data:{
          "token": token,
          "page": val,
          "limit": 8 
        } ,
        url : "http://www.classbro.ca/crm/sys/basedata/country/list",  
        success : function(json) {  
         self.tableDataEnd=json.body.list;  
         self.total = json.body.totalCount;
         self.pageSize = json.body.totalCount;
         self.currentPage = json.body.currPage;
         loading.close();
       },  
       error : function(json) {  

      }  
    });
},
currentChangePage(list) {
 this.list = list;
let from = (this.currentPage - 1) * this.pageSize;
let to = this.currentPage * this.pageSize;
this.tableDataEnd = [];
for (; from < to; from++) {
if (list[from]) {
 this.tableDataEnd.push(list[from]);
}
}
},
submitForm(formName) {
let _this = this;
var datas = _this.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
        var token = localStorage.getItem("token");
      $.ajax({  
        type : "post",  
        dataType : "json", 
        cache: false, 
        contentType: "application/json",
        headers: {"token": token},
        data: JSON.stringify({
          "name" : datas.name,
          "code" : datas.code,
          "currency" : datas.currency
        }),
        url : "http://www.classbro.ca/crm/sys/basedata/country/save",  
        success : function(json) {  
          if(json.status == "200"){
            vm.$message({
            message: '信息添加成功',
            type: 'success'
          });
          vm.dialogFormVisible=false;
          vm.getTableData();
          }
       },  
       error : function(json) {  

      }  
    });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }, 
      toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let ids = [];
      this.multipleSelection.map((item)=> {
        var id = item.id;
      ids.push(""+id+"");
      });
      this.selectedIDs = ids;
      console.log('多选',ids);
      this.idss =  this.selectedIDs;
      console.log(this.idss);
    }, 
    handleDelete() {
      var ids = this.idss;
      console.log(JSON.parse(JSON.stringify(ids)));
      var a = JSON.parse(JSON.stringify(ids));
      if(ids == ""){
        vm.$message({
            message: '请选择一条或多条数据',
            type: 'warning',
            duration:'1500'
          });
          return;
      }
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(_ => {
        var token = localStorage.getItem("token");
      $.ajax({  
        type : "post",  
        dataType : "json", 
        cache: false, 
        contentType: "application/json",
        headers: {"token": token},
        data: JSON.stringify(ids),
        url : "http://www.classbro.ca/crm/sys/basedata/country/delete",  
        success : function(json) {  
          if(json.status == "200"){
            vm.$message({
            message: '删除信息成功',
            type: 'success'
          });
          vm.getTableData();
          }
       },   
       error : function(json) {  
      } 
    });
        })
        .catch(_ => {
        });

      },    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
}
})
