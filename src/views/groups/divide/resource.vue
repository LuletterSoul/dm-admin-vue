<template>
  <div class="calendar-list-container test">
    <div class="title">
      人力资源
    </div>
    <group-modal :to-group="groupModel"
                 @on-closed="handleClosed"
                 @on-confirm="handleCreateConfirm"
                 :to-show="showEditModal"
                 :to-candidates="multipleSelection"
                 :to-group-members="multipleSelection"
                 :to-task-status="taskStatusOptions">
    </group-modal>
    <el-row :gutter="20">
        <el-col :offset="13" :span="3">
          <el-input @keyup.enter.native="handleFilter"
                    @change='handleFilter'
                    size="medium"
                    placeholder="学号"
                    v-model="listQuery.studentId"
                    width="100%">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select clearable
                     @change='handleFilter'
                     size="medium"
                     v-model="listQuery.grade"
                     placeholder="年级"
                     width="100%">
            <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select clearable
                     size="medium"
                     @change='handleFilter'
                     v-model="listQuery.className"
                     placeholder="班级"
                     width="100%">
            <el-option v-for="item in
                        classNameOptions"
                       :key="item.key"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select @change='handleFilter'
                     size="medium"
                     v-model="listQuery.sort"
                     placeholder="排序"
                     width="100%">
            <el-option v-for="item in sortOptions"
                       :key="item.key"
                       :label="item.label"
                       :value="item.key">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
        <el-col :offset="13" :span="6">
          <el-date-picker
            clearable
            size="medium"
            style="width: 100%"
            v-model="datePickerValue"
            @change="handTimeFilter"
            type="daterange"
            unlink-panels
            format="yyyy 年 MM 月 dd 日 HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            :start-placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.beginPlaceholder')"
            :end-placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.endPlaceholder')"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col  :span="5">
        <el-button-group>
          <el-tooltip class="item"
                      effect="dark" content="过滤" placement="top">
            <el-button size="small" type="primary" v-waves icon="el-icon-search" @click="handleFilter"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="添加学生" placement="top">
            <el-button size="small" type="primary" @click="handleCreate"  icon="el-icon-plus"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出" placement="top">
            <el-button size="small" type="primary" icon="el-icon-document" @click="handleDownload"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
            <el-button size="small" type="primary" icon="el-icon-delete" v-waves @click="handleBatchDelete" :disabled="!multipleSelection.length"></el-button>
          </el-tooltip>
          <el-tooltip size="small" class="item" effect="dark" content="新建执行分组" placement="top">
            <transition>
              <el-button size="small" type="warning" icon="el-icon-star-on" v-waves @click="buildGroup" :disabled="!multipleSelection.length"></el-button>
            </transition>
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col>
        <Table border size='default'
               :loading="listLoading"
               :columns="studentColumns"
               :data="studentList"
               @on-selection-change="handleSelectionChange"
               stripe></Table>
      </el-col>
    </el-row>
    <el-row class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.size"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-row>

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
  import GroupModal from '../../components/groupModal';
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

  import {
    getLeisureStudents,
    createGroup,
    getTaskStatus
  } from 'api/groups';

  export default {
    name: 'StudentTable',
    components:{GroupModal},
    data() {
      return {
        datePickerValue:[],
        showEditModal:false,
        taskStatusOptions:[],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        groupModel:{
          groupId:'',
          groupName:'',
          arrangementId:'',
          builtTime:'',
          groupLeader:{studentId:''},
          taskStatus:{}
        },
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
            key: 'studentId',
            sortable: true
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
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('ButtonGroup', [
                h('Button', {
                  props: {
                    icon:'ios-search',
                    size:'small'
                  },
                  on: {
                    click: () => {
                      this.handleCheck(params.index)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    icon:'android-delete',
                    size:'small'
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.index)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    icon:'edit',
                    size:'small'
                  },
                  on: {
                    click: () => {
                      this.handleUpdate(params.index)
                    }
                  }
                })
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
          beginDate:'',
          endDate:'',
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
      this.getTaskStatusOptions();
      this.getOptions();
    },
    computed: {
      fixPage(){
        return this.listQuery.page + 1;
      }
    },
    methods: {
      handTimeFilter(val) {
        this.listQuery.beginDate = val[0];
        this.listQuery.endDate = val[1];
        this.getStudentList();
      },
      getTaskStatusOptions() {
        let vm = this;
        getTaskStatus().then((res) => {
          vm.taskStatusOptions = res;
        }).catch(error => {

        });
      },
      handleCreateConfirm(groupDto) {
        let vm = this;
        createGroup(groupDto).then(res => {
          vm.$message({
            showClose: true,
            message: '创建分组成功',
            type: 'success'
          });
        }).catch(error => {
            
        });
      },
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
      handleClosed() {
        this.showEditModal = false;
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
      buildGroup() {
        this.showEditModal = true;
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
  }

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
