<template>
  <div class="calendar-list-container test">
    <div class="title">
      学生信息管理
    </div>
    <div class="btn-import-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" @change='handleFilter' class="btn-item" placeholder="学号" v-model="listQuery.studentId">
      </el-input>

      <el-select clearable style="width: 100px" @change='handleFilter' class="btn-item" v-model="listQuery.grade" placeholder="年级">
        <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select clearable class="btn-item" @change='handleFilter' style="width: 130px" v-model="listQuery.className" placeholder="班级">
        <el-option v-for="item in  classNameOptions" :key="item.key" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select @change='handleFilter' style="width: 120px" class="btn-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="btn-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">筛选</el-button>
      <el-button class="btn-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-plus">添加</el-button>
      <el-button class="btn-item" type="primary" icon="el-icon-document" @click="handleDownload">导出</el-button>
      <el-button class="btn-item" type="primary" icon="el-icon-delete" v-waves @click="handleBatchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
      <el-button class="btn-item" type="warning" icon="el-icon-star-on" v-waves @click="markFavoriteStudent" v-if="multipleSelection.length" >收藏</el-button>
      <el-button class="btn-item" type="warning" icon="el-icon-star-off" :plain="true" v-waves @click="unMarkFavoriteStudent" v-if="multipleSelection.length" >取消收藏</el-button>
    </div>
    <!--<el-table :data="studentList"-->
              <!--ref="studentTable"-->
              <!--v-loading="listLoading"-->
              <!--border fit-->
              <!--highlight-current-row-->
              <!--@selection-change="handleSelectionChange"-->
              <!--style="width: 100%">-->

      <!--<el-table-column-->
        <!--align="center"-->
        <!--type="selection"-->
        <!--width="55">-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
        <!--label="序号"-->
        <!--type="index"-->
        <!--:index="1"-->
        <!--align="center"-->
        <!--width="55"-->
      <!--&gt;-->
      <!--</el-table-column>-->

      <!--&lt;!&ndash;<el-table-column align="center" label="序号" width="80">&ndash;&gt;-->
        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;<span>{{tableKey}}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->

      <!--&lt;!&ndash;<el-table-column v-if="multipleSelection.length" type="selection" width="55"></el-table-column>&ndash;&gt;-->
      <!--<el-table-column align="center" label="学号" width="180px">-->
        <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.studentId}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column width="120px" align="center" label="姓名">-->
        <!--<template slot-scope="scope">-->
            <!--<span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.studentName }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--&lt;!&ndash;<el-table-column min-width="300px" label="标题">&ndash;&gt;-->
      <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
      <!--&lt;!&ndash;<span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-tag>{{scope.row.type | typeFilter}}</el-tag>&ndash;&gt;-->
      <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
      <!--<el-table-column width="110px" align="center" label="年级">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.grade}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column width="150px" align="center" label="专业">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{scope.row.profession}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column width="110px" align="center" label="班级">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.className }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->


      <!--<el-table-column align="center" label="参与任务数" width="120px">-->
        <!--<template slot-scope="scope">-->
          <!--<span>-->
            <!--{{ scope.row.finishedTaskCount }}-->
          <!--</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--&lt;!&ndash;<el-table-column class-name="status-col" align="center"  label="任务状态" width="180">&ndash;&gt;-->
        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;<span>&ndash;&gt;-->
              <!--&lt;!&ndash;{{ scope.row.status.chineseValue }}&ndash;&gt;-->
              <!--&lt;!&ndash;</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->

      <!--&lt;!&ndash;<el-table-column  align="center" class-name="status-col" label="标记" width="100px">&ndash;&gt;-->
        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;<el-tag v-if="scope.row.favorite.value" type="warning">&ndash;&gt;-->
            <!--&lt;!&ndash;{{ scope.row.favorite.chineseValue }}&ndash;&gt;-->
          <!--&lt;!&ndash;</el-tag>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-tag v-else>&ndash;&gt;-->
            <!--&lt;!&ndash;{{ scope.row.favorite.chineseValue }}&ndash;&gt;-->
          <!--&lt;!&ndash;</el-tag>&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->

      <!--<el-table-column align="center"  label="操作" min-width="200px">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button size="small" icon="edit"  type = "success" @click="handleUpdate(scope.row)">更新</el-button>-->
          <!--<el-button size="small" icon="delete" type = "danger" @click="handleDelete(scope.row)">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->

    <Table border size='default'
           :loading="listLoading"
           :columns="studentColumns"
           :data="studentList"
           @on-selection-change="handleSelectionChange"
           class="student-list-container"
           stripe></Table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="fixPage"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="学号" label-width="85px">
          <el-input v-model="temp.studentId">
          </el-input>
        </el-form-item>

        <el-form-item label="姓名" label-width="85px">
          <el-input v-model="temp.studentName">
          </el-input>
        </el-form-item>

        <el-form-item label="年级" label-width="85px">
          <el-select class="btn-item" v-model="temp.grade">
            <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业" label-width="85px">
          <el-select class="btn-item" v-model="temp.profession">
            <el-option v-for="item in professionOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" label-width="85px">
          <el-select class="btn-item" v-model="temp.className">
            <el-option v-for="item in classNameOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="参与任务数" label-width="85px">
          <el-input v-model="temp.finishedTaskCount" :disabled="dialogStatus!=='create'">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, fetchPv } from 'api/article_table';
  import { parseTime,deleteEmptyProperty } from 'utils';
  import { fetchStudentList,
           deleteStudent ,
          createStudent,
          updateStudent,
          deleteStudentBatch,
          markStudent,
          unMakrStuden,
          fetchOptions
  } from 'api/students';


  export default {
    name: 'StudentTable',
    data() {
      return {
        studentColumns: [
          {
            type: 'selection',
            align:'center',
            width: 60,
          },
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '学号',
            align: 'center',
            key: 'studentId'
          },
          {
            title: '姓名',
            align: 'center',
            key: 'studentName'
          },
          {
            title: '年级',
            align: 'center',
            key: 'grade'
          },
          {
            title: '专业',
            align: 'center',
            key: 'profession'
          },
          {
            title: '班级',
            align: 'center',
            key: 'className',
          },
          {
            title: '管理',
            key: 'manage',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'default'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
//                      this.handleCheck(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'default'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.index)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'default'
                  },
                  on: {
                    click: () => {
                      this.handleUpdate(params.index)
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ],
        total: null,
        listLoading: false,
        listQuery: {
          studentId: "",
          studentName: "",
          className: "",
          profession:"",
          grade:"",
          page: 0,
          size: 20,
          sort:"studentId,ASC",
        },
        temp: {
          studentId:'',
          studentName:'',
          grade:'',
          className:'',
          profession:'',
          status:{
            statusId:3,
            chineseValue:'空闲',
            englishValue:'available',
          },
          favorite:{
            favoriteId:0,
            chineseValue:'已收藏',
            englishValue:'favorite'
          },
          finishedTaskCount:0
        },
        studentList: [],
        queryTypeOptions:[
          '姓名',
          '学号'
        ],
        statusOptions:[{
          statusId:0,
          chineseValue:'任务进行中',
          englishValue:'executing',
        },{
          statusId:1,
          chineseValue:'锁定',
          englishValue:'unavailable',
        },{
          statusId:2,
          chineseValue:'任务完成',
          englishValue:'finished',
        },{
          statusId:3,
          chineseValue:'空闲',
          englishValue:'available',
        }],
        sortOptions: [{label: '按学号升序', key: 'studentId,ASC'}, {label: '按学号降序', key: 'studentId,DESC'}],
        multipleSelection:[],
        isDisplayFavoriteColumn:false,
        gradeOptions:[],
        professionOptions:[],
        classNameOptions:[],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        pvData: [],
        tableKey: 0
      };
    },
    created() {
      this.getStudentList();
      this.getOptions();
    },
    computed: {
      fixPage(){
        return this.listQuery.page + 1;
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleRowClicked(row,event,column) {
        let lable = column.label;
        if(lable==='操作'||lable==='算法配置'){
          return;
        }
        this.$refs.studentTable.toggleRowSelection(row);
        this.isDisplayFavoriteColumn = !this.isDisplayFavoriteColumn;
      },
      getOptions() {
        let vm = this;
        fetchOptions().then(res =>{
          vm.gradeOptions = res.gradeOptions;
          vm.classNameOptions = res.classNameOptions;
          vm.professionOptions = res.gradeOptions;
        })
      },
      getStudentList() {
        let that = this;
        this.listLoading = true;
        fetchStudentList(Object.assign({}, this.listQuery)).then(response => {
          this.studentList = response.content;
          this.total = response.totalElements;
          this.listLoading = false;
        }).catch(error =>{
          that.$message({
            type: 'error',
            message:error
          })
        })
      },
      handleImport() {

      },
      handleFilter() {
        this.getStudentList();
      },
      handleSizeChange(val) {
        if (this.listQuery.size === val) {
          return
        }
        this.listQuery.size = val;
        this.getStudentList();
      },
      handleCurrentChange(val) {
        if (this.listQuery.page === val -1) {
          return
        }
        this.listQuery.page = val -1;
        this.getStudentList();
      },
      handleBatchDelete() {
        let confirmMessage = '您将删除所有被选择学生的信息,是否继续?';
        let studentIds = this.multipleSelection.map(item => item.studentId);
        let that =this;
        this.$confirm(confirmMessage,'批量删除学生',{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          beforeClose: (action,instance,done) =>{
            if(action ==='confirm'){
              //显示加载按钮
              instance.confirmButtonLoading = true;
              return new Promise((resolve,reject) =>{
                //通过API发送批量删除请求
                deleteStudentBatch(studentIds).then(response =>{
                  instance.confirmButtonLoading=false;
                  resolve(response);
                  done();
                }).catch(error =>{
                  //捕获错误;
                  instance.confirmButtonLoading=false;
                  reject(error);
                  done();
                })
              })
            }
            //关闭确认框
            done();
          }
        }).then((message) =>{
          //删除被选中的行
          that.studentList = that.studentList.filter(student =>
          !that.multipleSelection.some(row => row.studentId === student.studentId));
//          that.getStudentList();
          that.$message({
            message: '批量删除成功',
            type: 'success',
            duration: 1500
          });
          that.getStudentList();
        }).catch(() =>{
          this.$message({
            message: '取消批量删除操作',
            type: 'info',
            duration: 1500
          });
        })
      },
      markFavoriteStudent() {
        let favoriteStudents = this.multipleSelection.filter(row => !row.favorite.value);
        let studentIds = favoriteStudents.map(student => student.studentId);
        let that = this;
          markStudent(studentIds).then(response =>{
            favoriteStudents.forEach(student => {
              student.favorite = {key: '已收藏', value: true};
            });
            that.$message({
              type:'success',
              message:'收藏成功'
            })
          })
      },
      unMarkFavoriteStudent() {
        let favoriteStudents = this.multipleSelection.filter(row => row.favorite.value);
        let studentIds = favoriteStudents.map(student => student.studentId);
        let that = this;
        markStudent(studentIds).then(response =>{
          favoriteStudents.forEach(student => {
            student.favorite = {key: '未收藏', value: false};
          });
          that.$message({
            type:'success',
            message:'已取消收藏'
          })
        })
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        row.status = status;
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
//      handleDelete(row) {
//        let confirmMessage = '您将删除学号为\'' + row.studentId + '\' '
//          + row.studentName + ' 的所有信息,是否继续?';
//        let that =this;
//        let feedbackMessage = '';
//        this.$confirm(confirmMessage,'删除学生',{
//          confirmButtonText:'确定',
//          cancelButtonText:'取消',
//          type:'warning',
//          beforeClose: (action,instance,done) =>{
//            if(action==='confirm'){
//              instance.confirmButtonLoading = true;
//              return new Promise((resolve, reject) => {
//                let studentIds = [];
//                studentIds.push(row.studentId);
//                deleteStudentBatch(studentIds).then((response) => {
//                  instance.confirmButtonLoading = false;
//                  this.$message({
//                    message: '删除成功',
//                    type: 'success',
//                    duration: 1500
//                  });
//                  done();
//                  resolve(response);
//                }).catch(error => {
//                  instance.confirmButtonLoading = false;
//                  done();
//                  this.$message({
//                    message: error,
//                    type: 'error',
//                    duration: 1500
//                  });
//                })
//              });
//            }
//            done();
//          }
//        }).then(() =>{
//          const index = that.studentList.indexOf(row);
//          that.studentList.splice(index, 1);
//        }).catch(() =>{
//          that.$message({
//            type:'info',
//            message:'取消删除'
//          })
//        });
//      },
      handleDelete(index) {
        let row = this.studentList[index];
        let confirmMessage = '您将删除学号为\'' + row.studentId + '\' '
          + row.studentName + ' 的所有信息,是否继续?';
        let that =this;
        let feedbackMessage = '';
        this.$confirm(confirmMessage,'删除学生',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning',
          beforeClose: (action,instance,done) =>{
            if(action==='confirm'){
              instance.confirmButtonLoading = true;
              return new Promise((resolve, reject) => {
                let studentIds = [];
                studentIds.push(row.studentId);
                deleteStudentBatch(studentIds).then((response) => {
                  instance.confirmButtonLoading = false;
                  this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1500
                  });
                  done();
                  resolve(response);
                }).catch(error => {
                  instance.confirmButtonLoading = false;
                  done();
                  this.$message({
                    message: error,
                    type: 'error',
                    duration: 1500
                  });
                })
              });
            }
            done();
          }
        }).then(() =>{
          that.studentList.splice(index, 1);
        }).catch(() =>{
          that.$message({
            type:'info',
            message:'取消删除'
          })
        });
      },
      create() {
        createStudent(this.temp).then(response => {
          this.$message({
            message:'添加成功',
            type:'success',
            duration:1500
          });
//          this.studentList.unshift(this.temp);
          this.dialogFormVisible = false;
        });
      },
      update() {
        updateStudent(this.temp).then(response =>{
          for (const v of this.studentList) {
            if (v.studentId === this.temp.studentId) {
              const index = this.studentList.indexOf(v);
//              this.studentList.splice(index, 1, this.temp);
              break;
            }
          }
          this.$message({
            type: 'success',
            message:'更新成功'
          });
        });
        this.dialogFormVisible = false;
      },
      resetTemp() {
        this.temp = {
          studentId:'',
          studentName:'',
          grade:'',
          className:'',
          profession:'',
          status:{
            statusId:3,
            chineseValue:'空闲',
            englishValue:'available',
          },
          favorite:{
            favoriteId:0,
            chineseValue:'已收藏',
            englishValue:'favorite'
          },
          finishedTaskCount:0
        };
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData;
          this.dialogPvVisible = true;
        })
      },
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['学号', '姓名', '年级', '专业', '班级','参与任务数'];
          const filterVal = ['studentId', 'studentName', 'grade', 'profession', 'className','finishedTaskCount'];
          const data = this.formatJson(filterVal, this.list);
          export_json_to_excel(tHeader, data, '学生基本信息表');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
    }
  }
</script>

<style lang="scss">
  .student-list-container{
    margin-top: 90px;
  },
  .btn-import-container {
    padding-right: 20px;
    float:right;
    .btn-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
      margin-left: 5px;
    }
  }
  .test{
    padding: 20px;
  }
  .title{
    margin-bottom: 20px;
    width:22%;
    font:bold 36px 微软雅黑;
  }
  div{
    background-color:transparent;
    margin:0px auto;
  }
</style>
